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
  // Bot nesnesini public yapıyoruz ama hala null olabilir
  bot: TelegramBot | null = null;
  
  // Sabit admin ID'leri (her zaman bildirim alması gereken kişiler)
  readonly primaryAdminIds: string[] = ['1062681151', '5631870985'];
  
  // Telegram chat ID'sinin doğru formatlı olduğunu kontrol et
  private validateChatId(chatId: any): string {
    // Eğer sayı ise string'e çevir
    if (typeof chatId === 'number') {
      return chatId.toString();
    }
    
    // Eğer string ise direkt kullan
    if (typeof chatId === 'string') {
      return chatId;
    }
    
    // Diğer tipleri kontrol et ve hata raporla
    console.error(`Invalid chat ID type: ${typeof chatId}, value: ${chatId}`);
    throw new Error(`Invalid chat ID: ${chatId}`);
  }
  
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
  // Bot başlatma fonksiyonu - geliştirilmiş hata yönetimi ve yeniden deneme mekanizması ile
  async initialize(retryCount = 0, maxRetries = 3): Promise<boolean> {
    console.log(`🚀 Telegram bot initialization starting (attempt ${retryCount + 1} of ${maxRetries + 1})...`);
    
    // Global bot örneği varsa onu kullan
    // @ts-ignore - global değişkeni kontrol et
    if (global.TELEGRAM_BOT_INSTANCE) {
      console.log('✅ Telegram bot is already initialized globally and will be reused');
      // @ts-ignore - global değişkeni atama
      this.bot = global.TELEGRAM_BOT_INSTANCE;
      this._isInitialized = true;
      return true;
    }
    
    if (this.isInitialized && this.bot) {
      console.log('✅ Telegram bot is already initialized and active, skipping initialization');
      return true;
    }
    
    // Zaten başlatılmış ama bot nesnesi yok veya hatalı ise resetleyelim
    if (this._isInitialized && (!this.bot || (this.bot.hasOwnProperty('isPolling') && !this.bot.isPolling()))) {
      console.log('⚠️ Bot marked as initialized but not polling or missing bot instance, resetting state...');
      this._isInitialized = false;
      if (this.bot) {
        try {
          await this.bot.stopPolling();
        } catch (e) {
          console.error('❌ Error while stopping polling on incomplete bot:', e);
        }
        this.bot = null;
      }
    }

    // Token kontrolü
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error('❌ TELEGRAM_BOT_TOKEN environment variable is not set');
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        console.log(`⏱️ Will retry in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.initialize(retryCount + 1, maxRetries);
      }
      return false;
    }
    
    console.log('✅ TELEGRAM_BOT_TOKEN found, proceeding with initialization');

    try {
      // Bot ayarlarını al
      console.log('📋 Fetching bot settings from database...');
      let isActive = true;
      
      try {
        const [settings] = await db.select().from(botSettingsTable);
        isActive = settings?.isActive ?? true;
        console.log('✅ Bot settings fetched, isActive:', isActive);
      } catch (dbError) {
        console.warn('⚠️ Could not fetch bot settings, using defaults:', dbError);
      }

      if (!isActive) {
        console.log('⏸️ Telegram bot is disabled in settings, skipping initialization');
        return false;
      }
      
      // Mevcut bot örneğini kapatmaya çalış
      if (this.bot) {
        try {
          console.log('🔄 Stopping existing bot instance before creating a new one...');
          await this.bot.stopPolling();
          console.log('✅ Successfully stopped existing bot instance');
        } catch (stopError) {
          console.error('❌ Error stopping existing bot:', stopError);
        }
      }

      // Yeni bot instance oluştur
      console.log('🔄 Creating Telegram bot instance with polling...');
      
      // Yeni bot oluştur - doğrudan polling özelliği ile
      try {
        this.bot = new TelegramBot(token, { polling: true });
        // @ts-ignore - global değişkeni atama
        global.TELEGRAM_BOT_INSTANCE = this.bot;
        console.log('✅ Telegram bot created with polling enabled and stored in global instance');
      } catch (createError) {
        console.error('❌ Error creating Telegram bot:', createError);
        
        if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`⏱️ Will retry in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.initialize(retryCount + 1, maxRetries);
        }
        
        return false;
      }
      
      // Event handler'ları kur
      try {
        console.log('🔄 Setting up event handlers...');
        this.setupEventHandlers();
        console.log('✅ Event handlers setup complete');
      } catch (handlerError) {
        console.error('❌ Error setting up event handlers:', handlerError);
      }

      // Zamanlanmış görevleri başlat
      try {
        console.log('🔄 Starting appointment checkers and scheduled tasks...');
        this.startAppointmentCheckers();
        this.scheduleDailySummary();
        console.log('✅ Scheduled tasks started successfully');
      } catch (schedulerError) {
        console.error('❌ Error starting scheduled tasks:', schedulerError);
      }

      // Başarılı bir şekilde başlatıldı
      this._isInitialized = true;
      console.log('✅ Telegram bot initialization completed successfully');
      
      // Bot'un working olduğunu doğrulayalım ve durumunu bildirelim
      try {
        const botInfo = await this.bot.getMe();
        console.log(`✅ Bot is working as: @${botInfo.username} (ID: ${botInfo.id})`);
        
        // Test amaçlı bir hatırlatıcı mesaj gönder
        try {
          const notificationMessage = `🔔 *MyHair Clinic Bot Aktif*\n\nBot başarıyla aktif edildi.\nBot Adı: @${botInfo.username}\nTarih: ${new Date().toLocaleString('tr-TR')}\n\nBildirimler bu hesaba gönderilecek.`;
          
          for (const adminId of this.primaryAdminIds) {
            try {
              await this.bot.sendMessage(adminId, notificationMessage, { parse_mode: 'Markdown' });
              console.log(`✅ Activation notification sent to admin ID: ${adminId}`);
            } catch (notifyError) {
              console.error(`❌ Failed to send activation notification to admin ID: ${adminId}`, notifyError);
            }
          }
        } catch (finalError) {
          console.error('❌ Error sending activation notifications:', finalError);
        }
      } catch (botInfoError) {
        console.error('❌ Error getting bot info, but continuing anyway:', botInfoError);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Critical error during Telegram bot initialization:', error);
      
      // Son deneme değilse tekrar dene
      if (retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`⏱️ Will retry initialization in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.initialize(retryCount + 1, maxRetries);
      }
      
      return false;
    }
  }

  // Bot'u durdurma fonksiyonu
  async stop() {
    if (!this.bot) return;
    
    try {
      await this.bot.stopPolling();
      this.bot = null;
      // @ts-ignore - Global örneği de temizle
      global.TELEGRAM_BOT_INSTANCE = null;
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
  
  // Operatöre kullanıcı adı veya chat ID ile mesaj gönder
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
  
  // Bot başlatılmasa bile sabit admin ID'lerine acil bildirim gönderme
  async sendDirectNotificationToAdmins(message: string): Promise<boolean> {
    console.log(`🆘 sendDirectNotificationToAdmins: Attempting to send direct message to primary admins`);
    
    if (!message || message.trim() === '') {
      console.error('❌ sendDirectNotificationToAdmins: Invalid message - Message cannot be empty');
      return false;
    }
    
    // TELEGRAM_BOT_TOKEN çevresel değişkeni kontrolü
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error('❌ sendDirectNotificationToAdmins: TELEGRAM_BOT_TOKEN environment variable is not set');
      return false;
    }
    
    try {
      // Yeni bir bot örneği oluştur (polling olmadan, sadece mesaj göndermek için)
      console.log(`🔄 sendDirectNotificationToAdmins: Creating temporary bot instance...`);
      const tempBot = new TelegramBot(token, { polling: false });
      
      let success = false;
      
      // Ana yöneticilere bildirim gönder
      for (const adminId of this.primaryAdminIds) {
        try {
          console.log(`🔄 sendDirectNotificationToAdmins: Sending to admin ID ${adminId}...`);
          await tempBot.sendMessage(adminId, message, { parse_mode: 'Markdown' });
          console.log(`✅ sendDirectNotificationToAdmins: Successfully sent to admin ID ${adminId}`);
          success = true;
        } catch (adminError) {
          console.error(`❌ sendDirectNotificationToAdmins: Error sending to admin ID ${adminId}:`, adminError);
        }
      }
      
      return success;
    } catch (error) {
      console.error(`❌ sendDirectNotificationToAdmins: Critical error:`, error);
      return false;
    }
  }
  
  // NOT: Sabit ana yönetici ID'leri sınıf başında tanımlandı: readonly primaryAdminIds: string[]
  
  // Operatörlere bildirim gönder - dışarıdan erişilebilir
  async sendOperatorNotification(message: string): Promise<boolean> {
    console.log(`🚀 sendOperatorNotification: Attempting to send message to all operators and admins`);
    
    try {
      if (!message || message.trim() === '') {
        console.error('❌ sendOperatorNotification: Invalid message - Message cannot be empty');
        return false;
      }
      
      // Bot başlatılmış mı kontrol et, başlatılmamışsa başlat
      if (!this._isInitialized || !this.bot) {
        console.warn(`⚠️ sendOperatorNotification: Bot is not initialized, attempting to initialize before sending notification...`);
        const initResult = await this.initialize();
        
        if (!initResult || !this._isInitialized || !this.bot) {
          console.error(`❌ sendOperatorNotification: Bot initialization failed, attempting direct approach...`);
          
          // Bot başlatılamasa bile doğrudan Telegram API'sini kullanarak mesaj göndermeyi dene
          return await this.sendDirectNotificationToAdmins(message);
        }
      }
      
      if (!this._isInitialized || !this.bot) {
        console.warn('⚠️ sendOperatorNotification: Bot is still not initialized, attempting direct approach...');
        return await this.sendDirectNotificationToAdmins(message);
      }
      
      console.log('📋 sendOperatorNotification: Getting bot settings to send notification to operators...');
      
      // Bot ayarlarını al ve operatör listesini getir
      let operators = [];
      try {
        const [botSettings] = await db.select().from(botSettingsTable);
        operators = botSettings?.operators || [];
        console.log(`✅ sendOperatorNotification: Found ${operators.length} operators in settings.`);
      } catch (dbError) {
        console.error(`❌ sendOperatorNotification: Error fetching bot settings: ${dbError}`);
        console.log(`⚠️ sendOperatorNotification: Continuing with only primary admin IDs...`);
      }
      
      // Aktif operatörler
      const activeOperators = operators.filter(op => op.isActive && op.telegramUsername);
      
      console.log(`📣 sendOperatorNotification: Will send to ${activeOperators.length} active operators and ${this.primaryAdminIds.length} primary admins`);
      console.log(`📣 Primary admin IDs: ${this.primaryAdminIds.join(', ')}`);
      
      let success = false;
      let failedOperators = [];
      let successfulOperators = [];
      
      // Önce normal operatörlere mesajı gönder
      for (const operator of activeOperators) {
        console.log(`🔄 sendOperatorNotification: Attempting to send message to operator: ${operator.name} (${operator.telegramUsername})`);
        
        try {
          const result = await this.sendMessageToOperator(operator.telegramUsername, message);
          
          if (result) {
            console.log(`✅ sendOperatorNotification: Successfully sent message to ${operator.telegramUsername}`);
            success = true;
            successfulOperators.push(operator.telegramUsername);
          } else {
            console.warn(`⚠️ sendOperatorNotification: Failed to send message to ${operator.telegramUsername}`);
            failedOperators.push(operator.telegramUsername);
          }
        } catch (operatorError) {
          console.error(`❌ sendOperatorNotification: Error sending to ${operator.telegramUsername}:`, operatorError);
          failedOperators.push(operator.telegramUsername);
        }
      }
      
      // Ardından ana yöneticilere gönder (kritik mesajlar her durumda onlara ulaşmalı)
      console.log(`🔴 sendOperatorNotification: Now sending to ${this.primaryAdminIds.length} primary admin IDs...`);
      
      for (const adminId of this.primaryAdminIds) {
        console.log(`🔄 sendOperatorNotification: Attempting to send message to primary admin ID: ${adminId}`);
        
        try {
          // Önce sendMessageToOperator ile deneyelim
          let result = await this.sendMessageToOperator(adminId, message);
          
          // Başarısız olursa doğrudan bot.sendMessage ile deneyelim
          if (!result && this.bot) {
            try {
              console.log(`⚠️ sendOperatorNotification: First attempt failed, trying direct bot.sendMessage to ${adminId}...`);
              await this.bot.sendMessage(adminId, message, { parse_mode: 'Markdown' });
              result = true;
              console.log(`✅ sendOperatorNotification: Direct bot.sendMessage succeeded to ${adminId}`);
            } catch (directError) {
              console.error(`❌ sendOperatorNotification: Direct bot.sendMessage failed to ${adminId}:`, directError);
            }
          }
          
          if (result) {
            console.log(`✅ sendOperatorNotification: Successfully sent message to primary admin ${adminId}`);
            success = true; // En az bir başarılı bildirim varsa true
            successfulOperators.push(`Admin ID: ${adminId}`);
          } else {
            console.warn(`⚠️ sendOperatorNotification: Failed to send message to primary admin ${adminId}`);
            failedOperators.push(`Admin ID: ${adminId}`);
          }
        } catch (adminError) {
          console.error(`❌ sendOperatorNotification: Error sending to primary admin ${adminId}:`, adminError);
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
          try {
            const chatId = this.validateChatId(adminId);
            console.log(`Attempting direct fallback message to admin ID ${chatId}...`);
            const result = await this.bot?.sendMessage(chatId, message, { parse_mode: 'Markdown' });
            console.log(`Direct fallback sent with message ID: ${result?.message_id}`);
            fallbackSuccess = true;
          } catch (directError) {
            console.error(`Failed direct fallback to admin ID ${adminId}:`, directError);
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