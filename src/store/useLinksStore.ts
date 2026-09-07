import { create } from 'zustand';

import type { SocialLink, CustomLink, Links } from '@/@types/links';
import logger from '@/lib/logger';

interface LinksState {
   socialLinks: SocialLink[];
   customLinks: CustomLink[];

   // bulk
   setLinks: (links: Links) => void;
   getLinks: () => Links;

   setSocialLinks: (links: SocialLink[]) => void;
   setCustomLinks: (links: CustomLink[]) => void;

   // social CRUD — call these after API success to keep UI/preview in sync
   addSocialLinkToStore: (link: SocialLink) => void;
   updateSocialLinkToStore: (link: SocialLink) => void;
   deleteSocialLinkToStore: (id: string) => void;
   reorderSocialLinksToStore: (links: SocialLink[]) => void;

   // custom CRUD
   addCustomLinkToStore: (link: CustomLink) => void;
   updateCustomLinkToStore: (link: CustomLink) => void;
   deleteCustomLinkToStore: (id: string) => void;
   reorderCustomLinksToStore: (links: CustomLink[]) => void;

   reset: () => void;
}

const initialState = {
   socialLinks: [],
   customLinks: [],
};

export const useLinksStore = create<LinksState>((set, get) => ({
   ...initialState,

   // ok
   setLinks: (links) =>
      set({
         socialLinks: links.social,
         customLinks: links.custom,
      }),

   // ok
   getLinks: () => ({
      social: get().socialLinks,
      custom: get().customLinks,
   }),

   setSocialLinks: (socialLinks) => set({ socialLinks }),
   setCustomLinks: (customLinks) => set({ customLinks }),

   // social CRUD
   addSocialLinkToStore: (link) =>
      set((state) => ({
         socialLinks: [...state.socialLinks, link],
      })),

   updateSocialLinkToStore: (link) =>
      set((state) => ({
         socialLinks: state.socialLinks.map((item) =>
            item._id === link._id ? { ...item, ...link } : item,
         ),
      })),

   deleteSocialLinkToStore: (id) => {
      console.debug({ id });
      logger.info(get().socialLinks);
      logger.info(get().socialLinks.filter((item) => item._id !== id));

      return set((state) => ({
         socialLinks: state.socialLinks.filter((item) => item._id !== id),
      }));
   },

   reorderSocialLinksToStore: (links) => set({ socialLinks: links }),

   // custom CRUD
   addCustomLinkToStore: (link) =>
      set((state) => ({
         customLinks: [...state.customLinks, link],
      })),

   updateCustomLinkToStore: (link) =>
      set((state) => ({
         customLinks: state.customLinks.map((item) =>
            item._id === link._id ? { ...item, ...link } : item,
         ),
      })),

   deleteCustomLinkToStore: (id) =>
      set((state) => ({
         customLinks: state.customLinks.filter((item) => item._id !== id),
      })),

   reorderCustomLinksToStore: (links) => set({ customLinks: links }),

   reset: () => set(initialState),
}));
