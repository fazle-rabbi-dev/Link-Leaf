import { FetchedUser, FetchedUserProfile } from '@/@types/auth';
import { getLoggedInUser } from '@/lib/api/auth';
import logger from '@/lib/logger';
import { create } from 'zustand';
import { useAppearanceStore } from './useAppearanceStore';
import { useLinksStore } from './useLinksStore';

interface AuthState {
   isLoading: boolean;
   isLoggedIn: boolean;
   user: FetchedUser | null;
   profile: FetchedUserProfile | null;

   hydrateAuth: () => Promise<void>;
   setAuth: (data: Partial<Omit<AuthState, 'setAuth' | 'resetAuth'>>) => void;
   resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
   isLoading: true,
   isLoggedIn: false,
   user: null,
   profile: null,

   hydrateAuth: async () => {
      logger.info('🔥 AuthHydrate: hydrate fired');

      try {
         const { body } = await getLoggedInUser({}, 'authhydrate');

         if (body.success) {
            set({
               user: body.data.user,
               profile: body.data.profile,
               isLoggedIn: true,
            });

            useLinksStore.getState().setLinks(body.data.profile.links);
            useAppearanceStore
               .getState()
               .hydrateFromTheme(
                  body.data.profile.theme,
                  body.data.profile.socialIconPosition,
               );
         }
      } catch (error) {
         logger.error('🔥 AuthHydrate: hydrate: catch:', error);
      } finally {
         set({
            isLoading: false,
         });
      }
   },

   setAuth: (data) =>
      set((state) => {
         // console.log('setauth called with:', data);

         return {
            ...state,
            ...data,
         };
      }),
   resetAuth: () =>
      set({
         isLoggedIn: false,
         user: null,
         profile: null,
         isLoading: false,
      }),
}));
