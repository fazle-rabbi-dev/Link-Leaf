import BackgroundEffect from '@/components/public/marketing/BackgroundEffect';
import CTABanner from '@/components/public/marketing/CTABanner';
import Features from '@/components/public/marketing/Features';
import GettingStarted from '@/components/public/marketing/GettingStarted';
import Hero from '@/components/public/marketing/Hero';
import ThemePreview from '@/components/public/marketing/ThemePreview';

export default function Page() {
   return (
      <main className="mt-26">
         <BackgroundEffect />
         <Hero />
         <Features />
         <GettingStarted />
         <ThemePreview />
         <CTABanner />
      </main>
   );
}
