import {
   LinkIcon,
   UserIcon,
   PaletteIcon,
   BarChart3Icon,
   SettingsIcon,
} from 'lucide-react';

export const navItems = [
   {
      label: 'PROFILE',
      href: '/dashboard/profile',
      icon: UserIcon,
   },
   {
      label: 'LINKS',
      href: '/dashboard/links',
      icon: LinkIcon,
   },
   {
      label: 'APPEARANCE',
      href: '/dashboard/appearance',
      icon: PaletteIcon,
   },
   {
      label: 'ANALYTICS',
      href: '/dashboard/analytics',
      icon: BarChart3Icon,
   },
   {
      label: 'SETTINGS',
      href: '/dashboard/settings',
      icon: SettingsIcon,
   },
];
