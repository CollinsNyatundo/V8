import { LucideIcon } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
  icon: LucideIcon;
}

export interface ArticleMetadata {
  date: string;
  readTime: string;
  category: string;
}