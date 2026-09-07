'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheckIcon, CircleXIcon, KeyRoundIcon } from 'lucide-react';

import { resetPassword } from '@/lib/api/auth';
import {
   resetPasswordSchema,
   type ResetPasswordFormData,
} from '@/validations/auth.validation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Status = 'idle' | 'loading' | 'success' | 'error';

const ResetPassword = ({ token }: { token: string }) => {
   const [status, setStatus] = useState<Status>('idle');
   const [message, setMessage] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
      mode: 'onTouched',
   });

   const onSubmit = async (formData: ResetPasswordFormData) => {
      setStatus('loading');
      setMessage('');

      try {
         const { body } = await resetPassword(token, formData.newPassword);

         if (body.success) {
            setStatus('success');
            setMessage(body.message);
         } else {
            throw new Error(body.message);
         }
      } catch (error) {
         setStatus('error');
         setMessage(
            error instanceof Error
               ? error.message
               : 'Password reset failed. Try again.',
         );
      }
   };

   return (
      <main className="max-body flex-center w-full justify-center py-16">
         <section className="mx-auto w-full max-w-md">
            <Card className="animate-in fade-in-0 zoom-in-95 duration-500">
               <CardHeader className="flex-center flex-col gap-3 pt-2 text-center">
                  <div
                     className={
                        status === 'success'
                           ? 'flex-center justify-center size-14 rounded-full bg-primary/10 text-primary'
                           : status === 'error'
                             ? 'flex-center justify-center size-14 rounded-full bg-destructive/10 text-destructive'
                             : 'flex-center justify-center size-14 rounded-full bg-primary/10 text-primary'
                     }
                  >
                     {status === 'success' ? (
                        <CircleCheckIcon className="size-7" />
                     ) : status === 'error' ? (
                        <CircleXIcon className="size-7" />
                     ) : (
                        <KeyRoundIcon className="size-7" />
                     )}
                  </div>
                  <h1 className="heading-4">
                     {status === 'success'
                        ? 'Password reset!'
                        : status === 'error'
                          ? 'Reset failed'
                          : 'Set a new password'}
                  </h1>
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
                           Setting your new password…
                        </p>
                     </>
                  )}

                  {status === 'success' && (
                     <p
                        className="text-sm text-muted-foreground"
                        role="status"
                        aria-live="polite"
                     >
                        {message} You can now sign in with your new password.
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

                  {status === 'idle' && (
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full space-y-4"
                     >
                        <div className="space-y-2 text-left">
                           <Label htmlFor="newPassword">New password</Label>
                           <Input
                              id="newPassword"
                              type="password"
                              placeholder="Enter your new password"
                              autoComplete="new-password"
                              {...register('newPassword')}
                           />
                           {errors.newPassword && (
                              <p className="text-sm text-destructive">
                                 {errors.newPassword.message}
                              </p>
                           )}
                        </div>
                        <Button type="submit" className="w-full">
                           Reset password
                        </Button>
                     </form>
                  )}
               </CardContent>

               <CardFooter className="flex-center flex-col gap-2 sm:flex-row">
                  {status === 'success' && (
                     <Button asChild className="w-full">
                        <Link href="/auth">Continue to sign in</Link>
                     </Button>
                  )}
                  {status === 'error' && (
                     <div className="flex-1 flex-center justify-center gap-2">
                        <Button variant="outline" onClick={() => setStatus('idle')}>
                           Try again
                        </Button>
                        <Button asChild>
                           <Link href="/auth/forgot-password">Get a new link</Link>
                        </Button>
                     </div>
                  )}
                  {(status === 'idle' || status === 'loading') && (
                     <Button variant="ghost" asChild>
                        <Link
                           href="/auth"
                           className="gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                           Back to sign in
                        </Link>
                     </Button>
                  )}
               </CardFooter>
            </Card>
         </section>
      </main>
   );
};

export default ResetPassword;
