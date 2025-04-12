import TelegramBot from 'node-telegram-bot-api';
import { db } from '../db';
import { contacts, messages, predefinedMessages, botSettings as botSettingsTable } from '@shared/schema';
import { eq, desc, and } from 'drizzle-orm';

// Telegram Bot işlemleri için servis
class TelegramBotService {
  private bot: TelegramBot | null = null;
  private isInitialized = false;

  // Bot başlatma fonksiyonu
  async initialize() {
    if (this.isInitialized) return;

    // Token kontrolü
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error('TELEGRAM_BOT_TOKEN environment variable is not set');
      return;
    }

    try {
      // Bot ayarlarını al
      const [settings] = await db.select().from(botSettingsTable);
      const isActive = settings?.isActive ?? true;

      if (isActive) {
        this.bot = new TelegramBot(token, { polling: true });
        this.setupEventHandlers();
        this.isInitialized = true;
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
      this.isInitialized = false;
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

    // Yeni mesaj geldiğinde
    this.bot.on('message', async (msg) => {
      try {
        const chatId = msg.chat.id.toString();
        const text = msg.text || '';
        const firstName = msg.from?.first_name || '';
        const lastName = msg.from?.last_name || '';
        const username = msg.from?.username || '';
        
        // Kişiyi veritabanında kontrol et, yoksa ekle
        const [existingContact] = await db.select().from(contacts)
          .where(eq(contacts.chatId, chatId));
        
        if (!existingContact) {
          // Yeni kişi ekle
          await db.insert(contacts).values({
            chatId,
            username,
            firstName,
            lastName,
            language: 'tr', // Varsayılan dil
            startDate: new Date(),
            lastMessageDate: new Date(),
            messagesCount: 1,
            isBlocked: false,
            tags: [],
            notes: '',
            stage: 'inquiry'
          });
        } else {
          // Mevcut kişiyi güncelle
          await db.update(contacts)
            .set({
              lastMessageDate: new Date(),
              messagesCount: (existingContact.messagesCount || 0) + 1,
            })
            .where(eq(contacts.chatId, chatId));
        }
        
        // Mesajı kaydet
        await db.insert(messages).values({
          chatId,
          text,
          date: new Date(),
          isIncoming: true,
          isRead: false
        });
        
        // Kişi engellenmişse cevap verme
        if (existingContact?.isBlocked) {
          return;
        }
        
        // Bot otomatik yanıt versin mi?
        const [botConfig] = await db.select().from(botSettingsTable);
        if (botConfig?.autoResponder) {
          // Otomatik yanıt gönderme işlemi burada yapılacak
          // Bu kısım Botun nasıl çalışması gerektiğine göre özelleştirilebilir
        }
      } catch (error) {
        console.error('Error handling incoming message:', error);
      }
    });
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
      
      // Kişinin son mesaj tarihini güncelle
      await db.update(contacts)
        .set({
          lastMessageDate: new Date(),
          messagesCount: {
            increment: 1
          }
        })
        .where(eq(contacts.chatId, chatId));
      
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
}

export const telegramBotService = new TelegramBotService();

// Servis başlangıçta otomatik başlatılır
telegramBotService.initialize().catch(console.error);