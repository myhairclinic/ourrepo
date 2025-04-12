import { Request, Response } from "express";
import { storage } from "../storage";
import { insertPatientSchema, insertPatientDocumentSchema, insertTreatmentRecordSchema } from "@shared/schema";

// Tüm hastaları getir
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await storage.getPatients();
    res.status(200).json(patients);
  } catch (error) {
    console.error("Hastalar getirilirken hata oluştu:", error);
    res.status(500).json({ message: "Hastalar getirilirken bir hata oluştu" });
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
    const validatedData = insertPatientSchema.parse(req.body);
    const newPatient = await storage.createPatient(validatedData);
    res.status(201).json(newPatient);
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
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const validatedData = insertPatientDocumentSchema.parse({
      ...req.body,
      patientId
    });

    const newDocument = await storage.createPatientDocument(validatedData);
    res.status(201).json(newDocument);
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
    const document = await storage.getPatientDocumentById(documentId);
    
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

    const document = await storage.getPatientDocumentById(documentId);
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

    const records = await storage.getPatientTreatmentRecords(patientId);
    res.status(200).json(records);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için tedavi kayıtları getirilirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kayıtları getirilirken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı oluştur
export const createTreatmentRecord = async (req: Request, res: Response) => {
  try {
    const patientId = parseInt(req.params.patientId);
    if (isNaN(patientId)) {
      return res.status(400).json({ message: "Geçersiz hasta ID" });
    }

    const validatedData = insertTreatmentRecordSchema.parse({
      ...req.body,
      patientId
    });

    const newRecord = await storage.createTreatmentRecord(validatedData);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(`Hasta ID ${req.params.patientId} için tedavi kaydı oluşturulurken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı oluşturulurken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı güncelle
export const updateTreatmentRecord = async (req: Request, res: Response) => {
  try {
    const recordId = parseInt(req.params.recordId);
    if (isNaN(recordId)) {
      return res.status(400).json({ message: "Geçersiz tedavi kaydı ID" });
    }

    const validatedData = insertTreatmentRecordSchema.partial().parse(req.body);
    const record = await storage.getTreatmentRecordById(recordId);
    
    if (!record) {
      return res.status(404).json({ message: "Tedavi kaydı bulunamadı" });
    }

    const updatedRecord = await storage.updateTreatmentRecord(recordId, validatedData);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(`Tedavi kaydı ID ${req.params.recordId} güncellenirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı güncellenirken bir hata oluştu" });
  }
};

// Hasta tedavi kaydı sil
export const deleteTreatmentRecord = async (req: Request, res: Response) => {
  try {
    const recordId = parseInt(req.params.recordId);
    if (isNaN(recordId)) {
      return res.status(400).json({ message: "Geçersiz tedavi kaydı ID" });
    }

    const record = await storage.getTreatmentRecordById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Tedavi kaydı bulunamadı" });
    }

    await storage.deleteTreatmentRecord(recordId);
    res.status(200).json({ message: "Tedavi kaydı başarıyla silindi" });
  } catch (error) {
    console.error(`Tedavi kaydı ID ${req.params.recordId} silinirken hata oluştu:`, error);
    res.status(500).json({ message: "Hasta tedavi kaydı silinirken bir hata oluştu" });
  }
};