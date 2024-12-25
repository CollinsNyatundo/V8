import { z } from 'zod';

export const postSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string()
    .min(1, 'Content is required'),
  image: z.string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  category: z.string()
    .min(1, 'Category is required'),
  status: z.enum(['published', 'draft']),
});

export const projectSchema = z.object({
  project_name: z.string()
    .min(1, 'Project name is required')
    .max(50, 'Project name must be less than 50 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
  technologies: z.array(z.string())
    .min(1, 'At least one technology is required'),
  github_url: z.string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  live_url: z.string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  thumbnail: z.string()
    .min(1, 'Thumbnail is required'),
  completion_date: z.date()
});