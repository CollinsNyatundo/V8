import { LucideIcon } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  icon: LucideIcon;
  github: string;
  category: string;
}