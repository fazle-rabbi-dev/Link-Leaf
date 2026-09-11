'use server';

import { cookies } from 'next/headers';
import setCookieParser from 'set-cookie-parser';
import { loginUser } from '@/lib/api/auth';
import { LoginFormData } from '@/validations/auth.validation';

const loginUserAction = async (formData: LoginFormData) => {
   const { response, body } = await loginUser(formData);
   const cookieStore = await cookies();

   const rawCookies = response?.headers.getSetCookie?.() ?? [];
   const parsedCookies = setCookieParser.parse(rawCookies, { map: false });

   for (const c of parsedCookies) {
      cookieStore.set(c.name, c.value, {
         httpOnly: c.httpOnly,
         secure: c.secure,
         path: c.path,
         maxAge: c.maxAge,
         sameSite: c.sameSite as 'strict' | 'lax' | 'none',
         expires: c.expires,
      });
   }

   return body;
};

export default loginUserAction;
