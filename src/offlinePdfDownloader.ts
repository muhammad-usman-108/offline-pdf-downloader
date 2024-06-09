// src/offlinePdfDownloader.ts

import axios from 'axios';
import localforage from 'localforage';
import { jsPDF } from 'jspdf';

class OfflinePdfDownloader {
  private storage: LocalForage;

  constructor() {
    this.storage = localforage.createInstance({
      name: 'offlinePdfDownloader',
    });
  }

  async downloadPageContent(url: string, key: string): Promise<void> {
    try {
      const response = await axios.get(url, {
        responseType: 'text',
      });
      await this.storage.setItem(key, response.data);
      console.log(`Page content from ${url} saved as ${key}`);
    } catch (error) {
      console.error(`Failed to download page content from ${url}:`, error);
    }
  }

  async getPageContent(key: string): Promise<string | null> {
    try {
      const content = await this.storage.getItem<string>(key);
      if (content) {
        console.log(`Retrieved page content for ${key}`);
        return content;
      } else {
        console.log(`No page content found for ${key}`);
        return null;
      }
    } catch (error) {
      console.error(`Failed to retrieve page content for ${key}:`, error);
      return null;
    }
  }

  async generatePdf(key: string, outputFilename: string): Promise<void> {
    try {
      const content = await this.getPageContent(key);
      if (content) {
        const doc = new jsPDF();
        doc.text(content, 10, 10);
        doc.save(outputFilename);
        console.log(`PDF generated and saved as ${outputFilename}`);
      } else {
        console.log(`No content available to generate PDF for ${key}`);
      }
    } catch (error) {
      console.error(`Failed to generate PDF for ${key}:`, error);
    }
  }
}

export default OfflinePdfDownloader;
