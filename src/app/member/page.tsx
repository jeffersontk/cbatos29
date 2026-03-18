import { redirect } from "next/navigation";

import MemberDashboardClient from "@/components/member/MemberDashboardClient";
import { getAuthSession } from "@/lib/auth/server";
import { hasMemberPortalAccess } from "@/lib/auth/session";
import { getMemberSnapshot } from "@/lib/platform/data";

export default async function MemberPage() {
  const session = await getAuthSession();

  if (!session || !hasMemberPortalAccess(session)) {
    redirect("/login?next=/member");
  }

  const snapshot = getMemberSnapshot(session.memberId, {
    fallbackName: session.name,
    fallbackEmail: session.email,
    source: session.source === "signup" ? "signup" : "imported",
  });

  return <MemberDashboardClient snapshot={snapshot} session={session} />;
}
