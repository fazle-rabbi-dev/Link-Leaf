import type { Metadata } from 'next';

import AuthForm from '@/components/public/auth/auth-form';

export const metadata: Metadata = {
   title: 'Login or Register',
   description:
      'Sign in to your Link-Leaf account or create a new one to claim your spot on our beautiful, single-link tree network.',
};

const AuthPage = () => {
   return <AuthForm />;
};

export default AuthPage;
