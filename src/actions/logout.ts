'use server';

import { cookies } from 'next/headers';
import setCookieParser from 'set-cookie-parser';

import { LogoutResponse } from '@/@types/auth';
import { apiRequest, type ApiResult } from '@/lib/api/client';

// >> Removed intermidiary logoutUser function calling & directly trigguring apiRequest

const logoutUserAction = async () => {
   const cookieStore = await cookies();

   // need to forward refreshToken and sessionId to backend to delete logged-out session from db
   const accessToken = cookieStore.get('refreshToken');
   const sessionId = cookieStore.get('sessionId');
   const newCookie = `accessToken=${accessToken}; sessionId=${sessionId}`;

   // const { response, body } = await logoutUser();
   let result: ApiResult<LogoutResponse> | null = null;
   try {
      result = await apiRequest<LogoutResponse>('/auth/logout', {
         method: 'DELETE',
         headers: {
            Cookie: newCookie,
         },
      });
   } catch (error) {
      result = null;
   }

   const response = result?.response;
   const body = result?.body;

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

export default logoutUserAction;
