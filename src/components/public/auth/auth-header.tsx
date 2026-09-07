import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register';

interface AuthHeaderProps {
   mode: AuthMode;
   onModeChange: (mode: AuthMode) => void;
}

const AuthHeader = ({ mode, onModeChange }: AuthHeaderProps) => {
   return (
      <header>
         <div className="mb-8 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
               <div className="size-3 rounded-full bg-primary" />
               <h1 className="heading-4">
               {mode === 'login'
                  ? 'Welcome back to your grove'
                  : 'Plant your first leaf'}
            </h1>
            </div>
            <p className="text-sm text-muted-foreground">
               Claim your spot on our beautiful, single-link tree network.
            </p>
         </div>

         <div className="mb-6 rounded-lg bg-muted p-1">
            <div className="grid grid-cols-2 gap-1">
               <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onModeChange('login')}
                  className={cn(
                     'font-semibold hover:bg-background dark:hover:bg-background',
                     mode === 'login'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted dark:hover:bg-muted/50',
                  )}
               >
                  Login
               </Button>
               <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onModeChange('register')}
                  className={cn(
                     'font-semibold hover:bg-background dark:hover:bg-background',
                     mode === 'register'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted dark:hover:bg-muted/50',
                  )}
               >
                  Register
               </Button>
            </div>
         </div>
      </header>
   );
};

export default AuthHeader;
