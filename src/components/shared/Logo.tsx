import Link from 'next/link';

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

   return (
      <Link
         href={isDashboardRoute ? '/dashboard/profile' : '/'}
         aria-label="Link-Leaf home"
         className={cn(
            'flex-center group w-fit gap-2.5 transition-transform duration-200 hover:scale-[1.03] active:scale-95',
            className,
         )}
      >
         <Image
            className="size-6 sm:size-7"
            src="/icon.png"
            width={32}
            height={32}
            alt="Link-Leaf Logo"
         />

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
