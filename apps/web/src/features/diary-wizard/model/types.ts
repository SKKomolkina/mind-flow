export enum AnalysisStep {
  SITUATION = 'SITUATION',
  EMOTIONS_BEFORE = 'EMOTIONS_BEFORE',
  THOUGHT = 'THOUGHT',
  DISTORTIONS = 'DISTORTIONS',
  RATIONAL_ANSWER = 'RATIONAL_ANSWER',
  EMOTIONS_AFTER = 'EMOTIONS_AFTER',
}

export interface AnalysisSession {
  currentStep: AnalysisStep;
  data: {
    situation: string;
    moodsBefore: { emotionId: string; intensity: number }[];
    autoThought: string;
    beliefBefore: number;
    selectedDistortions: string[];
    rationalResponse: string;
    beliefAfter: number;
    moodsAfter: { emotionId: string; intensity: number }[];
  }
}
