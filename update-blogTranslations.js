const fs = require('fs');
const path = require('path');

// Dosyayı oku
const filePath = path.join(process.cwd(), 'client/src/lib/blogTranslations.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Tüm dil çevirilerini 4 dile indirge
let updatedContent = fileContent;

// Regex ile çeviri nesnelerini tespit edelim ve 4 dile indirelim
const objectRegex = /\{(\s*)\[Language\.Turkish\]:.+?\[Language\.Georgian\]:.+?(,(\s*)\[Language\.(Azerbaijani|Kazakh|Persian)\]:.+?)*\}/gs;

// 4 dilli çeviri formatı
const standardFormat = (match) => {
  // İlk 4 dili al (Turkish, English, Russian, Georgian)
  const lines = match.split('\n');
  let result = [];
  
  // İlk 4 dili bul
  for (const line of lines) {
    if (line.includes('Language.Turkish') || 
        line.includes('Language.English') || 
        line.includes('Language.Russian') || 
        line.includes('Language.Georgian')) {
      result.push(line);
    }
  }
  
  // Yeni objeyi formatla
  return `{
    ${result[0]}
    ${result[1]}
    ${result[2]}
    ${result[3]}
  }`;
};

// Tüm çevirileri güncelle
updatedContent = updatedContent.replace(objectRegex, standardFormat);

// Sonucu yaz
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('blogTranslations.ts dosyası başarıyla 4 dile indirgendi.');
