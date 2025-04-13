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
  
  // Sabit admin ID'leri (her zaman bildirim alması gereken kişiler)
  readonly primaryAdminIds: string[] = ['1062681151', '5631870985'];
  
  // isInitialized özelliğini dışarıdan erişilebilir yap
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  
  private _isInitialized = false;
  
  // Randevu detaylarını almak için metot
  async getAppointmentDetails(appointmentId: number): Promise<Appointment | null> {
    try {
      const [appointment] = await db.select().from(appointments).where(eq(appointments.id, appointmentId));
      return appointment || null;
    } catch (error) {
      console.error(`Error fetching appointment details: ${error}`);
      return null;
    }
  }
  
  // Bildirim gönderildi olarak işaretlemek için metot
  async markNotificationSent(appointmentId: number): Promise<boolean> {
    try {
      await db.update(appointments)
        .set({ 
          notificationSent: true,
          updatedAt: new Date()
        })
        .where(eq(appointments.id, appointmentId));
      return true;
    } catch (error) {
      console.error(`Error marking notification as sent: ${error}`);
      return false;
    }
  }

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
        const appointmentDate = appointment.appointmentTime ? new Date(`2000-01-01T${appointment.appointmentTime}`) : 
          (appointment.preferredDate ? new Date(appointment.preferredDate) : new Date());
        
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
  async sendMessageToOperator(username: string, message: string) {
    try {
      // Bot initialized check ve auto-initialize ekliyoruz
      if (!this._isInitialized || !this.bot) {
        console.warn(`Bot is not initialized, attempting to initialize before sending to @${username}...`);
        await this.initialize();
        
        if (!this._isInitialized || !this.bot) {
          console.error(`Bot initialization failed, cannot send message to @${username}`);
          return false;
        }
      }
      
      if (!username || username.trim() === '') {
        console.error('Invalid username: Username cannot be empty');
        return false;
      }
      
      // TELEGRAM_BOT_TOKEN çevresel değişkeni kontrolü
      if (!process.env.TELEGRAM_BOT_TOKEN) {
        console.error('TELEGRAM_BOT_TOKEN çevresel değişkeni ayarlanmamış. Bot API isteği yapılamaz.');
        return false;
      }
      
      // Kullanıcı adını düzenleyelim (@ işareti ekleyelim)
      let formattedUsername = username.trim();
      if (!formattedUsername.startsWith('@')) {
        formattedUsername = `@${formattedUsername}`;
      }
      
      console.log(`Attempting to send message to ${formattedUsername}...`);
      
      // İlk önce getChat ile chat ID almayı deneyelim
      try {
        console.log(`Getting chat ID for ${formattedUsername}...`);
        const chat = await this.bot.getChat(formattedUsername);
        
        if (chat && chat.id) {
          console.log(`Found chat ID for ${formattedUsername}: ${chat.id}`);
          
          try {
            const response = await this.bot.sendMessage(chat.id.toString(), message, { parse_mode: 'Markdown' });
            console.log(`Successfully sent message to ${formattedUsername} via chat ID ${chat.id}, message ID: ${response.message_id}`);
            return true;
          } catch (sendError: any) {
            console.error(`Error sending message to ${formattedUsername} using chat ID ${chat.id}:`, sendError?.message || 'Unknown error');
            throw sendError; // Re-throw for later handling
          }
        } else {
          console.warn(`No valid chat ID found for ${formattedUsername}`);
        }
      } catch (chatError: any) {
        // getChat başarısız olursa ve hata chat not found ise kullanıcının botu başlatması gerekiyor
        console.warn(`Could not get chat for ${formattedUsername}:`, chatError?.message || 'Unknown error');
        
        if (chatError?.message?.includes('chat not found')) {
          console.warn(`User ${formattedUsername} has not started a conversation with the bot yet.`);
          console.warn(`IMPORTANT: ${formattedUsername} must send /start to the @MyHairClinicBot to receive notifications.`);
        }
        
        // Son çare olarak direkt kullanıcı adına göndermeyi deneyelim
        try {
          console.log(`Attempting to send direct message to username: ${formattedUsername}`);
          const response = await this.bot.sendMessage(formattedUsername, message, { parse_mode: 'Markdown' });
          console.log(`Successfully sent direct message to ${formattedUsername}, message ID: ${response.message_id}`);
          return true;
        } catch (directError: any) {
          // Bu da başarısız olursa artık pes ediyoruz
          console.error(`Failed to send direct message to ${formattedUsername}:`, directError?.message || 'Unknown error');
          
          if (directError?.message?.includes('chat not found')) {
            console.warn(`OPERATOR NOTIFICATION FAILED: User ${formattedUsername} must first start a conversation with the bot.`);
            console.warn(`Ask the user to open Telegram app and send /start to @MyHairClinicBot`);
          } else if (directError?.message?.includes('bot was blocked')) {
            console.warn(`The user ${formattedUsername} has blocked the bot. They need to unblock @MyHairClinicBot.`);
          }
          
          return false;
        }
      }
      
      return false; // Default return if all attempts fail
    } catch (error: any) {
      console.error(`Overall error in sendMessageToOperator for ${username}:`, error?.message || 'Unknown error');
      if (error?.stack) {
        console.error(`Stack trace: ${error.stack}`);
      }
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
        const timeObj = appointment.appointmentTime ? new Date(`2000-01-01T${appointment.appointmentTime}`) : 
          (appointment.preferredDate ? new Date(appointment.preferredDate) : new Date());
        const hours = timeObj.getHours().toString().padStart(2, '0');
        const minutes = timeObj.getMinutes().toString().padStart(2, '0');
        
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
          const timeObj = appointment.appointmentTime ? new Date(`2000-01-01T${appointment.appointmentTime}`) : 
            (appointment.preferredDate ? new Date(appointment.preferredDate) : new Date());
          const hours = timeObj.getHours().toString().padStart(2, '0');
          const minutes = timeObj.getMinutes().toString().padStart(2, '0');
          
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
  
  // Chat ID ile direkt mesaj gönder
  async sendMessageByChatId(chatId: number, message: string) {
    try {
      // Bot initialized check ve auto-initialize ekliyoruz
      if (!this._isInitialized || !this.bot) {
        console.warn(`Bot is not initialized, attempting to initialize...`);
        await this.initialize();
        
        if (!this._isInitialized || !this.bot) {
          console.error(`Bot initialization failed, cannot send message to chat ID ${chatId}`);
          return false;
        }
      }
      
      if (!chatId) {
        console.error('Invalid chat ID: Chat ID cannot be empty or zero.');
        return false;
      }
      
      // TELEGRAM_BOT_TOKEN çevresel değişkeni kontrolü ekleyelim
      if (!process.env.TELEGRAM_BOT_TOKEN) {
        console.error('TELEGRAM_BOT_TOKEN çevresel değişkeni ayarlanmamış. Bot API isteği yapılamaz.');
        return false;
      }
      
      // Telegram API çağrısı yapıyoruz
      console.log(`Sending message directly to chat ID: ${chatId}`);
      try {
        const response = await this.bot.sendMessage(chatId.toString(), message, { parse_mode: 'Markdown' });
        console.log(`Successfully sent message to chat ID: ${chatId}, message ID: ${response.message_id}`);
        return true;
      } catch (sendError: any) {
        // Telegram API'den gelen hatalar için detaylı mesajlar
        console.error(`Error in sendMessage API call to chat ID ${chatId}:`, sendError?.message || 'Unknown error');
        
        if (sendError?.message?.includes('chat not found')) {
          console.warn(`Chat ID ${chatId} not found. This usually means the ID is incorrect or the user has not started a conversation with the bot.`);
          console.warn(`Suggest to the user that they should open Telegram and send "/start" to @MyHairClinicBot first.`);
        } else if (sendError?.message?.includes('bot was blocked')) {
          console.warn(`The user with chat ID ${chatId} has blocked the bot. They need to unblock @MyHairClinicBot.`);
        } else if (sendError?.message?.includes('ETELEGRAM')) {
          console.warn(`Telegram API error with TELEGRAM_BOT_TOKEN: ${sendError.message}`);
        }
        
        throw sendError; // Hatayı yukarı ilet
      }
    } catch (error: any) {
      console.error(`Overall error in sendMessageByChatId for ${chatId}:`, error?.message || 'Unknown error');
      // Detaylı stack trace için
      if (error?.stack) {
        console.error(`Stack trace: ${error.stack}`);
      }
      return false;
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
  
  // NOT: Sabit ana yönetici ID'leri sınıf başında tanımlandı: readonly primaryAdminIds: string[]
  
  // Operatörlere bildirim gönder - dışarıdan erişilebilir
  async sendOperatorNotification(message: string): Promise<boolean> {
    try {
      if (!message || message.trim() === '') {
        console.error('Invalid message: Message cannot be empty');
        return false;
      }
      
      if (!this._isInitialized || !this.bot) {
        console.warn('Bot is not initialized, cannot send notification. Check if the Telegram bot service is active.');
        return false;
      }
      
      console.log('Getting bot settings to send notification to operators...');
      // Bot ayarlarını al ve operatör listesini getir
      const [botSettings] = await db.select().from(botSettingsTable);
      const operators = botSettings?.operators || [];
      console.log(`Found ${operators.length} operators in settings.`);
      
      // Aktif operatörler ve ana yöneticileri birleştirelim
      const activeOperators = operators.filter(op => op.isActive && op.telegramUsername);
      
      console.log(`Adding ${this.primaryAdminIds.length} primary admin IDs to notification list: ${this.primaryAdminIds.join(', ')}`);
      
      let success = false;
      let failedOperators = [];
      let successfulOperators = [];
      
      // Önce normal operatörlere mesajı gönder
      for (const operator of activeOperators) {
        console.log(`Attempting to send message to operator: ${operator.name} (${operator.telegramUsername})`);
        const result = await this.sendMessageToOperator(operator.telegramUsername, message);
        
        if (result) {
          console.log(`✓ Successfully sent message to ${operator.telegramUsername}`);
          success = true;
          successfulOperators.push(operator.telegramUsername);
        } else {
          console.warn(`✗ Failed to send message to ${operator.telegramUsername}`);
          failedOperators.push(operator.telegramUsername);
        }
      }
      
      // Ardından ana yöneticilere gönder (kritik mesajlar her durumda onlara ulaşmalı)
      console.log(`Now sending notifications to ${this.primaryAdminIds.length} primary admin IDs...`);
      
      for (const adminId of this.primaryAdminIds) {
        console.log(`Attempting to send message to primary admin ID: ${adminId}`);
        const result = await this.sendMessageToOperator(adminId, message);
        
        if (result) {
          console.log(`✓ Successfully sent message to primary admin ${adminId}`);
          success = true; // En az bir başarılı bildirim varsa true
          successfulOperators.push(`Admin ID: ${adminId}`);
        } else {
          console.warn(`✗ Failed to send message to primary admin ${adminId}`);
          failedOperators.push(`Admin ID: ${adminId}`);
        }
      }
      
      // Özet bilgileri logla
      if (successfulOperators.length > 0) {
        console.log(`Successfully sent messages to ${successfulOperators.length} recipients: ${successfulOperators.join(', ')}`);
      }
      
      if (failedOperators.length > 0) {
        console.warn(`Failed to send message to ${failedOperators.length} recipients: ${failedOperators.join(', ')}`);
        console.warn('These operators may not have started a conversation with the bot yet. They need to send /start command to @MyHairClinicBot first.');
      }
      
      return success;
    } catch (error) {
      console.error('Error sending notification to operators:', error);
      
      // Son çare - ana yöneticilere doğrudan göndermeyi dene
      try {
        console.log('Fallback: Attempting to send notifications directly to primary admins...');
        let fallbackSuccess = false;
        
        for (const adminId of this.primaryAdminIds) {
          const result = await this.bot?.sendMessage(adminId, message, { parse_mode: 'Markdown' })
            .then(() => true)
            .catch(() => false);
            
          if (result) {
            console.log(`Fallback notification sent successfully to admin ${adminId}`);
            fallbackSuccess = true;
          }
        }
        
        return fallbackSuccess;
      } catch (fallbackError) {
        console.error('Even fallback notification failed:', fallbackError);
        return false;
      }
    }
  }
}

export const telegramBotService = new TelegramBotService();

// Servisi burada otomatik başlatmıyoruz, routes.ts içinde kontrollü şekilde başlatılacak