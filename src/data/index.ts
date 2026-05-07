import contentData from './content.json';
import skillsData from './skills.json';
import experienceData from './experience.json';
import projectsData from './projects.json';
import achievementsData from './achievements.json';

import type {
  PersonalInfo,
  Skill,
  SkillCategory,
  Experience,
  Project,
  ProjectCategory,
  Stat,
  NavItem,
} from './types';

export const personal: PersonalInfo = contentData.personal;
export const stats: Stat[] = contentData.stats;
export const navigation: NavItem[] = contentData.navigation;

export const skills: Skill[] = skillsData.skills as Skill[];
export const skillCategories: Record<SkillCategory, string> =
  skillsData.categories as Record<SkillCategory, string>;

export const experience: Experience[] = experienceData.experience as Experience[];

export const projects: Project[] = projectsData.projects as Project[];
export const projectCategories: Record<ProjectCategory, string> =
  projectsData.categories as Record<ProjectCategory, string>;

export const achievements = achievementsData.achievements;
export const testimonials = achievementsData.testimonials;

export type {
  PersonalInfo,
  Skill,
  SkillCategory,
  Experience,
  Project,
  ProjectCategory,
  Stat,
  NavItem,
} from './types';
