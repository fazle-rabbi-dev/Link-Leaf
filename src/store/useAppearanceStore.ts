import { create } from 'zustand';
import { toast } from 'sonner';

import {
   BACKGROUND_COLORS,
   BACKGROUND_GRADIENTS,
   BUTTON_BG_COLORS,
   BUTTON_FG_COLORS,
   FONT_OPTIONS,
   FOREGROUND_COLORS,
   type BackgroundType,
   type ButtonShape,
   type ButtonStyle,
   type PresetThemeKey,
   type SocialPosition,
} from '@/constants/appearance';
import type { FetchedUserProfile } from '@/@types/auth';
import {
   changeSocialPosition,
   saveAppearanceChanges,
} from '@/lib/api/appearance';
import logger from '@/lib/logger';

interface AppearanceState {
   selectedPreset: PresetThemeKey | null;
   showCustomBuilder: boolean;
   showPreview: boolean;
   showPreviewInMobile: boolean;

   bgType: BackgroundType;
   bgColor: string;
   bgGradient: string;
   bgImage: string | null;

   buttonStyle: ButtonStyle;
   buttonShape: ButtonShape;
   buttonBg: string;
   buttonFg: string;

   fontName: string;
   foregroundColor: string;

   socialPosition: SocialPosition;

   // setters
   setSelectedPreset: (v: PresetThemeKey) => void;
   setShowCustomBuilder: (v: boolean) => void;
   setBgType: (v: BackgroundType) => void;
   setBgColor: (v: string) => void;
   setBgGradient: (v: string) => void;
   setBgImage: (v: string | null) => void;
   setButtonStyle: (v: ButtonStyle) => void;
   setButtonShape: (v: ButtonShape) => void;
   setButtonBg: (v: string) => void;
   setButtonFg: (v: string) => void;
   setFontName: (v: string) => void;
   setForegroundColor: (v: string) => void;
   setSocialPosition: (v: SocialPosition) => void;
   togglePreview: () => void;
   togglePreviewInMobile: () => void;

   buildPayload: (
      overrides?: Record<string, unknown>,
      forcedType?: 'preset' | 'custom',
   ) => Record<string, unknown>;
   log: (
      label: string,
      overrides?: Record<string, unknown>,
      forcedType?: 'preset' | 'custom',
   ) => void;
   updateAppearance: (type?: 'preset' | 'custom') => void;

   // hydrate from DB profile.theme — keeps atomic setters, batches in one set call
   hydrateFromTheme: (
      theme: FetchedUserProfile['theme'] | null | undefined,
      socialPosition: 'top' | 'bottom',
   ) => void;

   updateSocialPosition: (position: 'top' | 'bottom') => void;
}

export const useAppearanceStore = create<AppearanceState>((set, get) => ({
   selectedPreset: null,
   showCustomBuilder: false,
   showPreview: false,
   showPreviewInMobile: false,

   bgType: 'color',
   bgColor: BACKGROUND_COLORS[0],
   bgGradient: BACKGROUND_GRADIENTS[0],
   bgImage: null,

   buttonStyle: 'solid',
   buttonShape: 'rounded',
   buttonBg: BUTTON_BG_COLORS[0],
   buttonFg: BUTTON_FG_COLORS[0],

   fontName: FONT_OPTIONS[0],
   foregroundColor: FOREGROUND_COLORS[0],

   socialPosition: 'bottom',

   setSelectedPreset: (v) => set({ selectedPreset: v }),
   setShowCustomBuilder: (v) => set({ showCustomBuilder: v }),
   setBgType: (v) => set({ bgType: v }),
   setBgColor: (v) => set({ bgColor: v }),
   setBgGradient: (v) => set({ bgGradient: v }),
   setBgImage: (v) => set({ bgImage: v }),
   setButtonStyle: (v) => set({ buttonStyle: v }),
   setButtonShape: (v) => set({ buttonShape: v }),
   setButtonBg: (v) => set({ buttonBg: v }),
   setButtonFg: (v) => set({ buttonFg: v }),
   setFontName: (v) => set({ fontName: v }),
   setForegroundColor: (v) => set({ foregroundColor: v }),
   setSocialPosition: (v) => set({ socialPosition: v }),
   togglePreview: () => set((s) => ({ showPreview: !s.showPreview })),
   togglePreviewInMobile: () =>
      set((s) => ({ showPreviewInMobile: !s.showPreviewInMobile })),

   buildPayload: (overrides = {}, forcedType) => {
      const s = get();
      const type = forcedType ?? (s.showCustomBuilder ? 'custom' : 'preset');
      return {
         type,
         preset: type === 'custom' ? undefined : s.selectedPreset,
         custom:
            type === 'custom'
               ? {
                    background: {
                       type: s.bgType,
                       color: s.bgColor,
                       gradient: s.bgGradient,
                       image: s.bgImage ? { url: s.bgImage } : undefined,
                    },
                    foregroundColor: s.foregroundColor,
                    fontName: s.fontName,
                    button: {
                       style: s.buttonStyle,
                       shape: s.buttonShape,
                       bgColor: s.buttonBg,
                       fgColor: s.buttonFg,
                    },
                    socialPosition: s.socialPosition,
                    ...overrides,
                 }
               : undefined,
      };
   },

   log: (label, overrides, forcedType) => {
      logger.log(
         `[appearance] ${label}:`,
         get().buildPayload(overrides, forcedType),
      );
   },

   hydrateFromTheme: (theme, socialPosition) => {
      if (!theme) return;

      const updates: Partial<AppearanceState> = {};
      updates.socialPosition = socialPosition ?? 'bottom';

      // preset — only when type is preset and preset exists
      if (theme.type === 'preset') {
         updates.selectedPreset = theme.preset as PresetThemeKey;
      }

      // custom — may be absent for new user, or partial (e.g. only bg)
      const custom = theme.custom;
      if (!custom) {
         if (Object.keys(updates).length) set(updates);
         return;
      }

      // ----------------------------- when custom field present
      if (theme.type === 'custom') {
         updates.showCustomBuilder = true;
      }

      const bg = custom.background;
      if (bg) {
         if (bg.type) updates.bgType = bg.type;
         if (bg.color) updates.bgColor = bg.color;
         if (bg.gradient) updates.bgGradient = bg.gradient;
         if (bg.image?.url) updates.bgImage = bg.image.url;
      }

      const btn = custom.button;
      if (btn) {
         if (btn.style) updates.buttonStyle = btn.style;
         if (btn.shape) updates.buttonShape = btn.shape;
         if (btn.bgColor) updates.buttonBg = btn.bgColor;
         if (btn.fgColor) updates.buttonFg = btn.fgColor;
      }

      if (custom.fontName) updates.fontName = custom.fontName;
      if (custom.foregroundColor)
         updates.foregroundColor = custom.foregroundColor;

      if (Object.keys(updates).length) set(updates);
   },

   updateAppearance: async (type) => {
      try {
         const payload = get().buildPayload({}, type);

         const { body } = await saveAppearanceChanges({
            type: payload.type,
            ...(payload.preset ? { preset: payload.preset } : {}),
            ...(payload.custom ? { custom: payload.custom } : {}),
         });

         if (body.success) {
            toast.success('Appearance updated successfully');
         } else throw new Error(body.message);
      } catch (error) {
         console.error('[appearance] updateAppearance failed:', error);
         toast.error(
            error instanceof Error
               ? error.message
               : 'Failed to update appearance',
         );
      }
   },

   updateSocialPosition: async (position: 'top' | 'bottom') => {
      try {
         const { body } = await changeSocialPosition(position);

         if (body.success) {
            set({ socialPosition: position });
            toast.success('Social position updated successfully');
         } else throw new Error(body.message);
      } catch (error) {
         console.error('[appearance] updateSocialPosition failed:', error);
         toast.error(
            error instanceof Error
               ? error.message
               : 'Failed to update social position',
         );
      }
   },
}));
