import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { PRESET_THEME_TOKENS } from '@/constants/appearance';
import { useAppearanceStore } from '@/store/useAppearanceStore';

export function PresetGrid() {
   const selectedPreset = useAppearanceStore((s) => s.selectedPreset);
   const setSelectedPreset = useAppearanceStore((s) => s.setSelectedPreset);
   const setShowCustomBuilder = useAppearanceStore(
      (s) => s.setShowCustomBuilder,
   );
   const updateAppearance = useAppearanceStore((s) => s.updateAppearance);

   return (
      <section className="mb-6">
         <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Preset themes
         </h2>
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRESET_THEME_TOKENS.map((theme) => {
               const isSelected = selectedPreset === theme.key;

               return (
                  <button
                     key={theme.key}
                     onClick={() => {
                        setSelectedPreset(theme.key);
                        setShowCustomBuilder(false);
                        updateAppearance('preset');
                     }}
                     className={cn(
                        'group relative rounded-xl border-2 p-3 text-left transition-all cursor-pointer overflow-hidden h-[110px] flex flex-col justify-between',
                        isSelected
                           ? 'border-primary ring-2 ring-primary/20'
                           : 'border-border hover:border-primary/40',
                     )}
                     style={{ background: theme.bgColor }}
                  >
                     <div
                        className="absolute inset-0 opacity-60"
                        style={{ background: theme.bgGradient }}
                     />
                     <div className="relative flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-black backdrop-blur">
                           {theme.label}
                        </span>
                        {isSelected && (
                           <span className="size-6 rounded-full bg-primary text-primary-foreground flex-center justify-center animate-in zoom-in-95">
                              <CheckIcon className="size-3.5" />
                           </span>
                        )}
                     </div>
                     <div className="relative">
                        <p className="text-xs font-medium text-black/60">
                           {theme.description}
                        </p>
                        <div className="mt-2 flex gap-1.5">
                           <span
                              className="h-1.5 w-8 rounded-full"
                              style={{ background: theme.buttonBg }}
                           />
                           <span className="h-1.5 w-4 rounded-full bg-white/70" />
                        </div>
                     </div>
                  </button>
               );
            })}
         </div>
      </section>
   );
}
