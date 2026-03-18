import { NextResponse } from "next/server";

import { getDashboardSnapshot, getMemberSnapshot, getPublicSnapshot } from "@/lib/platform/data";

export function GET() {
  return NextResponse.json({
    dashboard: getDashboardSnapshot(),
    member: getMemberSnapshot(),
    public: getPublicSnapshot(),
  });
}
