import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from 'url';

// ES Module'de __dirname eşdeğeri
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  console.log('🚀 serveStatic fonksiyonu çağrıldı');
  
  // Build logs'dan anlaşıldığı üzere, dosyalar dist/public klasöründe
  let distPath = path.resolve(__dirname, "..", "dist", "public");
  console.log(`🔍 Aranacak distPath: ${distPath}`);
  
  // ÖNEMLİ: Railway'de çalışırken dosya sistemi farklı olabilir
  // Daha doğrudan bir yol deneyelim
  if (!fs.existsSync(distPath)) {
    console.log('❌ dist/public dizini bulunamadı, alternatif yollar deneniyor...');
    
    // Alternatif 1: /app/dist/public (Railway container path)
    distPath = '/app/dist/public';
    console.log(`⚡ Alternatif 1 deneniyor: ${distPath}`);
    
    if (!fs.existsSync(distPath)) {
      // Alternatif 2: /dist/public
      distPath = '/dist/public';
      console.log(`⚡ Alternatif 2 deneniyor: ${distPath}`);
      
      if (!fs.existsSync(distPath)) {
        // Alternatif 3: Sadece /app/dist
        distPath = '/app/dist';
        console.log(`⚡ Alternatif 3 deneniyor: ${distPath}`);
        
        if (!fs.existsSync(distPath)) {
          // Alternatif 4: Process çalışma dizininden dist/public
          distPath = path.resolve(process.cwd(), 'dist', 'public');
          console.log(`⚡ Alternatif 4 deneniyor: ${distPath}`);
          
          if (!fs.existsSync(distPath)) {
            console.error('‼️ Hiçbir alternatif dizin bulunamadı! Mevcut dizinleri listeleyelim:');
            
            try {
              const rootDir = '/app';
              const rootFiles = fs.existsSync(rootDir) ? fs.readdirSync(rootDir) : ['❌ /app dizini bulunamadı'];
              console.log(`/app içeriği:`, rootFiles);
              
              const distDir = '/app/dist';
              const distFiles = fs.existsSync(distDir) ? fs.readdirSync(distDir) : ['❌ /app/dist dizini bulunamadı'];
              console.log(`/app/dist içeriği:`, distFiles);
              
              // Son çare: Tüm yapılandırmayı atlayıp sadece fallback'e güvenelim
              console.warn('⚠️ Son çare: Statik dosya servisi atlanıyor, sadece API istekleriniz çalışabilir');
              return; // serveStatic fonksiyonundan çık, middleware'leri ekleme
            } catch (err) {
              console.error('Dizin listelenirken hata:', err);
            }
          }
        }
      }
    }
  }
  
  // Eğer distPath'e ulaşabildiyse, static dosyaları servis et
  if (fs.existsSync(distPath)) {
    console.log(`✅ Statik dosyalar servis edilecek: ${distPath}`);
    console.log(`📁 Dizin içeriği:`, fs.readdirSync(distPath));
    
    // Statik dosyaları servis et
    app.use(express.static(distPath, { 
      maxAge: '1d',
      index: ['index.html']
    }));
    
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      console.log(`✅ index.html bulundu: ${indexPath}`);
      
      // SPA için gerekli fallback - API route'larını engellememesi için /api ile başlayanları hariç tut
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          console.log(`➡️ API isteği tespit edildi, bir sonraki handler'a geçiliyor: ${req.path}`);
          return next();
        }
        
        console.log(`📄 Statik sayfa isteği: ${req.path} → index.html`);
        res.sendFile(indexPath);
      });
    } else {
      console.error(`❌ index.html bulunamadı: ${indexPath}`);
      // index.html yoksa basit bir mesaj göster
      app.use('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next();
        }
        res.status(500).send(`
          <html>
            <body>
              <h1>Site Yapım Aşamasında</h1>
              <p>index.html dosyası bulunamadı. Lütfen daha sonra tekrar deneyin.</p>
            </body>
          </html>
        `);
      });
    }
  } else {
    console.error(`❌ Hiçbir geçerli statik dosya dizini bulunamadı!`);
  }
}
