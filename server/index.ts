import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module'de __dirname eşdeğeri
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Process exit events - Railway'in nedensiz kapanmaları için
process.on('exit', (code) => {
  console.log(`🛑 Process çıkış yapıyor, kod: ${code}`);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT alındı (Ctrl+C gibi)');
  // Signal'i process.exit() yapmadan önce işle
  console.log('Temiz kapanış için bekliyor...');
  setTimeout(() => {
    console.log('⏱️ Timeout doldu, çıkış yapılıyor');
    process.exit(0);
  }, 1000);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM alındı (process kill gibi)');
  // Signal'i process.exit() yapmadan önce işle
  console.log('Temiz kapanış için bekliyor...');
  setTimeout(() => {
    console.log('⏱️ Timeout doldu, çıkış yapılıyor');
    process.exit(0);
  }, 1000);
});

console.log('🚀 Uygulama başlatılıyor...');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uploads klasörünü statik dosya olarak servis et
const uploadsDir = path.join(dirname(__dirname), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Attached_assets klasörünü statik dosya olarak servis et
const assetsDir = path.join(dirname(__dirname), 'attached_assets');
if (fs.existsSync(assetsDir)) {
  app.use('/attached_assets', express.static(assetsDir));
  console.log('Attached assets klasörü statik olarak sunuluyor:', assetsDir);
}

// Add CORS headers for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Telegram API istek bilgilerini görüntüle
  if (path.includes('/telegram')) {
    console.log('Telegram API isteği:', {
      method: req.method,
      path: req.path,
      body: req.body,
      headers: req.headers,
    });
  }

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log('📡 registerRoutes çağırılıyor...');
    const server = await registerRoutes(app);
    
    if (!server) {
      console.error("❌ KRITIK HATA: registerRoutes fonksiyonu server dönmedi!");
      process.exit(1); // Uygulama hata ile çıkacak, Railway bunu görecek
    }
    
    console.log('✅ Server nesnesi başarıyla oluşturuldu');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("❌ Uygulama hatası:", err);
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Railway deployment için process.env.PORT kullanılmalı
    // Yoksa dönüş port için 5000 varsayılan değerini kullan
    const port = process.env.PORT || 5000;
    
    console.log(`🔊 Server dinlemeye başlıyor, port: ${port}`);
    server.listen(port, () => {
      log(`✅ Server başarıyla ${port} portunda çalışıyor`);
      
      // Görev döngüsünü canlı tutmak için hafif bir interval
      const keepAlive = setInterval(() => {
        console.log(`💓 Server çalışmaya devam ediyor: ${new Date().toISOString()}`);
      }, 60000); // Her dakika log
      
      // Kapanış zamanı geldiğinde interval'ı temizle
      process.on('SIGINT', () => {
        clearInterval(keepAlive);
      });
      
      process.on('SIGTERM', () => {
        clearInterval(keepAlive);
      });
    });
    
    // Server başladıktan sonra bile uygulama çalışmaya devam etmeli
    console.log('✅ Event loop aktif, uygulama çalışmaya devam ediyor');
    
  } catch (error) {
    console.error("❌ KRITIK HATA: Server başlatılırken bir hata oluştu:", error);
    process.exit(1); // Uygulama hata ile çıkacak, Railway bunu görecek
  }
})();
