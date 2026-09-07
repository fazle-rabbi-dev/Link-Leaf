import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { cn } from '@/lib/utils';

type Props = {
   value: string;
   presetColors: readonly string[];
   onChange: (color: string) => void;
};

export default function PickCustomColor({ value, presetColors, onChange }: Props) {
   const [open, setOpen] = useState(false);
   const isCustom = !presetColors.includes(value);

   useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
         document.body.style.overflow = prev;
      };
   }, [open]);

   return (
      <div>
         <button
            type="button"
            onClick={() => setOpen((p) => !p)}
            className={cn(
               'size-9 rounded-full border-2 border-dashed flex-center justify-center text-[10px] font-bold cursor-pointer',
               isCustom
                  ? 'border-foreground scale-110 ring-2 ring-foreground/20'
                  : 'border-muted-foreground/40',
            )}
            style={{ background: isCustom ? value : 'transparent' }}
            aria-label="pick custom color"
         >
            {!isCustom && '+'}
         </button>

         {open && (
            <>
               <button
                  type="button"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setOpen(false)}
                  aria-label="close picker"
               />
               <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg rounded-lg overflow-hidden border bg-card">
                  <HexColorPicker color={value} onChange={onChange} />
               </div>
            </>
         )}
      </div>
   );
}
