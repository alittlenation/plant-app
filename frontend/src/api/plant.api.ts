import { apiFetch } from './client';
import { CreatedResponse } from '@/types/api';
import { PlantDetail, PlantListItem, PlantRequest } from '@/types/plant';

export const plantApi = {
  list: () => apiFetch<PlantListItem[]>('/plants'),
  detail: (plantId: number) => apiFetch<PlantDetail>(`/plants/${plantId}`),
  create: (body: PlantRequest) =>
    apiFetch<CreatedResponse>('/plants', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  update: (plantId: number, body: PlantRequest) =>
    apiFetch<void>(`/plants/${plantId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  remove: (plantId: number) =>
    apiFetch<void>(`/plants/${plantId}`, {
      method: 'DELETE',
    }),
};
