import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
   BUTTON_SHAPES,
   BUTTON_STYLES,
   BUTTON_BG_COLORS,
   BUTTON_FG_COLORS,
} from '@/constants/appearance';
import { useAppearanceStore } from '@/store/useAppearanceStore';

import { ColorWheel } from './color-wheel';
import PickCustomColor from '@/components/shared/PickCustomColor';

export function ButtonSection() {
   const {
      buttonStyle,
      buttonShape,
      buttonBg,
      buttonFg,
      setButtonStyle,
      setButtonShape,
      setButtonBg,
      setButtonFg,
      log,
   } = useAppearanceStore(
      useShallow((s) => ({
         buttonStyle: s.buttonStyle,
         buttonShape: s.buttonShape,
         buttonBg: s.buttonBg,
         buttonFg: s.buttonFg,
         setButtonStyle: s.setButtonStyle,
         setButtonShape: s.setButtonShape,
         setButtonBg: s.setButtonBg,
         setButtonFg: s.setButtonFg,
         log: s.log,
      })),
   );

   return (
      <Card className="relative">
         <CardHeader className="pb-3">
            <CardTitle className="text-sm">Button</CardTitle>
            <CardDescription className="text-xs">
               Style, shape and colors
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-5 lg:grid lg:grid-cols-[1fr_180px] lg:gap-6 lg:space-y-0">
            {/* Left — main controls + preview */}
            <div className="space-y-5">
               <div>
                  <p className="text-xs font-medium mb-2">Style</p>
                  <div className="flex gap-2">
                     {BUTTON_STYLES.map((s) => (
                        <Button
                           key={s}
                           size="sm"
                           variant={buttonStyle === s ? 'default' : 'outline'}
                           onClick={() => {
                              setButtonStyle(s);
                              log(`button style → ${s}`, { buttonStyle: s });
                           }}
                           className="capitalize cursor-pointer"
                        >
                           {s}
                        </Button>
                     ))}
                  </div>
               </div>

               <div>
                  <p className="text-xs font-medium mb-2">Shape</p>
                  <div className="flex gap-2">
                     {BUTTON_SHAPES.map((shape) => (
                        <button
                           key={shape}
                           onClick={() => {
                              setButtonShape(shape);
                              log(`button shape → ${shape}`, {
                                 buttonShape: shape,
                              });
                           }}
                           className={cn(
                              'h-9 px-4 text-xs font-semibold border transition-all cursor-pointer',
                              buttonShape === shape
                                 ? 'bg-primary text-primary-foreground border-primary'
                                 : 'bg-card border-border',
                              shape === 'pill' && 'rounded-full',
                              shape === 'rounded' && 'rounded-lg',
                              shape === 'square' && 'rounded-none',
                           )}
                        >
                           {shape}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="rounded-lg border bg-muted/30 p-4 flex-center justify-center lg:p-6">
                  <span
                     className={cn(
                        'px-6 py-2.5 text-sm font-semibold border',
                        buttonShape === 'pill' && 'rounded-full',
                        buttonShape === 'rounded' && 'rounded-lg',
                        buttonShape === 'square' && 'rounded-none',
                     )}
                     style={{
                        background:
                           buttonStyle === 'solid' ? buttonBg : 'transparent',
                        color: buttonStyle === 'solid' ? buttonFg : buttonBg,
                        borderColor: buttonBg,
                     }}
                  >
                     Preview button
                  </span>
               </div>
            </div>

            {/* Right — colors stacked vertically on desktop */}
            <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6 lg:border-l lg:pl-6">
               <div>
                  <p className="text-xs font-medium mb-2">Background color</p>
                  <div className="flex gap-2 flex-wrap lg:gap-2.5">
                     {BUTTON_BG_COLORS.map((c) => (
                        <ColorWheel
                           key={c}
                           color={c}
                           selected={buttonBg === c}
                           onClick={() => {
                              setButtonBg(c);
                              log(`button bg → ${c}`, { buttonBg: c });
                           }}
                        />
                     ))}

                     <PickCustomColor
                        value={buttonBg}
                        presetColors={BUTTON_BG_COLORS}
                        onChange={(c) => {
                           setButtonBg(c);
                        }}
                     />
                  </div>
               </div>
               <div>
                  <p className="text-xs font-medium mb-2">Foreground color</p>
                  <div className="flex gap-2 flex-wrap lg:gap-2.5">
                     {BUTTON_FG_COLORS.map((c) => (
                        <ColorWheel
                           key={c}
                           color={c}
                           selected={buttonFg === c}
                           onClick={() => {
                              setButtonFg(c);
                           }}
                        />
                     ))}

                     <PickCustomColor
                        value={buttonFg}
                        presetColors={BUTTON_FG_COLORS}
                        onChange={(c) => {
                           setButtonFg(c);
                           log(`button fg → ${c}`, { buttonFg: c });
                        }}
                     />
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
