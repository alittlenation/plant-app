import { useQuery } from '@tanstack/react-query';
import { plantApi } from '@/api/plant.api';

export const plantKeys = {
  all: ['plants'] as const,
  list: () => [...plantKeys.all, 'list'] as const,
  detail: (plantId: number) => [...plantKeys.all, 'detail', plantId] as const,
};

export function usePlants() {
  return useQuery({
    queryKey: plantKeys.list(),
    queryFn: plantApi.list,
  });
}

export function usePlantDetail(plantId: number) {
  return useQuery({
    queryKey: plantKeys.detail(plantId),
    queryFn: () => plantApi.detail(plantId),
    enabled: Number.isFinite(plantId),
  });
}
