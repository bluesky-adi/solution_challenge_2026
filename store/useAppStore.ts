import { create } from 'zustand';
import { Asset, Violation } from '@/lib/types';

interface AppState {
  user: { uid: string; displayName: string; email: string } | null;
  assets: Asset[];
  violations: Violation[];
  setUser: (user: AppState['user']) => void;
  addAsset: (asset: Asset) => void;
  updateAssetStatus: (id: string, status: Asset['status']) => void;
  resolveViolation: (id: string) => void;
  ignoreViolation: (id: string) => void;
}

// Seed data based on SRS
const initialAssets: Asset[] = [];

const initialViolations: Violation[] = [];

export const useAppStore = create<AppState>((set) => ({
  user: null,
  assets: initialAssets,
  violations: initialViolations,
  setUser: (user) => set({ user }),
  addAsset: (asset) => set((state) => ({ assets: [asset, ...state.assets] })),
  updateAssetStatus: (id, status) => set((state) => ({
    assets: state.assets.map((a) => (a.id === id ? { ...a, status } : a)),
  })),
  resolveViolation: (id) => set((state) => ({
    violations: state.violations.map((v) => (v.id === id ? { ...v, status: 'resolved' } : v)),
  })),
  ignoreViolation: (id) => set((state) => ({
    violations: state.violations.map((v) => (v.id === id ? { ...v, status: 'ignored' } : v)),
  })),
}));
