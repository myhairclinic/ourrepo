// Hasta ekleme scripti
import { storage } from './server/storage.ts';

async function createDemoPatient() {
  try {
    const patients = await storage.getPatients();
    console.log("Mevcut hastalar:", patients.length);
    
    const patient = await storage.createPatient({
      fullName: 'Demo Hasta',
      email: 'demo.hasta@example.com',
      phone: '+905551234567',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'male',
      nationality: 'Türkiye',
      status: 'active',
      notes: 'Örnek demo hasta kaydı'
    });
    
    console.log('Demo hasta eklendi, ID:', patient.id);
    
    // Hasta dökümanları
    await storage.createPatientDocument({
      patientId: patient.id,
      documentType: 'consent-form',
      fileName: 'onay-formu.pdf',
      fileUrl: '/documents/onay-formu.pdf',
      description: 'Hastanın onay formu',
      isConfidential: true
    });
    
    console.log('Demo hasta için döküman eklendi');
    
    // Tedavi kaydı
    await storage.createTreatmentRecord({
      patientId: patient.id,
      treatmentDate: new Date(),
      doctorName: 'Dr. Ahmet Yılmaz',
      procedureDetails: 'Saç Ekimi - FUE Tekniği, 2500 greft',
      status: 'completed',
      serviceId: 1,
      notes: 'İşlem başarıyla tamamlandı.'
    });
    
    console.log('Demo hasta için tedavi kaydı eklendi');
    
    const updatedPatients = await storage.getPatients();
    console.log("Güncellenmiş hasta listesi:", updatedPatients.length);
    
  } catch (error) {
    console.error('Demo hasta oluşturulurken hata:', error);
  }
}

createDemoPatient();