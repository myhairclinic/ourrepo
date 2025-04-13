import { Appointment, Patient } from '@shared/schema';
import { telegramBotService } from './telegramBotService';
import { storage } from '../storage';

// Test bildirimleri için Telegram servisi
export const telegramService = {
  // Yeni randevu test bildirimi gönder
  async sendNewAppointmentTestNotification(chatId: string): Promise<{success: boolean, error?: string}> {
    try {
      console.log(`Sending new appointment test notification to ${chatId}`);
      
      if (!telegramBotService.isInitialized) {
        await telegramBotService.initialize();
      }
      
      // Test verisi oluştur
      const testAppointment = {
        id: 9999,
        name: "Test Müşteri",
        email: "test@example.com",
        phone: "+90 555 123 4567",
        message: "Bu bir test mesajıdır",
        preferredDate: new Date().toISOString(),
        serviceId: 1,
        status: "new"
      };
      
      const serviceName = "Saç Ekimi (Test)";
      const appointmentDate = new Date();
      
      // Mesajı oluştur
      const message = telegramBotService.formatAppointmentMessage(
        testAppointment as any, 
        serviceName, 
        appointmentDate
      );
      
      // Mesajı gönder - sayısal chatId veya kullanıcı adı için doğru fonksiyonu kullan
      let result;
      if (chatId.startsWith('@')) {
        // Kullanıcı adına gönder
        result = await telegramBotService.sendMessageToOperator(chatId, message);
      } else {
        // Chat ID'ye gönder
        result = await telegramBotService.sendMessageByChatId(parseInt(chatId), message);
      }
      
      if (result) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: "Bildirim gönderilemedi. Kullanıcının botu başlatıp başlatmadığını kontrol edin." 
        };
      }
    } catch (error: any) {
      console.error("Error sending new appointment test notification:", error);
      return { 
        success: false, 
        error: error.message || "Test bildirimi gönderilirken bir hata oluştu" 
      };
    }
  },
  
  // Randevu hatırlatma test bildirimi gönder
  async sendAppointmentReminderTestNotification(chatId: string): Promise<{success: boolean, error?: string}> {
    try {
      console.log(`Sending appointment reminder test notification to ${chatId}`);
      
      if (!telegramBotService.isInitialized) {
        await telegramBotService.initialize();
      }
      
      // Test randevusu
      const testAppointment = {
        id: 9999,
        name: "Test Müşteri",
        phone: "+90 555 123 4567",
        preferredDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 saat sonrası
        serviceId: 1
      };
      
      const serviceName = "Saç Ekimi (Test)";
      const appointmentDate = new Date(Date.now() + 60 * 60 * 1000);
      
      // Hatırlatma mesajını oluştur
      const reminderTime = new Date(appointmentDate.getTime());
      const formattedDate = appointmentDate.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const formattedTime = appointmentDate.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      const message = `*⏰ Randevu Hatırlatması (TEST)*\n\n` +
        `Aşağıdaki randevunuz 1 saat içinde başlayacak!\n\n` +
        `👤 *Hasta Bilgileri*\n` +
        `İsim: ${testAppointment.name}\n` +
        `Telefon: ${testAppointment.phone}\n\n` +
        `💇 *Randevu Detayları*\n` +
        `Hizmet: ${serviceName}\n` +
        `Tarih: ${formattedDate}\n` +
        `Saat: ${formattedTime}\n\n` +
        `_Bu bir test mesajıdır, gerçek bir randevu değildir._`;
      
      // Mesajı gönder
      let result;
      if (chatId.startsWith('@')) {
        // Kullanıcı adına gönder
        result = await telegramBotService.sendMessageToOperator(chatId, message);
      } else {
        // Chat ID'ye gönder
        result = await telegramBotService.sendMessageByChatId(parseInt(chatId), message);
      }
      
      if (result) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: "Bildirim gönderilemedi. Kullanıcının botu başlatıp başlatmadığını kontrol edin." 
        };
      }
    } catch (error: any) {
      console.error("Error sending appointment reminder test notification:", error);
      return { 
        success: false, 
        error: error.message || "Test bildirimi gönderilirken bir hata oluştu" 
      };
    }
  },
  
  // Günlük özet test bildirimi gönder
  async sendDailySummaryTestNotification(chatId: string): Promise<{success: boolean, error?: string}> {
    try {
      console.log(`Sending daily summary test notification to ${chatId}`);
      
      if (!telegramBotService.isInitialized) {
        await telegramBotService.initialize();
      }
      
      // Günlük özet mesajı
      const today = new Date();
      const dayStr = today.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      const message = `📊 *GÜNLÜK RANDEVU ÖZETİ*
      
📆 *Tarih:* ${dayStr}

*Bugünkü Randevular:*
09:30 - Test Müşteri 1 (Saç Ekimi)
11:00 - Test Müşteri 2 (Kaş Ekimi) 
14:30 - Test Müşteri 3 (PRP Tedavisi)

*Yarınki Randevular:*
10:00 - Test Müşteri 4 (Saç Ekimi)
15:45 - Test Müşteri 5 (Sakal Ekimi)

*İstatistikler:*
- Bugün: 3 randevu
- Yarın: 2 randevu
- Bu hafta: 12 randevu
- Bu ay: 45 randevu

Bu bir test bildirimdir. Gerçek veriler değildir.`;
      
      // Mesajı gönder
      let result;
      if (chatId.startsWith('@')) {
        // Kullanıcı adına gönder
        result = await telegramBotService.sendMessageToOperator(chatId, message);
      } else {
        // Chat ID'ye gönder
        result = await telegramBotService.sendMessageByChatId(parseInt(chatId), message);
      }
      
      if (result) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: "Bildirim gönderilemedi. Kullanıcının botu başlatıp başlatmadığını kontrol edin." 
        };
      }
    } catch (error: any) {
      console.error("Error sending daily summary test notification:", error);
      return { 
        success: false, 
        error: error.message || "Test bildirimi gönderilirken bir hata oluştu" 
      };
    }
  }
};

// Format the appointment status in Turkish
const getStatusText = (status: string): string => {
  switch (status) {
    case 'new':
      return 'Yeni';
    case 'confirmed':
      return 'Onaylandı';
    case 'completed':
      return 'Tamamlandı';
    case 'cancelled':
      return 'İptal Edildi';
    default:
      return status;
  }
};

/**
 * Send notification about new appointment to admin
 */
export const notifyNewAppointment = (appointment: Appointment): void => {
  try {
    // Servis adını al
    const serviceId = appointment.serviceId;
    const appointmentDate = appointment.preferredDate 
      ? new Date(appointment.preferredDate)
      : new Date(); // Eğer tarih belirtilmemişse şimdiki zamanı kullan
      
    // Saati ayarla, eğer appointmentTime varsa
    if (appointment.appointmentTime) {
      const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);
    }
    
    // telegramBotService başlatılmış mı kontrol et
    if (!telegramBotService.isInitialized) {
      console.warn('Telegram bot is not initialized, cannot send notification');
      return;
    }
    
    // Yeni randevu bildirimi için TelegramBotService'i kullan
    telegramBotService.getServiceNamePublic(serviceId)
      .then(serviceName => {
        console.log(`Service name found: ${serviceName}`);
        return telegramBotService.formatAppointmentMessage(appointment, serviceName, appointmentDate);
      })
      .then(formattedMessage => {
        console.log("Formatted message created, sending to operators");
        return telegramBotService.sendOperatorNotification(formattedMessage);
      })
      .then(() => {
        console.log(`New appointment notification sent for ID: ${appointment.id}`);
      })
      .catch(error => {
        console.error(`Error in notification chain: ${error}`);
      });
    
  } catch (error: any) {
    console.error(`Error sending new appointment notification: ${error.message}`);
  }
};

/**
 * Send notification about appointment status update to admin
 */
export const notifyAppointmentUpdate = (appointment: Appointment): void => {
  try {
    // telegramBotService başlatılmış mı kontrol et
    if (!telegramBotService.isInitialized) {
      console.warn('Telegram bot is not initialized, cannot send notification');
      return;
    }
    
    // Randevu tarihi ve saati
    const appointmentDate = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
    // Saati ayarla, eğer appointmentTime varsa
    if (appointment.appointmentTime) {
      const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);
    }
    
    const formattedDate = appointmentDate.toLocaleDateString('tr-TR');
    const formattedTime = appointment.appointmentTime || appointmentDate.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const message = `
🔄 *RANDEVU GÜNCELLENDİ*

📝 *İsim:* ${appointment.name}
📧 *E-posta:* ${appointment.email}
📱 *Telefon:* ${appointment.phone}
📆 *Tarih:* ${formattedDate}
⏰ *Saat:* ${formattedTime}
🔶 *Durum:* ${getStatusText(appointment.status)}
⏰ *Güncelleme:* ${new Date(appointment.updatedAt).toLocaleString('tr-TR')}

/admin komutunu kullanarak yönetici panelinden randevuyu yönetebilirsiniz.
`;

    // Tüm operatörlere bildirim gönder
    telegramBotService.sendOperatorNotification(message)
      .then(() => {
        console.log(`Appointment update notification sent for ID: ${appointment.id}`);
      })
      .catch(error => {
        console.error(`Error sending update notification: ${error}`);
      });
    
  } catch (error: any) {
    console.error(`Error sending appointment update notification: ${error.message}`);
  }
};

/**
 * Send notification to customer about appointment status change
 * NOT USED - For future reference only
 */
export const notifyCustomerAppointmentUpdate = async (appointment: Appointment): Promise<void> => {
  // Bu fonksiyon müşteri ile iletişim içermediği için artık kullanılmıyor
  console.log(`Customer notification is disabled. No message sent for appointment ID: ${appointment.id}`);
};

/**
 * Send notification about appointment confirmation with specific time
 */
export const notifyAppointmentConfirmation = async (appointment: Appointment, appointmentTime: string): Promise<void> => {
  try {
    console.log(`Sending confirmation notification for appointment ID: ${appointment.id}`);

    // telegramBotService başlatılmış mı kontrol et
    if (!telegramBotService.isInitialized) {
      console.log('Telegram bot is not initialized, initializing now...');
      await telegramBotService.initialize();
      
      // İkinci kontrol - eğer hâlâ başlatılamamışsa loglama yap ve çık
      if (!telegramBotService.isInitialized) {
        console.error('Telegram bot initialization failed, cannot send confirmation notification');
        return;
      }
    }
    
    // Randevu tarihi ve saati
    const appointmentDate = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
    // Saati ayarla, eğer appointmentTime varsa
    if (appointment.appointmentTime) {
      const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);
    }
    
    const formattedDate = appointmentDate.toLocaleDateString('tr-TR', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    
    try {
      // Servis adını al
      const serviceName = await telegramBotService.getServiceNamePublic(appointment.serviceId);
      console.log(`Service name for confirmation notification: ${serviceName}`);
      
      const message = `
✅ *RANDEVU ONAYLANDI*

👤 *Hasta Bilgileri*
📝 *İsim:* ${appointment.name}
📧 *E-posta:* ${appointment.email}
📱 *Telefon:* ${appointment.phone}

💇 *Randevu Detayları*
🔍 *Hizmet:* ${serviceName}
📆 *Tarih:* ${formattedDate}
⏰ *Saat:* ${appointmentTime}
${appointment.message ? `💬 *Mesaj:* ${appointment.message}` : ''}

✉️ Hasta bilgilendirildi. Randevudan 1 saat önce otomatik hatırlatma yapılacak.

/admin komutunu kullanarak yönetici panelinden randevuyu yönetebilirsiniz.
`;

      // Tüm operatörlere bildirim gönder
      const result = await telegramBotService.sendOperatorNotification(message);
      
      if (result) {
        console.log(`✓ Appointment confirmation notification sent successfully for ID: ${appointment.id}`);
      } else {
        console.warn(`⚠️ Failed to send confirmation notification to some operators for appointment ID: ${appointment.id}`);
      }
    } catch (serviceError) {
      console.error(`Error getting service name or sending notification: ${serviceError}`);
    }
  } catch (error: any) {
    console.error(`Error sending appointment confirmation notification: ${error.message}`);
  }
};

/**
 * Schedule a reminder for an appointment
 */
export const scheduleAppointmentReminder = async (appointmentId: number, reminderTime: Date): Promise<void> => {
  try {
    console.log(`Scheduling reminder for appointment ID: ${appointmentId} at ${reminderTime.toISOString()}`);
    
    // Zamanı hesapla (şimdiki zaman ile hatırlatma zamanı arasındaki milisaniye farkı)
    const now = new Date();
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    if (timeUntilReminder <= 0) {
      console.log(`Reminder time already passed for appointment ID: ${appointmentId}`);
      return;
    }
    
    // setTimeout ile hatırlatma ayarla
    setTimeout(async () => {
      try {
        console.log(`Executing reminder for appointment ID: ${appointmentId}`);
        
        // Veritabanından en güncel randevu bilgilerini al
        const appointment = await storage.getAppointmentById(appointmentId);
        
        if (!appointment) {
          console.log(`Appointment ID ${appointmentId} not found, aborting reminder`);
          return;
        }
        
        // Randevunun durumu "confirmed" değilse, hatırlatma gönderme
        if (appointment.status !== "confirmed") {
          console.log(`Appointment ID ${appointmentId} status is ${appointment.status}, not sending reminder`);
          return;
        }
        
        // Servis adını al ve hatırlatma mesajını oluştur
        const serviceName = await telegramBotService.getServiceNamePublic(appointment.serviceId);
        
        // Tarih ve saat formatla
        const appointmentDate = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
        if (appointment.appointmentTime) {
          const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
          appointmentDate.setHours(hours, minutes);
        }
        
        const formattedDate = appointmentDate.toLocaleDateString('tr-TR', {
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        });
        
        const formattedTime = appointment.appointmentTime || 
          appointmentDate.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
          });
        
        const message = `
⏰ *RANDEVU HATIRLATMASI*

Aşağıdaki randevunuz 1 saat içinde başlayacak!

👤 *Hasta Bilgileri*
📝 *İsim:* ${appointment.name}
📱 *Telefon:* ${appointment.phone}

💇 *Randevu Detayları*
🔍 *Hizmet:* ${serviceName}
📆 *Tarih:* ${formattedDate}
⏰ *Saat:* ${formattedTime}

Lütfen randevu için gerekli hazırlıkları yapın ve hastamızı zamanında karşılayın.
`;
        
        // Operatörlere bildirim gönder
        await telegramBotService.sendOperatorNotification(message);
        
        // Bildirim gönderildi olarak işaretle
        await telegramBotService.markNotificationSent(appointmentId);
        
        console.log(`Reminder sent successfully for appointment ID: ${appointmentId}`);
      } catch (error) {
        console.error(`Error sending scheduled reminder for appointment ID: ${appointmentId}:`, error);
      }
    }, timeUntilReminder);
    
    console.log(`Reminder scheduled successfully for appointment ID: ${appointmentId}`);
  } catch (error) {
    console.error(`Error scheduling reminder for appointment ID: ${appointmentId}:`, error);
  }
};

/**
 * Send notification when a patient is created from appointment
 */
export const notifyPatientCreation = (patient: Patient, appointment: Appointment): void => {
  try {
    // telegramBotService başlatılmış mı kontrol et
    if (!telegramBotService.isInitialized) {
      console.warn('Telegram bot is not initialized, cannot send patient creation notification');
      return;
    }
    
    // Randevu detaylarını formatla
    const appointmentDate = appointment.preferredDate 
      ? new Date(appointment.preferredDate)
      : new Date();
    
    // Servis ismini al
    telegramBotService.getServiceNamePublic(appointment.serviceId)
      .then(serviceName => {
        const message = `
✅ *YENİ HASTA KAYDEDİLDİ*

Onaylanan randevudan otomatik olarak hasta kaydı oluşturuldu.

👤 *Hasta Bilgileri*
📝 *İsim:* ${patient.fullName}
📧 *E-posta:* ${patient.email || 'Belirtilmemiş'}
📱 *Telefon:* ${patient.phone}

💇 *Tedavi Bilgileri*
🔍 *Hizmet:* ${serviceName}
📆 *Randevu Tarihi:* ${appointmentDate.toLocaleDateString('tr-TR')}
⏰ *Randevu Saati:* ${appointment.appointmentTime || 'Belirtilmemiş'}

${appointment.message ? `💬 *Notlar:* ${appointment.message}` : ''}

🔷 *Hasta ID:* ${patient.id}
🔷 *Randevu ID:* ${appointment.id}

/admin komutunu kullanarak yönetici panelinden hastayı yönetebilirsiniz.
`;

        // Tüm operatörlere bildirim gönder
        return telegramBotService.sendOperatorNotification(message);
      })
      .then(() => {
        console.log(`Patient creation notification sent for patient ID: ${patient.id}, from appointment ID: ${appointment.id}`);
      })
      .catch(error => {
        console.error(`Error sending patient creation notification: ${error}`);
      });
    
  } catch (error: any) {
    console.error(`Error sending patient creation notification: ${error.message}`);
  }
};

export default {
  notifyNewAppointment,
  notifyAppointmentUpdate,
  notifyCustomerAppointmentUpdate,
  notifyAppointmentConfirmation,
  scheduleAppointmentReminder,
  notifyPatientCreation,
  ...telegramService // Test fonksiyonlarını dışa aktar
};