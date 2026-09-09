'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, LogOut, MenuIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import ThemeToggler from './ThemeToggler';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuthStore } from '@/store/useAuthStore';
import Logo from './Logo';
import { CanvasText } from '../ui/canvas-text';
import logoutUserAction from '@/actions/logout';

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const pathName = usePathname();
   const Router = useRouter();

   const isMobile = useIsMobile();
   const { toggleMobile } = useSidebarStore();
   const setAuth = useAuthStore((state) => state.setAuth);

   const currentPage = pathName?.split('/')[2]?.toUpperCase();
   const isLoggedIn = pathName.startsWith('/dashboard');

   useEffect(() => {
      const handleScroll = () => {
         const scrolled = window.scrollY > 70;
         setIsScrolled(scrolled);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

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

   return (
      <header
         className={cn(
            'sticky top-0 z-30 h-12 transition-all duration-300 ',
            (isScrolled || isLoggedIn) && 'bg-background/50  backdrop-blur-2xl',
         )}
      >
         <div className="flex-center h-full justify-between px-4 sm:px-6 md:px-10">
            <section className="flex-center gap-2">
               {/* Mobile menu button when user is logged in */}
               {isLoggedIn && (
                  <Button
                     variant="ghost"
                     size="icon-sm"
                     onClick={toggleMobile}
                     className="text-foreground lg:hidden"
                  >
                     <MenuIcon className="size-5" />
                     <span className="sr-only">Open menu</span>
                  </Button>
               )}
               {/* Display logo on public pages */}
               {!isLoggedIn && <Logo />}

               {/* Display current page title on private pages */}
               {isLoggedIn && (
                  <CanvasText
                     text={currentPage}
                     backgroundClassName="bg-primary"
                     colors={[
                        'rgba(0, 153, 255, 1)',
                        'rgba(0, 153, 255, 0.9)',
                        'rgba(0, 153, 255, 0.8)',
                        'rgba(0, 153, 255, 0.7)',
                        'rgba(0, 153, 255, 0.6)',
                        'rgba(0, 153, 255, 0.5)',
                        'rgba(0, 153, 255, 0.4)',
                        'rgba(0, 153, 255, 0.3)',
                        'rgba(0, 153, 255, 0.2)',
                        'rgba(0, 153, 255, 0.1)',
                     ]}
                     lineGap={4}
                     animationDuration={20}
                  />
               )}
            </section>

            <section className="flex-center gap-2">
               {isLoggedIn && !isMobile && (
                  <Button
                     onClick={handleLogoutClick}
                     className="hidden gap-1 xsm:flex-center"
                     variant="destructive"
                  >
                     <span>Logout</span>
                     <LogOut />
                  </Button>
               )}

               <ThemeToggler />

               {!isLoggedIn && (
                  <Link href="/auth">
                     <Button className="hidden gap-1 xsm:flex-center">
                        <span>Login</span>
                        <ArrowUpRight />
                     </Button>
                  </Link>
               )}
            </section>
         </div>
      </header>
   );
};

export default Header;
