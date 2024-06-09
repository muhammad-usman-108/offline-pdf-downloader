declare class OfflinePdfDownloader {
    private storage;
    constructor();
    downloadPageContent(url: string, key: string): Promise<void>;
    getPageContent(key: string): Promise<string | null>;
    generatePdf(key: string, outputFilename: string): Promise<void>;
}
export default OfflinePdfDownloader;
//# sourceMappingURL=offlinePdfDownloader.d.ts.map