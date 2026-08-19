# 🚀 INSTULEARN UI TEST OTOMASYON PROJESİ (Playwright + Cucumber BDD)

> *"Quality at the Speed of Light"* ⚡

**🌐 Test Ortamı:** [https://qa.instulearn.com/](https://qa.instulearn.com/)

---

## 📖 Proje Hakkında

Bu proje, **Instulearn** platformunun test süreçlerini otomatize etmek için **Playwright**, **TypeScript** ve **Cucumber (BDD)** kullanılarak geliştirilmiş modern bir UI Test Otomasyon Framework'üdür.

- **Teknoloji Stack'i:** Playwright + TypeScript + Cucumber BDD
- **Test Yaklaşımı:** Behavior Driven Development (Gherkin Syntax)
- **Mimari:** Page Object Model (POM) + Reusable Utilities + Profile-based Runners

---

## 🎯 Hedefler & Özellikler

| Özellik | Açıklama |
| :--- | :--- |
| ✅ **BDD Entegrasyonu** | Cucumber (Gherkin syntax) ile okunabilir ve modüler test senaryoları |
| ✅ **Sayfa Nesne Modeli (POM)** | `BasePage` ve özel sayfa sınıfları ile sürdürülebilir kod mimarisi |
| ✅ **Güvenli Konfigürasyon** | `.env` desteği ile hassas verilerin (URL, kullanıcı bilgileri) güvenli yönetimi |
| ✅ **Runner & Profil Yönetimi** | `@smoke` ve `@regression` etiketleriyle hedefe yönelik test koşumları |
| ✅ **Görsel Takip & Loglama** | `highlight` destekli özel tıklama/yazma yardımcıları ve otomatik ekran görüntüsü |
| ✅ **Gelişmiş Raporlama** | Test koşumu sonunda otomatik üretilen Cucumber HTML raporları |

---

## 🛠️ Teknolojiler ve Araçlar

### 🏗️ Temel Yapı
- **TypeScript:** Tip güvenli dil desteği
- **Playwright:** Modern browser otomasyon kütüphanesi
- **Cucumber.js:** BDD test runner
- **ts-node:** TypeScript execution ortamı

### 🧪 Yardımcı Araçlar
- **dotenv:** Çevresel değişken yönetimi (`.env`)
- **Cucumber HTML Reporter:** Test sonuç raporlaması

---

## 📁 Proje Yapısı

```text
ts-cucumber-ui/
├── features/                  # Gherkin (.feature) senaryo dosyaları
│   └── US001VerifyTitle.feature
├── step-definitions/          # Step definition ve Hook tanımlamaları
│   ├── US001Steps.ts
│   └── hooks.ts
├── pages/                     # Page Object Model sınıfları
│   ├── BasePage.ts            # Ortak utility ve browser aksiyonları
│   └── HomePage.ts            # Ana sayfa locator ve metodları
├── utils/                     # Konfigürasyon ve okuyucular
│   └── config.ts              # .env değişken okuyucusu
├── reports/                   # Test koşum raporları (HTML)
├── .env                       # Çevresel değişkenler (gitignore dahil)
├── .gitignore                 # Git tarafından izlenmeyecek dosyalar
├── cucumber.json              # Cucumber profil ve runner ayarları
├── package.json               # Bağımlılıklar ve npm script'leri
├── tsconfig.json              # TypeScript derleyici ayarları
└── README.md                  # Proje dokümantasyonu