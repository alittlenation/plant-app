import { apiFetch } from './client';
import { CreatedResponse } from '@/types/api';
import { PlantPhoto, PlantPhotoRequest } from '@/types/photo';

export const photoApi = {
  list: (plantId: number) => apiFetch<PlantPhoto[]>(`/plants/${plantId}/photos`),
  create: (plantId: number, body: PlantPhotoRequest) =>
    apiFetch<CreatedResponse>(`/plants/${plantId}/photos`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
