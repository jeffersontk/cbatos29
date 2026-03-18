import { NextResponse, type NextRequest } from "next/server";

import {
  AUTH_COOKIE_NAME,
  canAccessDashboardPath,
  decodeAuthSession,
  getDefaultRedirectForSession,
  hasMemberPortalAccess,
} from "@/lib/auth/session";

function redirectToLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);

  return NextResponse.redirect(loginUrl);
}

export function middleware(request: NextRequest) {
  const session = decodeAuthSession(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return redirectToLogin(request);
    }

    if (!canAccessDashboardPath(session, pathname)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = getDefaultRedirectForSession(session);
      redirectUrl.search = "";

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname.startsWith("/member")) {
    if (!session) {
      return redirectToLogin(request);
    }

    if (!hasMemberPortalAccess(session)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = getDefaultRedirectForSession(session);
      redirectUrl.search = "";

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/member/:path*"],
};
