// test/offlinePdfDownloader.test.ts

import OfflinePdfDownloader from '../src/offlinePdfDownloader';
import axios from 'axios';
import localforage from 'localforage';
import { jsPDF } from 'jspdf';

jest.mock('axios');
jest.mock('localforage');
jest.mock('jspdf');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedLocalforage = localforage as jest.Mocked<typeof localforage>;
const mockedJsPDF = jsPDF as jest.Mocked<typeof jsPDF>;

describe('OfflinePdfDownloader', () => {
  const downloader = new OfflinePdfDownloader();

  it('should download and save page content', async () => {
    mockedAxios.get.mockResolvedValue({ data: '<html>Test Content</html>' });
    await downloader.downloadPageContent('https://example.com', 'testKey');
    expect(mockedLocalforage.setItem).toHaveBeenCalledWith('testKey', '<html>Test Content</html>');
  });

  it('should retrieve saved page content', async () => {
    mockedLocalforage.getItem.mockResolvedValue('<html>Test Content</html>');
    const content = await downloader.getPageContent('testKey');
    expect(content).toBe('<html>Test Content</html>');
  });

  it('should generate and save PDF', async () => {
    mockedLocalforage.getItem.mockResolvedValue('<html>Test Content</html>');
    const mockSave = jest.fn();
    mockedJsPDF.mockImplementation(() => ({
      text: jest.fn(),
      save: mockSave,
    }));
    await downloader.generatePdf('testKey', 'test.pdf');
    expect(mockSave).toHaveBeenCalledWith('test.pdf');
  });
});
