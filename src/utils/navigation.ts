export const navItems = [
  { name: 'Home', to: 'home' },
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Articles', to: 'blog' },
  { name: 'Contact', to: 'contact' },
] as const;

export type NavItem = typeof navItems[number];