import { Appointment } from '@shared/schema';
import { telegramBotService } from './telegramBotService';

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
      const message = telegramBotService.formatAppointmentReminderMessage(
        testAppointment as any,
        serviceName,
        appointmentDate
      );
      
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
    
    const message = `
🔄 *RANDEVU GÜNCELLENDİ*

📝 *İsim:* ${appointment.name}
📧 *E-posta:* ${appointment.email}
📱 *Telefon:* ${appointment.phone}
📆 *Tarih:* ${appointment.preferredDate ? new Date(appointment.preferredDate).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
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

export default {
  notifyNewAppointment,
  notifyAppointmentUpdate,
  notifyCustomerAppointmentUpdate
};