// Import the telegramService
const telegramService = require('./server/services/telegramService');
const { Appointment } = require('./shared/schema');

// Create a sample appointment for testing
const testAppointment1 = {
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
const testAppointment2 = {
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
telegramService.notifyNewAppointment(testAppointment1);

// Wait 5 seconds before sending second notification
setTimeout(() => {
  console.log('Sending second test notification...');
  telegramService.notifyAppointmentUpdate(testAppointment2);
  console.log('Test notifications sent. Check your Telegram app.');
}, 5000);