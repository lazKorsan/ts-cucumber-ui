import * as fs from 'fs';
import * as path from 'path';
import { LoggerHelper } from './LoggerHelper'; // Projenizdeki Logger yapısına uygun olarak

export class AccountStorageHelper {
    // Documents/accountStorage/accounts.txt (veya .env / .json) yolu
    private static storageDir = path.resolve(process.cwd(), 'Documents', 'accountStorage');
    private static filePath = path.join(AccountStorageHelper.storageDir, 'registered_accounts.txt');

    /**
     * Oluşturulan hesabı belirtilen dosyaya ekler.
     * @param email Kullanıcı mail adresi
     * @param password Kullanıcı şifresi
     * @param name (Opsiyonel) Kullanıcı ismi
     */
    public static saveAccount(email: string, password: string, name?: string): void {
        try {
            // Klasör yoksa oluştur
            if (!fs.existsSync(this.storageDir)) {
                fs.mkdirSync(this.storageDir, { recursive: true });
            }

            // Kaydedilecek içerik formatı
            const timestamp = new Date().toISOString();
            const logEntry = `[${timestamp}] Name: ${name || 'N/A'} | Email: ${email} | Password: ${password}\n`;

            // Dosyanın sonuna ekle (Append)
            fs.appendFileSync(this.filePath, logEntry, 'utf8');
            LoggerHelper.logInfo(`Hesap bilgileri başarıyla kaydedildi: ${email}`);

        } catch (error) {
            LoggerHelper.logError(`Hesap kaydedilirken hata oluştu: ${error}`);
        }
    }
}