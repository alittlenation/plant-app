import { PlantEvent } from './event';
import { PlantPhoto } from './photo';

export type PlantSummary = {
  lastWateredAt: string | null;
  lastNutrientAt: string | null;
  lastRepottingAt: string | null;
  lastPruningAt: string | null;
  latestEventAt: string | null;
  eventCount: number;
  photoCount: number;
};

export type PlantListItem = {
  id: number;
  name: string;
  speciesName: string | null;
  nickname: string | null;
  coverPhotoUrl: string | null;
  lastWateredAt: string | null;
  latestEventAt: string | null;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PlantDetail = PlantListItem & {
  acquiredDate: string | null;
  memo: string | null;
  summary: PlantSummary;
  recentEvents: PlantEvent[];
  photos: PlantPhoto[];
};

export type PlantRequest = {
  name: string;
  speciesName?: string | null;
  nickname?: string | null;
  acquiredDate?: string | null;
  coverPhotoUrl?: string | null;
  memo?: string | null;
};
