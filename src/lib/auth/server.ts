import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, type AppSession, decodeAuthSession, encodeAuthSession } from "@/lib/auth/session";

export async function getAuthSession() {
  const cookieStore = await cookies();

  return decodeAuthSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}

export async function setAuthSession(session: AppSession) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, encodeAuthSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
