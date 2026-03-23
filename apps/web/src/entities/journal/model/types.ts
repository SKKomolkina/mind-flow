export interface JournalEntry {
  id: string;
  situation: string;
  automaticThought: string;
  beliefBefore: number;
  beliefAfter: number;
  emotion: string;
  intensity: number;
  distortions?: string[];
  rationalResponse?: string;
  createdAt?: string;
}
