import { useMutation } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { uploadApi } from '@/api/upload.api';

export function useUploadImage() {
  return useMutation({
    mutationFn: async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.85,
      });

      if (result.canceled) {
        return null;
      }

      const asset = result.assets[0];
      const contentType = asset.mimeType ?? 'image/jpeg';
      const fileName = asset.fileName ?? `plant-${Date.now()}.jpg`;
      const presigned = await uploadApi.presignedUrl(fileName, contentType);
      const fileResponse = await fetch(asset.uri);
      const blob = await fileResponse.blob();

      await fetch(presigned.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: blob,
      });

      const completed = await uploadApi.complete(presigned.objectKey, contentType, asset.fileSize ?? blob.size);
      return completed.photoUrl;
    },
  });
}
