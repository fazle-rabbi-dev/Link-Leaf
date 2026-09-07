import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const PageLoader = ({ center, dark }: { center?: boolean; dark?: boolean }) => {
   return (
      <div
         className={cn(
            center && 'min-h-screen  items-center',
            'flex justify-center',
         )}
      >
         <Spinner
            className={cn(dark ? 'text-black' : 'text-primary', 'size-8')}
         />
      </div>
   );
};

export default PageLoader;
