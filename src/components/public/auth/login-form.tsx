import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { MailWarningIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { loginSchema, type LoginFormData } from '@/validations/auth.validation';
import { loginFields } from '@/constants/authform';
import { FormInputField } from '@/components/ui/form-input-field';
import logger from '@/lib/logger';
import loginUserAction from '@/actions/login';
import { setAccessToken } from '@/lib/api/token';

type LoginFormProps = {
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
};

const LoginForm = ({ isLoading, setIsLoading }: LoginFormProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      mode: 'onTouched',
   });

   const Router = useRouter();
   const [needsEmailVerification, setNeedsEmailVerification] = useState(false);

   const onSubmit = async (formData: LoginFormData) => {
      setIsLoading(true);

      try {
         const body = await loginUserAction(formData);

         if (body.success) {
            // save accessToken in localstorage to use for crud operation
            setAccessToken(body.data.accessToken);

            toast.success(body.message);
            Router.replace('/dashboard/profile');
            // auth state update happens from profile page
         } else {
            if (body.message.includes('email needs to be verified')) {
               setNeedsEmailVerification(true);
            }
            throw new Error(body.message);
         }
      } catch (error) {
         if (error instanceof Error) {
            logger.error('LoginForm: error while logging in:', error);
            toast.error(error.message);
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         {loginFields.map((field) => (
            <FormInputField
               key={field.name}
               field={field}
               register={register}
               error={errors[field.name as keyof LoginFormData]?.message}
               disabled={isLoading}
            />
         ))}

         <div className="flex justify-end">
            <Link
               href="/auth/forgot-password"
               className="text-sm text-muted-foreground hover:text-primary"
            >
               Forgot password?
            </Link>
         </div>

         {needsEmailVerification && (
            <div
               role="alert"
               className="flex-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-left"
            >
               <span className="flex-center justify-center size-9 shrink-0 rounded-full bg-destructive/10 text-destructive">
                  <MailWarningIcon className="size-4" />
               </span>
               <p className="text-sm text-muted-foreground">
                  Your email needs to be verified before you can log in.{' '}
                  <Link
                     href="/auth/resend-verification-email"
                     className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                     Resend verification email
                  </Link>
               </p>
            </div>
         )}

         <Button type="submit" className="w-full" disabled={isLoading}>
            {isSubmitting ? <Spinner className="size-4" /> : 'LOGIN TO PAGE'}
         </Button>
      </form>
   );
};

export default LoginForm;
