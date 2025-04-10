import { Request, Response } from "express";
import { storage } from "../storage";
import { insertServiceSchema } from "@shared/schema";
import { z } from "zod";

// Get all services
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await storage.getServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

// Get a service by slug
export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const service = await storage.getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service" });
  }
};

// Create a new service (admin only)
export const createService = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    // Validate request body
    const validData = insertServiceSchema.parse(req.body);
    
    // Check if service with this slug already exists
    const existingService = await storage.getServiceBySlug(validData.slug);
    if (existingService) {
      return res.status(400).json({ message: "Service with this slug already exists" });
    }
    
    // Create service in storage
    const service = await storage.createService(validData);
    
    res.status(201).json(service);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create service" });
  }
};

// Update a service (admin only)
export const updateService = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    
    // Validate request body
    const validData = insertServiceSchema.partial().parse(req.body);
    
    // Check if updating slug and it already exists on a different service
    if (validData.slug) {
      const existingService = await storage.getServiceBySlug(validData.slug);
      if (existingService && existingService.id !== id) {
        return res.status(400).json({ message: "Service with this slug already exists" });
      }
    }
    
    // Update service in storage
    const service = await storage.updateService(id, validData);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    res.json(service);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update service" });
  }
};

// Delete a service (admin only)
export const deleteService = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteService(id);
    if (!result) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete service" });
  }
};
