"use server";

import { redirect } from "next/navigation";

import { setAuthSession } from "@/lib/auth/server";
import {
  previewAccessAccounts,
  resolveRedirectPath,
  type AppSession,
} from "@/lib/auth/session";
import { getRolesForMember, members } from "@/lib/platform/data";

export type AuthFormState = {
  status: "idle" | "error";
  message?: string;
};

function normalize(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

function findImportedMember(email: string, credential: string) {
  const normalizedEmail = email.toLowerCase();
  const normalizedCredential = normalizeDigits(credential);

  return members.find(
    (member) =>
      member.email.toLowerCase() === normalizedEmail && normalizeDigits(member.phone) === normalizedCredential,
  );
}

function findPreviewAccessAccount(email: string, credential: string) {
  const normalizedEmail = email.toLowerCase();

  return previewAccessAccounts.find(
    (account) => account.email.toLowerCase() === normalizedEmail && account.accessKey === credential,
  );
}

async function createSessionAndRedirect(session: AppSession, nextPath: FormDataEntryValue | null): Promise<never> {
  await setAuthSession(session);
  redirect(resolveRedirectPath(session, nextPath));
}

export async function loginAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = normalize(formData.get("email"));
  const credential = normalize(formData.get("credential"));

  if (!email || !credential) {
    return { status: "error", message: "Informe email e telefone cadastrado ou chave de acesso." };
  }

  const previewAccessAccount = findPreviewAccessAccount(email, credential);

  if (previewAccessAccount) {
    return createSessionAndRedirect(
      {
        roles: previewAccessAccount.roles,
        memberId: previewAccessAccount.memberId,
        name: previewAccessAccount.name,
        email: previewAccessAccount.email,
        source: "staff",
      },
      formData.get("next"),
    );
  }

  const member = findImportedMember(email, credential);

  if (!member) {
    return {
      status: "error",
      message: "Nao encontramos esse usuario. Use o telefone cadastrado ou a chave de acesso da equipe.",
    };
  }

  return createSessionAndRedirect(
    {
      roles: getRolesForMember(member.id),
      memberId: member.id,
      name: member.name,
      email: member.email,
      source: "imported",
    },
    formData.get("next"),
  );
}

export async function validateExistingMemberAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  return loginAction(_, formData);
}

export async function requestMemberAccessAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = normalize(formData.get("name"));
  const email = normalize(formData.get("email"));
  const phone = normalize(formData.get("phone"));
  const neighborhood = normalize(formData.get("neighborhood"));

  if (!name || !email || !phone || !neighborhood) {
    return { status: "error", message: "Preencha nome, email, telefone e bairro para abrir seu cadastro." };
  }

  const importedMember = findImportedMember(email, phone);

  if (importedMember) {
    return {
      status: "error",
      message: "Esse cadastro ja existe na base importada. Faca login com email e telefone cadastrados.",
    };
  }

  const temporaryMemberId = `pending-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "member"}`;

  return createSessionAndRedirect(
    {
      roles: ["member_common"],
      memberId: temporaryMemberId,
      name,
      email,
      source: "signup",
    },
    formData.get("next"),
  );
}
