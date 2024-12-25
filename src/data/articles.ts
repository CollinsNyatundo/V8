import { FileText, Brain, LineChart, Database, Code } from 'lucide-react';
import { Article } from '../types/article';

export const articles: Article[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    excerpt: 'Explore the basics of machine learning and its applications in data science.',
    content: '# Introduction to Machine Learning\n\nMachine learning is revolutionizing...',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Machine Learning',
    slug: 'intro-to-machine-learning',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: Brain
  },
  {
    id: '2',
    title: 'Data Visualization Techniques',
    excerpt: 'Learn effective data visualization techniques to communicate insights.',
    content: '# Data Visualization Techniques\n\nEffective data visualization is key...',
    date: '2024-03-22',
    readTime: '7 min read',
    category: 'Data Analysis',
    slug: 'data-visualization-techniques',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: LineChart
  },
  {
    id: '3',
    title: 'SQL Best Practices',
    excerpt: 'Master SQL query optimization and database management techniques.',
    content: '# SQL Best Practices\n\nWriting efficient SQL queries is crucial...',
    date: '2024-03-29',
    readTime: '6 min read',
    category: 'Database',
    slug: 'sql-best-practices',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    icon: Database
  }
];