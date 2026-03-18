export type AppUserRole =
  | "admin"
  | "ministry_leader"
  | "ministry_subleader"
  | "cell_leader"
  | "ebd_teacher"
  | "member_common";

export type SessionSource = "imported" | "signup" | "staff";

export interface AppSession {
  roles: AppUserRole[];
  memberId?: string;
  name: string;
  email: string;
  source: SessionSource;
}

export interface PreviewAccessAccount {
  id: string;
  name: string;
  email: string;
  accessKey: string;
  roles: AppUserRole[];
  memberId?: string;
}

export const AUTH_COOKIE_NAME = "cb_atos29_session";

export const managementRoles: AppUserRole[] = [
  "admin",
  "ministry_leader",
  "ministry_subleader",
  "cell_leader",
  "ebd_teacher",
];

const rolePriority: AppUserRole[] = [
  "admin",
  "ministry_leader",
  "cell_leader",
  "ebd_teacher",
  "ministry_subleader",
  "member_common",
];

const dashboardRouteRules: Array<{ prefix: string; roles: AppUserRole[] }> = [
  { prefix: "/dashboard/finance", roles: ["admin"] },
  { prefix: "/dashboard/communication", roles: ["admin", "ministry_leader", "ministry_subleader"] },
  { prefix: "/dashboard/store", roles: ["admin", "ministry_leader", "ministry_subleader"] },
  { prefix: "/dashboard/ministries", roles: ["admin", "ministry_leader", "ministry_subleader"] },
  { prefix: "/dashboard/members", roles: ["admin", "ministry_leader", "ministry_subleader", "cell_leader"] },
  { prefix: "/dashboard/ebd", roles: ["admin", "ebd_teacher"] },
  { prefix: "/dashboard/events", roles: ["admin", "ministry_leader", "ministry_subleader", "cell_leader", "ebd_teacher"] },
  { prefix: "/dashboard/cells", roles: ["admin", "cell_leader"] },
  { prefix: "/dashboard/calendar", roles: managementRoles },
  { prefix: "/dashboard", roles: managementRoles },
];

export const previewAccessAccounts: PreviewAccessAccount[] = [
  {
    id: "staff-001",
    name: "Equipe de Gestao",
    email: "gestao@cbatos29.local",
    accessKey: "atos29-gestao",
    roles: ["admin"],
  },
];

export function normalizeRoles(roles: AppUserRole[]) {
  return Array.from(new Set(roles));
}

export function encodeAuthSession(session: AppSession) {
  return encodeURIComponent(
    JSON.stringify({
      ...session,
      roles: normalizeRoles(session.roles),
    }),
  );
}

export function decodeAuthSession(value?: string | null): AppSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<AppSession>;

    if (!parsed.name || !parsed.email || !parsed.source || !Array.isArray(parsed.roles)) {
      return null;
    }

    const roles = parsed.roles.filter((role): role is AppUserRole => rolePriority.includes(role as AppUserRole));

    if (!roles.length) {
      return null;
    }

    return {
      roles: normalizeRoles(roles),
      memberId: parsed.memberId,
      name: parsed.name,
      email: parsed.email,
      source: parsed.source,
    };
  } catch {
    return null;
  }
}

export function hasAnyRole(session: AppSession | null, roles: AppUserRole[]) {
  if (!session) {
    return false;
  }

  return roles.some((role) => session.roles.includes(role));
}

export function hasDashboardAccess(session: AppSession | null) {
  return hasAnyRole(session, managementRoles);
}

export function hasMemberPortalAccess(session: AppSession | null) {
  if (!session) {
    return false;
  }

  return session.source === "signup" || session.roles.includes("member_common");
}

export function getPrimaryRole(roles: AppUserRole[]) {
  return rolePriority.find((role) => roles.includes(role)) ?? "member_common";
}

export function getRoleLabel(role: AppUserRole) {
  switch (role) {
    case "admin":
      return "Admin";
    case "ministry_leader":
      return "Lider de ministerio";
    case "ministry_subleader":
      return "Sublider de ministerio";
    case "cell_leader":
      return "Lider de celula";
    case "ebd_teacher":
      return "Professor da EBD";
    default:
      return "Membro comum";
  }
}

export function getRoleLabels(roles: AppUserRole[]) {
  return normalizeRoles(roles).map(getRoleLabel);
}

export function canAccessDashboardPath(session: AppSession | null, pathname: string) {
  if (!hasDashboardAccess(session)) {
    return false;
  }

  const rule = [...dashboardRouteRules]
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find((item) => pathname === item.prefix || pathname.startsWith(`${item.prefix}/`));

  if (!rule) {
    return false;
  }

  return hasAnyRole(session, rule.roles);
}

export function getDefaultRedirectForSession(session: AppSession) {
  return hasDashboardAccess(session) ? "/dashboard" : "/member";
}

export function sanitizeRedirectPath(path: FormDataEntryValue | string | null | undefined, fallback: string) {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) {
    return fallback;
  }

  return path;
}

export function resolveRedirectPath(session: AppSession, requestedPath: FormDataEntryValue | string | null | undefined) {
  const fallback = getDefaultRedirectForSession(session);
  const sanitized = sanitizeRedirectPath(requestedPath, fallback);

  if (sanitized === "/") {
    return fallback;
  }

  if (sanitized.startsWith("/dashboard") && !canAccessDashboardPath(session, sanitized)) {
    return fallback;
  }

  if (sanitized.startsWith("/member") && !hasMemberPortalAccess(session)) {
    return fallback;
  }

  return sanitized;
}
