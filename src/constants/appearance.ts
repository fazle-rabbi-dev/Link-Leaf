export const THEME_TYPES = ['preset', 'custom'] as const;
export const PRESET_THEMES = ['leaf', 'island', 'ocean', 'sunset'] as const;
export const BUTTON_SHAPES = ['rounded', 'pill', 'square'] as const;
export const BUTTON_STYLES = ['solid', 'outline'] as const;
export const BACKGROUND_TYPES = ['color', 'image', 'gradient'] as const;

export type PresetThemeKey = (typeof PRESET_THEMES)[number];
export type ButtonShape = (typeof BUTTON_SHAPES)[number];
export type ButtonStyle = (typeof BUTTON_STYLES)[number];
export type BackgroundType = (typeof BACKGROUND_TYPES)[number];

export interface PresetThemeToken {
   key: PresetThemeKey;
   label: string;
   // visual tokens relevant to name
   bgColor: string;
   bgGradient: string;
   fgColor: string;
   fontName: string;

   buttonBg: string;
   buttonFg: string;
   buttonStyle: ButtonStyle;
   buttonShape: ButtonShape;

   description: string;
}

export const PRESET_THEME_TOKENS: PresetThemeToken[] = [
   {
      key: 'leaf',
      label: 'Leaf',

      bgColor: '#E9F5EC',
      bgGradient:
         'linear-gradient(135deg, #D8F3DC 0%, #B7E4C7 50%, #95D5B2 100%)',
      fgColor: '#1B4332',
      fontName: 'Inter',

      buttonBg: '#2D6A4F',
      buttonFg: '#ffffff',
      buttonStyle: 'solid',
      buttonShape: 'rounded',
      description: 'Fresh forest',
   },
   {
      key: 'island',
      label: 'Island',
      bgColor: '#FFF8E1',
      bgGradient:
         'linear-gradient(135deg, #FFECB3 0%, #FFD166 50%, #FFB347 100%)',
      fgColor: '#5C4033',
      fontName: 'Inter',
      buttonBg: '#FF8C42',
      buttonFg: '#ffffff',
      buttonStyle: 'solid',
      buttonShape: 'rounded',
      description: 'Warm sand',
   },
   {
      key: 'ocean',
      label: 'Ocean',
      bgColor: '#E0F2FE',
      bgGradient:
         'linear-gradient(135deg, #7DD3FC 0%, #0EA5E9 50%, #1E3A8A 100%)',
      fgColor: '#0C4A6E',
      fontName: 'Inter',
      buttonBg: '#0284C7',
      buttonFg: '#ffffff',
      buttonStyle: 'solid',
      buttonShape: 'rounded',
      description: 'Deep blue',
   },
   {
      key: 'sunset',
      label: 'Sunset',
      bgColor: '#FFF1F2',
      bgGradient:
         'linear-gradient(135deg, #FDA4AF 0%, #F43F5E 50%, #F59E0B 100%)',
      fgColor: '#7F1D1D',
      fontName: 'Inter',
      buttonBg: '#F43F5E',
      buttonFg: '#ffffff',
      buttonStyle: 'solid',
      buttonShape: 'rounded',
      description: 'Golden hour',
   },
];

// Custom builder tokens
export const BACKGROUND_COLORS = [
   '#22C55E',
   '#3B82F6',
   '#F97316',
   '#E11D48',
] as const;
export type BgColorType = (typeof BACKGROUND_COLORS)[number];

export const BACKGROUND_GRADIENTS = [
   'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
   'linear-gradient(135deg, #F093FB 0%, #F5576C 100%)',
   'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
   'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
] as const;

export const BUTTON_BG_COLORS = [
   '#111827',
   '#2D6A4F',
   '#0284C7',
   '#7C3AED',
] as const;
export const BUTTON_FG_COLORS = [
   '#ffffff',
   '#FDE68A',
   '#E0E7FF',
   '#111827',
] as const;

export const FONT_OPTIONS = [
   'Inter',
   'Poppins',
   'Outfit',
   'DM Sans',
   'Space Grotesk',
   'Playfair Display',
   'JetBrains Mono',
   'Geist',
   'Instrument Sans',
] as const;

export const FOREGROUND_COLORS = [
   '#784beb',
   '#334155',
   '#065F46',
   '#7C2D12',
] as const;

export const SOCIAL_POSITIONS = ['top', 'bottom'] as const;
export type SocialPosition = (typeof SOCIAL_POSITIONS)[number];
