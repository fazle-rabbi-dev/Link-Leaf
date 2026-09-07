import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ResetPassword from '@/components/public/auth/reset-password/reset-password';

export const metadata: Metadata = {
   title: 'Reset Password | Link-Leaf',
   description: 'Set a new password for your Link-Leaf account.',
};

const ResetPasswordPage = async ({
   searchParams,
}: {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const { token } = (await searchParams) ?? '';

   if (!token) {
      return notFound();
   }

   return <ResetPassword token={token as string} />;
};

export default ResetPasswordPage;
