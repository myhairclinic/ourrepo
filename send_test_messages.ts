// Import the telegramService
import { notifyNewAppointment, notifyAppointmentUpdate } from './server/services/telegramService';
import { Appointment } from '@shared/schema';

// Create a sample appointment for testing
const testAppointment1: Partial<Appointment> = {
  id: 999,
  name: 'Test User 1',
  email: 'test1@example.com',
  phone: '+90 555 555 5555',
  preferredDate: new Date().toISOString(),
  message: 'Bu bir test randevusudur. Bu mesaj yeni Chat ID için oluşturulmuştur.',
  serviceId: 1,
  status: 'new',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Create another sample appointment for second test
const testAppointment2: Partial<Appointment> = {
  id: 1000,
  name: 'Test User 2',
  email: 'test2@example.com',
  phone: '+90 555 666 7777',
  preferredDate: new Date().toISOString(),
  message: 'Bu ikinci test randevusudur. İkinci bildirim testi için oluşturulmuştur.',
  serviceId: 2,
  status: 'confirmed',
  createdAt: new Date(),
  updatedAt: new Date()
};

// Send test notifications
console.log('Sending first test notification...');
notifyNewAppointment(testAppointment1 as Appointment);

// Wait 5 seconds before sending second notification
setTimeout(() => {
  console.log('Sending second test notification...');
  notifyAppointmentUpdate(testAppointment2 as Appointment);
  console.log('Test notifications sent. Check your Telegram app.');
}, 5000);