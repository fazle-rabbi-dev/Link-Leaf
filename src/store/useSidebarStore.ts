import { create } from 'zustand';

interface SidebarState {
   isMobileOpen: boolean;
   isCollapsed: boolean;
   setIsMobileOpen: (value: boolean) => void;
   toggleMobile: () => void;
   setIsCollapsed: (value: boolean) => void;
   toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
   isMobileOpen: false,
   isCollapsed: true,

   setIsMobileOpen: (value) => set({ isMobileOpen: value }),
   setIsCollapsed: (value) => set({ isCollapsed: value }),

   toggleMobile: () =>
      set((state) => {
         console.log('toggle mobile fires', {
            isMobileOpen: state.isMobileOpen,
            isCollapsed: state.isCollapsed,
         });

         return { isMobileOpen: !state.isMobileOpen };
      }),
   toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));
