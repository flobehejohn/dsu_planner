export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  address: string;
  type: ActionType;
  partners: Partner[];
  events: Event[];
}

export interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  logo?: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  socialMedia: SocialMedia[];
  comments?: string;
  category: string;
  role: PartnerRole;
  rate?: number;
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

export type PartnerRole = 'principal' | 'benevole' | 'prestataire';

export interface Event {
  id: string;
  projectId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: ActionType;
}

export type ActionType =
  | 'cultural'
  | 'educational'
  | 'social'
  | 'sport'
  | 'environmental'
  | 'economic'
  | 'civic';