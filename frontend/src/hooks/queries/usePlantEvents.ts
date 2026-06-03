import { useQuery } from '@tanstack/react-query';
import { eventApi } from '@/api/event.api';

export const eventKeys = {
  list: (plantId: number) => ['plants', plantId, 'events'] as const,
};

export function usePlantEvents(plantId: number) {
  return useQuery({
    queryKey: eventKeys.list(plantId),
    queryFn: () => eventApi.list(plantId),
    enabled: Number.isFinite(plantId),
  });
}
