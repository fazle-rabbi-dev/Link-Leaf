import { ImageResponse } from 'next/og';
import { API_BASE_URL } from '@/lib/env';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
   params,
}: {
   params: Promise<{ username: string }>;
}) {
   const { username } = await params;

   const res = await fetch(`${API_BASE_URL}/profile/${username}`);
   const json = await res.json();

   if (!json.success || !json.data) {
      return new ImageResponse(
         <div
            style={{
               background: '#f5f5f5',
               width: '100%',
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               fontFamily: 'sans-serif',
            }}
         >
            <span style={{ fontSize: 48, color: '#999' }}>LinkLeaf</span>
         </div>,
         size,
      );
   }

   const { name, bio } = json.data.profile;

   return new ImageResponse(
      <div
         style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            padding: 80,
         }}
      >
         <div
            style={{
               fontSize: 64,
               fontWeight: 700,
               color: '#ffffff',
               textAlign: 'center',
               lineHeight: 1.2,
            }}
         >
            {name || username}
         </div>
         {bio && (
            <div
               style={{
                  fontSize: 28,
                  color: 'rgba(255,255,255,0.85)',
                  textAlign: 'center',
                  marginTop: 24,
                  maxWidth: 800,
               }}
            >
               {bio}
            </div>
         )}
         <div
            style={{
               fontSize: 20,
               color: 'rgba(255,255,255,0.6)',
               marginTop: 48,
            }}
         >
            link-leaf.vercel.app/{username}
         </div>
      </div>,
      size,
   );
}
