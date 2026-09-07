import {
   MailIcon,
   GlobeIcon,
   AtSignIcon,
   CameraIcon,
   FilmIcon,
   CoffeeIcon,
   CalendarIcon,
   MusicIcon,
   LinkIcon,
   PaletteIcon,
   MessageCircleIcon,
   BookOpenIcon,
   MessageSquareIcon,
   GiftIcon,
   VideoIcon,
   PhoneIcon,
   HeadphonesIcon,
   ShoppingBagIcon,
   BookmarkIcon,
   SendIcon,
   RadioIcon,
   TvIcon,
   BookMarkedIcon,
   ShoppingCartIcon,
   MapIcon,
   SmileIcon,
   HashIcon,
   HeartIcon,
   ZapIcon,
   StoreIcon,
   ShirtIcon,
   GhostIcon,
   CircleDotIcon,
   StarIcon,
   type LucideIcon,
} from 'lucide-react';

export interface SocialPlatform {
   key: string;
   label: string;
   prefix: string;
   icon: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
   {
      key: 'email',
      label: 'Email',
      prefix: 'mailto:',
      icon: 'https://api.iconify.design/streamline-color:send-email-flat.svg',
   },
   {
      key: 'facebook',
      label: 'Facebook',
      prefix: 'https://facebook.com/',
      // icon: FacebookIcon,
      icon: 'https://api.iconify.design/selfhst:facebook.svg',
   },
   {
      key: 'twitter',
      label: 'Twitter',
      prefix: 'https://x.com/',
      icon: 'https://api.iconify.design/bxl:twitter-x.svg',
   },
   {
      key: 'instagram',
      label: 'Instagram',
      prefix: 'https://instagram.com/',
      icon: 'https://api.iconify.design/skill-icons:instagram.svg',
   },
   {
      key: 'youtube',
      label: 'YouTube',
      prefix: 'https://youtube.com/',
      icon: 'https://api.iconify.design/logos:youtube-icon.svg',
   },
   {
      key: 'buy_me_a_coffee',
      label: 'Buy Me a Coffee',
      prefix: 'https://buymeacoffee.com/',
      icon: 'https://api.iconify.design/thesvg-color:buy-me-a-coffee.svg',
   },
   {
      key: '1_on_1',
      label: '1-on-1',
      prefix: 'https://cal.com/',
      icon: 'https://api.iconify.design/tabler:calendar.svg',
   },
   {
      key: 'spotify',
      label: 'Spotify',
      prefix: 'https://open.spotify.com/user/',
      icon: 'https://api.iconify.design/thesvg-color:spotify.svg',
   },
   {
      key: 'github',
      label: 'GitHub',
      prefix: 'https://github.com/',
      icon: 'https://api.iconify.design/uil:github.svg',
   },
   {
      key: 'behance',
      label: 'Behance',
      prefix: 'https://behance.net/',
      icon: 'https://api.iconify.design/devicon:behance.svg',
   },
   {
      key: 'dribbble',
      label: 'Dribbble',
      prefix: 'https://dribbble.com/',
      icon: 'https://api.iconify.design/thesvg-color:dribbble.svg',
   },
   {
      key: 'discord',
      label: 'Discord',
      prefix: 'https://discord.com/',
      icon: 'https://api.iconify.design/selfhst:discord.svg',
   },
   {
      key: 'medium',
      label: 'Medium',
      prefix: 'https://medium.com/@',
      icon: 'https://api.iconify.design/uil:medium-m.svg',
   },
   {
      key: 'reddit',
      label: 'Reddit',
      prefix: 'https://reddit.com/user/',
      icon: 'https://api.iconify.design/selfhst:reddit.svg',
   },
   {
      key: 'gift_app',
      label: 'Gift App',
      prefix: 'https://gift.com/',
      icon: 'https://api.iconify.design/streamline-plump-color:gift.svg',
   },
   {
      key: 'tiktok',
      label: 'TikTok',
      prefix: 'https://tiktok.com/@',
      icon: 'https://api.iconify.design/thesvg-color:tiktok-light.svg',
   },
   {
      key: 'sound_cloud',
      label: 'SoundCloud',
      prefix: 'https://soundcloud.com/',
      icon: 'https://api.iconify.design/logos:soundcloud.svg',
   },
   {
      key: 'bandcamp',
      label: 'Bandcamp',
      prefix: 'https://bandcamp.com/',
      icon: 'https://api.iconify.design/thesvg-color:bandcamp.svg',
   },
   {
      key: 'linkedin',
      label: 'LinkedIn',
      prefix: 'https://linkedin.com/in/',
      icon: 'https://api.iconify.design/devicon:linkedin.svg',
   },
   {
      key: 'clubhouse',
      label: 'Clubhouse',
      prefix: 'https://clubhouse.com/@',
      icon: 'https://api.iconify.design/thesvg-color:clubhouse.svg',
   },
   {
      key: 'telegram',
      label: 'Telegram',
      prefix: 'https://t.me/',
      icon: 'https://api.iconify.design/logos:telegram.svg',
   },
   {
      key: 'signal',
      label: 'Signal',
      prefix: 'https://signal.me/',
      icon: 'https://api.iconify.design/thesvg-color:signal.svg',
   },
   {
      key: 'twitch',
      label: 'Twitch',
      prefix: 'https://twitch.tv/',
      icon: 'https://api.iconify.design/thesvg-color:twitch.svg',
   },
   {
      key: 'patreon',
      label: 'Patreon',
      prefix: 'https://patreon.com/',
      icon: 'https://api.iconify.design/logos:patreon.svg',
   },
   {
      key: 'substack',
      label: 'Substack',
      prefix: 'https://substack.com/@',
      icon: 'https://api.iconify.design/thesvg-color:substack.svg',
   },
   {
      key: 'pinterest',
      label: 'Pinterest',
      prefix: 'https://pinterest.com/',
      icon: 'https://api.iconify.design/logos:pinterest.svg',
   },
   {
      key: 'product_hunt',
      label: 'Product Hunt',
      prefix: 'https://producthunt.com/@',
      icon: 'https://api.iconify.design/logos:producthunt.svg',
   },
   {
      key: 'amazon',
      label: 'Amazon',
      prefix: 'https://amazon.com/shop/',
      icon: 'https://api.iconify.design/thesvg-color:amazon.svg',
   },
   // {
   //    key: 'cameo',
   //    label: 'Cameo',
   //    prefix: 'https://cameo.com/',
   //    icon: StarIcon,
   // },
   {
      key: 'whatsapp',
      label: 'WhatsApp',
      prefix: 'https://wa.me/',
      icon: 'https://api.iconify.design/selfhst:whatsapp.svg',
   },
   {
      key: 'goodreads',
      label: 'Goodreads',
      prefix: 'https://goodreads.com/',
      icon: 'https://api.iconify.design/selfhst:goodreads.svg',
   },
   {
      key: 'figma',
      label: 'Figma',
      prefix: 'https://figma.com/@',
      icon: 'https://api.iconify.design/material-icon-theme:figma.svg',
   },
   {
      key: 'strava',
      label: 'Strava',
      prefix: 'https://strava.com/athletes/',
      icon: 'https://api.iconify.design/thesvg-color:strava.svg',
   },
   {
      key: 'tumblr',
      label: 'Tumblr',
      prefix: 'https://tumblr.com/',
      icon: 'https://api.iconify.design/icon-park:tumblr.svg',
   },
   {
      key: 'mastodon',
      label: 'Mastodon',
      prefix: 'https://mastodon.social/@',
      icon: 'https://api.iconify.design/selfhst:mastodon.svg',
   },
   {
      key: 'phone',
      label: 'Phone',
      prefix: 'tel:',
      icon: 'https://api.iconify.design/streamline-color:phone.svg',
   },
   // {
   //    key: 'music',
   //    label: 'Music',
   //    prefix: 'https://music.apple.com/',
   //    icon: MusicIcon,
   // },
   {
      key: 'apple',
      label: 'Apple',
      prefix: 'https://apple.com/',
      icon: 'https://api.iconify.design/glyphs-poly:apple.svg',
   },
   {
      key: 'google_play',
      label: 'Google Play',
      prefix: 'https://play.google.com/store/apps/',
      icon: 'https://api.iconify.design/thesvg-color:google-play.svg',
   },
   {
      key: 'etsy',
      label: 'Etsy',
      prefix: 'https://etsy.com/shop/',
      icon: 'https://api.iconify.design/thesvg-color:etsy.svg',
   },
   // {
   //    key: 'poshmark',
   //    label: 'Poshmark',
   //    prefix: 'https://poshmark.com/closet/',
   //    icon: ShirtIcon,
   // },
   {
      key: 'snapchat',
      label: 'Snapchat',
      prefix: 'https://snapchat.com/add/',
      icon: 'https://api.iconify.design/thesvg-color:snapchat.svg',
   },
   {
      key: 'website',
      label: 'Website',
      prefix: 'https://',
      icon: 'https://api.iconify.design/streamline-color:web.svg',
   },
   {
      key: 'bluesky',
      label: 'Bluesky',
      prefix: 'https://bsky.app/profile/',
      icon: 'https://api.iconify.design/logos:bluesky.svg',
   },
];

export function getSocialPlatformByKey(
   key: string,
): SocialPlatform | undefined {
   return SOCIAL_PLATFORMS.find((p) => p.key === key);
}

export const CUSTOM_LINK_ICON_MAX_SIZE = 50 * 1024; // 50KB
export const CUSTOM_LINK_ICON_ACCEPT = '.jpg,.jpeg,.png,.webp,.avif,.svg';
