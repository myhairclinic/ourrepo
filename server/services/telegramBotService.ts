import TelegramBot from 'node-telegram-bot-api';
import { db } from '../db';
import { 
  telegramContacts as contacts, 
  telegramMessages as messages, 
  telegramPredefinedMessages as predefinedMessages, 
  telegramBotSettings as botSettingsTable,
  appointments,
  services
} from '@shared/schema';
import { eq, desc, and, gt, lte, gte } from 'drizzle-orm';
import { Appointment } from '@shared/schema';

// Telegram Bot işlemleri için servis
class TelegramBotService {
  private bot: TelegramBot | null = null;
  
  // isInitialized özelliğini dışarıdan erişilebilir yap
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  
  private _isInitialized = false;

  // Bot başlatma fonksiyonu
  async initialize() {
    console.log('Telegram bot initialization starting...');
    
    if (this.isInitialized) {
      console.log('Telegram bot is already initialized, skipping initialization');
      return;
    }

    // Token kontrolü
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error('TELEGRAM_BOT_TOKEN environment variable is not set');
      return;
    }
    console.log('TELEGRAM_BOT_TOKEN found, proceeding with initialization');

    try {
      // Bot ayarlarını al
      console.log('Fetching bot settings from database...');
      const [settings] = await db.select().from(botSettingsTable);
      const isActive = settings?.isActive ?? true;
      console.log('Bot settings fetched, isActive:', isActive);

      if (isActive) {
        console.log('Creating Telegram bot instance with polling...');
        this.bot = new TelegramBot(token, { polling: true });
        this.setupEventHandlers();
        this._isInitialized = true;
        console.log('Telegram bot initialized successfully');
      } else {
        console.log('Telegram bot is disabled in settings');
      }
    } catch (error) {
      console.error('Error initializing Telegram bot:', error);
    }
  }

  // Bot'u durdurma fonksiyonu
  async stop() {
    if (!this.bot) return;
    
    try {
      await this.bot.stopPolling();
      this.bot = null;
      this._isInitialized = false;
      console.log('Telegram bot stopped successfully');
    } catch (error) {
      console.error('Error stopping Telegram bot:', error);
    }
  }

  // Bot durumunu değiştir
  async toggleBotStatus(isActive: boolean) {
    try {
      // Veritabanında bot aktiflik durumunu güncelle
      await db.update(botSettingsTable)
        .set({ isActive })
        .where(eq(botSettingsTable.id, 1)); // Varsayılan olarak ilk kayıt kullanılır
      
      // Bot durumunu güncelle
      if (isActive) {
        if (!this.isInitialized) {
          await this.initialize();
        }
      } else {
        await this.stop();
      }
      
      return { success: true, isActive };
    } catch (error) {
      console.error('Error toggling bot status:', error);
      return { success: false, error: 'Bot durumu değiştirilemedi' };
    }
  }

  // Bot event handler'larını ayarla
  private setupEventHandlers() {
    if (!this.bot) return;

    // Personel komutları için
    this.bot.onText(/\/start/, async (msg) => {
      try {
        const chatId = msg.chat.id.toString();
        const firstName = msg.from?.first_name || '';
        
        // Sadece yetkili personele yanıt ver
        const [botSettings] = await db.select().from(botSettingsTable);
        const operators = botSettings?.operators || [];
        const username = msg.from?.username || '';
        
        const isAuthorized = operators.some(
          (op: { telegramUsername: string; isActive: boolean }) => 
            op.telegramUsername === username && op.isActive
        );
        
        if (isAuthorized) {
          await this.bot?.sendMessage(
            chatId,
            `Merhaba ${firstName}! MyHair Clinic randevu botu hizmetinizde.\n\nRandevu bildirimleri ve hatırlatmaları otomatik olarak gönderilecektir.`
          );
        } else {
          await this.bot?.sendMessage(
            chatId,
            `Merhaba ${firstName}! Bu bot sadece yetkili personel tarafından kullanılabilir.`
          );
        }
      } catch (error) {
        console.error('Error handling /start command:', error);
      }
    });
    
    // Yeni mesaj geldiğinde (sadece personelden gelen komutlar işlenecek)
    this.bot.on('message', async (msg) => {
      try {
        const chatId = msg.chat.id.toString();
        const text = msg.text || '';
        
        // Komut değilse işleme
        if (!text.startsWith('/')) return;
        
        // Sadece yetkili personele yanıt ver
        const [botSettings] = await db.select().from(botSettingsTable);
        const operators = botSettings?.operators || [];
        const username = msg.from?.username || '';
        
        const isAuthorized = operators.some(
          (op: { telegramUsername: string; isActive: boolean }) => 
            op.telegramUsername === username && op.isActive
        );
        
        if (!isAuthorized) return;
        
        // Komutları işle
        if (text === '/appointments') {
          await this.sendTodaysAppointments(chatId);
        } else if (text === '/help') {
          await this.bot?.sendMessage(
            chatId,
            `Kullanılabilir komutlar:\n\n/start - Botu başlat\n/appointments - Bugünkü randevuları görüntüle\n/help - Yardım mesajını görüntüle`
          );
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
    
    // Periyodik işlemler için zamanlayıcı başlat
    this.startAppointmentCheckers();
  }
  
  // Periyodik randevu kontrolü için zamanlayıcıları başlat
  private startAppointmentCheckers() {
    // Her 5 dakikada bir yaklaşan randevuları kontrol et
    setInterval(() => this.checkUpcomingAppointments(), 5 * 60 * 1000);
    
    // Her gün sabah 9'da günlük randevu özetini gönder
    this.scheduleDailySummary();
  }
  
  // Günlük randevu özeti için zamanlayıcı
  private scheduleDailySummary() {
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      9, // Saat 9'da
      0, // 0 dakika
      0
    );
    
    // Eğer şu an 9:00'dan sonraysa, yarın için planla
    if (now > scheduledTime) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const timeUntilExecution = scheduledTime.getTime() - now.getTime();
    
    setTimeout(() => {
      this.sendDailyAppointmentSummary();
      // Sonraki gün için yeniden planla
      this.scheduleDailySummary();
    }, timeUntilExecution);
  }
  
  // Yaklaşan randevuları kontrol et ve bildirimleri gönder
  private async checkUpcomingAppointments() {
    try {
      const [botSettings] = await db.select().from(botSettingsTable);
      if (!botSettings?.isActive || !botSettings?.notifications?.appointmentReminder) {
        return;
      }
      
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      
      // Bir saat içinde olan ve bildirim gönderilmemiş randevuları getir
      const upcomingAppointments = await db.select()
        .from(appointments)
        .where(
          and(
            gt(appointments.preferredDate, now.toISOString()),
            lte(appointments.preferredDate, oneHourLater.toISOString()),
            eq(appointments.status, 'confirmed')
          )
        );
      
      // Her yetkili personele randevu hatırlatmalarını gönder
      const operators = botSettings?.operators || [];
      for (const appointment of upcomingAppointments) {
        const service = await this.getServiceName(appointment.serviceId);
        const appointmentDate = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
        
        // Şablon mesajı hazırla
        const reminderMessage = this.formatAppointmentReminderMessage(
          appointment,
          service,
          appointmentDate
        );
        
        // Yetkili personele mesaj gönder
        for (const operator of operators) {
          if (operator.isActive && operator.telegramUsername) {
            await this.sendMessageToOperator(operator.telegramUsername, reminderMessage);
          }
        }
        
        // İşlenen randevuyu güncelle (notification_sent olarak işaretle)
        await db.update(appointments)
          .set({ status: 'notification_sent' })
          .where(eq(appointments.id, appointment.id));
      }
    } catch (error) {
      console.error('Error checking upcoming appointments:', error);
    }
  }
  
  // Operatöre kullanıcı adı ile mesaj gönder
  private async sendMessageToOperator(username: string, message: string) {
    try {
      if (!this.bot) {
        console.error(`Bot is not initialized, cannot send message to @${username}`);
        return false;
      }
      
      console.log(`Getting chat ID for @${username}...`);
      try {
        // Kullanıcı adına göre chat ID getir
        const chat = await this.bot.getChat(`@${username}`);
        console.log(`Got chat for @${username}:`, chat?.id ? 'Chat ID found' : 'No chat ID found');
        
        if (chat && chat.id) {
          console.log(`Sending message to @${username} with chat ID: ${chat.id}`);
          await this.bot.sendMessage(chat.id.toString(), message, { parse_mode: 'Markdown' });
          console.log(`Successfully sent message to @${username}`);
          return true;
        } else {
          console.warn(`No chat ID found for @${username}`);
          return false;
        }
      } catch (chatError) {
        // Eğer kullanıcı bulunamazsa veya bota mesaj atmamışsa direkt kullanıcı adıyla deneyelim
        console.log(`Error getting chat, trying direct message to @${username}...`);
        try {
          await this.bot.sendMessage(`@${username}`, message, { parse_mode: 'Markdown' });
          console.log(`Successfully sent direct message to @${username}`);
          return true;
        } catch (directError) {
          console.error(`Failed to send direct message to @${username}:`, directError);
          return false;
        }
      }
    } catch (error) {
      console.error(`Error in sendMessageToOperator for @${username}:`, error);
      return false;
    }
  }
  
  // Randevu hatırlatma mesajını formatlama
  private formatAppointmentReminderMessage(appointment: any, serviceName: string, date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `⏰ *RANDEVU HATIRLATMASI*

Aşağıdaki randevunuz 1 saat içinde başlayacaktır:

📆 Tarih: ${day}.${month}.${year}
⏰ Saat: ${hours}:${minutes}

👤 *Hasta Bilgileri*
İsim: ${appointment.name}
Telefon: ${appointment.phone}

💇 Hizmet: ${serviceName}`;
  }
  
  // Yeni randevu bildirim mesajını formatlama
  private formatNewAppointmentMessage(appointment: any, serviceName: string, date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `🔔 *YENİ RANDEVU BİLDİRİMİ*

📆 Tarih: ${day}.${month}.${year}
⏰ Saat: ${hours}:${minutes}

👤 *Hasta Bilgileri*
İsim: ${appointment.name}
Telefon: ${appointment.phone}
E-posta: ${appointment.email}

💇 Hizmet: ${serviceName}

📝 Ek Bilgiler: ${appointment.message || '-'}`;
  }
  
  // Servisin adını id'ye göre getir
  private async getServiceName(serviceId: number) {
    try {
      const [service] = await db.select().from(services)
        .where(eq(services.id, serviceId));
      
      return service ? service.titleTR : 'Bilinmeyen Hizmet';
    } catch (error) {
      console.error('Error getting service name:', error);
      return 'Bilinmeyen Hizmet';
    }
  }
  
  // Bugünkü randevuları görüntüle
  private async sendTodaysAppointments(chatId: string) {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();
      
      const todaysAppointments = await db.select()
        .from(appointments)
        .where(
          and(
            gte(appointments.preferredDate, startOfDay),
            lte(appointments.preferredDate, endOfDay)
          )
        );
      
      if (todaysAppointments.length === 0) {
        await this.bot?.sendMessage(chatId, "Bugüne ait randevu bulunmamaktadır.");
        return;
      }
      
      let message = "*BUGÜNKÜ RANDEVULAR*\n\n";
      
      for (const appointment of todaysAppointments) {
        const service = await this.getServiceName(appointment.serviceId);
        const appointmentTime = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
        const hours = appointmentTime.getHours().toString().padStart(2, '0');
        const minutes = appointmentTime.getMinutes().toString().padStart(2, '0');
        
        message += `⏰ *${hours}:${minutes}* - ${appointment.name}\n`;
        message += `📞 ${appointment.phone}\n`;
        message += `💇 ${service}\n`;
        message += `🔄 Durum: ${this.getStatusText(appointment.status)}\n\n`;
      }
      
      await this.bot?.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error sending today\'s appointments:', error);
      await this.bot?.sendMessage(chatId, "Randevular alınırken bir hata oluştu.");
    }
  }
  
  // Durum metnini formatla
  private getStatusText(status: string) {
    switch (status) {
      case 'pending': return '⏳ Beklemede';
      case 'confirmed': return '✅ Onaylandı';
      case 'cancelled': return '❌ İptal Edildi';
      case 'completed': return '✓ Tamamlandı';
      case 'notification_sent': return '🔔 Hatırlatma Gönderildi';
      default: return status;
    }
  }
  
  // Günlük randevu özetini gönder
  private async sendDailyAppointmentSummary() {
    try {
      const [botSettings] = await db.select().from(botSettingsTable);
      if (!botSettings?.isActive || !botSettings?.notifications?.dailySummary) {
        return;
      }
      
      // Yarınki randevuları getir
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()).toISOString();
      const endOfTomorrow = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 23, 59, 59).toISOString();
      
      const tomorrowsAppointments = await db.select()
        .from(appointments)
        .where(
          and(
            gte(appointments.preferredDate, startOfTomorrow),
            lte(appointments.preferredDate, endOfTomorrow),
            eq(appointments.status, 'confirmed')
          )
        );
      
      // Mesajı hazırla
      const day = tomorrow.getDate().toString().padStart(2, '0');
      const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
      const year = tomorrow.getFullYear();
      
      let message = `*${day}.${month}.${year} TARİHLİ RANDEVU ÖZETİ*\n\n`;
      
      if (tomorrowsAppointments.length === 0) {
        message += "Yarın için planlanmış randevu bulunmamaktadır.";
      } else {
        message += `Toplam ${tomorrowsAppointments.length} randevu bulunmaktadır:\n\n`;
        
        // Randevuları saate göre sırala
        tomorrowsAppointments.sort((a, b) => {
          const dateA = a.preferredDate ? new Date(a.preferredDate) : new Date();
          const dateB = b.preferredDate ? new Date(b.preferredDate) : new Date();
          return dateA.getTime() - dateB.getTime();
        });
        
        for (const appointment of tomorrowsAppointments) {
          const service = await this.getServiceName(appointment.serviceId);
          const appointmentTime = appointment.preferredDate ? new Date(appointment.preferredDate) : new Date();
          const hours = appointmentTime.getHours().toString().padStart(2, '0');
          const minutes = appointmentTime.getMinutes().toString().padStart(2, '0');
          
          message += `⏰ *${hours}:${minutes}* - ${appointment.name}\n`;
          message += `📞 ${appointment.phone}\n`;
          message += `💇 ${service}\n\n`;
        }
      }
      
      // Yetkili personele mesaj gönder
      const operators = botSettings?.operators || [];
      for (const operator of operators) {
        if (operator.isActive && operator.telegramUsername) {
          await this.sendMessageToOperator(operator.telegramUsername, message);
        }
      }
    } catch (error) {
      console.error('Error sending daily appointment summary:', error);
    }
  }

  // Tüm kişileri getir
  async getContacts() {
    try {
      return await db.select().from(contacts).orderBy(desc(contacts.lastMessageDate));
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  // Belirli bir kişinin mesajlarını getir
  async getMessages(chatId: string) {
    try {
      return await db.select().from(messages)
        .where(eq(messages.chatId, chatId))
        .orderBy(messages.date);
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  // Mesaj gönder
  async sendMessage(chatId: string, text: string) {
    if (!this.bot) {
      return { success: false, error: 'Bot is not initialized' };
    }

    try {
      // Telegram API üzerinden mesaj gönder
      await this.bot.sendMessage(chatId, text);
      
      // Mesajı veritabanına kaydet
      await db.insert(messages).values({
        chatId,
        text,
        date: new Date(),
        isIncoming: false,
        isRead: true
      });
      
      // Kişinin son mesaj tarihini ve mesaj sayısını güncelle
      const contact = await db.select().from(contacts)
        .where(eq(contacts.chatId, chatId))
        .then(rows => rows[0]);
        
      if (contact) {
        await db.update(contacts)
          .set({
            lastMessageDate: new Date(),
            messagesCount: (contact.messagesCount || 0) + 1
          })
          .where(eq(contacts.chatId, chatId));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error: 'Message could not be sent' };
    }
  }

  // Hazır yanıtları getir
  async getPredefinedMessages() {
    try {
      return await db.select().from(predefinedMessages);
    } catch (error) {
      console.error('Error getting predefined messages:', error);
      return [];
    }
  }

  // Hazır yanıt ekle/güncelle
  async savePredefinedMessage(message: any) {
    try {
      if (message.id) {
        // Güncelleme
        await db.update(predefinedMessages)
          .set({
            title: message.title,
            text: message.text,
            language: message.language,
            tags: message.tags
          })
          .where(eq(predefinedMessages.id, message.id));
      } else {
        // Yeni ekleme
        await db.insert(predefinedMessages).values({
          title: message.title,
          text: message.text,
          language: message.language,
          tags: message.tags
        });
      }
      return { success: true };
    } catch (error) {
      console.error('Error saving predefined message:', error);
      return { success: false, error: 'Message could not be saved' };
    }
  }

  // Hazır yanıt sil
  async deletePredefinedMessage(id: number) {
    try {
      await db.delete(predefinedMessages).where(eq(predefinedMessages.id, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting predefined message:', error);
      return { success: false, error: 'Message could not be deleted' };
    }
  }

  // Kişi engelleme/engeli kaldırma
  async toggleContactBlock(chatId: string, isBlocked: boolean) {
    try {
      await db.update(contacts)
        .set({ isBlocked })
        .where(eq(contacts.chatId, chatId));
      return { success: true, isBlocked };
    } catch (error) {
      console.error('Error toggling contact block status:', error);
      return { success: false, error: 'Contact block status could not be updated' };
    }
  }

  // Kişi notlarını güncelle
  async updateContactNotes(chatId: string, notes: string) {
    try {
      await db.update(contacts)
        .set({ notes })
        .where(eq(contacts.chatId, chatId));
      return { success: true };
    } catch (error) {
      console.error('Error updating contact notes:', error);
      return { success: false, error: 'Contact notes could not be updated' };
    }
  }

  // Kişi etiketlerini güncelle
  async updateContactTags(chatId: string, tags: string[]) {
    try {
      await db.update(contacts)
        .set({ tags })
        .where(eq(contacts.chatId, chatId));
      return { success: true, tags };
    } catch (error) {
      console.error('Error updating contact tags:', error);
      return { success: false, error: 'Contact tags could not be updated' };
    }
  }

  // Bot ayarlarını getir
  async getBotSettings() {
    try {
      const [settings] = await db.select().from(botSettingsTable);
      return settings || {};
    } catch (error) {
      console.error('Error getting bot settings:', error);
      return {};
    }
  }

  // Bot ayarlarını güncelle
  async updateBotSettings(settings: any) {
    try {
      const { isActive, ...restSettings } = settings;
      
      // Önce ayarları güncelle
      await db.update(botSettingsTable)
        .set(restSettings)
        .where(eq(botSettingsTable.id, 1));
      
      // Aktiflik durumunu ayrıca ele al
      if (typeof isActive !== 'undefined') {
        await this.toggleBotStatus(isActive);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating bot settings:', error);
      return { success: false, error: 'Bot settings could not be updated' };
    }
  }
  
  // Servis adını dışarıdan erişilebilir yap
  async getServiceNamePublic(serviceId: number): Promise<string> {
    return this.getServiceName(serviceId);
  }
  
  // Formatlı randevu mesajı oluştur - dışarıdan erişilebilir
  formatAppointmentMessage(appointment: any, serviceName: string, date: Date): string {
    return this.formatNewAppointmentMessage(appointment, serviceName, date);
  }
  
  // Operatörlere bildirim gönder - dışarıdan erişilebilir
  async sendOperatorNotification(message: string): Promise<boolean> {
    try {
      if (!this._isInitialized || !this.bot) {
        console.warn('Bot is not initialized, cannot send notification');
        return false;
      }
      
      console.log('Getting bot settings to send notification to operators...');
      // Bot ayarlarını al ve operatör listesini getir
      const [botSettings] = await db.select().from(botSettingsTable);
      const operators = botSettings?.operators || [];
      console.log('Found operators:', JSON.stringify(operators));
      
      let success = false;
      // Tüm aktif operatörlere mesajı gönder
      for (const operator of operators) {
        if (operator.isActive && operator.telegramUsername) {
          console.log(`Sending message to operator: ${operator.telegramUsername}`);
          const result = await this.sendMessageToOperator(operator.telegramUsername, message);
          console.log(`Result of sending to ${operator.telegramUsername}:`, result);
          if (result) success = true;
        } else {
          console.log(`Skipping inactive or missing username operator:`, operator);
        }
      }
      
      if (!operators.length) {
        console.warn('No operators found in settings! Add operators to bot settings.');
      }
      
      return success;
    } catch (error) {
      console.error('Error sending notification to operators:', error);
      return false;
    }
  }
}

export const telegramBotService = new TelegramBotService();

// Servisi burada otomatik başlatmıyoruz, routes.ts içinde kontrollü şekilde başlatılacak