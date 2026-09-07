'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { PRESET_THEME_TOKENS } from '@/constants/appearance';
import { getSocialPlatformByKey } from '@/constants/links';
import { getPublicProfile, type PublicProfile } from '@/lib/api/profile';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { useTheme } from 'next-themes';

function getEffectiveTheme(profile: PublicProfile) {
   const theme = profile.theme;
   const preset = PRESET_THEME_TOKENS.find((p) => p.key === theme.preset);
   const isCustom = theme.type === 'custom' && !!theme.custom;

   if (!isCustom) {
      return {
         bg: preset?.bgGradient ?? preset?.bgColor ?? '#ffffff',
         hasImage: false,
         rawBgImage: null as string | null,
         fg: preset?.fgColor ?? '#111827',
         font: preset?.fontName ?? 'Inter',
         btnBg: preset?.buttonBg ?? '#111827',
         btnFg: preset?.buttonFg ?? '#ffffff',
         btnStyle: preset?.buttonStyle ?? 'solid',
         btnShape: preset?.buttonShape ?? 'rounded',
      };
   }

   const custom = theme.custom!;
   const bg = custom.background;
   const btn = custom.button;

   return {
      bg:
         bg?.type === 'color'
            ? (bg.color ?? '#ffffff')
            : bg?.type === 'gradient'
              ? (bg.gradient ?? '#ffffff')
              : bg?.image?.url
                ? `url(${bg.image.url})`
                : (bg?.color ?? '#ffffff'),
      hasImage: bg?.type === 'image' && !!bg.image?.url,
      rawBgImage: bg?.image?.url ?? null,
      fg: custom.foregroundColor ?? '#111827',
      font: custom.fontName ?? 'Inter',
      btnBg: btn?.bgColor ?? '#111827',
      btnFg: btn?.fgColor ?? '#ffffff',
      btnStyle: btn?.style ?? 'solid',
      btnShape: btn?.shape ?? 'rounded',
   };
}

function ProfileHeader({
   profile,
   theme,
}: {
   profile: PublicProfile;
   theme: ReturnType<typeof getEffectiveTheme>;
}) {
   return (
      <div className="flex flex-col items-center text-center gap-3">
         <div className="size-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-muted shrink-0">
            {profile.avatar ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="size-full object-cover"
               />
            ) : (
               <span
                  className="flex-center size-full text-2xl font-bold"
                  style={{ color: theme.btnBg }}
               >
                  {profile.name.charAt(0).toUpperCase()}
               </span>
            )}
         </div>
         <div className="space-y-1">
            <h1
               className="heading-3"
               style={{ color: theme.fg, fontFamily: theme.font }}
            >
               {profile.name}
            </h1>
            <p className="text-sm opacity-70" style={{ color: theme.fg }}>
               @{profile.username}
            </p>
            {profile.bio && (
               <p
                  className="text-sm max-w-[420px] leading-relaxed opacity-80 pt-1"
                  style={{ color: theme.fg, fontFamily: theme.font }}
               >
                  {profile.bio}
               </p>
            )}
         </div>
      </div>
   );
}

function SocialRow({
   links,
   theme,
}: {
   links: PublicProfile['links']['social'];
   theme: ReturnType<typeof getEffectiveTheme>;
}) {
   const active = links.filter(
      (l) => (l as { isActive?: boolean }).isActive !== false,
   );
   if (!active.length) return null;

   const foregroundColor = theme.fg;

   return (
      <div className="flex flex-wrap justify-center gap-2.5">
         {active.map((link) => {
            const iconUrl = getSocialPlatformByKey(link.platform)?.icon;
            // if (!Icon) return null;
            return (
               <a
                  key={link._id ?? link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center justify-center  hover:scale-105 transition-transform"
                  aria-label={link.platform}
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
   theme,
}: {
   links: PublicProfile['links']['custom'];
   theme: ReturnType<typeof getEffectiveTheme>;
}) {
   const active = links.filter(
      (l) => (l as { isActive?: boolean }).isActive !== false,
   );
   const shapeCls =
      theme.btnShape === 'pill'
         ? 'rounded-full'
         : theme.btnShape === 'rounded'
           ? 'rounded-xl'
           : 'rounded-md';
   if (!active.length)
      return (
         <p
            className="text-sm opacity-60 text-center"
            style={{ color: theme.fg }}
         >
            No links yet
         </p>
      );
   return (
      <div className="w-full space-y-3">
         {active.map((link) => (
            <a
               key={link._id ?? link.title}
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               className={cn(
                  'flex items-center justify-center gap-2 w-full min-h-12 px-5 py-3 text-sm font-semibold border shadow-sm hover:scale-[1.01] transition-transform truncate',
                  shapeCls,
               )}
               style={{
                  background:
                     theme.btnStyle === 'solid' ? theme.btnBg : 'transparent',
                  color: theme.btnStyle === 'solid' ? theme.btnFg : theme.btnBg,
                  borderColor: theme.btnBg,
                  fontFamily: theme.font,
               }}
            >
               {'icon' in link && link.icon?.value ? (
                  link.icon.kind === 'emoji' ? (
                     <span className="text-lg leading-none">
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
               <ExternalLinkIcon className="size-3.5 opacity-40 shrink-0 ml-auto" />
            </a>
         ))}
      </div>
   );
}

export function PublicProfileClient({ profile }: { profile: PublicProfile }) {
   const theme = getEffectiveTheme(profile);
   const socialPosition =
      (profile.socialIconPosition as 'top' | 'bottom') ?? 'bottom';
   const { resolvedTheme } = useTheme();

   return (
      <>
         <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.font)}&display=swap`}
            precedence="default"
         />

         <main
            className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12"
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
            <section className="w-full max-w-[560px] flex flex-col items-center gap-6">
               <ProfileHeader profile={profile} theme={theme} />
               {socialPosition === 'top' && (
                  <SocialRow links={profile.links.social} theme={theme} />
               )}
               <LinkList links={profile.links.custom} theme={theme} />
               {socialPosition === 'bottom' && (
                  <div className="pt-2">
                     <SocialRow links={profile.links.social} theme={theme} />
                  </div>
               )}
               <Link
                  href="/"
                  className="text-xs opacity-40 pt-4 flex-center gap-1.5"
               >
                  Powered by <span className="font-semibold">LinkLeaf</span>
               </Link>
            </section>
         </main>
      </>
   );
}
