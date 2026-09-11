import { BatteryFull, ExternalLink, Wifi } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../ui/button';

const SOCIAL_LINKS = [
   {
      name: 'twitter',
      href: 'https://x.com/SonnySangha',
      icon: '/x.svg',
   },
   {
      name: 'instagram',
      href: 'https://www.instagram.com/ssssangha',
      icon: '/instagram.svg',
   },
   {
      name: 'linkedin',
      href: 'https://uk.linkedin.com/in/sonnysangha',
      icon: '/linkedin.svg',
   },
];

const CUSTOM_LINKS = [
   {
      name: 'My Portfolio Website',
      href: 'https://www.papareact.com/',
   },
   {
      name: 'Book a 1:1 Call',
      href: 'https://www.papareact.com/',
   },
   {
      name: 'Build airbnb clone',
      href: 'https://www.papareact.com/',
   },
   {
      name: 'Download My Resume',
      href: 'https://www.papareact.com/',
   },
];

const PhoneMockup = () => {
   return (
      <div className="flex-1">
         {/* Frame */}
         <div className="relative mx-auto w-full max-w-[310px] h-[620px] border-16 border-black ring-2 ring-violet-400/70 dark:drop-shadow-2xl dark:drop-shadow-foreground/20 rounded-4xl bg-phone-mockup text-white">
            {/* Notch */}
            <div className="w-28 absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-full flex-center justify-between px-2 py-1">
               <span className="size-2 rounded-full bg-gray-900"></span>
               <span className="inline-block bg-gray-900 h-2 w-10 rounded-full"></span>
            </div>

            {/* Status Bar */}
            <div className="absolute top-3 inset-x-0 flex-center justify-between text-xs px-4">
               <div className="">09:40 am</div>
               <div className="flex-center justify-end gap-1">
                  <Wifi size={15} />
                  <BatteryFull size={18} />
               </div>
            </div>

            {/* Gesture */}
            <div className="absolute -bottom-2 h-[6px] w-28 bg-gray-700 rounded-full left-1/2 -translate-x-1/2"></div>

            {/* User Profile */}
            <div className="mt-16 px-4">
               {/* Header */}
               <header className="">
                  <Image
                     className="mx-auto rounded-full ring-2 ring-primary"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPf6j4yCEk4IP-hcodPY_qZk3ZS57rhAgrJwaWrAYt3r_n6-ji7dOmpN4&s=10"
                     alt="profile"
                     width={60}
                     height={60}
                  />
                  <div className="mt-4 flex-center flex-col">
                     <span className="text-white">Sony Sangha</span>
                     <span className="text-white/50 text-xs">@sony</span>
                     <p className="text-white/50 text-center mt-2">
                        Software engineer. Currently building crazy apps in
                        dubai.
                     </p>
                  </div>
               </header>

               {/* Links */}
               <div className="mt-6">
                  {/* Socail */}
                  <div className="flex-center justify-center gap-2">
                     {SOCIAL_LINKS.map((link) => (
                        <Link
                           key={link.name}
                           href={link.href}
                           className="p-2 rounded-full hover:bg-white/10"
                        >
                           <Image
                              src={link.icon}
                              width={20}
                              height={20}
                              alt={link.name}
                           />
                        </Link>
                     ))}
                  </div>

                  {/* Custom */}
                  <div className="mt-4 flex-center flex-col gap-3">
                     {CUSTOM_LINKS.map((link) => (
                        <Button
                           key={link.name}
                           size="lg"
                           effect="scale"
                           asChild
                           className="w-full flex items-center justify-between px-4 py-2 rounded-full bg-primary hover:bg-white/10"
                        >
                           <Link href={link.href}>
                              <span>{link.name}</span>
                              <ExternalLink size={15} />
                           </Link>
                        </Button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PhoneMockup;
