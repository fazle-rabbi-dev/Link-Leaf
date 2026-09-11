'use client';

import { ArrowRight, MousePointerClick, Sparkle } from 'lucide-react';
import Link from 'next/link';

import { PUBLIC_PROFILE_URL } from '@/constants';

import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import PhoneMockup from './PhoneMockup';

const Hero = () => {
   const liveExampleUrl = PUBLIC_PROFILE_URL('antonio');

   return (
      <section className="border-b pb-20">
         <div className="max-body relative grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-[60%_40%] lg:items-center">
            {/* LEFT SIDE */}
            <div className="space-y-8">
               {/* badge */}
               <div className="flex-center justify-center lg:justify-start">
                  <Badge
                     variant="default"
                     className="bg-primary/10 text-primary uppercase"
                  >
                     <Sparkle />
                     <span>Premium BioLink Experience</span>
                  </Badge>
               </div>

               {/* text info */}
               <div className="mx-auto max-w-2xl space-y-4 lg:mx-0">
                  <h1 className="hero-heading text-center lg:text-start">
                     Your whole <span className="text-primary">internet</span>,
                     on one good-looking page.
                  </h1>
                  <p className="text-center text-lg leading-relaxed lg:text-start">
                     Consolidate your social media channels, digital products,
                     portfolio links, and booking calendars into an elegant
                     BioLink designed for rapid loads and clean aesthetics.
                  </p>
               </div>

               {/* cta */}
               <div className="flex w-full flex-col gap-3 md:flex-row md:justify-center lg:justify-start">
                  <Button
                     asChild
                     size="xl"
                     effect="scale"
                     className="flex-center gap-2"
                  >
                     <Link href="/auth">
                        <span className="font-bold">Create your Leaf page</span>
                        <ArrowRight />
                     </Link>
                  </Button>

                  <Button
                     asChild
                     size="xl"
                     variant="outline"
                     effect="scale"
                     className="flex-center gap-2"
                  >
                     <Link suppressHydrationWarning href={liveExampleUrl}>
                        <MousePointerClick />
                        <span className="font-bold">See live example</span>
                     </Link>
                  </Button>
               </div>

               {/* Hot features */}
               <div className="mt-8 flex-center justify-center gap-3 border-t pt-8 lg:justify-start">
                  <div className="">
                     <p className="heading-3 font-bold">150ms</p>
                     <p className="uppercase">Live Refreshes</p>
                  </div>
                  <div className="">
                     <p className="heading-3 font-bold">4+</p>
                     <p className="uppercase">Preset Styles</p>
                  </div>
                  <div className="">
                     <p className="heading-3 font-bold">100%</p>
                     <p className="uppercase">No-Code Easy</p>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center">
               <PhoneMockup />
            </div>
         </div>
      </section>
   );
};

export default Hero;
