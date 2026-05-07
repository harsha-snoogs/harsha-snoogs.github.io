export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  proficiency: number;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'css'
  | 'state'
  | 'tools'
  | 'apis';

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  achievements?: Achievement[];
}

export interface Achievement {
  metric: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type ProjectCategory = 'fintech' | 'web3' | 'tools' | 'web' | 'all';

export interface Stat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
