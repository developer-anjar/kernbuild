export interface Feedback {
  fullName: string;
  email: string;
  projectType: string;
  overallExperience: number;
  communicationQuality: number;
  workQuality: number;
  wouldRecommend: boolean | null;
  feedbackMessage: string;
  suggestion?: string;
  privacyConsent: boolean;
}
