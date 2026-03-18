import LoginPageClient from "@/components/auth/LoginPageClient";
import { getAuthSession } from "@/lib/auth/server";

export default async function LoginPage() {
  const currentSession = await getAuthSession();

  return <LoginPageClient currentSession={currentSession} />;
}
