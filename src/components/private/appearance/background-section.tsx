import { UploadIcon } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import {
   BACKGROUND_TYPES,
   BACKGROUND_COLORS,
   BACKGROUND_GRADIENTS,
} from '@/constants/appearance';
import { useAppearanceStore } from '@/store/useAppearanceStore';

import { ColorWheel } from './color-wheel';
import PickCustomColor from '@/components/shared/PickCustomColor';

export function BackgroundSection() {
   const {
      bgType,
      bgColor,
      bgGradient,
      setBgType,
      setBgColor,
      setBgGradient,
      setBgImage,
      log,
   } = useAppearanceStore(
      useShallow((s) => ({
         bgType: s.bgType,
         bgColor: s.bgColor,
         bgGradient: s.bgGradient,
         bgImage: s.bgImage,
         setBgType: s.setBgType,
         setBgColor: s.setBgColor,
         setBgGradient: s.setBgGradient,
         setBgImage: s.setBgImage,
         log: s.log,
      })),
   );

   return (
      <Card className="relative">
         <CardHeader className="pb-3">
            <CardTitle className="text-sm">Background</CardTitle>
            <CardDescription className="text-xs">
               Pick color, gradient or upload an image
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4 ">
            <div className="flex gap-2">
               {BACKGROUND_TYPES.map((t) => (
                  <Button
                     key={t}
                     size="sm"
                     variant={bgType === t ? 'default' : 'outline'}
                     onClick={() => {
                        if (t !== 'image') {
                           setBgType(t);
                        }
                     }}
                     className="capitalize cursor-pointer"
                  >
                     {t}
                  </Button>
               ))}
            </div>

            {bgType === 'color' && (
               <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                     Choose a color
                  </p>
                  <div className="flex gap-2.5">
                     {BACKGROUND_COLORS.map((c) => (
                        <ColorWheel
                           key={c}
                           color={c}
                           selected={bgColor === c}
                           onClick={() => {
                              setBgColor(c);
                              log(`background color → ${c}`, { bgColor: c });
                           }}
                        />
                     ))}

                     <PickCustomColor
                        value={bgColor}
                        presetColors={BACKGROUND_COLORS}
                        onChange={(c) => {
                           setBgColor(c);
                        }}
                     />
                  </div>
               </div>
            )}

            {bgType === 'gradient' && (
               <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                     Choose a gradient
                  </p>
                  <div className="flex gap-2.5">
                     {BACKGROUND_GRADIENTS.map((g) => (
                        <ColorWheel
                           key={g}
                           color={g}
                           selected={bgGradient === g}
                           onClick={() => {
                              setBgGradient(g);
                           }}
                        />
                     ))}
                  </div>
               </div>
            )}

            {bgType === 'image' && (
               <div className="space-y-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="gap-1.5 cursor-pointer"
                     onClick={() => {
                        const mock =
                           'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
                        setBgImage(mock);
                        log('background image uploaded (mimic)', {
                           bgImage: mock,
                        });
                     }}
                  >
                     <UploadIcon className="size-4" /> Upload image
                  </Button>

                  <p className="text-xs text-muted-foreground">
                     No image selected
                  </p>
               </div>
            )}
         </CardContent>
      </Card>
   );
}
