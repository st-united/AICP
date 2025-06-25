import { IMAGE_EXTENSIONS, PDF_MIME_TYPES } from '../constants';
import { ExtendedUploadFile } from '@app/interface/portfolio.interface';

export const mapFiles = (urls: string[] = [], prefix: string): ExtendedUploadFile[] =>
  urls.map((url: string, idx: number) => ({
    uid: `${prefix}-${idx}`,
    name: url.split('/').pop()?.split('+').slice(1).join('+') || `${prefix}-${idx + 1}`,
    url,
    thumbUrl: url,
    type: url.split('.').pop(),
  }));

export const getFileSrc = (file: ExtendedUploadFile): string => {
  let src = file.url || file.thumbUrl;
  if (!src && file.originFileObj) {
    src = URL.createObjectURL(file.originFileObj);
  }
  return src || '';
};

export const isImageFile = (fileType?: string): boolean => {
  return fileType ? IMAGE_EXTENSIONS.some((ext) => fileType.includes(ext)) : false;
};

export const isPdfFile = (fileType?: string): boolean => {
  return fileType ? PDF_MIME_TYPES.some((type) => fileType.includes(type)) : false;
};

export const isDocxFile = (fileName?: string): boolean => {
  return fileName ? /\.docx$/i.test(fileName) : false;
};

export const isDocFile = (fileName?: string): boolean => {
  return fileName ? /\.doc$/i.test(fileName) : false;
};

export const createDownloadLink = (file: File, fileName: string): void => {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const createBlobDownloadLink = (blob: Blob, fileName: string): void => {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl);
};

export const getProcessedFileName = (url: string, fallbackName?: string): string => {
  return url.split('/').pop()?.split('+').slice(1).join('+') || fallbackName || 'download';
};

export const createOfficePreviewUrl = (fileUrl: string): string => {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
};

export const isNewUploadedFile = (file: ExtendedUploadFile): boolean => {
  return !!(file.originFileObj && !file.url);
};

export const isExistingFile = (file: ExtendedUploadFile): boolean => {
  return !!(file.url && !file.originFileObj);
};

export const isModifiedFile = (file: ExtendedUploadFile): boolean => {
  return !!(file.originFileObj && file.url);
};

export const categorizeFiles = (files: ExtendedUploadFile[]) => {
  return {
    newFiles: files.filter(isNewUploadedFile),
    existingFiles: files.filter(isExistingFile),
    modifiedFiles: files.filter(isModifiedFile),
  };
};

export const prepareFilesForUpload = (files: ExtendedUploadFile[]) => {
  return files.filter((f) => f.originFileObj).map((f) => f.originFileObj as File);
};

export const getExistingFileUrls = (files: ExtendedUploadFile[]): string[] => {
  return files
    .filter((f) => f.url && !f.originFileObj)
    .map((f) => f.url!)
    .filter(Boolean);
};
