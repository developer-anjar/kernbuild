export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}
