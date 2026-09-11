'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { signInWithPopup } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import {
   socialLoginButtons,
   type SocialLoginProvider,
} from '@/constants/authform';
import AuthFooter from './auth-footer';
import AuthHeader from './auth-header';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { cn } from '@/lib/utils';
import { auth, googleProvider, githubProvider } from '@/lib/firebase/config';
import { Spinner } from '@/components/ui/spinner';
import logger from '@/lib/logger';
import socialLoginUserAction from '@/actions/socialLogin';

type AuthMode = 'login' | 'register';

const AuthForm = () => {
   const [mode, setMode] = useState<AuthMode>('login');
   const [isLoading, setisLoading] = useState(false);
   const [clickedProvider, setClickedProvider] =
      useState<SocialLoginProvider['id']>();

   const Router = useRouter();

   const handleSocialLogin = async (provider: SocialLoginProvider['id']) => {
      setClickedProvider(provider);
      setisLoading(true);

      try {
         let result;

         if (provider === 'google') {
            result = await signInWithPopup(auth, googleProvider);
         } else {
            result = await signInWithPopup(auth, githubProvider);
         }

         logger.success('Social login provider response:', result);

         // send data to backend
         const body = await socialLoginUserAction(provider, result.user.uid);

         if (body.success) {
            toast.success(body.message);
            Router.replace('/dashboard/profile');
         } else throw new Error(body.message);
      } catch (error) {
         toast.error(
            error instanceof Error
               ? error.message
               : 'Login failed. Try again later',
         );
      } finally {
         setisLoading(false);
      }
   };

   return (
      <main className="flex items-center justify-center px-4 py-16">
         {/* grid bg effect */}
         <div
            className="pointer-events-none fixed inset-0 z-0 min-h-screen"
            style={{
               backgroundImage: `
               repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
               repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
               repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
               repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
            `,
            }}
         />

         <div className="w-full max-w-lg">
            <section className="overflow-hidden rounded-xl bg-transparent shadow-lg ring-1 ring-foreground/10 backdrop-blur-sm">
               <div className="h-1.5 bg-primary" />

               <div className="p-6 sm:px-8">
                  <AuthHeader mode={mode} onModeChange={setMode} />

                  <div>
                     {mode === 'login' ? (
                        <LoginForm
                           isLoading={isLoading}
                           setIsLoading={setisLoading}
                        />
                     ) : (
                        <RegisterForm
                           isLoading={isLoading}
                           setIsLoading={setisLoading}
                        />
                     )}
                  </div>
               </div>

               {/* social logins */}
               <div className="px-6 sm:px-8 mb-6 flex-center flex-col  gap-4">
                  <div className="w-full flex items-center justify-between gap-2">
                     <p className="h-[.5px] flex-1 bg-muted" />
                     <p className="whitespace-nowrap">or</p>
                     <p className="h-[.5px] flex-1 bg-muted" />
                  </div>

                  {socialLoginButtons.map((social) => (
                     <Button
                        key={social.id}
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSocialLogin(social.id)}
                        disabled={isLoading}
                     >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={social.icon}
                           alt={social.id}
                           className={cn(
                              'size-4',
                              social.id === 'github' &&
                                 'rounded-full border border-foreground dark:bg-white',
                           )}
                        />
                        {social.label}
                        {isLoading && clickedProvider === social.id && (
                           <Spinner className="size-4" />
                        )}
                     </Button>
                  ))}
               </div>
            </section>

            <AuthFooter />
         </div>
      </main>
   );
};

export default AuthForm;
