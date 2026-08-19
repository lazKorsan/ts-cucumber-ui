import * as dotenv from 'dotenv';
import path from 'path';

// .env dosyasını yükler
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const Config = {
    baseUrl: process.env.BASE_URL || 'https://qa.instulearn.com/',
    studentEmail: process.env.STUDENT_EMAIL || '',
    studentPassword: process.env.STUDENT_PASSWORD || ''
};
