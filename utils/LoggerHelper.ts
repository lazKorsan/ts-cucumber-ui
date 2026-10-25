// LoggerHelper.ts

// ANSI Renk Kodları
const ANSI = {
    RESET: "\x1b[0m",
    BOLD: "\x1b[1m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    CYAN: "\x1b[36m",
    MAGENTA: "\x1b[35m",
    BG_RED: "\x1b[41m",
    BG_GREEN: "\x1b[42m"
};

export class LoggerHelper {


    private static getTime(): string {
        return new Date().toLocaleTimeString('tr-TR');
    }

    static logScenarioStart(scenarioName: string, tags?: string, featureFileName?: string): void {
        console.log(`\n${ANSI.BLUE}════════════════════════════════════════════════════════════════${ANSI.RESET}`);
        if (featureFileName) {
            console.log(`📂 ${ANSI.BOLD}${ANSI.BLUE}FEATURE:${ANSI.RESET} ${ANSI.CYAN}${featureFileName}${ANSI.RESET}`);
        }
        console.log(`📋 ${ANSI.BOLD}${ANSI.BLUE}TEST SENARYOSU BAŞLIYOR:${ANSI.RESET} ${ANSI.CYAN}${scenarioName}${ANSI.RESET}`);
        if (tags) {
            console.log(`📌 ${ANSI.BOLD}${ANSI.BLUE}TAGS:${ANSI.RESET} ${ANSI.YELLOW}${tags}${ANSI.RESET}`);
        }
        console.log(`${ANSI.BLUE}════════════════════════════════════════════════════════════════${ANSI.RESET}`);
    }

    static logStep(stepText: string, stepNumber?: number): void {
        const stepLabel = stepNumber ? `STEP ${stepNumber}` : 'STEP';
        console.log(
            `▶️  ${ANSI.BOLD}${ANSI.BLUE}[${stepLabel}]:${ANSI.RESET} ${ANSI.CYAN}${stepText}${ANSI.RESET} ${ANSI.YELLOW}(${this.getTime()})${ANSI.RESET}`
        );
    }

    // Başarılı Adım / Bilgi Logu
    static logSuccess(message: string): void {
        console.log(`✅ ${ANSI.BOLD}${ANSI.GREEN}[PASS]:${ANSI.RESET} ${ANSI.GREEN}${message}${ANSI.RESET}`);
    }

    // Genel Info Logu
    static logInfo(message: string): void {
        console.log(`ℹ️  ${ANSI.BOLD}${ANSI.CYAN}[INFO]:${ANSI.RESET} ${message}`);
    }

    // Uyarı Logu (Örn: Yavaş Step)
    static logWarn(message: string): void {
        console.log(`⚠️  ${ANSI.BOLD}${ANSI.YELLOW}[WARN]:${ANSI.RESET} ${ANSI.YELLOW}${message}${ANSI.RESET}`);
    }

    // Hata Logu
    static logError(message: string, error?: any): void {
        console.log(`❌ ${ANSI.BOLD}${ANSI.RED}[FAIL]:${ANSI.RESET} ${ANSI.RED}${message}${ANSI.RESET}`);
        if (error) {
            console.error(`${ANSI.RED}${error}${ANSI.RESET}`);
        }
    }

    // Senaryo Bitiş Logu
    static logScenarioEnd(scenarioName: string, isPassed: boolean): void {
        console.log(`${ANSI.BLUE}----------------------------------------------------------------${ANSI.RESET}`);
        if (isPassed) {
            console.log(`🎉 ${ANSI.BOLD}${ANSI.GREEN}SENARYO BAŞARIYLA TAMAMLANDI:${ANSI.RESET} ${ANSI.GREEN}${scenarioName}${ANSI.RESET}`);
        } else {
            console.log(`💥 ${ANSI.BOLD}${ANSI.RED}SENARYO BAŞARISIZ OLDU:${ANSI.RESET} ${ANSI.RED}${scenarioName}${ANSI.RESET}`);
        }
        console.log(`${ANSI.BLUE}════════════════════════════════════════════════════════════════\n${ANSI.RESET}`);
    }


}