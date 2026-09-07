'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailIcon, CircleCheckIcon, ArrowLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Status = 'idle' | 'loading' | 'success' | 'error';

const ResendVerification = () => {
   const [email, setEmail] = useState('');
   const [status, setStatus] = useState<Status>('idle');
   const [message, setMessage] = useState('');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!email) return;

      setStatus('loading');
      setMessage('');

      // TODO: Replace with actual API call
      // await apiRequest('/auth/resend-verification', { method: 'POST', body: { email } });
      
      // Mock API call
      setTimeout(() => {
         setStatus('success');
         setMessage(`Verification email sent to ${email}. Check your inbox.`);
      }, 1500);
   };

   return (
      <main className="mt-20 max-body font-ibm-plex-mono">
         <section className="w-full mx-auto max-w-md">
            <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
               <CardHeader className="flex-center flex-col gap-3 pt-2 text-center">
                  {status !== 'success' && (
                     <>
                        <div className="flex-center justify-center size-14 rounded-full bg-primary/10 text-primary">
                           <MailIcon className="size-7" />
                        </div>
                        <h1 className="heading-4">Resend verification email</h1>
                     </>
                  )}
                  {status === 'success' && (
                     <>
                        <div className="flex-center justify-center size-14 rounded-full bg-primary/10 text-primary">
                           <CircleCheckIcon className="size-7" />
                        </div>
                        <h1 className="heading-4">Email sent!</h1>
                     </>
                  )}
               </CardHeader>

               <CardContent className="flex-center flex-col gap-4 text-center">
                  {status === 'idle' && (
                     <p className="text-sm text-muted-foreground">
                        Enter your email address and we&apos;ll send you a new verification link.
                     </p>
                  )}

                  {status === 'loading' && (
                     <>
                        <Spinner className="size-6 text-primary" />
                        <p
                           className="text-sm text-muted-foreground"
                           role="status"
                           aria-live="polite"
                        >
                           Sending verification email…
                        </p>
                     </>
                  )}

                  {status === 'success' && (
                     <p
                        className="text-sm text-muted-foreground"
                        role="status"
                        aria-live="polite"
                     >
                        {message}
                     </p>
                  )}

                  {(status === 'idle' || status === 'error') && (
                     <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="space-y-2 text-left">
                           <Label htmlFor="email">Email address</Label>
                           <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              autoComplete="email"
                           />
                        </div>
                        <Button type="submit" className="w-full" disabled={!email}>
                           Send verification email
                        </Button>
                     </form>
                  )}
               </CardContent>

               <CardFooter className="flex-center">
                  <Button variant="ghost" asChild>
                     <Link href="/auth" className="gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeftIcon className="size-4" />
                        Back to sign in
                     </Link>
                  </Button>
               </CardFooter>
            </Card>
         </section>
      </main>
   );
};

export default ResendVerification;
