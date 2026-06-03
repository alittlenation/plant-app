export type CreatedResponse = {
  id: number;
};

export type ApiError = {
  code: string;
  message: string;
  details: Record<string, string>;
  timestamp: string;
};

export type PresignedUrlResponse = {
  objectKey: string;
  uploadUrl: string;
  publicUrl: string;
};

export type UploadCompleteResponse = {
  objectKey: string;
  photoUrl: string;
  contentType: string;
  sizeBytes: number;
};
