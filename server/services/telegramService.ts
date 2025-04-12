import { Appointment } from '@shared/schema';
import { telegramBotService } from './telegramBotService';

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
    telegramBotService.getServiceName(serviceId)
      .then(serviceName => {
        console.log(`Service name found: ${serviceName}`);
        return telegramBotService.formatNewAppointmentMessage(appointment, serviceName, appointmentDate);
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