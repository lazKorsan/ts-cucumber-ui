import { exec } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ============================================================
// AYARLAR: Çalıştırmak istediğin Tag'leri buraya yazabilirsin
// ============================================================
const tagName = '@US002HeaderVerifyButtonTC01';
const extraArgs = '';

// ESM ortamında __dirname'i manuel oluşturuyoruz:
let __filename: string;
// @ts-ignore
__filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Komutun çalışacağı dizin: Projenin kök dizini (scripts/ klasörünün bir üstü)
const projectRoot = path.resolve(__dirname, '..');

// CMD komutunu hazırla
const command = `npx cucumber-js --tags "${tagName}" ${extraArgs}`.trim();

console.log(`====================================================`);
console.log(`🚀 Test Başlatılıyor...`);
console.log(`📁 Çalışma Dizini: ${projectRoot}`);
console.log(`⌨️  Komut: ${command}`);
console.log(`====================================================\n`);

// exec fonksiyonuna 'cwd' (Current Working Directory) parametresini ekliyoruz!
exec(command, { cwd: projectRoot }, (error, stdout, stderr) => {

    if (stdout) {
        console.log(stdout);
    }

    if (stderr) {
        console.error(stderr);
    }

    if (error) {
        console.error(`\n❌ Testler çalışırken hata oluştu: ${error.message}`);
        process.exit(1);
    } else {
        console.log(`\n✅ Testler başarıyla tamamlandı!`);
    }
});