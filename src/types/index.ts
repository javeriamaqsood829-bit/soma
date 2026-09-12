export interface SiteSettings {
  id?: string;
  brandName: string;
  ownerName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  shortBio: string;
  cvUrl: string;
  profileImage: string;
  primaryAccent: string;
  secondaryAccent: string;
  backgroundColor: string;
  footerText?: string;
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    whatsapp?: string;
    email?: string;
  };
  sectionOrder: string[];
  enabledSections: Record<string, boolean>;
  updatedAt?: string;
}

export interface HeroData {
  id?: string;
  badge: string;
  mainHeading: string;
  highlightedHeading: string;
  description: string;
  profileImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustTags: string[];
  updatedAt?: string;
}

export interface AboutData {
  id?: string;
  heading: string;
  subtitle: string;
  description: string;
  approach: string;
  profileImage: string;
  cvUrl: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
    prefix?: string;
  }[];
  skillsSummary: string[];
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  displayOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'marketing' | 'creative' | 'tools';
  percentage: number;
  icon?: string;
  displayOrder: number;
  published: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  location: string;
  description: string;
  responsibilities?: string[];
  achievements: string[];
  tools?: string[];
  skillsUsed?: string[];
  logoUrl?: string;
  displayOrder: number;
  published?: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate?: string;
  endDate?: string;
  startYear?: string;
  endYear?: string;
  fieldOfStudy?: string;
  grade?: string;
  description: string;
  displayOrder: number;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  certificateUrl?: string;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: 'Branding' | 'Marketing' | 'Print Design' | 'UI/UX' | 'Social Media' | 'SEO' | 'Content Marketing' | 'Paid Advertising' | 'Web Marketing' | 'Campaigns' | 'Other' | string;
  client: string;
  date?: string;
  timeline?: string;
  role?: string;
  summary?: string;
  shortDescription?: string;
  fullDescription?: string;
  challenge: string;
  strategy?: string;
  solution: string;
  results: string | { metric: string; value: string; }[];
  metrics?: {
    label: string;
    value: string;
  }[];
  services?: string[];
  tools?: string[];
  toolsUsed?: string[];
  deliverables?: string[];
  coverImage: string;
  gallery?: string[];
  galleryImages?: string[];
  projectUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResultMetric {
  id: string;
  number?: string;
  value?: string;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  icon?: string;
  displayOrder: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientPosition?: string;
  clientRole?: string;
  company: string;
  avatarUrl?: string;
  rating: number;
  quote: string;
  date?: string;
  featured?: boolean;
  published: boolean;
  displayOrder: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface MediaItem {
  id: string;
  fileName: string;
  fileType: string;
  url: string;
  size?: number;
  createdAt: string;
}

export interface SeoSettings {
  id?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string | string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage: string;
  twitterCard?: string;
  canonicalUrl?: string;
}
