import TelegramBot from 'node-telegram-bot-api';
import { Appointment } from '@shared/schema';
import { log } from '../vite';

// Check if telegram bot token is available
const token = process.env.TELEGRAM_BOT_TOKEN;
let bot: TelegramBot | null = null;

// Admin chat ID(s) - for sending notifications
// Bot kullanıcı adı: @myhairclinic_bot
// İki admin chat ID'si eklendi, her ikisi de /start komutunu gönderdi 
const ADMIN_CHAT_IDS = ['5631870985', '1062681151']; // Her iki admin chat ID'si de çalışıyor

// Initialize the bot with webhook for production or polling for development
try {
  if (token) {
    // For local development and testing, use polling
    const botOptions = {
      polling: true
    };

    bot = new TelegramBot(token, botOptions);
    console.log('Telegram bot initialized successfully');

    // Handle /start command
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      console.log(`Chat ID for new session: ${chatId}`);
      bot?.sendMessage(chatId, `Merhaba! MyHair Klinik Randevu Yönetim Sistemi'ne hoş geldiniz. Chat ID'niz: ${chatId}`);
    });

    // Handle /test command to check if bot is working
    bot.onText(/\/test/, (msg) => {
      const chatId = msg.chat.id;
      bot?.sendMessage(chatId, 'Bot çalışıyor! Bu bir test mesajıdır.');
      console.log(`Test message sent to chat ID: ${chatId}`);
    });

    // Bot error handling
    bot.on('polling_error', (error) => {
      console.error(`Telegram polling error: ${error.message}`);
    });

    console.log('Telegram bot is ready to receive commands');
  } else {
    console.warn('Telegram bot token not found, notification service disabled');
  }
} catch (error) {
  console.error(`Error initializing Telegram bot: ${error}`);
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
  if (!bot) {
    console.warn('Telegram bot is not initialized, cannot send notification');
    return;
  }
  
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

    // Send to all admin chat IDs
    for (const chatId of ADMIN_CHAT_IDS) {
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
        .then(() => {
          console.log(`New appointment notification sent to admin ${chatId} for appointment ID: ${appointment.id}`);
        })
        .catch((error) => {
          console.error(`Failed to send notification to admin ${chatId}: ${error.message}`);
        });
    }
    
    console.log(`Attempted to send new appointment notification for ID: ${appointment.id}`);
  } catch (error) {
    console.error(`Error sending new appointment notification: ${error}`);
  }
};

/**
 * Send notification about appointment status update to admin
 */
export const notifyAppointmentUpdate = (appointment: Appointment): void => {
  if (!bot) {
    console.warn('Telegram bot is not initialized, cannot send notification');
    return;
  }
  
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

    // Send to all admin chat IDs
    for (const chatId of ADMIN_CHAT_IDS) {
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
        .then(() => {
          console.log(`Appointment update notification sent to admin ${chatId} for appointment ID: ${appointment.id}`);
        })
        .catch((error) => {
          console.error(`Failed to send update notification to admin ${chatId}: ${error.message}`);
        });
    }
    
    console.log(`Attempted to send appointment update notification for ID: ${appointment.id}`);
  } catch (error) {
    console.error(`Error sending appointment update notification: ${error}`);
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
  if (!bot) {
    console.warn('Telegram bot is not initialized, cannot send customer notification');
    return;
  }

  try {
    // Note: In a real implementation, you would store customer chat IDs in a database
    // and retrieve them here to send actual messages to customers
    console.log(`Customer notification would be sent for appointment ID: ${appointment.id} with status: ${appointment.status}`);
    
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
    // Example:
    // const customerChatId = await getCustomerChatId(appointment.phone);
    // if (customerChatId) {
    //   await bot.sendMessage(customerChatId, message, { parse_mode: 'Markdown' });
    // }
    
    console.log(`Customer notification template prepared for appointment ID: ${appointment.id}`);
  } catch (error) {
    console.error(`Error preparing customer notification: ${error}`);
  }
};

export default {
  notifyNewAppointment,
  notifyAppointmentUpdate,
  notifyCustomerAppointmentUpdate
};