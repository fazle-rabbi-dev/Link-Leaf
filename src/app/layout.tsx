import type { Metadata } from 'next';
import { Geist_Mono, IBM_Plex_Mono, Geist } from 'next/font/google';

import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { APP_URL } from '@/lib/env';
import { cn } from '@/lib/utils';
import './globals.css';

// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const ibmPlexMono = IBM_Plex_Mono({
   weight: ['400', '500', '600', '700'],
   subsets: ['latin'],
   variable: '--font-ibm-plex-mono',
});

const fontMono = Geist_Mono({
   subsets: ['latin'],
   variable: '--font-mono',
});

export const metadata: Metadata = {
   metadataBase: APP_URL ? new URL(APP_URL) : undefined,
   title: {
      default: 'Link-Leaf - Free Linktree Alternative & Bio Link App',
      template: '%s | Link-Leaf',
   },
   description:
      'Link-Leaf is a free Linktree alternative and bio link app. Create one link in bio page for all your social media, content, and custom links.',
   keywords: [
      'linktree',
      'linktree alternative',
      'bio link app',
      'link in bio',
      'link in bio tool',
      'shareable profile page',
      'social media links',
      'link aggregator',
      'Link-Leaf',
   ],
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={cn(
            fontMono.variable,
            geist.variable,
            ibmPlexMono.variable,
            'antialiased',
            // 'font-sans',
         )}
      >
         <body>
            <ThemeProvider>
               {children}
               <Toaster position="top-center" />
            </ThemeProvider>
         </body>
      </html>
   );
}
