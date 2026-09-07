'use client';

import { useState, useMemo } from 'react';
import { SearchIcon } from 'lucide-react';

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SOCIAL_PLATFORMS, type SocialPlatform } from '@/constants/links';
import { useTheme } from 'next-themes';

interface SocialLinksModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onSelect: (platform: SocialPlatform) => void;
}

export function SocialLinksModal({
   open,
   onOpenChange,
   onSelect,
}: SocialLinksModalProps) {
   const [search, setSearch] = useState('');
   const { resolvedTheme } = useTheme();

   // ? with react 19 -- no need to use useMemo (refactor later if needed)
   const filtered = useMemo(() => {
      if (!search.trim()) return SOCIAL_PLATFORMS;
      const q = search.toLowerCase();
      return SOCIAL_PLATFORMS.filter((p) => p.label.toLowerCase().includes(q));
   }, [search]);

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-md gap-0 p-0">
            <DialogHeader className="p-4 pb-2">
               <DialogTitle className="text-center text-lg">
                  Socials
               </DialogTitle>
               <DialogDescription className="sr-only">
                  Choose a social platform to add
               </DialogDescription>
            </DialogHeader>

            <div className="px-4 pb-2">
               <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                     placeholder="Search"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="pl-8 h-9"
                  />
               </div>
            </div>

            <ScrollArea className="h-[60vh]">
               <div className="px-4 pb-4">
                  {filtered.map((platform) => (
                     <button
                        key={platform.key}
                        type="button"
                        onClick={() => {
                           onSelect(platform);
                           setSearch('');
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted cursor-pointer"
                     >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={`${platform.icon}?color=${encodeURIComponent(resolvedTheme === 'dark' ? '#fff' : '#000')}`}
                           alt={platform.label}
                           width="24"
                           height="24"
                           className="size-5 shrink-0"
                        />
                        <span className="flex-1 text-left font-medium">
                           {platform.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                           Add
                        </span>
                     </button>
                  ))}
                  {filtered.length === 0 && (
                     <p className="py-8 text-center text-sm text-muted-foreground">
                        No platforms found
                     </p>
                  )}
               </div>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
}
