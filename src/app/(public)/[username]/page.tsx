import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { PublicProfileClient } from '@/components/public/profile/public-profile-client';
import { getPublicProfile } from '@/lib/api/profile';
import { APP_URL } from '@/lib/env';

async function fetchProfile(username: string) {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('accessToken');

   const headers = {
      Cookie: `accessToken=${accessToken?.value || ''}`,
   };

   return getPublicProfile(headers, username);
}

export async function generateMetadata({
   params,
}: {
   params: Promise<{ username: string }>;
}): Promise<Metadata> {
   const { username } = await params;
   const { body } = await fetchProfile(username);

   if (!body.success || !body.data) return {};

   const { name, bio } = body.data.profile;

   return {
      title: name ? `${name}` : 'LinkLeaf',
      description: bio || undefined,
   };
}

export default async function PublicProfilePage({
   params,
}: {
   params: Promise<{ username: string }>;
}) {
   const { username } = await params;
   const { body } = await fetchProfile(username);

   if (body.success && body.data) {
      const { name, username, bio, avatar, links } = body.data.profile;

      const jsonLd = {
         '@context': 'https://schema.org',
         '@type': 'Person',
         name: name,
         url: `${APP_URL}/${username}`,
         image: avatar,
         sameAs: links.social.map((l) => l.url),
         description: bio,
      };

      // Escape special chars to prevent XSS attack
      const jsonLdStr = JSON.stringify(jsonLd)
         .replace(/</g, '\\u003c')
         .replace(/>/g, '\\u003e')
         .replace(/&/g, '\\u0026');

      return (
         <>
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{ __html: jsonLdStr }}
            />

            <PublicProfileClient profile={body.data.profile} />
         </>
      );
   }

   return notFound();
}
