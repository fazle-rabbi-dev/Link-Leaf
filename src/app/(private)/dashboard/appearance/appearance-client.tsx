'use client';

import {
   PaletteIcon,
   SparklesIcon,
   ChevronDownIcon,
   EyeIcon,
   EyeOffIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAppearanceStore } from '@/store/useAppearanceStore';
import { PresetGrid } from '@/components/private/appearance/preset-grid';
import { BackgroundSection } from '@/components/private/appearance/background-section';
import { ButtonSection } from '@/components/private/appearance/button-section';
import { FontsSection } from '@/components/private/appearance/fonts-section';
import { SocialPositionSection } from '@/components/private/appearance/social-position-section';

export default function AppearanceClient() {
   const showCustomBuilder = useAppearanceStore((s) => s.showCustomBuilder);
   const setShowCustomBuilder = useAppearanceStore(
      (s) => s.setShowCustomBuilder,
   );
   const showPreview = useAppearanceStore((s) => s.showPreview);
   const togglePreview = useAppearanceStore((s) => s.togglePreview);
   const log = useAppearanceStore((s) => s.log);
   const updateAppearance = useAppearanceStore((s) => s.updateAppearance);

   return (
      <main
         className={cn(
            'max-body',
            showPreview &&
               'lg:grid lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px] lg:gap-2',
         )}
      >
         <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
         ></link>
         <div className={cn(showPreview && 'lg:min-w-0')}>
            <section className="mb-8 flex items-start justify-between gap-4">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <PaletteIcon className="size-8 text-foreground" />
                     <h1 className="heading-1">Appearance</h1>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     Customize your profile theme — pick a preset or craft your
                     own.
                  </p>
               </div>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePreview}
                  className="gap-1.5 shrink-0 cursor-pointer hidden lg:flex"
               >
                  {showPreview ? (
                     <EyeOffIcon className="size-4" />
                  ) : (
                     <EyeIcon className="size-4" />
                  )}
                  {showPreview ? 'Hide preview' : 'Show preview'}
               </Button>
            </section>

            <PresetGrid />

            <section className="mb-6">
               {!showCustomBuilder ? (
                  <Card className="border-dashed">
                     <CardContent className="p-4 flex-center justify-between">
                        <div>
                           <p className="text-sm font-semibold flex-center gap-1.5">
                              <SparklesIcon className="size-4 text-primary" />{' '}
                              Want something unique?
                           </p>
                           <p className="text-xs text-muted-foreground">
                              Build a custom theme with your colors, fonts and
                              buttons.
                           </p>
                        </div>
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => {
                              setShowCustomBuilder(true);
                              // log('custom builder opened', {
                              //    customBuilder: true,
                              // });
                           }}
                           className="gap-1.5 shrink-0 cursor-pointer"
                        >
                           Custom theme <ChevronDownIcon className="size-4" />
                        </Button>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="flex items-center justify-between mb-2">
                     <h2 className="heading-4 text-base flex-center gap-2">
                        <SparklesIcon className="size-4 text-primary" /> Custom
                        theme builder
                     </h2>
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCustomBuilder(false)}
                        className="cursor-pointer"
                     >
                        Hide
                     </Button>
                  </div>
               )}
            </section>

            {showCustomBuilder && (
               <section className="space-y-5 animate-in fade-in slide-in-from-top-2">
                  <BackgroundSection />
                  <ButtonSection />
                  <FontsSection />
                  <SocialPositionSection />

                  <div className="flex justify-end">
                     <Button
                        onClick={() => updateAppearance('custom')}
                        className="cursor-pointer"
                        size="xl"
                     >
                        Save changes
                     </Button>
                  </div>
               </section>
            )}
         </div>
      </main>
   );
}
