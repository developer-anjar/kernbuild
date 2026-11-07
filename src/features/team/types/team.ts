export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  title: string;
  accentColor: string;
  profileImage: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  dummy: boolean;
}
