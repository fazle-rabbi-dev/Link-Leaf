/* 
 - ai generated to save time and effort
*/

'use client';

import { EyeOffIcon, ExternalLinkIcon, SparklesIcon } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRESET_THEME_TOKENS } from '@/constants/appearance';
import { getSocialPlatformByKey } from '@/constants/links';
import { useAppearanceStore } from '@/store/useAppearanceStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLinksStore } from '@/store/useLinksStore';
import type { CustomLink, SocialLink } from '@/@types/links';
import { useSidebarStore } from '@/store/useSidebarStore';

// ---------- helpers ----------
function useEffectiveTheme() {
   const {
      selectedPreset,
      showCustomBuilder,
      bgType,
      bgColor,
      bgGradient,
      bgImage,
      buttonStyle,
      buttonShape,
      buttonBg,
      buttonFg,
      fontName,
      foregroundColor,
   } = useAppearanceStore(
      useShallow((s) => ({
         selectedPreset: s.selectedPreset,
         showCustomBuilder: s.showCustomBuilder,
         bgType: s.bgType,
         bgColor: s.bgColor,
         bgGradient: s.bgGradient,
         bgImage: s.bgImage,
         buttonStyle: s.buttonStyle,
         buttonShape: s.buttonShape,
         buttonBg: s.buttonBg,
         buttonFg: s.buttonFg,
         fontName: s.fontName,
         foregroundColor: s.foregroundColor,
      })),
   );

   const preset = PRESET_THEME_TOKENS.find((p) => p.key === selectedPreset);
   const isCustom = showCustomBuilder;

   return {
      bg: isCustom
         ? bgType === 'color'
            ? bgColor
            : bgType === 'gradient'
              ? bgGradient
              : bgImage
                ? `url(${bgImage})`
                : bgColor
         : (preset?.bgGradient ?? preset?.bgColor ?? bgColor),
      hasImage: isCustom && bgType === 'image' && !!bgImage,
      fg: isCustom ? foregroundColor : (preset?.fgColor ?? foregroundColor),
      font: isCustom ? fontName : (preset?.fontName ?? fontName),
      btnBg: isCustom ? buttonBg : (preset?.buttonBg ?? buttonBg),
      btnFg: isCustom ? buttonFg : (preset?.buttonFg ?? buttonFg),
      btnStyle: isCustom ? buttonStyle : (preset?.buttonStyle ?? buttonStyle),
      btnShape: isCustom ? buttonShape : (preset?.buttonShape ?? buttonShape),
      rawBgImage: bgImage,
   };
}

// ---------- sub components ----------
function SocialRow({
   links,
   theme,
}: {
   links: SocialLink[];
   theme: ReturnType<typeof useEffectiveTheme>;
}) {
   const activeLinks = links.filter(
      (l) => (l as { isActive?: boolean }).isActive !== false,
   );
   if (!activeLinks.length) return null;

   const foregroundColor = theme.fg;

   return (
      <div className="flex flex-wrap gap-2 py-1">
         {activeLinks.slice(0, 6).map((link) => {
            const iconUrl =
               getSocialPlatformByKey(link.platform)?.icon ?? SparklesIcon;

            return (
               <a
                  key={link._id ?? link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center justify-center hover:scale-105 transition-transform"
               >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src={`${iconUrl}?color=${encodeURIComponent(foregroundColor)}`}
                     alt={link.platform}
                     width="24"
                     height="24"
                     className="size-6 shrink-0"
                  />
               </a>
            );
         })}
      </div>
   );
}

function LinkList({
   links,
   shape,
   style,
   bg,
   fg,
   font,
}: {
   links: CustomLink[];
   shape: string;
   style: string;
   bg: string;
   fg: string;
   font: string;
}) {
   const shapeCls =
      shape === 'pill'
         ? 'rounded-full'
         : shape === 'rounded'
           ? 'rounded-xl'
           : 'rounded-md';

   const activeLinks = links.filter(
      (l) => (l as { isActive?: boolean }).isActive !== false,
   );
   if (!activeLinks.length) {
      return (
         <div className="w-full space-y-2 opacity-80">
            {['Example link', 'Another link'].map((t) => (
               <div
                  key={t}
                  className={cn(
                     'h-11 w-full flex-center text-sm font-semibold shadow-sm border',
                     shapeCls,
                  )}
                  style={{
                     background: style === 'solid' ? bg : 'transparent',
                     color: style === 'solid' ? fg : bg,
                     borderColor: bg,
                  }}
               >
                  {t}{' '}
                  {t === 'Another link' && (
                     <ExternalLinkIcon className="size-3.5 ml-1.5 opacity-60" />
                  )}
               </div>
            ))}
         </div>
      );
   }

   return (
      <div className="w-full space-y-2">
         {activeLinks.map((link) => (
            <a
               key={link._id ?? link.title}
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               className={cn(
                  'flex items-center justify-center gap-2 h-11 w-full px-4 text-sm font-semibold shadow-sm border truncate hover:scale-[1.01] transition-transform',
                  shapeCls,
               )}
               style={{
                  background: style === 'solid' ? bg : 'transparent',
                  color: style === 'solid' ? fg : bg,
                  borderColor: bg,
                  fontFamily: font,
               }}
            >
               {'icon' in link && link.icon?.value ? (
                  link.icon.kind === 'emoji' ? (
                     <span className="text-base leading-none">
                        {link.icon.value}
                     </span>
                  ) : (
                     <img
                        src={link.icon.value}
                        alt=""
                        className="size-5 rounded object-cover shrink-0"
                     />
                  )
               ) : null}
               <span className="truncate">{link.title}</span>
            </a>
         ))}
      </div>
   );
}

// ---------- main ----------
export default function ProfilePreview() {
   const {
      showPreview,
      togglePreview,
      showPreviewInMobile,
      togglePreviewInMobile,
      socialPosition,
   } = useAppearanceStore(
      useShallow((s) => ({
         showPreview: s.showPreview,
         togglePreview: s.togglePreview,

         showPreviewInMobile: s.showPreviewInMobile,
         togglePreviewInMobile: s.togglePreviewInMobile,

         socialPosition: s.socialPosition,
      })),
   );
   const theme = useEffectiveTheme();

   const user = useAuthStore((s) => s.user);
   const profile = useAuthStore((s) => s.profile);
   const socialLinks = useLinksStore((s) => s.socialLinks);
   const customLinks = useLinksStore((s) => s.customLinks);

   if (!showPreview && !showPreviewInMobile) return null;

   const displayName = user?.name ?? 'Your Name';
   const username = user?.username ? `@${user.username}` : '@username';
   const bio = profile?.bio || 'Your bio will appear here.';
   const avatar = user?.avatar;

   return (
      <aside
         className={cn(
            showPreviewInMobile
               ? 'inset-0 max-h-[900px] w-full z-50 '
               : 'w-[350px] xl:w-[400px] max-h-[900px] right-0 top-16 h-[calc(100vh-6rem)]',
            'fixed rounded-xl border bg-card overflow-hidden shadow-sm animate-in fade-in',
         )}
      >
         <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
         ></link>

         <div className="h-full rounded-2xl border bg-card overflow-hidden shadow-sm flex flex-col animate-in fade-in">
            <header className="px-4 py-3 border-b flex items-center justify-between shrink-0">
               <p className="text-xs font-semibold uppercase tracking-wider">
                  Preview
               </p>
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                     showPreview ? togglePreview() : togglePreviewInMobile()
                  }
                  className="h-7 text-xs gap-1.5 cursor-pointer"
               >
                  <EyeOffIcon className="size-3.5" /> Hide
               </Button>
            </header>

            {/* Phoen Mockup */}
            <div className="flex-1 p-4 flex justify-center bg-muted/30 overflow-auto">
               <div
                  className={cn(
                     'min-h-[600px] rounded-[32px] border-[6px] border-foreground shadow-xl flex flex-col overflow-hidden shrink-0 relative',
                     showPreviewInMobile ? 'flex-1' : 'w-[320px]',
                  )}
                  style={{
                     background: theme.hasImage
                        ? `url(${theme.rawBgImage})`
                        : theme.bg,
                     backgroundSize: theme.hasImage ? 'cover' : undefined,
                     backgroundPosition: theme.hasImage ? 'center' : undefined,
                     fontFamily: theme.font,
                     color: theme.fg,
                  }}
               >
                  <div className="relative flex flex-col items-center p-6 gap-3 flex-1">
                     <div className="size-20 rounded-full bg-white shadow-lg border-4 border-white overflow-hidden flex-center shrink-0 mt-2">
                        {avatar ? (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img
                              src={avatar}
                              alt={displayName}
                              className="size-full object-cover"
                           />
                        ) : (
                           <span
                              className="text-xl font-bold"
                              style={{ color: theme.btnBg }}
                           >
                              {displayName.charAt(0).toUpperCase()}
                           </span>
                        )}
                     </div>

                     <div className="text-center space-y-1">
                        <h3 className="font-bold text-[17px] leading-none">
                           {displayName}
                        </h3>
                        <p className="text-xs opacity-80">{username}</p>
                        <p className="text-xs leading-snug max-w-[240px] opacity-75 pt-1">
                           {bio}
                        </p>
                     </div>

                     {socialPosition === 'top' && (
                        <SocialRow links={socialLinks} theme={theme} />
                     )}

                     <div className="w-full mt-3">
                        <LinkList
                           links={customLinks}
                           shape={theme.btnShape}
                           style={theme.btnStyle}
                           bg={theme.btnBg}
                           fg={theme.btnFg}
                           font={theme.font}
                        />
                     </div>

                     {socialPosition === 'bottom' && (
                        <div className="mt-auto pt-4">
                           <SocialRow links={socialLinks} theme={theme} />
                        </div>
                     )}

                     <p className="text-[10px] opacity-50 pt-2 flex-center gap-1">
                        <SparklesIcon className="size-3" /> LinkLeaf
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
}
