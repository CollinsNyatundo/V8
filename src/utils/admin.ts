import { LayoutDashboard, FileText, Image, MessageSquare, Settings } from 'lucide-react';

export const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: FileText, label: 'Blog Posts', path: '/admin/posts' },
  { icon: Image, label: 'Projects', path: '/admin/projects' },
  { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
] as const;

export type AdminNavItem = typeof adminNavItems[number];