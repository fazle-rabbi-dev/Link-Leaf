'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircleCheckIcon, CircleXIcon, MailIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

type VerifyEmailProps = {
   status: 'loading' | 'success' | 'error';
   message: string;
};

const VerifyEmail = ({ status, message }: VerifyEmailProps) => {
   return (
      <main className="mt-20 max-body font-ibm-plex-mono">
         <section className="w-full mx-auto max-w-md">
            <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
               <CardHeader className="flex-center flex-col gap-3 pt-2 text-center">
                  {status === 'loading' && (
                     <>
                        <div className="flex-center justify-center size-14 rounded-full bg-muted text-primary">
                           <MailIcon className="size-7" />
                        </div>
                        <h1 className="heading-4">Verifying your email</h1>
                     </>
                  )}
                  {status === 'success' && (
                     <>
                        <div className="flex-center justify-center size-14 rounded-full bg-primary/10 text-primary">
                           <CircleCheckIcon className="size-7" />
                        </div>
                        <h1 className="heading-4">Email verified! 🎉</h1>
                     </>
                  )}
                  {status === 'error' && (
                     <>
                        <div className="flex-center justify-center size-14 rounded-full bg-destructive/10 text-destructive">
                           <CircleXIcon className="size-7" />
                        </div>
                        <h1 className="heading-4">Verification failed</h1>
                     </>
                  )}
               </CardHeader>
               <CardContent className="flex-center flex-col gap-4 text-center">
                  {status === 'loading' && (
                     <>
                        <Spinner className="size-6 text-primary" />
                        <p
                           className="text-sm text-muted-foreground"
                           role="status"
                           aria-live="polite"
                        >
                           Hang tight while we confirm your address…
                        </p>
                     </>
                  )}
                  {status === 'success' && (
                     <p
                        className="text-sm text-muted-foreground"
                        role="status"
                        aria-live="polite"
                     >
                        {message} You can now sign in and start building your
                        leaf. 🌿
                     </p>
                  )}
                  {status === 'error' && (
                     <p
                        className="text-sm text-muted-foreground"
                        role="status"
                        aria-live="polite"
                     >
                        {message} Request a new link and try again.
                     </p>
                  )}
               </CardContent>
               <CardFooter className="flex-center flex-col gap-2 sm:flex-row">
                  {status === 'loading' && (
                     <p className="text-xs text-muted-foreground">
                        This won&apos;t take long
                     </p>
                  )}
                  {status === 'success' && (
                     <Button asChild className="w-full">
                        <Link href="/auth">Continue to sign in</Link>
                     </Button>
                  )}
                  {status === 'error' && (
                     <div className="flex-1 flex-center justify-center gap-2">
                        <Button
                           variant="outline"
                           className=""
                           onClick={() => {
                              window.location.reload();
                           }}
                           asChild
                        >
                           <Link href="/auth/resend-verification-email">
                              Get a new link
                           </Link>
                        </Button>
                        <Button asChild className="">
                           <Link href="/auth">Back to sign in</Link>
                        </Button>
                     </div>
                  )}
               </CardFooter>
            </Card>
         </section>
      </main>
   );
};

export default VerifyEmail;
