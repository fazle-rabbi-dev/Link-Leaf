import type { Metadata } from 'next';

import AppearanceClient from './appearance-client';

export const metadata: Metadata = {
   title: 'Appearance',
};

const AppearancePage = () => {
   return <AppearanceClient />;
};

export default AppearancePage;
