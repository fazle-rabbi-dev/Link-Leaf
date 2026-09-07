import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import SectionHeader from './SectionHeader';

const CTABanner = () => {
   return (
      <section className="max-body mt-24 text-white">
         <div className="rounded-2xl bg-primary py-10">
            <SectionHeader
               heading="Ready to map your own custom BioLink?"
               paragraph="Claim your unique handle today and connect your whole audience seamlessly. Set up your links in minutes."
               variant="ctabanner"
            />

            <div className="mt-6 flex justify-center">
               <Button
                  asChild
                  size="lg"
                  effect="scale"
                  className="flex-center gap-2 bg-foreground font-black text-background hover:bg-foreground/85"
               >
                  <Link href="/login">
                     <span>Get Started Free</span>
                     <ArrowRight />
                  </Link>
               </Button>
            </div>
         </div>
      </section>
   );
};

export default CTABanner;
