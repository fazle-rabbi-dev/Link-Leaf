import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import VerifyEmail from '@/components/public/auth/verify-email/verify-email';
import { verifyEmail } from '@/lib/api/auth';

export const metadata: Metadata = {
   title: 'Verify Email | Link-Leaf',
   description:
      'Confirm your email address to activate your Link-Leaf account and start sharing your single link.',
};

const VerifyEmailPage = async ({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const { token } = (await searchParams) ?? '';

   if (!token) {
      return notFound();
   }

   const { body } = await verifyEmail(token as string);

   return (
      <>
         <VerifyEmail
            status={body.success ? 'success' : 'error'}
            message={
               body.success
                  ? 'Your email has been verified.'
                  : 'Your email verification failed.'
            }
         />
      </>
   );
};

export default VerifyEmailPage;
