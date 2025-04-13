import { Appointment, Patient } from '@shared/schema';
import { telegramBotService } from './telegramBotService';
import { storage } from '../storage';

// Test bildirimleri için Telegram servisi
const telegramTestService = {
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
 * This notification is sent when a new appointment is created, BEFORE it's confirmed
 */
const notifyNewAppointment = (appointment: Appointment): void => {
  try {
    console.log("🔔🔔🔔 YENİ RANDEVU BİLDİRİMİ BAŞLATIYOR 🔔🔔🔔");
    console.log(`📊 RANDEVU BİLGİLERİ: ID=${appointment.id}, İsim=${appointment.name}, Telefon=${appointment.phone}`);
    
    // Bildirimi göndermeden önce bot servisinin çalışır durumda olduğundan emin olalım
    const serviceId = appointment.serviceId;
    const appointmentDate = appointment.preferredDate 
      ? new Date(appointment.preferredDate)
      : new Date(); // Tercih edilen tarih yoksa bugün
    
    // Saati ayarla, eğer appointmentTime varsa
    if (appointment.appointmentTime) {
      const [hours, minutes] = appointment.appointmentTime.split(':').map(Number);
      appointmentDate.setHours(hours, minutes);
    }
    
    if (!telegramBotService.isInitialized) {
      console.log("⚠️ Telegram bot servisi henüz başlatılmamış, yeniden başlatılıyor...");
      telegramBotService.initialize()
        .then(() => {
          console.log("✅ Telegram bot servisi başarıyla başlatıldı, bildirim gönderiliyor...");
          // Tüm operatörlere randevu bildirimi gönderme
          sendNewAppointmentNotification(appointment, serviceId, appointmentDate)
            .then(() => console.log(`✅ Randevu bildirimi süreci tamamlandı, ID: ${appointment.id}`))
            .catch(error => console.error(`❌ Bildirim gönderiminde kritik hata: ${error}`));
        })
        .catch(error => {
          console.error(`❌ Bot servisi başlatılamadı: ${error}`);
          // Bot başlatılamasa bile bildirimi göndermeyi deneyelim
          try {
            console.log("⚠️ Bot başlatılamadı, yine de bildirim gönderilmeye çalışılıyor...");
            
            sendNewAppointmentNotification(appointment, serviceId, appointmentDate)
              .then(() => console.log(`✅ Acil durum bildirimi tamamlandı, ID: ${appointment.id}`))
              .catch(error => console.error(`❌ Acil durum bildirimi de başarısız: ${error}`));
          } catch (finalError) {
            console.error(`❌❌❌ Tüm bildirim denemeleri başarısız: ${finalError}`);
          }
        });
      return;
    }
    
    console.log("✅ Telegram bot servisi aktif durumda, bildirim gönderiliyor...");
    // Bot zaten çalışır durumda, bildirimi doğrudan gönder
    sendNewAppointmentNotification(appointment, serviceId, appointmentDate)
      .then(() => console.log(`✅ Standart bildirim süreci tamamlandı, ID: ${appointment.id}`))
      .catch(error => {
        console.error(`❌ Standart bildirim sürecinde hata: ${error}`);
        
        // Son çare olarak doğrudan mesaj göndermeyi deneyelim
        if (telegramBotService.bot) {
          console.log("⚠️ Standart yöntem başarısız, doğrudan mesaj göndermeye çalışılıyor...");
          const message = `❗️ RANDEVU BİLDİRİMİ ❗️\n\nİsim: ${appointment.name}\nTelefon: ${appointment.phone}\n\nAcilen admin paneline giriş yapın!`;
          
          // Sabit admin ID'lerine gönderme
          const primaryAdminIds = telegramBotService.primaryAdminIds || ['1062681151', '5631870985'];
          
          primaryAdminIds.forEach(adminId => {
            if (telegramBotService.bot) {
              telegramBotService.bot.sendMessage(adminId, message, { parse_mode: 'Markdown' })
                .then(() => console.log(`✅ Manuel mesaj gönderildi, Admin ID: ${adminId}`))
                .catch(err => console.error(`❌ Manuel mesaj gönderilemedi, Admin ID: ${adminId}`, err));
            }
          });
        }
      });
    
  } catch (error: any) {
    console.error(`❌ Kritik hata: Randevu bildirimi gönderilemedi: ${error.message}`);
    console.error("Hata detayları:", error);
    
    // Son çare olarak doğrudan mesaj göndermeyi deneyelim
    try {
      console.log("⚠️ Son çare: Kritik manuel bildirim gönderiliyor...");
      if (telegramBotService.bot) {
        const message = `❗️ KRİTİK DURUM: YENİ RANDEVU ❗️\n\nİsim: ${appointment.name}\nTelefon: ${appointment.phone}\n\nAcilen admin paneline giriş yapın!`;
        
        // Sabit admin ID'lerine gönderme
        const primaryAdminIds = telegramBotService.primaryAdminIds || ['1062681151', '5631870985'];
        
        primaryAdminIds.forEach(adminId => {
          if (telegramBotService.bot) {
            telegramBotService.bot.sendMessage(adminId, message, { parse_mode: 'Markdown' })
              .then(() => console.log(`✅ Kritik mesaj başarıyla gönderildi, Admin ID: ${adminId}`))
              .catch(err => console.error(`❌ Kritik mesaj gönderilemedi, Admin ID: ${adminId}`, err));
          }
        });
      }
    } catch (finalError) {
      console.error(`❌ Tüm bildirim yöntemleri başarısız: ${finalError}`);
    }
  }
};

/**
 * Helper function to send new appointment notification
 */
const sendNewAppointmentNotification = async (appointment: Appointment, serviceId: number, appointmentDate: Date): Promise<void> => {
  try {
    // En üstte bu bildirim için çok ayrıntılı log ekleyelim
    console.log("🚨🚨🚨 YENİ BİR RANDEVU BİLDİRİMİ GÖNDERİLİYOR 🚨🚨🚨");
    console.log(`📋 Randevu Detayları: ID=${appointment.id}, Müşteri=${appointment.name}, Telefon=${appointment.phone}`);
    
    // Servis adını al
    const serviceName = await telegramBotService.getServiceNamePublic(serviceId);
    console.log(`✅ Servis adı başarıyla bulundu: ${serviceName}`);
    
    // Özel bir mesaj formatı oluştur - YENİ RANDEVU vurgusu ile
    const message = 
      `🔴 *YENİ RANDEVU KAYDI* 🔴\n\n` +
      `⚠️⚠️ *ONAY BEKLİYOR* ⚠️⚠️\n\n` +
      `👤 *Hasta Bilgileri*\n` +
      `İsim: ${appointment.name}\n` +
      `Telefon: ${appointment.phone}\n` +
      `E-posta: ${appointment.email}\n\n` +
      `💇 *Randevu Detayları*\n` +
      `Hizmet: ${serviceName}\n` +
      `Tercih Edilen Tarih: ${appointment.preferredDate ? new Date(appointment.preferredDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}\n\n` +
      `💬 *Notlar*\n` +
      `${appointment.message || 'Not belirtilmemiş'}\n\n` +
      `👉 *Bu randevu onay bekliyor*\n` +
      `Randevu onaylamak ve saat belirlemek için admin paneline giriş yapın: https://myhair-clinic.replit.app/admin/dashboard`;
    
    console.log("✍️ Özel yeni randevu mesajı oluşturuldu, operatörlere gönderiliyor");
    
    // Manuel gönderimleri tanımla - telegramBotService'in primaryAdminIds özelliğini kullanacak
    const primaryAdminIds = telegramBotService.primaryAdminIds || ['1062681151', '5631870985']; 
    console.log(`ℹ️ Bildirim gönderilecek ana yöneticiler: ${primaryAdminIds.join(', ')}`);
    
    try {
      console.log(`🔄 Birincil bildirim yöntemi: sendOperatorNotification deneniyor...`);
      // Önce normal operatör bildirimi yöntemini dene
      const result = await telegramBotService.sendOperatorNotification(message);
      
      if (result) {
        console.log(`✅ Operatör bildirimi başarıyla gönderildi, ID: ${appointment.id}`);
      } else {
        console.warn(`⚠️ Operatör bildirimi başarısız oldu, doğrudan gönderim deneniyor...`);
        
        // Bot servisi yeniden başlatmayı dene
        console.log(`🔄 Bot servisi yeniden başlatılıyor...`);
        await telegramBotService.initialize();
        
        // DOĞRUDAN GÖNDER
        console.log(`📨 Doğrudan ana yöneticilere manuel bildirim gönderiliyor...`);
        let manualSuccess = false;
        
        // Her ana yöneticiye doğrudan mesaj göndermeyi dene
        for (const adminId of primaryAdminIds) {
          try {
            console.log(`🔄 Admin ID ${adminId}'e manuel mesaj gönderimi deneniyor...`);
            
            if (telegramBotService.bot) {
              await telegramBotService.bot.sendMessage(adminId, message, { parse_mode: 'Markdown' });
              console.log(`✅ Admin ID ${adminId}'e manuel mesaj başarıyla gönderildi!`);
              manualSuccess = true;
            } else {
              console.error(`⛔ Bot nesnesi bulunamadı, admin ID ${adminId}'e mesaj gönderilemiyor`);
            }
          } catch (err) {
            console.error(`⛔ Admin ID ${adminId}'e manuel mesaj gönderilirken hata oluştu:`, err);
          }
        }
        
        if (manualSuccess) {
          console.log(`✅ En az bir ana yöneticiye başarıyla bildirim gönderildi`);
        } else {
          console.error(`⛔ Hiçbir yöneticiye bildirim gönderilemedi!`);
        }
      }
    } catch (error) {
      console.error(`⛔ Bildirim gönderiminde hata:`, error);
      
      // Son çare - çok basit fallback mesaj
      console.log(`🔄 Acil durum planı: Basit mesaj ile yeniden deneniyor...`);
      const fallbackMessage = 
        `❗️ *YENİ BİR RANDEVU VAR* ❗️\n\n` +
        `İsim: ${appointment.name}\n` +
        `Telefon: ${appointment.phone}\n` +
        `Admin paneline giriş yapın!`;
      
      // Her ana yöneticiye acil durum mesajını göndermeyi dene
      for (const adminId of primaryAdminIds) {
        try {
          if (telegramBotService.bot) {
            await telegramBotService.bot.sendMessage(adminId, fallbackMessage, { parse_mode: 'Markdown' });
            console.log(`✅ Admin ID ${adminId}'e acil durum mesajı gönderildi`);
          }
        } catch (err) {
          console.error(`⛔ Admin ID ${adminId}'e acil durum mesajı gönderilirken hata:`, err);
        }
      }
    }
    
    console.log(`📞 YENİ RANDEVU BİLDİRİM SÜRECİ TAMAMLANDI - ID: ${appointment.id} 📞`);
  } catch (error) {
    console.error(`⛔ Yeni randevu bildirim işleminde kritik hata:`, error);
  }
};
/**
 * Send notification about appointment status update to admin
 */
const notifyAppointmentUpdate = (appointment: Appointment): void => {
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
const notifyCustomerAppointmentUpdate = async (appointment: Appointment): Promise<void> => {
  // Bu fonksiyon müşteri ile iletişim içermediği için artık kullanılmıyor
  console.log(`Customer notification is disabled. No message sent for appointment ID: ${appointment.id}`);
};

/**
 * Send notification about appointment confirmation with specific time
 */
const notifyAppointmentConfirmation = async (appointment: Appointment, appointmentTime: string): Promise<void> => {
  try {
    console.log(`-------- RANDEVU ONAY BİLDİRİMİ BAŞLADI --------`);
    console.log(`Randevu ID: ${appointment.id}, İsim: ${appointment.name}, Telefon: ${appointment.phone}`);

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

      console.log(`----------- RANDEVU ONAYLAMA BİLDİRİMİ GÖNDERİLİYOR -----------`);
      console.log(`Randevu ID: ${appointment.id}`);
      console.log(`Hasta: ${appointment.name}, Telefon: ${appointment.phone}`);
      console.log(`Hizmet: ${serviceName}, Tarih: ${formattedDate}, Saat: ${appointmentTime}`);
      
      // Tüm operatörlere bildirim gönder
      const result = await telegramBotService.sendOperatorNotification(message);
      
      if (result) {
        console.log(`✓ Appointment confirmation notification sent successfully for ID: ${appointment.id}`);
      } else {
        console.warn(`⚠️ Failed to send confirmation notification to some operators for appointment ID: ${appointment.id}`);
        
        // Tekrar deneme yap - doğrudan primary admin ID'lerine gönder
        console.log(`Trying again with direct message to primary admin IDs...`);
        
        try {
          console.log(`⚙️ Forcing Telegram bot service to reinitialize before retry...`);
          await telegramBotService.initialize();
          
          console.log(`⚙️ Sending critical notification directly to primary admin IDs...`);
          const directResult = await telegramBotService.sendOperatorNotification(message);
          
          if (directResult) {
            console.log(`✓ Second attempt successful - message delivered to primary admins`);
          } else {
            console.error(`✗ Second attempt also failed to deliver the message to primary admins`);
            
            // Son çare - doğrudan doğruya validateChatId yardımıyla deneme
            console.log(`🔄 Last resort: Using manual direct message to each admin ID...`);
            
            // Admin ID listesi
            const primaryAdminIds = ['1062681151', '5631870985']; // Ana yöneticilerin sabit ID'leri
            let manualSuccess = false;
            
            for (const adminId of primaryAdminIds) {
              try {
                if (telegramBotService.bot) {
                  // Chat ID'yi doğrula
                  const validChatId = adminId.trim();
                  console.log(`💬 Sending manual message to admin ID: ${validChatId}`);
                  
                  // Telegram Bot API'yi doğrudan çağır
                  await telegramBotService.bot.sendMessage(validChatId, message, { parse_mode: 'Markdown' });
                  console.log(`✓ Manual message sent successfully to admin ${validChatId}`);
                  manualSuccess = true;
                  
                  // Mesaj iletildi, özel bir işlem yapmaya gerek yok
                }
              } catch (manualError) {
                console.error(`Failed in manual message to admin ${adminId}:`, manualError);
              }
            }
            
            if (manualSuccess) {
              console.log(`✓ Last resort manual messages succeeded for at least one admin`);
            } else {
              console.error(`✗ All manual messaging attempts failed - we've exhausted all options`);
            }
          }
        } catch (retryError) {
          console.error(`Error during second attempt at notification:`, retryError);
        }
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
const scheduleAppointmentReminder = async (appointmentId: number, reminderTime: Date): Promise<void> => {
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
const notifyPatientCreation = (patient: Patient, appointment: Appointment): void => {
  try {
    console.log(`-------- YENİ HASTA KAYDI BİLDİRİMİ BAŞLADI --------`);
    console.log(`Hasta ID: ${patient.id}, İsim: ${patient.fullName}, Telefon: ${patient.phone}`);
    
    // telegramBotService başlatılmış mı kontrol et
    if (!telegramBotService.isInitialized) {
      console.log('Telegram bot is not initialized, initializing now...');
      telegramBotService.initialize()
        .then(() => {
          if (!telegramBotService.isInitialized) {
            console.error('Telegram bot initialization failed, cannot send patient creation notification');
            return;
          }
          // Bot başlatıldıktan sonra bildirim göndermeye devam et
          sendPatientNotification();
        })
        .catch(error => {
          console.error('Error initializing Telegram bot:', error);
          
          // Yine de normal yollarla bildirim göndermeyi dene
          try {
            // Ana yöneticilere direkt bildirim gönder
            console.log('Failed to initialize bot, attempting manual notification to primary admins...');
            
            const message = `
✅ *YENİ HASTA KAYDEDİLDİ - ACİL BİLDİRİM*

Onaylanan randevudan otomatik olarak hasta kaydı oluşturuldu.

👤 *Hasta Bilgileri*
📝 *İsim:* ${patient.fullName}
📧 *E-posta:* ${patient.email || 'Belirtilmemiş'}
📱 *Telefon:* ${patient.phone}

🔷 *Hasta ID:* ${patient.id}
🔷 *Randevu ID:* ${appointment.id}

⚠️ UYARI: Bu acil bildirimdir. Normal bildirim sistemi çalışmadığında gönderilir. Lütfen hasta kaydını kontrol edin.
`;
            
            // Ana yöneticilere doğrudan ulaş
            const primaryAdminIds = ['1062681151', '5631870985']; // Sabit ana yönetici ID'leri
            
            if (telegramBotService.bot) {
              primaryAdminIds.forEach(adminId => {
                try {
                  telegramBotService.bot?.sendMessage(adminId, message, { parse_mode: 'Markdown' })
                    .then(() => console.log(`Manual emergency message sent to admin ${adminId}`))
                    .catch(err => console.error(`Failed to send emergency message to admin ${adminId}:`, err));
                } catch (manualError) {
                  console.error(`Error in manual notification to admin ${adminId}:`, manualError);
                }
              });
            }
          } catch (manualError) {
            console.error('All manual notification attempts failed:', manualError);
          }
        });
      return;
    }
    
    // Bildirim gönderme işlemi
    sendPatientNotification();
    
    // İç fonksiyon - bildirim gönderme işlemini gerçekleştirir
    function sendPatientNotification() {
      console.log(`Sending patient creation notification for ID: ${patient.id}`);
      
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
    
    } // end of sendPatientNotification function
  } catch (error: any) {
    console.error(`Error sending patient creation notification: ${error.message}`);
  }
};

// Tüm bildirim fonksiyonlarını telegramService nesnesine ekle
// Tüm servisleri birleştirerek dışa aktar
export const telegramService = {
  ...telegramTestService,
  notifyNewAppointment,
  notifyAppointmentUpdate,
  notifyCustomerAppointmentUpdate, 
  notifyAppointmentConfirmation,
  scheduleAppointmentReminder,
  notifyPatientCreation 
};