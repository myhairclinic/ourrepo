import { Request, Response } from "express";
import { storage } from "../storage";

export const trackAppointment = async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.query;

    if (!email || !phone) {
      return res.status(400).json({ message: "Email and phone are required" });
    }

    // Get all appointments
    const allAppointments = await storage.getAppointments();
    
    // Filter appointments by email and phone
    const userAppointments = allAppointments.filter(
      appointment => appointment.email === email && appointment.phone === phone
    );

    // If no appointments found, return 404
    if (userAppointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Get service details for each appointment
    const appointmentsWithServiceDetails = await Promise.all(
      userAppointments.map(async (appointment) => {
        const service = await storage.getServiceById(appointment.serviceId);
        return {
          ...appointment,
          service: service || { titleTR: "Bilinmeyen hizmet", titleEN: "Unknown service", titleRU: "Неизвестная услуга", titleKA: "უცნობი სერვისი" }
        };
      })
    );

    // Sort appointments by creation date (newest first)
    appointmentsWithServiceDetails.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    res.json(appointmentsWithServiceDetails);
  } catch (error) {
    console.error("Error tracking appointment:", error);
    res.status(500).json({ message: "Failed to track appointments" });
  }
};