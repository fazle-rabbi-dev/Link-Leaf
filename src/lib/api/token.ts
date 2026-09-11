const ACCESS_TOKEN_KEY = 'accessToken';

export function getAccessToken(): string | null {
   if (typeof document === 'undefined') return null;

   const cookieString = document.cookie;
   if (!cookieString) return null;

   const cookies = cookieString.split('; ');
   const targetCookie = cookies.find((cookie) =>
      cookie.startsWith(`${ACCESS_TOKEN_KEY}=`),
   );

   if (!targetCookie) return null;

   return decodeURIComponent(targetCookie.split('=').slice(1).join('='));
}
