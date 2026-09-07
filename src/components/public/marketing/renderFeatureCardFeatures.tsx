import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { createSwapy, Swapy } from 'swapy';
import { Button } from '../../ui/button';

type ButtonShape = 'pill' | 'rounded' | 'square';
type ButtonColor = 'green' | 'purple' | 'red' | 'black';

const colorOptions: { color: ButtonColor; className: string }[] = [
   { color: 'green', className: 'bg-primary/50 dark:bg-primary/20' },
   { color: 'purple', className: 'bg-purple-500' },
   { color: 'red', className: 'bg-red-500' },
   { color: 'black', className: 'bg-black' },
];

const shapeOptions: { shape: ButtonShape; label: string; className: string }[] =
   [
      { shape: 'pill', label: 'PILL', className: 'rounded-full' },
      { shape: 'rounded', label: 'ROUNDED', className: 'rounded-lg' },
      { shape: 'square', label: 'SQUARE', className: 'rounded-none' },
   ];

// Scaffold with ai
const renderFeatureCardFeatures = (feature: string) => {
   console.log('re-rendered');

   // Appearance
   const [selectedColor, setSelectedColor] = useState<ButtonColor>('green');
   const [selectedShape, setSelectedShape] = useState<ButtonShape>('pill');

   // Layout
   const [links, setLinks] = useState([
      { id: 1, name: 'My Personal Website' },
      { id: 2, name: 'Latest Tech Blog' },
      { id: 3, name: 'Book a Calendly' },
   ]);

   // Analytics
   const [views, setViews] = useState(3492);
   const [clicks, setClicks] = useState(2311);
   const [clickRate, setClickRate] = useState(66.1);

   // Swap links position
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

   const swapy = useRef<Swapy | null>(null);
   const container = useRef<HTMLDivElement>(null);

   useEffect(() => {
      // If container element is loaded
      if (container.current) {
         swapy.current = createSwapy(container.current, {
            manualSwap: true,
         });

         // Your event listeners
         swapy.current.onSwapEnd((event) => {
            console.log(event.slotItemMap.asArray);

            const newOrder = event.slotItemMap.asArray;
            // newOrder = [{slot: "1", item: "2"}, {slot: "2", item: "1"}, {slot: "3", item: "3"}]
            //                                ↑ item value = your link.id (as string)

            // setLinks(prev =>
            //    newOrder.map(({ item }) =>
            //       prev.find(link => link.id === Number(item))!
            //    )
            // )
         });
      }

      return () => {
         // Destroy the swapy instance on component destroy
         swapy.current?.destroy();
      };
   }, []);

   switch (feature) {
      case 'appearance':
         return (
            <div className="space-y-4 px-4 py-2">
               {/* Color Selection */}
               <div className="flex justify-center gap-2">
                  {colorOptions.map(({ color, className }) => (
                     <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`size-6 rounded-full ${className} ${selectedColor === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''}`}
                     />
                  ))}
               </div>

               {/* Shape Selection */}
               <div className="flex justify-center gap-1">
                  {shapeOptions.map(({ shape, label, className }) => (
                     <Button
                        key={shape}
                        variant={
                           selectedShape === shape ? 'default' : 'outline'
                        }
                        size="xs"
                        onClick={() => setSelectedShape(shape)}
                        className={`font-medium`}
                     >
                        {label}
                     </Button>
                  ))}
               </div>

               {/* Demo Profile Card */}
               <div
                  className={cn(
                     'rounded-lg px-4 py-2 text-center text-white',
                     colorOptions.find((c) => c.color === selectedColor)
                        ?.className,
                  )}
               >
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/20"></div>
                  <div className="mb-4 space-y-2">
                     <div
                        className={cn(
                           'mx-auto h-4 w-28 bg-white/20',
                           selectedShape === 'pill'
                              ? 'rounded-full'
                              : selectedShape === 'rounded'
                                ? 'rounded'
                                : 'rounded-none',
                        )}
                     ></div>
                     <div
                        className={cn(
                           'mx-auto h-4 w-28 bg-white/20',
                           selectedShape === 'pill'
                              ? 'rounded-full'
                              : selectedShape === 'rounded'
                                ? 'rounded'
                                : 'rounded-none',
                        )}
                     ></div>
                  </div>
               </div>
            </div>
         );

      case 'layout':
         return (
            <div className="space-y-4 px-4 py-2 select-none">
               <div className="flex justify-center">
                  <Button onClick={swapLinkPosition} className="cursor-pointer">
                     ⚡ Swap Positions
                  </Button>
               </div>

               <div className="space-y-2" ref={container}>
                  {links.map((link, index) => (
                     <div
                        key={link.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg border bg-secondary p-3 transition-colors hover:bg-muted"
                        data-swapy-slot={link.id}
                     >
                        <div data-swapy-item={link.id}>
                           {/* ------------------ */}
                           <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">
                                 #{index + 1}
                              </span>
                              <span className="text-sm">{link.name}</span>
                           </div>

                           {/* ------------------ */}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         );

      case 'analytics':
         return (
            <div className="space-y-4 p-4">
               <div className="text-center">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 uppercase">
                     Simulated Traffic
                  </span>
               </div>
            </div>
         );

      default:
         return <div>Feature not found</div>;
   }
};

export default renderFeatureCardFeatures;
