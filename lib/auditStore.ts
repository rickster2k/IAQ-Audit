// lib/auditStore.ts
import { create } from 'zustand';
import { UserResponse } from './types';

type AuditState = {
  responses: UserResponse[];
  setResponses: (res: UserResponse[]) => void;
  clearResponses: () => void;
};

export const useAuditStore = create<AuditState>((set) => ({
  responses: [],
  setResponses: (res) => set({ responses: res }),
  clearResponses: () => set({ responses: [] }),
}));
