export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'institutional' | 'infrastructure' | 'agricultural';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryName: string;
  location: string;
  areaSqm: number;
  durationMonths: number;
  costVariance: string; // e.g. "-3.5%"
  completedYear: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  clientName: string;
  architect: string;
  qsLead: string;
  status: 'Completed' | 'Under Construction' | 'Planning';
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  email: string;
  linkedin: string;
  badge: string;
  imageBgColor: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  featured?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CostEstimateInput {
  sector: string;
  location: string;
  areaSqm: number;
  specLevel: 'Standard' | 'Premium' | 'Luxury';
  currency: 'KES' | 'USD';
}

export interface CostEstimateResult {
  minConstructionCost: number;
  maxConstructionCost: number;
  architecturalFee: number;
  qsFee: number;
  totalProfessionalFees: number;
  integratedSavingsEstimate: number;
  estimatedDurationMonths: number;
  approvalTimeWeeks: number;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}
