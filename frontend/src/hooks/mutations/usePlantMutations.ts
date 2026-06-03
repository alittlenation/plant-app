import { useMutation, useQueryClient } from '@tanstack/react-query';
import { plantApi } from '@/api/plant.api';
import { PlantRequest } from '@/types/plant';
import { plantKeys } from '../queries/usePlants';

export function useCreatePlant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PlantRequest) => plantApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.list() });
    },
  });
}

export function useUpdatePlant(plantId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: PlantRequest) => plantApi.update(plantId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.list() });
      queryClient.invalidateQueries({ queryKey: plantKeys.detail(plantId) });
    },
  });
}

export function useDeletePlant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plantId: number) => plantApi.remove(plantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: plantKeys.list() });
    },
  });
}
