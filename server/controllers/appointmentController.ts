import { Request, Response } from "express";
import { storage } from "../storage";
import { insertAppointmentSchema, insertPatientSchema, InsertPatient } from "@shared/schema";
import { z } from "zod";
import { telegramService } from "../services/telegramService";

// Create a new appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validData = insertAppointmentSchema.parse(req.body);
    
    // Create appointment in storage
    const appointment = await storage.createAppointment(validData);
    
    // Send notification to Telegram with extra logging
    console.log("⚠️ YENİ RANDEVU GÖNDERİLİYOR - CONTROLLER");
    console.log(`Randevu detayları: ID=${appointment.id}, İsim=${appointment.name}`);
    
    try {
      telegramService.notifyNewAppointment(appointment);
      console.log("✓ Telegram bildirimi başarıyla çağrıldı");
    } catch (notifyError) {
      console.error(`❌ Telegram bildirimi gönderilirken hata oluştu: ${notifyError}`);
    }
    
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
    
    // Status, updateAppointment fonksiyonuna doğrudan geçirilmemeli
    // Önce mevcut kaydı alalım
    const currentAppointment = await storage.getAppointmentById(id);
    if (!currentAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Randevu durumu kontrolü (zaten aynı durumda ise güncellemeye gerek yok)
    if (currentAppointment.status === status) {
      return res.json(currentAppointment);
    }
    
    // Sonra kaydı güncelleyelim, doğrudan DB_SET kullanarak status'u ayarlayacağız
    const appointment = await storage.updateAppointmentStatus(id, status);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Eğer durum "confirmed" olarak değiştiyse ve appointmentTime zaten ayarlanmışsa
    // otomatik olarak hasta kaydını oluşturalım
    if (status === "confirmed" && appointment.appointmentTime && 
        (currentAppointment.status !== "confirmed")) {
      try {
        await createPatientFromAppointment(appointment);
        console.log(`Randevu onaylandığı için hasta otomatik olarak oluşturuldu: ${appointment.name}`);
      } catch (err) {
        console.error('Randevudan hasta oluşturulurken hata:', err);
        // Hasta oluşturma hatası olsa bile işlemi devam ettir, sadece loglama yap
      }
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
    
    // Önce randevuyu doğru şekilde güncelleyelim - sadece appointmentTime bilgisini güncelle
    const currentAppointment = await storage.getAppointmentById(id);
    if (!currentAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    const appointment = await storage.updateAppointment(id, { 
      appointmentTime 
    });

    // Sonra status'u ayrı güncelleyelim
    const updatedAppointment = await storage.updateAppointmentStatus(id, status);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Bildirim durumlarını doğrudan güncelleme yapmıyoruz
    // Bunun yerine statusu güncelledikten sonra ilgili servisleri çağırıyoruz
    
    // Schedule notification for 1 hour before appointment if notificationScheduled is true
    if (notificationScheduled && appointment && appointment.preferredDate) {
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
    
    // Güncellenmiş randevu bilgilerini kullan
    const finalAppointment = updatedAppointment || appointment;
    
    // Send notification to Telegram about appointment confirmation with time
    console.log(`Sending appointment confirmation to Telegram for appointment ID: ${finalAppointment.id}`);
    try {
      // Bildirim göndermede sorunlar yaşanabileceği için try/catch bloğuna alıyoruz ve await ekliyoruz
      await telegramService.notifyAppointmentConfirmation(finalAppointment, appointmentTime);
      console.log(`Appointment confirmation notification sent successfully for ID: ${finalAppointment.id}`);
    } catch (error) {
      console.error(`Error sending appointment confirmation notification: ${error}`);
      // Başarısız olursa tekrar deneme (bir acil durum önlemi)
      try {
        console.log(`Retrying to send appointment confirmation notification for ID: ${finalAppointment.id}`);
        // TelegramBotService'i import ediyoruz
        const { telegramBotService } = await import('../services/telegramBotService');
        await telegramBotService.initialize(); // Bot servisini yeniden başlatmaya çalış
        await telegramService.notifyAppointmentConfirmation(finalAppointment, appointmentTime);
      } catch (retryError) {
        console.error(`Retry failed for sending appointment notification: ${retryError}`);
      }
    }
    
    // Onaylanmış randevu hasta kaydına dönüştürülüyor
    try {
      await createPatientFromAppointment(finalAppointment);
      console.log(`Hasta otomatik olarak oluşturuldu: ${finalAppointment.name}`);
    } catch (err) {
      console.error('Randevudan hasta oluşturulurken hata:', err);
    }
    
    res.json(finalAppointment);
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

/**
 * Onaylanmış (saati belirlenmiş) bir randevuyu otomatik olarak hasta kaydına dönüştürür
 * @param appointment Onaylanmış randevu bilgileri
 * @returns Oluşturulan hasta kaydı
 */
async function createPatientFromAppointment(appointment: any) {
  try {
    // Öncelikle bu telefon numarasıyla daha önce kayıtlı bir hasta var mı kontrol ediyoruz
    const existingPatient = await storage.getPatientByPhone(appointment.phone);
    
    // Eğer hasta zaten kayıtlıysa tekrar kayıt oluşturmuyoruz
    if (existingPatient) {
      console.log(`Bu telefon numarası ile kayıtlı hasta zaten mevcut: ${appointment.phone}`);
      return existingPatient;
    }
    
    // Hasta kaydı için gerekli verileri hazırlıyoruz
    const patientData: InsertPatient = {
      fullName: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      serviceId: appointment.serviceId,
      // Randevu ile ilgili notlar
      notes: `Otomatik oluşturuldu. Randevu ID: ${appointment.id}, Tarih: ${appointment.preferredDate}, Saat: ${appointment.appointmentTime}`,
      status: "active"
    };
    
    // Hasta kaydını oluşturuyoruz
    const patient = await storage.createPatient(patientData);
    
    // Telegram'a bildirim gönderiyoruz
    telegramService.notifyPatientCreation(patient, appointment);
    
    return patient;
  } catch (error) {
    console.error('Hasta oluşturma hatası:', error);
    throw error;
  }
}
