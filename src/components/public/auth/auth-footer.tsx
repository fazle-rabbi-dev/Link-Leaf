import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const AuthFooter = () => {
   return (
      <div className="mt-6 text-center">
         <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
         >
            <ArrowLeft className="size-4" />
            Return to Home
         </Link>
      </div>
   );
};

export default AuthFooter;
