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
    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const appointment = await storage.updateAppointment(id, { status });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Send notification to Telegram about status update
    telegramService.notifyAppointmentUpdate(appointment);
    
    // Send notification to customer (when implemented in the future)
    telegramService.notifyCustomerAppointmentUpdate(appointment);
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status" });
  }
};

// Confirm appointment with time selection (admin only)
export const confirmAppointmentWithTime = async (req: Request, res: Response) => {
  // Check if user is authenticated admin
  if (!req.isAuthenticated() || req.user?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }
  
  try {
    const id = parseInt(req.params.id);
    const { appointmentTime, status, notificationScheduled } = req.body;
    
    // Validate input
    if (!appointmentTime || !status) {
      return res.status(400).json({ message: "Appointment time and status are required" });
    }
    
    // Validate status
    if (status !== "confirmed") {
      return res.status(400).json({ message: "Status must be 'confirmed' for this operation" });
    }
    
    // Update appointment with time and status
    const appointment = await storage.updateAppointment(id, { 
      appointmentTime, 
      status, 
      notificationScheduled: notificationScheduled === true,
      notificationSent: false
    });
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Schedule notification for 1 hour before appointment if notificationScheduled is true
    if (notificationScheduled) {
      const appointmentDate = new Date(appointment.preferredDate);
      const [hours, minutes] = appointmentTime.split(':').map(Number);
      
      appointmentDate.setHours(hours);
      appointmentDate.setMinutes(minutes);
      
      // Schedule reminder 1 hour before
      const reminderTime = new Date(appointmentDate.getTime() - 60 * 60 * 1000);
      const currentTime = new Date();
      
      // If appointment is more than an hour away, schedule reminder
      if (reminderTime > currentTime) {
        // We'll implement the actual scheduling in telegramService
        telegramService.scheduleAppointmentReminder(appointment.id, reminderTime);
      }
    }
    
    // Send notification to Telegram about appointment confirmation with time
    telegramService.notifyAppointmentConfirmation(appointment, appointmentTime);
    
    res.json(appointment);
  } catch (error) {
    console.error('Error confirming appointment with time:', error);
    res.status(500).json({ message: "Failed to confirm appointment with time" });
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
