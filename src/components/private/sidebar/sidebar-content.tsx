'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
   CopyIcon,
   EyeIcon,
   PanelLeftIcon,
   type LucideIcon,
   LogOutIcon,
} from 'lucide-react';
import { useEffect } from 'react';

import { cn, copyToClipboard } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebarStore } from '@/store/useSidebarStore';
import { logoutUser } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import Logo from '@/components/shared/Logo';
import { Card, CardContent } from '@/components/ui/card';
import { navItems } from '@/constants/navigaiton';
import { FetchedUser } from '@/@types/auth';
import { useShallow } from 'zustand/shallow';
import { PUBLIC_PROFILE_URL } from '@/constants';
import { useAppearanceStore } from '@/store/useAppearanceStore';
import { toast } from 'sonner';
import logoutUserAction from '@/actions/logout';

interface NavLinkProps {
   href: string;
   icon: LucideIcon;
   label: string;
   isActive: boolean;
   isCollapsed: boolean;
   onClick?: () => void;
}

interface SidebarContentProps {
   onClose?: () => void;
   isCollapsed?: boolean;
}

function NavLink({
   href,
   icon: Icon,
   label,
   isActive,
   isCollapsed,
   onClick,
}: NavLinkProps) {
   return (
      <Link
         href={href}
         onClick={onClick}
         className={cn(
            'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
            isCollapsed ? 'justify-center' : 'gap-3',
            isActive
               ? 'bg-foreground text-background'
               : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
         )}
      >
         <Icon className="size-4 shrink-0" />
         {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
      </Link>
   );
}

/* 
   # Take isCollapsed as a prop to determine whether to render the collapsed or expanded sidebar content for non mobile screen
*/
export function SidebarContent({
   onClose,
   isCollapsed = false,
}: SidebarContentProps) {
   const pathname = usePathname();
   const Router = useRouter();
   const { toggleCollapsed, isMobileOpen } = useSidebarStore();
   const togglePreview = useAppearanceStore((s) => s.togglePreview);
   const togglePreviewInMobile = useAppearanceStore(
      (s) => s.togglePreviewInMobile,
   );

   const { isLoggedIn, loggedInUser, profile, setAuth } = useAuthStore(
      useShallow((state) => ({
         isLoggedIn: state.isLoggedIn,
         loggedInUser: state.user,
         profile: state.profile,
         setAuth: state.setAuth,
      })),
   );

   const { avatar, name, username } = (loggedInUser as FetchedUser) || {};

   // Hotkey: Press 's' to toggle sidebar
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 's' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            // Don't trigger if user is typing in an input/textarea
            const target = e.target as HTMLElement;
            if (
               target.tagName === 'INPUT' ||
               target.tagName === 'TEXTAREA' ||
               target.isContentEditable
            ) {
               return;
            }
            toggleCollapsed();
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, []);

   const handleToggleSidebar = () => {
      if (isMobileOpen) {
         onClose?.();
      } else {
         toggleCollapsed();
      }
   };

   const handleLogoutClick = async () => {
      // Important: if user on profile page -> when logout action get executed -> cookies will get cleared -> and automatically get re-executed the profile page since it is depend on cookies to fetch profile
      const body = await logoutUserAction();

      if (body?.success) {
         toast.success('Logout successful');
         setAuth({
            user: null,
            profile: null,
            isLoggedIn: false,
         });
         Router.push('/auth');
      } else {
         toast.error('Logout failed');
      }
   };

   const handleCopyUrl = async () => {
      const url = PUBLIC_PROFILE_URL(loggedInUser?.username);
      const ok = await copyToClipboard(url);
      if (ok) {
         toast.success('Copied to clipboard');
      } else {
         toast.error('Failed to copy to clipboard');
      }
   };

   //
   const handleProfilePreview = () => {
      if (isMobileOpen) {
         togglePreviewInMobile();
      } else {
         togglePreview();
      }
      handleToggleSidebar();
   };

   console.log({
      loggedInUser,
      profile,
   });

   return (
      <TooltipProvider>
         <div className="flex h-full flex-col overflow-auto">
            {/* Header with Toggle Button */}
            <div
               className={cn(
                  'flex items-center justify-between border-sidebar-border px-4 h-12',
                  isCollapsed && 'border-b',
               )}
            >
               <div
                  className={cn(
                     'flex items-center gap-2 transition-all duration-1000 ease-in-out overflow-x-hidden whitespace-nowrap',
                     isCollapsed ? 'opacity-0 max-w-4' : 'opacity-100 max-w-40',
                  )}
               >
                  <Logo />
               </div>

               {/* Collapsed Sidebar Toggle Button */}
               {isCollapsed ? (
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon-lg"
                           onClick={handleToggleSidebar}
                           className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
                        >
                           <PanelLeftIcon className="size-6" />
                           <span className="sr-only">Expand sidebar</span>
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="right" sideOffset={10}>
                        Expand sidebar
                     </TooltipContent>
                  </Tooltip>
               ) : (
                  <Button
                     variant="ghost"
                     size="icon-lg"
                     onClick={handleToggleSidebar}
                     className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  >
                     <PanelLeftIcon className="size-6" />
                     <span className="sr-only">Collapse sidebar</span>
                  </Button>
               )}
            </div>

            {/* User Profile Card */}
            {!isCollapsed && (
               <div className="mx-4 mt-4 rounded-xl border border-sidebar-border bg-muted p-4">
                  <div className="flex items-center gap-3">
                     <Avatar size="lg">
                        <AvatarImage src={avatar || undefined} alt={name} />
                        <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                           {name
                              ?.split(' ')
                              .map((n) => n[0])
                              .join('')}
                        </AvatarFallback>
                     </Avatar>
                     <div className="min-w-0 overflow-hidden">
                        <p className="font-semibold text-foreground truncate">
                           {loggedInUser?.name}
                        </p>
                        <p className="text-xs text-foreground/70 truncate">
                           ShareableUrl
                        </p>
                        <code className="text-xs text-foreground/70 truncate">
                           {PUBLIC_PROFILE_URL(loggedInUser?.username)}
                        </code>
                     </div>
                  </div>
               </div>
            )}
            {/* Collapsed Avatar */}
            {isCollapsed && (
               <div className="flex justify-center mt-4">
                  <Avatar size="lg">
                     <AvatarImage
                        src={avatar || undefined}
                        alt={isCollapsed ? name : ''}
                     />
                     <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                        {name
                           ?.split(' ')
                           .map((n) => n[0])
                           .join('')}
                     </AvatarFallback>
                  </Avatar>
               </div>
            )}
            {/* Navigation */}
            <nav className="flex-1 px-4 mt-6">
               <ul className="space-y-1">
                  {navItems.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <li onClick={onClose} key={item.href}>
                           {isCollapsed ? (
                              <Tooltip>
                                 <TooltipTrigger asChild>
                                    <span className="block">
                                       <NavLink
                                          href={item.href}
                                          icon={item.icon}
                                          label={item.label}
                                          isActive={isActive}
                                          isCollapsed={isCollapsed}
                                       />
                                    </span>
                                 </TooltipTrigger>
                                 <TooltipContent side="right" sideOffset={10}>
                                    {item.label}
                                 </TooltipContent>
                              </Tooltip>
                           ) : (
                              <NavLink
                                 href={item.href}
                                 icon={item.icon}
                                 label={item.label}
                                 isActive={isActive}
                                 isCollapsed={isCollapsed}
                              />
                           )}
                        </li>
                     );
                  })}
               </ul>
            </nav>

            {/* Bottom Section */}
            {!isCollapsed && (
               <div className="mt-auto border-sidebar-border p-4">
                  <Card className="mb-4 relative">
                     <CardContent>
                        <p className="text-xs font-semibold text-sidebar-foreground/70 tracking-wider whitespace-nowrap">
                           YOUR SHAREABLE URL
                        </p>
                        <p className="text-sm font-medium text-sidebar-foreground truncate">
                           {PUBLIC_PROFILE_URL(loggedInUser?.username)}
                        </p>
                     </CardContent>

                     <div className="absolute top-1 right-1 flex gap-2 items-center">
                        <Button
                           variant="outline"
                           className="flex-1 h-10"
                           onClick={handleCopyUrl}
                        >
                           <CopyIcon className="size-4 mr-1.5" />
                        </Button>
                     </div>
                  </Card>

                  <div className="flex-center gap-2">
                     {isMobileOpen && isLoggedIn && (
                        <Button
                           variant="destructive"
                           className="my-3 flex-1 h-10"
                           onClick={handleLogoutClick}
                        >
                           <LogOutIcon className="size-4" />
                           <span className="">Logout</span>
                        </Button>
                     )}

                     <Button
                        variant="default"
                        className="flex-1 h-10 bg-primary hover:bg-primary/90"
                        onClick={handleProfilePreview}
                     >
                        <EyeIcon className="size-4 mr-1.5" />
                        <span>Preview</span>
                     </Button>
                  </div>
               </div>
            )}
            {/* Collapsed Bottom Icons */}
            {isCollapsed && (
               <div className="mt-auto border-t border-sidebar-border p-4 flex flex-col items-center gap-2">
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon-sm"
                           className="text-sidebar-foreground"
                           onClick={handleCopyUrl}
                        >
                           <CopyIcon className="size-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="right" sideOffset={10}>
                        Copy URL
                     </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon-sm"
                           className="text-sidebar-foreground"
                           onClick={togglePreview}
                        >
                           <EyeIcon className="size-4" />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="right" sideOffset={10}>
                        Preview
                     </TooltipContent>
                  </Tooltip>
               </div>
            )}
         </div>
      </TooltipProvider>
   );
}
