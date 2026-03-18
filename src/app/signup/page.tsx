import SignupPageClient from "@/components/auth/SignupPageClient";
import { getAuthSession } from "@/lib/auth/server";

export default async function SignupPage() {
  const currentSession = await getAuthSession();

  return <SignupPageClient currentSession={currentSession} />;
}
