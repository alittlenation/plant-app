import { useQuery } from '@tanstack/react-query';
import { photoApi } from '@/api/photo.api';

export const photoKeys = {
  list: (plantId: number) => ['plants', plantId, 'photos'] as const,
};

export function usePlantPhotos(plantId: number) {
  return useQuery({
    queryKey: photoKeys.list(plantId),
    queryFn: () => photoApi.list(plantId),
    enabled: Number.isFinite(plantId),
  });
}
