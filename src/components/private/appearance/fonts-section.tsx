import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useShallow } from 'zustand/shallow';

import { FONT_OPTIONS, FOREGROUND_COLORS } from '@/constants/appearance';
import { useAppearanceStore } from '@/store/useAppearanceStore';

import { ColorWheel } from './color-wheel';
import PickCustomColor from '@/components/shared/PickCustomColor';

export function FontsSection() {
   const { fontName, foregroundColor, setFontName, setForegroundColor, log } =
      useAppearanceStore(
         useShallow((s) => ({
            fontName: s.fontName,
            foregroundColor: s.foregroundColor,
            setFontName: s.setFontName,
            setForegroundColor: s.setForegroundColor,
            log: s.log,
         })),
      );

   return (
      <Card>
         <CardHeader className="pb-3">
            <CardTitle className="text-sm">Fonts & Text</CardTitle>
            <CardDescription className="text-xs">
               Pick a font and foreground color
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4 lg:grid lg:grid-cols-[1fr_180px] lg:gap-6 lg:space-y-0">
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-2 xl:grid-cols-3 content-start">
               {FONT_OPTIONS.map((f) => (
                  <button
                     key={f}
                     onClick={() => {
                        setFontName(f);
                        log(`font → ${f}`, { fontName: f });
                     }}
                     className={cn(
                        'rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer',
                        fontName === f
                           ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                           : 'border-border hover:border-primary/40',
                     )}
                  >
                     <p
                        className="text-xs font-semibold truncate"
                        style={{ fontFamily: f }}
                     >
                        {f}
                     </p>
                     <p
                        className="text-[11px] text-muted-foreground truncate"
                        style={{ fontFamily: f }}
                     >
                        Ag Aa
                     </p>
                  </button>
               ))}
            </div>
            <div className="lg:border-l lg:pl-6 lg:space-y-4">
               <div>
                  <p className="text-xs font-medium mb-2">Foreground color</p>
                  <div className="flex gap-2 flex-wrap lg:gap-2.5 items-center">
                     {FOREGROUND_COLORS.map((c) => (
                        <ColorWheel
                           key={c}
                           color={c}
                           selected={foregroundColor === c}
                           onClick={() => {
                              setForegroundColor(c);
                           }}
                        />
                     ))}
                     <PickCustomColor
                        value={foregroundColor}
                        presetColors={FOREGROUND_COLORS}
                        onChange={(c) => {
                           setForegroundColor(c);
                           log(`foreground → ${c}`, { foregroundColor: c });
                        }}
                     />
                  </div>
               </div>
               <p
                  className="text-sm lg:rounded-lg lg:border lg:bg-muted/20 lg:p-3"
                  style={{ color: foregroundColor, fontFamily: fontName }}
               >
                  Preview text in {fontName}
               </p>
            </div>
         </CardContent>
      </Card>
   );
}
