'use client';

import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { SidebarContent } from './sidebar-content';
import { useSidebarStore } from '@/store/useSidebarStore';

interface SidebarProps {
   className?: string;
}

export function Sidebar({ className }: SidebarProps) {
   const { isCollapsed, isMobileOpen, toggleMobile, setIsMobileOpen } =
      useSidebarStore();

   return (
      <>
         {/* Mobile Sidebar (Sheet) - only visible on mobile */}
         <Sheet open={isMobileOpen} onOpenChange={toggleMobile}>
            <SheetContent
               side="left"
               className="w-72 p-0 bg-sidebar lg:hidden"
               showCloseButton={false}
            >
               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               <SidebarContent onClose={toggleMobile} />
            </SheetContent>
         </Sheet>

         {/* Desktop Sidebar - only visible on desktop */}
         <aside
            className={cn(
               'hidden lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:z-40 lg:flex lg:flex-col lg:border-r lg:border-sidebar-border lg:bg-sidebar',
               'transition-all duration-300 ease-in-out',
               isCollapsed ? 'lg:w-[72px]' : 'lg:w-72',
               className,
            )}
         >
            <SidebarContent isCollapsed={isCollapsed} />
         </aside>
      </>
   );
}
