import "server-only";

import type { AppSession } from "@/lib/auth/session";
import { findAccessRequestByMemberIdOrEmail } from "@/lib/auth/store";
import { getMemberSnapshot } from "@/lib/platform/data";

export async function getMemberSnapshotForSession(session: AppSession) {
  const accessRequest =
    session.source === "signup"
      ? await findAccessRequestByMemberIdOrEmail({
          memberId: session.memberId,
          email: session.email,
        })
      : null;

  return getMemberSnapshot(session.memberId, {
    fallbackName: accessRequest?.name ?? session.name,
    fallbackEmail: accessRequest?.email ?? session.email,
    fallbackPhone: accessRequest?.phone,
    fallbackNeighborhood: accessRequest?.neighborhood,
    source: session.source === "signup" ? "signup" : "imported",
  });
}
