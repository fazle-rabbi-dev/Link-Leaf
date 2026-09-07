import { API_BASE_URL } from '@/lib/env';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/* 
  Extends Ommit: to ommit default definition from RequestInit since adding custom types

  Params and token are completely custom properties that do not exist in the standard RequestInit type. 
  Since there is no naming conflict, there is no need to omit them; 
*/
export interface ApiRequestOptions extends Omit<
   RequestInit,
   'body' | 'method' | 'headers'
> {
   method?: HttpMethod;
   body?: unknown;
   params?: Record<string, string | number | boolean | undefined>;
   token?: string;
   headers?: Record<string, string>;
}

export interface ApiResult<T> {
   response: Response;
   body: T;
}

/**
 * Thin wrapper around fetch with shared boilerplate:
 * - `credentials: 'include'` (sends the HttpOnly refresh cookie)
 * - JSON + query-param handling
 * - optional Bearer token
 *
 * Returns `{ response, data }`. It does NOT throw on non-2xx — check
 * `response.ok` at the call site.
 */
export async function apiRequest<T = unknown>(
   path: string,
   options: ApiRequestOptions = {},
): Promise<ApiResult<T>> {
   const { method = 'GET', body, params, token, headers, ...rest } = options;

   const url = new URL(
      API_BASE_URL + path,
      typeof window === 'undefined' ? undefined : window.location.origin,
   );

   if (params) {
      for (const [key, value] of Object.entries(params)) {
         if (value !== undefined) url.searchParams.set(key, String(value));
      }
   }

   const isFormData = body instanceof FormData;
   const hasBody = method !== 'GET' && body !== undefined;
   const requestBody = !hasBody
      ? undefined
      : isFormData
        ? body
        : JSON.stringify(body);

   // Write methods must carry a body. Pass `null` / `{}` for bodyless POST
   // endpoints (e.g. token refresh) to make the intent explicit.
   if (
      (method === 'POST' || method === 'PUT' || method === 'PATCH') &&
      body === undefined
   ) {
      throw new Error(`apiRequest: ${method} requires a body`);
   }

   const response = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
         Accept: 'application/json',
         ...(hasBody && !isFormData
            ? { 'Content-Type': 'application/json' }
            : {}),
         ...(token ? { Authorization: `Bearer ${token}` } : {}),
         ...headers,
      },
      body: requestBody,
      ...rest,
   });

   const jsonData = (await response.json()) as T;

   return { response, body: jsonData };
}
