'use client';

import { useEffect, useRef, useState } from 'react';
import { createSwapy, Swapy } from 'swapy';
import { Button } from '../../ui/button';

const LayoutDemo = () => {
   const [links, setLinks] = useState([
      { id: '1', name: 'My Personal Website' },
      { id: '2', name: 'Latest Tech Blog' },
      { id: '3', name: 'Book a Calendly' },
   ]);

   const swapy = useRef<Swapy | null>(null);
   const container = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!container.current) return;

      swapy.current = createSwapy(container.current, {});

      swapy.current.onSwap((event) => {
         //
      });

      return () => swapy.current?.destroy();
   }, []);

   // Swap links position on button click
   const swapLinkPosition = () => {
      function shuffle<T>(array: T[]): T[] {
         const result = [...array];
         for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Array destructuring assignment. Just LEFT SIDE are existing variables/slots
            [result[i], result[j]] = [result[j], result[i]];
         }
         return result;
      }
      const newLinks = shuffle(links);
      setLinks(newLinks);
   };

   return (
      <div className="space-y-4 px-4 py-2 select-none">
         <div className="">
            <Button
               onClick={swapLinkPosition}
               className="mx-auto block cursor-pointer"
            >
               ⚡ Swap Positions
            </Button>
            <p className="mt-2 text-center font-mono text-xs italic">
               You can reorder item by drag and drop
            </p>
         </div>

         <div className="swapy-container space-y-2" ref={container}>
            {links.map((link) => (
               <div
                  key={link.id}
                  className="swapy-slot flex cursor-pointer items-center justify-between rounded-lg border bg-background p-3 transition-colors hover:bg-muted"
                  data-swapy-slot={link.id}
               >
                  <div key={link.id} data-swapy-item={link.id}>
                     <div className="flex items-center gap-3">
                        <span className="link-number text-sm font-medium" />
                        <span className="text-sm">{link?.name}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default LayoutDemo;
