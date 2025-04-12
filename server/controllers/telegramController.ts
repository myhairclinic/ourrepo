import { Request, Response } from 'express';
import { telegramService } from '../services/telegramService';

export const telegramController = {
  // Test notification gönderme
  async sendTestNotification(req: Request, res: Response) {
    try {
      const { type, chatId } = req.body;
      
      if (!type || !chatId) {
        return res.status(400).json({ success: false, message: 'Type ve chatId alanları gereklidir' });
      }
      
      // Log
      console.log(`Test notification request - Type: ${type}, Chat ID: ${chatId}`);
      
      let result;
      
      // Bildirim tipine göre işlem yap
      switch (type) {
        case 'new_appointment':
          result = await telegramService.sendNewAppointmentTestNotification(chatId);
          break;
        case 'appointment_reminder':
          result = await telegramService.sendAppointmentReminderTestNotification(chatId);
          break;
        case 'daily_summary':
          result = await telegramService.sendDailySummaryTestNotification(chatId);
          break;
        default:
          return res.status(400).json({ success: false, message: 'Geçersiz bildirim tipi' });
      }
      
      if (result.success) {
        return res.status(200).json({ success: true, type, message: 'Test bildirimi başarıyla gönderildi' });
      } else {
        return res.status(500).json({ success: false, message: result.error || 'Test bildirimi gönderilemedi' });
      }
    } catch (error: any) {
      console.error('Error sending test notification:', error);
      return res.status(500).json({ success: false, message: error.message || 'Test bildirimi gönderilirken bir hata oluştu' });
    }
  }
};