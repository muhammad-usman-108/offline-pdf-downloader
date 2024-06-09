"use strict";
// src/offlinePdfDownloader.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const localforage_1 = __importDefault(require("localforage"));
const jspdf_1 = require("jspdf");
class OfflinePdfDownloader {
    constructor() {
        this.storage = localforage_1.default.createInstance({
            name: 'offlinePdfDownloader',
        });
    }
    downloadPageContent(url, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(url, {
                    responseType: 'text',
                });
                yield this.storage.setItem(key, response.data);
                console.log(`Page content from ${url} saved as ${key}`);
            }
            catch (error) {
                console.error(`Failed to download page content from ${url}:`, error);
            }
        });
    }
    getPageContent(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.storage.getItem(key);
                if (content) {
                    console.log(`Retrieved page content for ${key}`);
                    return content;
                }
                else {
                    console.log(`No page content found for ${key}`);
                    return null;
                }
            }
            catch (error) {
                console.error(`Failed to retrieve page content for ${key}:`, error);
                return null;
            }
        });
    }
    generatePdf(key, outputFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.getPageContent(key);
                if (content) {
                    const doc = new jspdf_1.jsPDF();
                    doc.text(content, 10, 10);
                    doc.save(outputFilename);
                    console.log(`PDF generated and saved as ${outputFilename}`);
                }
                else {
                    console.log(`No content available to generate PDF for ${key}`);
                }
            }
            catch (error) {
                console.error(`Failed to generate PDF for ${key}:`, error);
            }
        });
    }
}
exports.default = OfflinePdfDownloader;
