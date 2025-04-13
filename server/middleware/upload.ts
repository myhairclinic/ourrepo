import * as path from 'path';
import * as fs from 'fs';

// Multer tipleri için makeshift bir tanımlama
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

const fileFilter = (req: any, file: any, cb: any) => {
  // Kabul edilebilir dosya tipleri
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Desteklenmeyen dosya tipi. Lütfen jpeg, jpg, png, webp, pdf veya doc/docx dosyaları yükleyin.'), false);
  }
};

// Benzersiz dosya adı oluşturma
const generateUniqueFileName = (originalName: string) => {
  const fileExtension = path.extname(originalName);
  const baseName = path.basename(originalName, fileExtension);
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${baseName}-${timestamp}-${randomString}${fileExtension}`;
};

// Multer'ı dinamik olarak içe aktarıp yapılandıralım
const configureMulter = () => {
  try {
    // Multer'ı dinamik olarak içe aktaralım
    const multer = require('multer');
    
    // Uploads klasörünü kontrol et ve yoksa oluştur
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Disk depolama ayarları
    const storage = multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        cb(null, uploadsDir);
      },
      filename: (req: any, file: any, cb: any) => {
        cb(null, generateUniqueFileName(file.originalname));
      }
    });
    
    // Multer yapılandırması
    return multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limiti
      }
    });
  } catch (error) {
    console.error('Multer yüklenirken bir hata oluştu:', error);
    throw error;
  }
};

// Express hata yakalama middleware'i
const handleUploadErrors = (err: any, req: any, res: any, next: any) => {
  if (err) {
    console.error('Dosya yükleme hatası:', err);
    res.status(400).json({ 
      success: false, 
      message: err.message || 'Dosya yüklenirken bir hata oluştu' 
    });
  } else {
    next();
  }
};

// Multer örneğini oluştur
let upload: any;
try {
  upload = configureMulter();
} catch (error) {
  console.error('Multer yapılandırılamazken bir hata oluştu:', error);
  // Standart hata nesnesi oluştur
  upload = {
    single: () => {
      return (req: any, res: any, next: any) => {
        next(new Error('Dosya yükleme modülü yüklenemedi'));
      };
    },
    array: () => {
      return (req: any, res: any, next: any) => {
        next(new Error('Dosya yükleme modülü yüklenemedi'));
      };
    }
  };
}

export { upload, handleUploadErrors };