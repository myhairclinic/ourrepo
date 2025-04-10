import { Request, Response } from "express";
import { storage } from "../storage";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";
import telegramService from "../services/telegramService";

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validData = insertAppointmentSchema.parse(req.body);
    
    // Create appointment in storage
    const appointment = await storage.createAppointment(validData);
    
    // Send notification to Telegram
    telegramService.notifyNewAppointment(appointment);
    
    res.status(201).json(appointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// Get all appointments (admin only)
export const getAppointments = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const appointments = await storage.getAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Update appointment status (admin only)
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    // Validate status
    if (!["new", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const appointment = await storage.updateAppointment(id, { status });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Send notification to Telegram about status update
    telegramService.notifyAppointmentUpdate(appointment);
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status" });
  }
};

// Delete appointment (admin only)
export const deleteAppointment = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const result = await storage.deleteAppointment(id);
    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};
