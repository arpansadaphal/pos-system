import { create } from "zustand";

interface NetworkState {
  isOnline: boolean;
  setOnline: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: navigator.onLine,

  setOnline: (status) => set({ isOnline: status }),
}));