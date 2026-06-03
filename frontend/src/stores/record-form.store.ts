import { create } from 'zustand';
import { PlantEventType } from '@/types/event';
import { todayIsoDate } from '@/utils/date';

type RecordMode = 'EVENT' | 'PHOTO';

type RecordFormState = {
  mode: RecordMode;
  plantId: number | null;
  eventType: PlantEventType;
  customTitle: string;
  date: string;
  memo: string;
  photoUrl: string;
  setMode: (mode: RecordMode) => void;
  setPlantId: (plantId: number) => void;
  setEventType: (eventType: PlantEventType) => void;
  setField: (key: 'customTitle' | 'date' | 'memo' | 'photoUrl', value: string) => void;
  reset: () => void;
};

const initialState = {
  mode: 'EVENT' as RecordMode,
  plantId: null,
  eventType: 'WATERING' as PlantEventType,
  customTitle: '',
  date: todayIsoDate(),
  memo: '',
  photoUrl: '',
};

export const useRecordFormStore = create<RecordFormState>((set) => ({
  ...initialState,
  setMode: (mode) => set({ mode }),
  setPlantId: (plantId) => set({ plantId }),
  setEventType: (eventType) => set({ eventType }),
  setField: (key, value) => set({ [key]: value }),
  reset: () => set({ ...initialState, date: todayIsoDate() }),
}));
