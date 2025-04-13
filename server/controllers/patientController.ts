import { Request, Response } from "express";
import { storage } from "../storage";
import { 
  insertPatientSchema, 
  insertPatientDocumentSchema, 
  insertTreatmentRecordSchema,
  insertPatientProgressImageSchema
} from "@shared/schema";

// Tüm hastaları getir
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    console.log("getAllPatients controller çağrıldı");
    const patients = await storage.getPatients();
    console.log(`${patients.length} hasta bulundu ve döndürülüyor`);
    res.status(200).json(patients);
  } catch (error) {
    console.error("Hastalar getirilirken hata oluştu:", error);
    // Hata durumunda boş dizi döndür, 500 hatası verme
    res.status(200).json([]);
  }
};

// Hasta ID'sine göre getir
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const patient = await storage.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: "Hasta bulunamadı" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error(`Hasta ID ${req.params.id} getirilirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta bilgileri getirilirken bir hata oluştu" });
  }
};

// Yeni hasta oluştur
export const createPatient = async (req: Request, res: Response) => {
  try {
    console.log("createPatient çağrıldı, request body:", req.body);
    
    // Zorunlu alanlar için varsayılan değerleri ayarla
    const patientData = {
      ...req.body,
      status: req.body.status || "active",
      email: req.body.email || null,
      dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
      gender: req.body.gender || null,
      nationality: req.body.nationality || null,
      passportNumber: req.body.passportNumber || null,
      address: req.body.address || null,
      medicalHistory: req.body.medicalHistory || null,
      allergies: req.body.allergies || null,
      medications: req.body.medications || null,
      notes: req.body.notes || null,
      serviceId: req.body.serviceId || null,
      lastVisitDate: req.body.lastVisitDate ? new Date(req.body.lastVisitDate) : null
    };
    
    try {
      console.log("Hasta oluşturulacak veriler:", patientData);
      const validatedData = insertPatientSchema.parse(patientData);
      console.log("Validasyon başarılı:", validatedData);
      
      const newPatient = await storage.createPatient(validatedData);
      console.log("Hasta başarıyla oluşturuldu:", newPatient);
      
      res.status(201).json(newPatient);
    } catch (error) {
      console.error("Veri validasyon hatası:", error);
      res.status(400).json({ message: "Geçersiz hasta verileri", error });
    }
  } catch (error) {
    console.error("Hasta oluşturulurken hata oluştu:", error);
    res.status(500).json({ message: "Hasta oluşturulurken bir hata oluştu" });
  }
};

// Hasta güncelle
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const validatedData = insertPatientSchema.partial().parse(req.body);
    const patient = await storage.getPatientById(id);
    
    if (!patient) {
      return res.status(404).json({ message: "Hasta bulunamadı" });
    }

    const updatedPatient = await storage.updatePatient(id, validatedData);
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error(`Hasta ID ${req.params.id} güncellenirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta güncellenirken bir hata oluştu" });
  }
};

// Hasta sil
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const patient = await storage.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: "Hasta bulunamadı" });
    }

    await storage.deletePatient(id);
    res.status(200).json({ message: "Hasta başarıyla silindi" });
  } catch (error) {
    console.error(`Hasta ID ${req.params.id} silinirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta silinirken bir hata oluştu" });
  }
};

// Hasta dökümanlarını getir
export const getPatientDocuments = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const documents = await storage.getPatientDocuments(patientId);
    res.status(200).json(documents);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için dökümanlar getirilirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta dökümanları getirilirken bir hata oluştu" });
  }
};

// Hasta dökümanı oluştur
export const createPatientDocument = async (req: Request, res: Response) => {
  try {
    console.log(`createPatientDocument çağrıldı, request body:`, req.body);
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    // Hasta var mı kontrol et
    const patient = await storage.getPatientById(patientId);
    if (!patient) {
      console.error(`Hasta ID ${patientId} bulunamadı`);
      return res.status(404).json({ message: "Hasta bulunamadı" });
    }

    const documentData = {
      ...req.body,
      patientId,
      uploadDate: new Date(),
      description: req.body.description || null,
      isConfidential: req.body.isConfidential === true
    };

    console.log("Oluşturulacak döküman verisi:", documentData);

    try {
      const validatedData = insertPatientDocumentSchema.parse(documentData);
      console.log("Validasyon başarılı:", validatedData);
      
      const newDocument = await storage.createPatientDocument(validatedData);
      console.log("Oluşturulan belge:", newDocument);
      
      res.status(201).json(newDocument);
    } catch (error) {
      console.error("Veri validasyon hatası:", error);
      res.status(400).json({ message: "Geçersiz belge verileri", error });
    }
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için döküman oluşturulurken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta dökümanı oluşturulurken bir hata oluştu" });
  }
};

// Hasta dökümanı güncelle
export const updatePatientDocument = async (req: Request, res: Response) => {
  try {
    const documentId = parseInt(req.params.documentId);
    if (isNaN(documentId)) {
      return res.status(400).json({ message: "Geçersiz döküman ID" });
    }

    const validatedData = insertPatientDocumentSchema.partial().parse(req.body);
    const document = await storage.getDocumentById(documentId);
    
    if (!document) {
      return res.status(404).json({ message: "Döküman bulunamadı" });
    }

    const updatedDocument = await storage.updatePatientDocument(documentId, validatedData);
    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(`Döküman ID ${req.params.documentId} güncellenirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta dökümanı güncellenirken bir hata oluştu" });
  }
};

// Hasta dökümanı sil
export const deletePatientDocument = async (req: Request, res: Response) => {
  try {
    const documentId = parseInt(req.params.documentId);
    if (isNaN(documentId)) {
      return res.status(400).json({ message: "Geçersiz döküman ID" });
    }

    const document = await storage.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: "Döküman bulunamadı" });
    }

    await storage.deletePatientDocument(documentId);
    res.status(200).json({ message: "Döküman başarıyla silindi" });
  } catch (error) {
    console.error(`Döküman ID ${req.params.documentId} silinirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta dökümanı silinirken bir hata oluştu" });
  }
};

// Hasta tedavi kayıtlarını getir
export const getPatientTreatmentRecords = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const records = await storage.getTreatmentRecords(patientId);
    res.status(200).json(records);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için tedavi kayıtları getirilirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kayıtları getirilirken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı oluştur
export const createTreatmentRecord = async (req: Request, res: Response) => {
  try {
    console.log(`createTreatmentRecord: Hasta için tedavi kaydı oluşturuluyor. Hasta ID: ${req.params.patientId}`);
    
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    // Hasta varlığını kontrol et
    const patient = await storage.getPatientById(patientId);
    if (!patient) {
      console.error(`Hasta ID ${patientId} bulunamadı`);
      return res.status(404).json({ message: "Hasta bulunamadı" });
    }

    // Tedavi kaydı verilerini doğrula
    const validatedData = insertTreatmentRecordSchema.parse({
      ...req.body,
      patientId
    });

    // Tedavi kaydını oluştur
    console.log(`Hasta ID ${patientId} için tedavi kaydı oluşturuluyor:`, validatedData);
    const newRecord = await storage.createTreatmentRecord(validatedData);
    
    // İlerleme görseli eklenmişse işle
    const progressImages = req.body.progressImages;
    if (progressImages && Array.isArray(progressImages) && progressImages.length > 0) {
      console.log(`Tedavi kaydı için ${progressImages.length} ilerleme görseli ekleniyor`);
      
      for (const imageData of progressImages) {
        const validatedImageData = insertPatientProgressImageSchema.parse({
          ...imageData,
          patientId,
          treatmentRecordId: newRecord.id
        });
        
        await storage.createPatientProgressImage(validatedImageData);
      }
      
      console.log(`${progressImages.length} ilerleme görseli başarıyla eklendi`);
    }

    // Bildirim gönderme veya diğer işlemler burada yapılabilir
    
    console.log(`Tedavi kaydı başarıyla oluşturuldu. Kayıt ID: ${newRecord.id}`);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için tedavi kaydı oluşturulurken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı oluşturulurken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı güncelle
export const updateTreatmentRecord = async (req: Request, res: Response) => {
  try {
    console.log(`updateTreatmentRecord: Tedavi kaydı güncellemesi başlatıldı. Kayıt ID: ${req.params.recordId}`);
    const recordId = parseInt(req.params.recordId);
    if (isNaN(recordId)) {
      return res.status(400).json({ message: "Geçersiz tedavi kaydı ID" });
    }

    // Mevcut kaydı kontrol et
    const record = await storage.getTreatmentRecordById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Tedavi kaydı bulunamadı" });
    }

    // Tedavi kaydı verilerini doğrula
    const validatedData = insertTreatmentRecordSchema.partial().parse(req.body);
    console.log(`Tedavi kaydı ID ${recordId} güncelleniyor:`, validatedData);
    
    // Tedavi kaydını güncelle
    const updatedRecord = await storage.updateTreatmentRecord(recordId, validatedData);
    
    // İlerleme görselleri eklenecekse işle
    const progressImages = req.body.progressImages;
    if (progressImages && Array.isArray(progressImages) && progressImages.length > 0) {
      console.log(`Tedavi kaydı için ${progressImages.length} yeni ilerleme görseli ekleniyor`);
      
      for (const imageData of progressImages) {
        // Yeni görsel mi, mevcut görseli güncelleme mi kontrol et
        if (imageData.id) {
          // Mevcut görseli güncelle
          const validatedImageData = insertPatientProgressImageSchema.partial().parse({
            ...imageData,
            treatmentRecordId: recordId
          });
          
          const existingImage = await storage.getPatientProgressImageById(imageData.id);
          if (existingImage) {
            await storage.updatePatientProgressImage(imageData.id, validatedImageData);
            console.log(`İlerleme görseli ID ${imageData.id} güncellendi`);
          } else {
            console.warn(`İlerleme görseli ID ${imageData.id} bulunamadı, güncelleme atlanıyor`);
          }
        } else {
          // Yeni görsel ekle
          const validatedImageData = insertPatientProgressImageSchema.parse({
            ...imageData,
            patientId: record.patientId,
            treatmentRecordId: recordId
          });
          
          await storage.createPatientProgressImage(validatedImageData);
          console.log(`Yeni ilerleme görseli eklendi`);
        }
      }
      
      console.log(`${progressImages.length} ilerleme görseli işlendi`);
    }
    
    // Silinecek görsel ID'leri varsa işle
    const deleteImageIds = req.body.deleteImageIds;
    if (deleteImageIds && Array.isArray(deleteImageIds) && deleteImageIds.length > 0) {
      console.log(`${deleteImageIds.length} ilerleme görseli siliniyor...`);
      
      for (const imageId of deleteImageIds) {
        const image = await storage.getPatientProgressImageById(parseInt(imageId));
        if (image && image.treatmentRecordId === recordId) {
          await storage.deletePatientProgressImage(parseInt(imageId));
          console.log(`İlerleme görseli ID ${imageId} silindi`);
        } else {
          console.warn(`İlerleme görseli ID ${imageId} bu tedavi kaydına ait değil veya bulunamadı`);
        }
      }
    }
    
    console.log(`Tedavi kaydı ID ${recordId} başarıyla güncellendi`);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(`Tedavi kaydı ID ${req.params.recordId} güncellenirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı güncellenirken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı sil
export const deleteTreatmentRecord = async (req: Request, res: Response) => {
  try {
    console.log(`deleteTreatmentRecord: Tedavi kaydı silme işlemi başlatıldı. Kayıt ID: ${req.params.recordId}`);
    const recordId = parseInt(req.params.recordId);
    if (isNaN(recordId)) {
      return res.status(400).json({ message: "Geçersiz tedavi kaydı ID" });
    }

    // Mevcut kaydı kontrol et
    const record = await storage.getTreatmentRecordById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Tedavi kaydı bulunamadı" });
    }

    // Bu tedavi kaydına ait ilerleme görsellerini bul
    const relatedImages = await storage.getProgressImagesByTreatmentRecordId(recordId);
    console.log(`Tedavi kaydı ID ${recordId} ile ilişkili ${relatedImages.length} ilerleme görseli bulundu`);
    
    // Önce ilişkili görselleri sil (varsa)
    if (relatedImages.length > 0) {
      console.log(`İlişkili ${relatedImages.length} ilerleme görseli siliniyor...`);
      
      for (const image of relatedImages) {
        await storage.deletePatientProgressImage(image.id);
        console.log(`İlerleme görseli ID ${image.id} silindi`);
      }
      
      console.log(`${relatedImages.length} ilişkili görsel başarıyla silindi`);
    }
    
    // Tedavi kaydını sil
    await storage.deleteTreatmentRecord(recordId);
    console.log(`Tedavi kaydı ID ${recordId} başarıyla silindi`);
    
    res.status(200).json({ 
      message: "Tedavi kaydı başarıyla silindi", 
      deletedImagesCount: relatedImages.length 
    });
  } catch (error) {
    console.error(`Tedavi kaydı ID ${req.params.recordId} silinirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı silinirken bir hata oluştu" });
  }
};

// Hasta ilerleme görsellerini getir
export const getPatientProgressImages = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const images = await storage.getPatientProgressImages(patientId);
    res.status(200).json(images);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için ilerleme görselleri getirilirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta ilerleme görselleri getirilirken bir hata oluştu" });
  }
};

// Hasta ilerleme görselini oluştur
export const createPatientProgressImage = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    // Veriyi hazırla
    const imageData = {
      ...req.body,
      patientId,
      captureDate: req.body.captureDate ? new Date(req.body.captureDate) : new Date(),
      isVisible: req.body.isVisible === undefined ? true : req.body.isVisible
    };

    // Veriyi doğrula ve kaydet
    try {
      const validatedData = insertPatientProgressImageSchema.parse(imageData);
      const newImage = await storage.createPatientProgressImage(validatedData);
      res.status(201).json(newImage);
    } catch (error) {
      console.error("Veri validasyon hatası:", error);
      res.status(400).json({ message: "Geçersiz ilerleme görseli verileri", error });
    }
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için ilerleme görseli oluşturulurken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta ilerleme görseli oluşturulurken bir hata oluştu" });
  }
};

// Hasta ilerleme görselini güncelle
export const updatePatientProgressImage = async (req: Request, res: Response) => {
  try {
    const imageId = parseInt(req.params.imageId);
    if (isNaN(imageId)) {
      return res.status(400).json({ message: "Geçersiz görsel ID" });
    }

    const validatedData = insertPatientProgressImageSchema.partial().parse(req.body);
    const image = await storage.getPatientProgressImageById(imageId);
    
    if (!image) {
      return res.status(404).json({ message: "İlerleme görseli bulunamadı" });
    }

    const updatedImage = await storage.updatePatientProgressImage(imageId, validatedData);
    res.status(200).json(updatedImage);
  } catch (error) {
    console.error(`Görsel ID ${req.params.imageId} güncellenirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta ilerleme görseli güncellenirken bir hata oluştu" });
  }
};

// Hasta ilerleme görselini sil
export const deletePatientProgressImage = async (req: Request, res: Response) => {
  try {
    const imageId = parseInt(req.params.imageId);
    if (isNaN(imageId)) {
      return res.status(400).json({ message: "Geçersiz görsel ID" });
    }

    const image = await storage.getPatientProgressImageById(imageId);
    if (!image) {
      return res.status(404).json({ message: "İlerleme görseli bulunamadı" });
    }

    await storage.deletePatientProgressImage(imageId);
    res.status(200).json({ message: "İlerleme görseli başarıyla silindi" });
  } catch (error) {
    console.error(`Görsel ID ${req.params.imageId} silinirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta ilerleme görseli silinirken bir hata oluştu" });
  }
};