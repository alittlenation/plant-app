import { useMutation, useQueryClient } from '@tanstack/react-query';
import { eventApi } from '@/api/event.api';
import { photoApi } from '@/api/photo.api';
import { PlantEventRequest } from '@/types/event';
import { PlantPhotoRequest } from '@/types/photo';
import { eventKeys } from '../queries/usePlantEvents';
import { photoKeys } from '../queries/usePlantPhotos';
import { plantKeys } from '../queries/usePlants';

export function useCreateEvent(plantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PlantEventRequest) => eventApi.create(plantId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.detail(plantId) });
      queryClient.invalidateQueries({ queryKey: eventKeys.list(plantId) });
    },
  });
}

export function useCreatePhoto(plantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PlantPhotoRequest) => photoApi.create(plantId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.detail(plantId) });
      queryClient.invalidateQueries({ queryKey: photoKeys.list(plantId) });
    },
  });
}
