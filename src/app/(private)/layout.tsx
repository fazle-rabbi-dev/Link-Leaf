'use client';

import Header from '@/components/shared/Header';
import { Sidebar } from '@/components/private/sidebar';
import { useSidebarStore } from '@/store/useSidebarStore';
import { cn } from '@/lib/utils';
import AuthHydrate from '@/components/shared/AuthHydrate';
import ProfilePreview from '@/components/shared/ProfilePreview';

function DashboardContent({ children }: { children: React.ReactNode }) {
   const { isCollapsed } = useSidebarStore();

   return (
      <div className="min-h-screen">
         {/* Left -- Sidebar */}
         <Sidebar />

         {/* Right -- Header + Main (stacked vertically) */}
         <div
            className={cn(
               'min-h-screen transition-all duration-300 ease-in-out',
               isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-72',
            )}
         >
            {/* Sticky at top */}
            <Header />

            {/* Main content */}
            <div className="pt-6 pb-20">
               {children}
               <ProfilePreview />
            </div>
         </div>
      </div>
   );
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <AuthHydrate>
         {/* this will open a normal connection and without crossOrigin it will reuse correctly */}
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         {/* for fonts: font accessed via: "cors + no-credentials" mode; so, to reuse connection, need to open connection with same mode */}
         <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous" // this controlls 2 mode at once: cors (req happens in cors mode) + credentials-included/no-credentials
         />
         <DashboardContent>{children}</DashboardContent>
      </AuthHydrate>
   );
};

export default DashboardLayout;
