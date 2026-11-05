export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceRequired: string;
  projectDescription: string;
  estimatedBudget: string;
  expectedTimeline: string;
  privacyConsent: boolean;
}
