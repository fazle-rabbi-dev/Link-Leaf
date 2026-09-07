// Although this is a client component, we can still use server component features inside private pages and that pages automatically passes as children to this client component (layout). Since Next.js allows this, making this layout a client component does not opt out of server component features for its children.

'use client';

import { getLoggedInUser } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useLinksStore } from '@/store/useLinksStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthHydrate = ({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) => {
   const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
   const isLoading = useAuthStore((state) => state.isLoading);
   const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

   const Router = useRouter();

   useEffect(() => {
      hydrateAuth();
   });
   // ? empty dependency array to run only once at first mount

   // prevent browser back button taking to private page after logout
   useEffect(() => {
      if (!isLoading && !isLoggedIn) Router.replace('/auth');
   }, []);

   return <div>{children}</div>;
};

export default AuthHydrate;
