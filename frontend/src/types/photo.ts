export type PlantPhoto = {
  id: number;
  plantId: number;
  eventId: number | null;
  photoUrl: string;
  takenAt: string;
  memo: string | null;
  sortOrder: number | null;
  createdAt: string;
  updatedAt: string;
};

export type PlantPhotoRequest = {
  eventId?: number | null;
  photoUrl: string;
  takenAt: string;
  memo?: string | null;
  sortOrder?: number | null;
};
