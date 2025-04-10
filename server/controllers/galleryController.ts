import { Request, Response } from "express";
import { storage } from "../storage";
import { insertGalleryItemSchema } from "@shared/schema";
import { z } from "zod";

// Get all gallery items
export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const items = await storage.getGalleryItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery items" });
  }
};

// Get gallery items by type
export const getGalleryItemsByType = async (req: Request, res: Response) => {
  try {
    const items = await storage.getGalleryItemsByType(req.params.type);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery items" });
  }
};

// Get gallery items by service ID
export const getGalleryItemsByServiceId = async (req: Request, res: Response) => {
  try {
    const serviceId = parseInt(req.params.serviceId);
    const items = await storage.getGalleryItemsByServiceId(serviceId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gallery items" });
  }
};

// Create a new gallery item (admin only)
export const createGalleryItem = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    // Validate request body
    const validData = insertGalleryItemSchema.parse(req.body);
    
    // Validate that required fields are present based on type
    if (validData.type === "before-after" && (!validData.beforeImageUrl || !validData.afterImageUrl)) {
      return res.status(400).json({ message: "Before and after images are required for before-after type" });
    }
    
    if (validData.type === "clinic" && !validData.imageUrl) {
      return res.status(400).json({ message: "Image URL is required for clinic type" });
    }
    
    if (validData.type === "video" && !validData.videoUrl) {
      return res.status(400).json({ message: "Video URL is required for video type" });
    }
    
    // Create gallery item in storage
    const item = await storage.createGalleryItem(validData);
    
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create gallery item" });
  }
};

// Update a gallery item (admin only)
export const updateGalleryItem = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    
    // Validate request body
    const validData = insertGalleryItemSchema.partial().parse(req.body);
    
    // Update gallery item in storage
    const item = await storage.updateGalleryItem(id, validData);
    if (!item) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    
    res.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to update gallery item" });
  }
};

// Delete a gallery item (admin only)
export const deleteGalleryItem = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteGalleryItem(id);
    if (!result) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gallery item" });
  }
};
