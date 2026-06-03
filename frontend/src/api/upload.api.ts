import { apiFetch } from './client';
import { PresignedUrlResponse, UploadCompleteResponse } from '@/types/api';

export const uploadApi = {
  presignedUrl: (fileName: string, contentType: string) =>
    apiFetch<PresignedUrlResponse>('/uploads/presigned-url', {
      method: 'POST',
      body: JSON.stringify({ fileName, contentType }),
    }),
  complete: (objectKey: string, contentType: string, sizeBytes: number) =>
    apiFetch<UploadCompleteResponse>('/uploads/complete', {
      method: 'POST',
      body: JSON.stringify({ objectKey, contentType, sizeBytes }),
    }),
};
