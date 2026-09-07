'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
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

const AppearanceDemo = () => {
   const [selectedColor, setSelectedColor] = useState<ButtonColor>('green');
   const [selectedShape, setSelectedShape] = useState<ButtonShape>('pill');

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
                  variant={selectedShape === shape ? 'default' : 'outline'}
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
               colorOptions.find((c) => c.color === selectedColor)?.className,
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
};

export default AppearanceDemo;
