# offline-pdf-downloader

`offline-pdf-downloader` is a utility that allows users to download web page content and save it as a PDF for offline use. This package helps developers implement offline storage functionality in their applications, ensuring content access even with low or no internet connection.

## Features
- Download and save page content for offline use.
- Retrieve saved page content from offline storage.
- Generate and save PDF from saved content.
- Utilizes `axios` for network requests, `localforage` for offline storage, and `jspdf` for PDF generation.

## Installation

```sh
npm install offline-pdf-downloader
```

## Usage

```typescript 
import OfflinePdfDownloader from 'offline-pdf-downloader';

const downloader = new OfflinePdfDownloader();

// Download and save page content
await downloader.downloadPageContent('https://example.com', 'testKey');

// Retrieve saved page content
const content = await downloader.getPageContent('testKey');
if (content) {
  console.log('Content retrieved:', content);
}

// Generate and save PDF
await downloader.generatePdf('testKey', 'test.pdf');

```