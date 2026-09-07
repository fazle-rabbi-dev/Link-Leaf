// ssr to fill the form on server side to prevent blank form input value on first load
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getLoggedInUser } from '@/lib/api/auth';
import type { FetchedUserSuccessResponse } from '@/@types/auth';
import ProfileClient from './profile-client';

export const metadata: Metadata = {
   title: 'Profile',
};

const ProfilePage = async () => {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('accessToken');

   // prepare cookie header to forward accessToken as cookie to backend with fetch request
   const headers = {
      Cookie: `accessToken=${accessToken?.value || ''}`,
   };

   const { body } = await getLoggedInUser(headers, 'profile');
   const userData = body.data as FetchedUserSuccessResponse['data'];

   return (
      <main className="max-body">
         <header className="mb-8">
            <h1 className="heading-1 text-foreground">Profile Details</h1>
            <p className="text-sm text-muted-foreground">
               Customize your display info. Changes reflect in the preview
               immediately.
            </p>
         </header>

         <ProfileClient userData={userData} />
      </main>
   );
};

export default ProfilePage;
