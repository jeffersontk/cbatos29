import { redirect } from "next/navigation";

import MemberDashboardClient from "@/components/member/MemberDashboardClient";
import { getAuthSession } from "@/lib/auth/server";
import { hasMemberPortalAccess } from "@/lib/auth/session";
import { getMemberSnapshotForSession } from "@/lib/platform/server";

export default async function MemberPage() {
  const session = await getAuthSession();

  if (!session || !hasMemberPortalAccess(session)) {
    redirect("/login?next=/member");
  }

  const snapshot = await getMemberSnapshotForSession(session);

  return <MemberDashboardClient snapshot={snapshot} session={session} />;
}
