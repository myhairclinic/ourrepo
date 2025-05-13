import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

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
        import.meta.dirname,
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
  // Build logs'dan anlaşıldığı üzere, dosyalar dist/public klasöründe
  let distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
  
  console.log(`🔍 Statik dosyalar için aranan konum: ${distPath}`);

  // Klasör yoksa hata fırlat
  if (!fs.existsSync(distPath)) {
    console.error(`❌ Hata: Build edilmiş frontend dosyaları bulunamadı!`);
    console.error(`Aranan yer: ${distPath}`);
    
    // Fallback olarak ../dist klasörünü deneyelim
    const fallbackPath = path.resolve(import.meta.dirname, "..", "dist");
    console.error(`Fallback olarak denenen yer: ${fallbackPath}`);
    
    if (fs.existsSync(fallbackPath)) {
      console.log(`✅ Fallback konum bulundu: ${fallbackPath}`);
      distPath = fallbackPath;
    } else {
      throw new Error(
        `Could not find the build directory: ${distPath}, make sure to build the client first`
      );
    }
  }

  console.log(`✅ Statik dosyalar şu konumdan servis ediliyor: ${distPath}`);
  app.use(express.static(distPath, { maxAge: '1d' }));
  
  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    console.log(`📌 Fallback: ${req.method} ${req.originalUrl} -> index.html`);
    const indexPath = path.resolve(distPath, "index.html");
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error(`❌ index.html bulunamadı: ${indexPath}`);
      res.status(500).send('index.html bulunamadı. Build süreci tamamlandı mı?');
    }
  });
}
