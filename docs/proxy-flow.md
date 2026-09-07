# Proxy.ts Middleware Workflow

User sends a request to a route like `https://link-leaf.vercel.app/<username>`

## How proxy.ts Works

- proxy.ts gets fired
   - Now proxy has a request and a response object
   - Can modify both objects
   - If a cookie header is set to the request object, then it will go to the next hop (Next.js server to server component)
   - If a cookie is set to the response, then this will be received by the browser because the response will go to the browser

## Refresh Token Flow

When a refresh token is performed by calling the backend API, if the refresh token succeeds, the server sends `new accessToken and refreshToken` which are basically `set-cookie` headers.

But, since the request happens server <--> server, the refresh token `response` hasn't been sent to the browser yet.

Plus: the server component that is receiving the request from the browser (via proxy) is not aware of the refresh token yet. That's why by default the server component gets a stale accessToken and failure happens when trying to get the logged-in user.

## Solution

So, to solve this problem, we need to extract the `set-cookie` header from the refresh token response that came to the proxy.ts file and send it to the browser by injecting it into the response headers.

And, to send the new accessToken to the server component, we need to send the new token by injecting it into the browser-provided request as a `Cookie` header.

### Function Responsibilities

- **`buildCookieHeader` function's job** is to extract the `set-cookie` header that came from the backend/api server after performing the refresh token & create a single `Cookie` header value.

   And this value will be injected into the request header, and this request goes to the server component so the server component can access the new `accessToken` and can fetch loggedInUser.

- **`withCookies` function's job** is to extract the `set-cookie` header that came from the backend and inject it as a `Set-Cookie` header to the response that will go to the browser.

> **Result:** As a result of this, the browser will receive the new `accessToken` and `refreshToken`, and the serverComponent can also access the new `accessToken` and can fetch loggedInUser.

---

## Public Profile Route Handling

> For public profile route `/username`, there is no need to handle/do anything because the public routes list contains public routes except the dynamic route. And there is a separate isDashboard route boolean flag.

So, the `/username` route is outside of conditional redirection from the proxy.ts file.
