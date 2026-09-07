import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAppearanceStore } from '@/store/useAppearanceStore';
import type { SocialPosition } from '@/constants/appearance';

export function SocialPositionSection() {
   const socialPosition = useAppearanceStore((s) => s.socialPosition);
   const updateSocialPosition = useAppearanceStore(
      (s) => s.updateSocialPosition,
   );

   return (
      <Card>
         <CardHeader className="pb-3">
            <CardTitle className="text-sm">Social icons position</CardTitle>
            <CardDescription className="text-xs">
               Top or bottom with mock preview
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-2 gap-3">
               {(['top', 'bottom'] as SocialPosition[]).map((pos) => (
                  <button
                     key={pos}
                     onClick={() => {
                        updateSocialPosition(pos);
                     }}
                     className={cn(
                        'rounded-xl border-2 p-3 flex flex-col items-center gap-2 transition-all cursor-pointer',
                        socialPosition === pos
                           ? 'border-primary bg-primary/5'
                           : 'border-border hover:border-primary/30',
                     )}
                  >
                     <span className="text-xs font-semibold capitalize">
                        {pos}
                     </span>
                     <div className="w-[110px] h-[140px] rounded-[18px] border bg-card shadow-sm flex flex-col items-center p-2 gap-1.5 overflow-hidden">
                        <div className="size-8 rounded-full bg-muted" />
                        <div className="h-1.5 w-12 rounded-full bg-muted" />
                        {pos === 'top' && (
                           <div className="flex gap-1 my-1">
                              <span className="size-5 rounded-full bg-primary/20" />
                              <span className="size-5 rounded-full bg-primary/20" />
                              <span className="size-5 rounded-full bg-primary/20" />
                           </div>
                        )}
                        <div className="w-full space-y-1 mt-1">
                           <div className="h-6 rounded-full bg-foreground" />
                           <div className="h-6 rounded-full bg-foreground/80" />
                           <div className="h-6 rounded-full bg-foreground/60" />
                        </div>
                        {pos === 'bottom' && (
                           <div className="flex gap-1 mt-auto">
                              <span className="size-5 rounded-full bg-primary/20" />
                              <span className="size-5 rounded-full bg-primary/20" />
                              <span className="size-5 rounded-full bg-primary/20" />
                           </div>
                        )}
                     </div>
                  </button>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
