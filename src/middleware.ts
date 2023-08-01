import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-pathname", request.nextUrl.pathname);

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/rejestracja") ||
      req.nextUrl.pathname.startsWith("/rejestracja-trenera");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/profil", req.url));
      }
      return null;
    }
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/profil/:path*",
    "/login",
    "/edytor/:path*",
    "/rejestracja",
    "/rejestracja-trenera",
  ],
};
