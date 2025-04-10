import TelegramBot from 'node-telegram-bot-api';
import { Appointment } from '@shared/schema';
import { log } from '../vite';

// Check if telegram bot token is available
const token = process.env.TELEGRAM_BOT_TOKEN;
let bot: TelegramBot | null = null;

// Admin chat ID - will be set when admin subscribes
let adminChatId: string | null = null;

// Initialize the bot if token is available
if (token) {
  try {
    bot = new TelegramBot(token, { polling: true });
    log('Telegram bot initialized successfully', 'telegram');
    
    // Handle /start command
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      bot?.sendMessage(chatId, 'Merhaba! MyHair Klinik Randevu Yönetim Sistemi\'ne hoş geldiniz. Randevu bildirimleri için /subscribe komutunu kullanabilirsiniz.');
    });

    // Handle /subscribe command for admin to receive notifications
    bot.onText(/\/subscribe/, (msg) => {
      const chatId = msg.chat.id.toString();
      adminChatId = chatId;
      log(`Admin subscribed to notifications with chat ID: ${adminChatId}`, 'telegram');
      bot?.sendMessage(chatId, 'Artık randevu bildirimlerini alacaksınız. Bildirimleri durdurmak için /unsubscribe yazabilirsiniz.');
    });

    // Handle /unsubscribe command
    bot.onText(/\/unsubscribe/, (msg) => {
      const chatId = msg.chat.id.toString();
      if (chatId === adminChatId) {
        adminChatId = null;
        bot?.sendMessage(chatId, 'Randevu bildirimleri durduruldu. Tekrar başlatmak için /subscribe yazabilirsiniz.');
        log('Admin unsubscribed from notifications', 'telegram');
      } else {
        bot?.sendMessage(chatId, 'Randevu bildirimleri zaten aktif değil.');
      }
    });

    bot.on('polling_error', (error) => {
      log(`Telegram polling error: ${error.message}`, 'telegram');
    });
  } catch (error) {
    log(`Error initializing Telegram bot: ${error}`, 'telegram');
  }
} else {
  log('Telegram bot token not found, notification service disabled', 'telegram');
}

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
  if (!bot || !adminChatId) return;

  try {
    const message = `
🆕 *YENİ RANDEVU BİLDİRİMİ*

📝 *İsim:* ${appointment.name}
📧 *E-posta:* ${appointment.email}
📱 *Telefon:* ${appointment.phone}
📆 *Tarih:* ${appointment.preferredDate ? new Date(appointment.preferredDate).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
💬 *Mesaj:* ${appointment.message || 'Yok'}
⏰ *Oluşturulma:* ${new Date(appointment.createdAt).toLocaleString('tr-TR')}

/admin komutunu kullanarak yönetici panelinden randevuyu yönetebilirsiniz.
`;

    bot.sendMessage(adminChatId, message, { parse_mode: 'Markdown' });
    log(`New appointment notification sent for appointment ID: ${appointment.id}`, 'telegram');
  } catch (error) {
    log(`Error sending new appointment notification: ${error}`, 'telegram');
  }
};

/**
 * Send notification about appointment status update to admin
 */
export const notifyAppointmentUpdate = (appointment: Appointment): void => {
  if (!bot || !adminChatId) return;

  try {
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

    bot.sendMessage(adminChatId, message, { parse_mode: 'Markdown' });
    log(`Appointment update notification sent for appointment ID: ${appointment.id}`, 'telegram');
  } catch (error) {
    log(`Error sending appointment update notification: ${error}`, 'telegram');
  }
};

// Handle bot command to access admin panel
if (bot) {
  bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;
    bot?.sendMessage(chatId, 'Yönetici paneline gitmek için aşağıdaki bağlantıyı kullanabilirsiniz:\n\nhttps://' + process.env.REPL_SLUG + '.replit.app/admin/appointments');
  });
}

/**
 * Send notification to customer about appointment status change
 */
export const notifyCustomerAppointmentUpdate = async (appointment: Appointment): Promise<void> => {
  if (!bot) return;

  try {
    // Check if we have a chat record for this customer
    // In a real implementation, you would store customer chat IDs in a database
    // For demonstration, we'll just log that we would send a message
    log(`Customer notification would be sent for appointment ID: ${appointment.id} with status: ${appointment.status}`, 'telegram');
    
    // Example message that would be sent to customer
    const message = `
🔔 *RANDEVU BİLDİRİMİ*

Sayın ${appointment.name},

Randevunuzun durumu güncellendi:
🔶 *Yeni Durum:* ${getStatusText(appointment.status)}
📆 *Tarih:* ${appointment.preferredDate ? new Date(appointment.preferredDate).toLocaleDateString('tr-TR') : 'Belirtilmedi'}
⏰ *Güncelleme:* ${new Date(appointment.updatedAt).toLocaleString('tr-TR')}

Randevunuzla ilgili detaylar için web sitemizi ziyaret edebilirsiniz.
`;

    // In a real implementation, you would send this message to the customer's chat ID
    // bot.sendMessage(customerChatId, message, { parse_mode: 'Markdown' });
    
    log(`Customer notification template prepared for appointment ID: ${appointment.id}`, 'telegram');
  } catch (error) {
    log(`Error preparing customer notification: ${error}`, 'telegram');
  }
};

export default {
  notifyNewAppointment,
  notifyAppointmentUpdate,
  notifyCustomerAppointmentUpdate
};