import { create } from 'zustand';
import { PlantRequest } from '@/types/plant';

type PlantFormState = PlantRequest & {
  setField: <K extends keyof PlantRequest>(key: K, value: PlantRequest[K]) => void;
  reset: () => void;
};

const initialState: PlantRequest = {
  name: '',
  speciesName: '',
  nickname: '',
  acquiredDate: null,
  coverPhotoUrl: '',
  memo: '',
};

export const usePlantFormStore = create<PlantFormState>((set) => ({
  ...initialState,
  setField: (key, value) => set({ [key]: value }),
  reset: () => set(initialState),
}));
