import { NextResponse, type NextRequest } from 'next/server';
import { getLoggedInUser } from '@/lib/api/auth';
import logger from './lib/logger';

const publicRoutes = ['/', '/auth', '/verify-email'];

// just create a new cookie header value by extracting set-cookie from backend response
const buildCookieHeader = (res: Response | null) => {
   if (!res) return null;
   const set = res.headers.getSetCookie?.() ?? [];
   const pairs = set.map((c) => c.split(';')[0]).join('; ');
   return pairs || null;
};

export async function proxy(request: NextRequest) {
   const url = new URL(request.url);
   logger.info('🚦Middleware: request received:', {
      '🚚 pathname': url.pathname,
      '🕑 Time': `${new Date().toLocaleTimeString()}`,
   });

   // get cookies that saved in browser; after refresh token these cookies bec
   const cookies = request.cookies;
   const accessToken = cookies.get('accessToken');
   const refreshToken = cookies.get('refreshToken');

   // prepare "request cookie header" for fetch api;
   const headers = {
      Cookie: `accessToken=${accessToken?.value || ''}; refreshToken=${refreshToken?.value || ''}`,
   };

   // ------------------------------- fetch user + handle refresh token -------------------------------
   let isLoggedIn = false;
   let refreshResponse: Response | null = null;

   if (accessToken || refreshToken) {
      try {
         const result = await getLoggedInUser(headers, 'proxy');

         isLoggedIn = result.body.success;
         refreshResponse = result.refreshResponse ?? null;
      } catch (error) {
         logger.error(
            '🚦Middleware: received error on calling getLoggedInUser.',
         );
      }
   }
   // ------------------------------- fetch user + handle refresh token -------------------------------

   const isPublicRoute = publicRoutes.some(
      (route) => url.pathname === route || url.pathname.startsWith(route + '/'),
   );
   const isDashboardRoute = url.pathname.startsWith('/dashboard');

   // ------------------------------------------------------------------------------------------------
   // 💡FOR SERVER COMPONENT: Inject new accessToken (that generated after successful refreshToken) as form of cookie header into the existing request object;
   //  -> this request header (which contains new token) can be accessed by server component

   // take existing headers that also contains browser provided cookies;
   //  -> so when no need to "refresh token", the original accessToken passed down to the server component
   const requestHeaders = new Headers(request.headers);
   const newCookie = buildCookieHeader(refreshResponse);
   if (newCookie) requestHeaders.set('Cookie', newCookie);

   // ------------------------------------------------------------------------------------------------
   // 💡 FOR BROWSER: Inject new access & refresh token inside response object that eventually will be sent to browser;
   //  -> so browser get latest access & refresh token in it's cookie

   const withCookies = (res: NextResponse) => {
      const cookies = refreshResponse?.headers.getSetCookie?.() ?? [];
      for (const cookie of cookies) res.headers.append('Set-Cookie', cookie);
      return res;
   };

   // loggedin and public route -> redirect to dashboard
   if (isPublicRoute && isLoggedIn) {
      return withCookies(
         NextResponse.redirect(new URL('/dashboard/profile', request.url)),
      );
   }

   // not loggedin and dashboard route -> redirect to auth
   if (isDashboardRoute && !isLoggedIn) {
      return withCookies(NextResponse.redirect(new URL('/auth', request.url)));
   }

   return withCookies(
      // since this request forward to next hop (server component);
      //  -> so replace existing headers with new headers that contains all existing headers + new accessToken
      NextResponse.next({ request: { headers: requestHeaders } }),
   );
}

export const config = {
   matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js)$).*)',
   ],
};
