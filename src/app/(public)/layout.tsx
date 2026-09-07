/*
 --> However proxy runs on every client side navigation:
 --> but proxy doesn't run on clicking back/forward button
 --> so we need to use client side mechanism to redirect user from public -> private on loggedin
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/useAuthStore';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname();
   const Router = useRouter();
   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

   // FOR PUBLIC ROUTES: prevent accessing public pages while loggedin by clicking on the browser back button
   useEffect(() => {
      if (isLoggedIn) {
         Router.replace('/dashboard/profile');
      }
   }, [pathname]);

   const isPublicPage = [
      '/',
      '/auth',
      '/auth/verify-email',
      '/auth/resend-verification-email',
      '/auth/forgot-password',
      '/auth/reset-password',
   ].includes(pathname);

   return (
      <>
         <div className="flex flex-col justify-between min-h-screen">
            {isPublicPage && <Header />}
            {children}
            {isPublicPage && <Footer />}
         </div>
      </>
   );
};

export default PublicLayout;
