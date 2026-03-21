import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { hashPassword, verifyPassword } from "@/lib/auth/password";
import type { AppUserRole, SessionSource } from "@/lib/auth/session";

export type StoredAuthAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  roles: AppUserRole[];
  memberId?: string;
  source: SessionSource;
  createdAt: string;
  updatedAt: string;
};

export type StoredAccessRequest = {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  status: "pending";
  createdAt: string;
  updatedAt: string;
};

type AuthStore = {
  version: 1;
  accounts: StoredAuthAccount[];
  accessRequests: StoredAccessRequest[];
};

const storageDir = path.join(process.cwd(), "storage");
const storageFile = path.join(storageDir, "auth-store.json");

const defaultStore: AuthStore = {
  version: 1,
  accounts: [],
  accessRequests: [],
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function nowIso() {
  return new Date().toISOString();
}

async function ensureStorageFile() {
  await mkdir(storageDir, { recursive: true });

  try {
    await readFile(storageFile, "utf8");
  } catch {
    await writeFile(storageFile, JSON.stringify(defaultStore, null, 2), "utf8");
  }
}

async function readStore(): Promise<AuthStore> {
  await ensureStorageFile();

  try {
    const rawContent = await readFile(storageFile, "utf8");
    const parsed = JSON.parse(rawContent) as Partial<AuthStore>;

    if (!Array.isArray(parsed.accounts) || !Array.isArray(parsed.accessRequests)) {
      return { ...defaultStore };
    }

    return {
      version: 1,
      accounts: parsed.accounts,
      accessRequests: parsed.accessRequests,
    };
  } catch {
    return { ...defaultStore };
  }
}

async function writeStore(store: AuthStore) {
  await ensureStorageFile();

  const tempFile = `${storageFile}.tmp`;
  await writeFile(tempFile, JSON.stringify(store, null, 2), "utf8");
  await rename(tempFile, storageFile);
}

export async function findStoredAccountByEmail(email: string) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(email);

  return store.accounts.find((account) => account.email === normalizedEmail) ?? null;
}

export async function findAccessRequestByMemberIdOrEmail({
  memberId,
  email,
}: {
  memberId?: string;
  email?: string;
}) {
  const store = await readStore();
  const normalizedEmail = email ? normalizeEmail(email) : null;

  return (
    store.accessRequests.find(
      (request) =>
        (memberId ? request.memberId === memberId : false) ||
        (normalizedEmail ? request.email === normalizedEmail : false),
    ) ?? null
  );
}

export async function verifyStoredAccountPassword(email: string, password: string) {
  const account = await findStoredAccountByEmail(email);

  if (!account) {
    return null;
  }

  return verifyPassword(password, account.passwordHash) ? account : null;
}

export async function createSignupAccess(params: {
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  password: string;
}) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(params.email);

  if (store.accounts.some((account) => account.email === normalizedEmail)) {
    return null;
  }

  const timestamp = nowIso();
  const memberId = createId("pending-member");
  const account: StoredAuthAccount = {
    id: createId("acct"),
    name: params.name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(params.password),
    roles: ["member_common"],
    memberId,
    source: "signup",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const accessRequest: StoredAccessRequest = {
    id: createId("access"),
    memberId,
    name: params.name.trim(),
    email: normalizedEmail,
    phone: params.phone.trim(),
    neighborhood: params.neighborhood.trim(),
    status: "pending",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.accounts.unshift(account);
  store.accessRequests.unshift(accessRequest);

  await writeStore(store);

  return { account, accessRequest };
}

export async function upsertImportedMemberAccount(params: {
  memberId: string;
  name: string;
  email: string;
  password: string;
  roles: AppUserRole[];
}) {
  const store = await readStore();
  const normalizedEmail = normalizeEmail(params.email);
  const timestamp = nowIso();
  const existingAccountIndex = store.accounts.findIndex(
    (account) => account.email === normalizedEmail || account.memberId === params.memberId,
  );

  const account: StoredAuthAccount = {
    id: existingAccountIndex >= 0 ? store.accounts[existingAccountIndex].id : createId("acct"),
    name: params.name,
    email: normalizedEmail,
    passwordHash: hashPassword(params.password),
    roles: params.roles,
    memberId: params.memberId,
    source: "imported",
    createdAt: existingAccountIndex >= 0 ? store.accounts[existingAccountIndex].createdAt : timestamp,
    updatedAt: timestamp,
  };

  if (existingAccountIndex >= 0) {
    store.accounts[existingAccountIndex] = account;
  } else {
    store.accounts.unshift(account);
  }

  await writeStore(store);

  return account;
}
