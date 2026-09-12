# Authentication Flow

> **NOTE:** This app is frontend-only, developed with Next.js 16, and the backend is a separate Express.js application. The backend sends `accessToken` and `refreshToken` as cookie headers. Protected resources can be accessed when a valid `accessToken` is present in the request cookie header or authorization header with `Bearer` prefix.

---

## Auth Problems and Solutions I Applied

- I wanted user redirection to happen server-side when the page reloads, via Middleware, so that I don't need to wrap the entire app with a spinner.
   - That's why I wrote the redirection logic, including refreshToken rotation, in the `proxy.ts` file.
- The problem was that cookies need to be set under the client-side domain so that the Next.js Middleware/proxy can access them. If I called the login API directly from the browser, the cookies didn't get set under the client-side domain.
   - To solve this, I created server actions to call the login/logout API from the Next.js server side instead. I didn't use cross-origin authentication requests happen from the Next.js app client side (under the client-side domain) to the Express.js backend, server-side. I use the `set-cookie-parser` package to parse the `accessToken` and `refreshToken` cookies coming from the Express.js backend to nextjs server action and forward them to the browser via the Next.js cookie setter, so the cookies get stored under the client-side domain.
   - On each request, these cookies are sent to the Next.js server, where the proxy reads them to perform an auth state check, redirect based on whether the user is logged in, and handle refresh token rotation.

- Since new tokens are set as cookies after login and refreshToken, and each accessToken becomes invalid after 1 hour, I couldn't store the accessToken in `localStorage `for client-side CRUD operations. To solve this, I turned the `accessToken `into a **non-HTTPOnly** cookie, so it can be read directly in the browser via a `getAccessToken()` function and used for API calls during CRUD operations.

## The auth flow happens in the following order:

1. User lands on `/auth` page
2. User enters email & password or continues with social login
3. For custom auth:
   - API call happens to backend route `/auth/login` or `/api/auth/register`
   - If successful: user lands on `/dashboard/profile` page
   - If error: user stays on `/auth` page
4. For social auth:
   - Firebase opens a popup window of OAuth provider login page
   - After successful login, Firebase listens to the popup window
   - If login successful: then API call happens to backend route `/auth/social-login`
   - If successful: user lands on `/dashboard/profile` page
   - If error: user stays on `/auth` page

---

> **For social login**, backend user verification happens via Firebase Admin, and if the user is valid, then the user account is created in the database. Then `accessToken` and `refreshToken` are generated and returned to the client. In this context, this Next.js app is the client (but received by nextjs server action since calling from action).

---

## Hydration Flow

> After successful login -> redirect to dashboard happens, but auth state update doesn't happen from the place redirect happens.

- On page reload:
   - Proxy redirects to dashboard if user is authenticated
   - `AuthHydrate` component (which is connected to dashboard layout) handles the client-side auth state update. This is usually done in `useEffect`. And this `useEffect` fires on page load of private page and runs only once on mount.
- When user navigates to dashboard -> `AuthHydrate` fires through private layout -> calls API and checks if user is logged in, then updates `authState`
- Logout: calls API from frontend -> cookies get cleared -> redirect to `/auth`
- On back button navigation after login and logout, back navigation is prevented by redirecting user with client-side router from `AuthHydrate` and `PublicRootLayout`
