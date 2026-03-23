import { api } from '@/shared/api/base.ts';

export interface EmotionDefinition {
  id: string;
  name: string;
  subtext?: string;
}

export interface CreateEntryPayload {
  situation: string;
  automaticThought: string;
  beliefBefore: number;
  distortions: string[];
  rationalResponse: string;
  beliefAfter: number;
  emotions: {
    emotionId: string;
    intensity: number;      // S2
    intensityAfter: number; // S6
  }[];
}

export interface JournalEntry extends CreateEntryPayload {
  id: string;
  createdAt: string;
  userId: string;
}

export const journalApi = {
  getEmotions: async (): Promise<EmotionDefinition[]> => {
    const { data } = await api.get<EmotionDefinition[]>('/emotions');
    return data;
  },

  create: async (payload: CreateEntryPayload): Promise<JournalEntry> => {
    const { data } = await api.post<JournalEntry>('/journal', payload);
    return data;
  },

  findAll: async (): Promise<JournalEntry[]> => {
    const { data } = await api.get<JournalEntry[]>('/journal');
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/journal/${id}`);
  },

  getDistortions: () => api.get('/journal/distortions').then(res => res.data),
};
