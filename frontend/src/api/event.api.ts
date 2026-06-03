import { apiFetch } from './client';
import { CreatedResponse } from '@/types/api';
import { PlantEvent, PlantEventRequest } from '@/types/event';

export const eventApi = {
  list: (plantId: number) => apiFetch<PlantEvent[]>(`/plants/${plantId}/events`),
  create: (plantId: number, body: PlantEventRequest) =>
    apiFetch<CreatedResponse>(`/plants/${plantId}/events`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
