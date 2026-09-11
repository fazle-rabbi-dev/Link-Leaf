'use server';

import { cookies } from 'next/headers';
import setCookieParser from 'set-cookie-parser';
import { loginUserWithSocial } from '@/lib/api/auth';

const socialLoginUserAction = async (
   provider: 'github' | 'google',
   userId: string,
) => {
   const { response, body } = await loginUserWithSocial({ provider, userId });
   const cookieStore = await cookies();

   const rawCookies = response?.headers.getSetCookie?.() ?? [];
   const parsedCookies = setCookieParser.parse(rawCookies, { map: false });

   for (const c of parsedCookies) {
      cookieStore.set(c.name, c.value, {
         httpOnly: c.httpOnly,
         secure: c.secure,
         path: c.path,
         maxAge: c.maxAge,
         // sameSite: c.sameSite as 'strict' | 'lax' | 'none',
         sameSite: 'strict',
         expires: c.expires,
      });
   }

   return body;
};

export default socialLoginUserAction;
