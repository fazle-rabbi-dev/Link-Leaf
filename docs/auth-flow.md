# Core Auth Flow

> **NOTE:** This app is frontend-only, developed with Next.js 16, and the backend is a separate Express.js application. The backend sends `accessToken` and `refreshToken` as cookie headers, so the frontend also needs to allow that since it's a cross-origin cookie, and protected resources can be accessed when a valid `accessToken`/`refreshToken` is present in the request cookie header.

The auth flow happens in the following order:

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

> **For social login**, backend user verification happens via Firebase Admin, and if the user is valid, then the user account is created in the database. Then `accessToken` and `refreshToken` are generated and returned to the client. In this context, this Next.js app is the client.

---

## Hydration Flow

> After successful login -> redirect to dashboard happens, but auth state update doesn't happen from the place redirect happens.

- On page reload:
   - Proxy redirects to dashboard if user is authenticated
   - `AuthHydrate` component (which is connected to dashboard layout) handles the client-side auth state update. This is usually done in `useEffect`. And this `useEffect` fires on page load of private page and runs only once on mount.
- When user navigates to dashboard -> `AuthHydrate` fires through private layout -> calls API and checks if user is logged in, then updates `authState`
- Logout: calls API from frontend -> cookies get cleared -> redirect to `/auth`
- On back button navigation after login and logout, back navigation is prevented by redirecting user with client-side router from `AuthHydrate` and `PublicRootLayout`
