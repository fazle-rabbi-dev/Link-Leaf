import Link from 'next/link';
import { Leaf, Link2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type LogoProps = {
   showWordmark?: boolean;
   className?: string;
};

const Logo = ({ showWordmark = true, className }: LogoProps) => {
   const url = usePathname();

   const isDashboardRoute = url.startsWith('/dashboard');

   // return (
   //    <Link
   //       href={isDashboardRoute ? '/dashboard/profile' : '/'}
   //       aria-label="Link-Leaf home"
   //       className={cn(
   //          'flex-center group w-fit gap-2.5 transition-transform duration-200 hover:scale-[1.03] active:scale-95',
   //          className,
   //       )}
   //    >
   //       <Image src="/icon.png" width={32} height={32} alt="Link-Leaf Logo" />
   //    </Link>
   // );

   // old icon
   return (
      <Link
         href={isDashboardRoute ? '/dashboard/profile' : '/'}
         aria-label="Link-Leaf home"
         className={cn(
            'flex-center group w-fit gap-2.5 transition-transform duration-200 hover:scale-[1.03] active:scale-95',
            className,
         )}
      >
         <Image src="/icon.png" width={32} height={32} alt="Link-Leaf Logo" />

         {showWordmark && (
            <span className="hidden xsm:inline-block text-lg font-bold tracking-tight">
               Link<span className="text-primary">-Leaf</span>
               <span className="ml-0.5 inline-block size-1.5 rounded-full bg-primary align-baseline" />
            </span>
         )}
      </Link>
   );
};

export default Logo;

/* 
old icon 
Mark: leaf + link combo 
         <span className="relative grid size-7 shrink-0 place-items-center overflow-visible rounded-[8px] bg-gradient-to-br from-primary via-primary to-chart-1 shadow-sm ring-1 ring-primary/20">
            <Leaf
               className="size-[18px] fill-primary-foreground text-primary-foreground"
               strokeWidth={2.2}
            />

            link badge
            <span className="absolute -right-1 -bottom-1 grid size-4 place-items-center rounded-full bg-background shadow-sm ring-1 ring-border">
               <Link2 className="size-2.5 text-primary" strokeWidth={3} />
            </span>
         </span>
*/
