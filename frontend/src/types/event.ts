export type PlantEventType = 'WATERING' | 'NUTRIENT' | 'REPOTTING' | 'PRUNING' | 'MEMO' | 'CUSTOM';

export type PlantEvent = {
  id: number;
  plantId: number;
  eventType: PlantEventType;
  customTitle: string | null;
  eventDate: string;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PlantEventRequest = {
  eventType: PlantEventType;
  customTitle?: string | null;
  eventDate: string;
  memo?: string | null;
  photoIds?: number[];
};
