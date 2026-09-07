# Refresh Token Flow

From `proxy.ts`:

- Get cookies from request
- If `accessToken` or `refreshToken` is present, then proceed to fetch user
- If user fetched successfully, that means the `accessToken` is valid, so the user is logged in
  - And the original `accessToken` is passed down to the Server Component, taken from user-provided request headers; basically by taking request headers and creating a new `Headers()` where new `accessToken` can be injected as cookie header after successful refresh token
- If `accessToken` is invalid, then proceed to perform refresh token
  - If refresh fails, then redirect user to auth page and all cookies get cleared
  - If refresh succeeds, then new access and refresh token come in and redirect user to `/dashboard/profile` page
    - And new tokens get injected into the response headers for browser and `accessToken` injected into the request headers for Server Component
