import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
   ArrowLeftIcon,
   CircleCheckIcon,
   CircleXIcon,
   KeyRoundIcon,
} from 'lucide-react';

import { ForgotPasswordEmail } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SubmitButton from './submit-button';

export const metadata: Metadata = {
   title: 'Forgot Password | Link-Leaf',
   description: 'Reset your Link-Leaf account password.',
};

const isValidEmail = (value: string) =>
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function forgotPasswordAction(formData: FormData) {
   'use server';

   const rawEmail = String(formData.get('email') ?? '').trim();

   if (!isValidEmail(rawEmail)) {
      redirect(
         `/auth/forgot-password?status=error&message=${encodeURIComponent('Please enter a valid email address.')}&email=${encodeURIComponent(rawEmail)}`,
      );
   }

   const result = await ForgotPasswordEmail(rawEmail);

   redirect(
      `/auth/forgot-password?status=${result.body.success ? 'success' : 'error'}&message=${encodeURIComponent(result.body.message)}&email=${encodeURIComponent(rawEmail)}`,
   );
}

type SearchParams = {
   status?: string;
   message?: string;
   email?: string;
};

const ForgotPasswordPage = async ({
   searchParams,
}: {
   searchParams: Promise<SearchParams>;
}) => {
   const { status, message, email } = await searchParams;
   const isSuccess = status === 'success';
   const isError = status === 'error';

   return (
      <main className="max-body flex-center w-full justify-center py-16">
         <section className="mx-auto w-full max-w-md">
            <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
               <CardHeader className="flex-center flex-col gap-3 pt-2 text-center">
                  <div
                     className={
                        isSuccess
                           ? 'flex-center justify-center size-14 rounded-full bg-primary/10 text-primary'
                           : isError
                             ? 'flex-center justify-center size-14 rounded-full bg-destructive/10 text-destructive'
                             : 'flex-center justify-center size-14 rounded-full bg-primary/10 text-primary'
                     }
                  >
                     {isSuccess ? (
                        <CircleCheckIcon className="size-7" />
                     ) : isError ? (
                        <CircleXIcon className="size-7" />
                     ) : (
                        <KeyRoundIcon className="size-7" />
                     )}
                  </div>
                  <h1 className="heading-2">
                     {isSuccess
                        ? 'Email sent!'
                        : isError
                          ? 'Something went wrong'
                          : 'Forgot password'}
                  </h1>
               </CardHeader>

               <CardContent className="flex-center flex-col gap-4 text-center">
                  {isSuccess ? (
                     <p
                        className="text-sm text-muted-foreground"
                        role="status"
                        aria-live="polite"
                     >
                        {message}
                     </p>
                  ) : (
                     <>
                        <p className="text-sm text-muted-foreground">
                           {isError && message
                              ? message
                              : 'Enter your email address and we will send you a password reset link.'}
                        </p>

                        <form
                           action={forgotPasswordAction}
                           className="w-full space-y-4"
                        >
                           <div className="space-y-2 text-left">
                              <Label htmlFor="email">Email address</Label>
                              <Input
                                 id="email"
                                 name="email"
                                 type="email"
                                 placeholder="you@example.com"
                                 defaultValue={email ?? ''}
                                 required
                                 autoComplete="email"
                              />
                           </div>
                           <SubmitButton />
                        </form>
                     </>
                  )}
               </CardContent>

               <CardFooter className="flex-center">
                  <Button variant="ghost" asChild>
                     <Link
                        href="/auth"
                        className="gap-2 text-sm text-muted-foreground hover:text-foreground"
                     >
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

export default ForgotPasswordPage;
