import type { Metadata } from 'next';

import LinksClient from './links-client';

export const metadata: Metadata = {
   title: 'Links',
};

const LinksPage = () => {
   return <LinksClient />;
};

export default LinksPage;
