import { cn } from '@/lib/utils';

export function ColorWheel({
   color,
   selected,
   onClick,
}: {
   color: string;
   selected?: boolean;
   onClick: () => void;
}) {
   return (
      <button
         type="button"
         onClick={onClick}
         className={cn(
            'size-9 rounded-full border-2 transition-all cursor-pointer hover:scale-105',
            selected ? 'border-foreground scale-110 ring-2 ring-foreground/20' : 'border-border',
         )}
         style={{ background: color }}
         aria-label={`pick ${color}`}
      />
   );
}
