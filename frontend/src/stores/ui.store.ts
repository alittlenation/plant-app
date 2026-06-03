import { create } from 'zustand';

type UiState = {
  toastMessage: string | null;
  viewerImageUrl: string | null;
  setToast: (message: string | null) => void;
  openViewer: (imageUrl: string) => void;
  closeViewer: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  toastMessage: null,
  viewerImageUrl: null,
  setToast: (message) => set({ toastMessage: message }),
  openViewer: (imageUrl) => set({ viewerImageUrl: imageUrl }),
  closeViewer: () => set({ viewerImageUrl: null }),
}));
