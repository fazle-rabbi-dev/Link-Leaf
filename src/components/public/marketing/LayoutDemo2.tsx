import { useEffect, useMemo, useRef, useState } from 'react';
import { createSwapy, Swapy, utils } from 'swapy';
import { Button } from '../../ui/button';

const LayoutDemo = () => {
   const [links, setLinks] = useState([
      { id: '1', name: 'My Personal Website' },
      { id: '2', name: 'Latest Tech Blog' },
      { id: '3', name: 'Book a Calendly' },
   ]);

   // slotItemMap — separate state, tracks slot → item mapping
   const [slotItemMap, setSlotItemMap] = useState(
      utils.initSlotItemMap(links, 'id'),
   );

   // slottedItems — computed from slotItemMap, this is what will render
   const slottedItems = useMemo(
      () => utils.toSlottedItems(links, 'id', slotItemMap),
      [links, slotItemMap],
   );

   const swapy = useRef<Swapy | null>(null);
   const container = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!container.current) return;

      swapy.current = createSwapy(container.current, {
         manualSwap: true,
      });

      swapy.current.onSwap((event) => {
         setSlotItemMap(event.newSlotItemMap.asArray);
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
         <div className="flex justify-center">
            <Button onClick={swapLinkPosition} className="cursor-pointer">
               ⚡ Swap Positions
            </Button>
         </div>

         <div className="swapy-container space-y-2" ref={container}>
            {slottedItems.map(({ slotId, itemId, item: link }) => (
               <div
                  key={slotId}
                  className="flex cursor-pointer items-center justify-between rounded-lg border bg-secondary p-3 transition-colors hover:bg-muted"
                  data-swapy-slot={slotId}
               >
                  <div key={itemId} data-swapy-item={itemId}>
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">#{slotId}</span>
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
