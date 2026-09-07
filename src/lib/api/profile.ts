import { apiRequest } from './client';
import type { FetchedUser, FetchedUserProfile } from '@/@types/auth';

// Merged public profile (user+profile flattened on backend) — reuses existing types
// backend returns { name, username, avatar, bio, socialIconPosition, theme, links }
// derived from FetchedUser + FetchedUserProfile to stay in sync
//export type PublicProfile = Pick<FetchedUser, 'name' | 'username' | 'avatar'> &
//   Pick<FetchedUserProfile, 'bio' | 'socialIconPosition' | 'theme' | 'links'>;

export type PublicProfile = Pick<FetchedUser, 'name' | 'username' | 'avatar'> &
   Pick<FetchedUserProfile, 'bio' | 'theme' | 'links'> & {
      socialIconPosition: FetchedUserProfile['socialIconPosition'];
   };

export interface PublicProfileResponse {
   success: boolean;
   message: string;
   data?: {
      profile: PublicProfile;
   };
}

export const publishProfile = async () => {
   try {
      const result = await apiRequest<PublicProfileResponse>(
         `/profile/publish`,
         {
            method: 'PATCH',
            body: {},
         },
      );

      console.log({ publish: result });
      return result;
   } catch (error) {
      return {
         response: new Response(null, { status: 500 }),
         body: { success: false, message: 'Failed to publish profile' },
      };
   }
};

export async function getPublicProfile(
   headers: { Cookie: string },
   username: string,
) {
   try {
      const result = await apiRequest<PublicProfileResponse>(
         `/profile/${username}`,
         {
            method: 'GET',
            headers,
         },
      );

      return result;
   } catch (error) {
      return {
         response: new Response(null, { status: 500 }),
         body: { success: false, message: 'Failed to fetch profile' },
      };
   }
}
