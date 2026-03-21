"use server";

import { redirect } from "next/navigation";

import { setAuthSession } from "@/lib/auth/server";
import {
  createSignupAccess,
  findStoredAccountByEmail,
  upsertImportedMemberAccount,
  verifyStoredAccountPassword,
} from "@/lib/auth/store";
import { previewAccessAccounts, resolveRedirectPath, type AppSession } from "@/lib/auth/session";
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

function findImportedMemberByPhone(email: string, phone: string) {
  const normalizedEmail = email.toLowerCase();
  const normalizedPhone = normalizeDigits(phone);

  return members.find(
    (member) =>
      member.email.toLowerCase() === normalizedEmail && normalizeDigits(member.phone) === normalizedPhone,
  );
}

function findImportedMemberByEmail(email: string) {
  const normalizedEmail = email.toLowerCase();

  return members.find((member) => member.email.toLowerCase() === normalizedEmail);
}

function findPreviewAccessAccount(email: string, password: string) {
  const normalizedEmail = email.toLowerCase();

  return previewAccessAccounts.find(
    (account) => account.email.toLowerCase() === normalizedEmail && account.password === password,
  );
}

function validatePassword(password: string, passwordConfirmation: string) {
  if (!password || !passwordConfirmation) {
    return "Informe e confirme a senha para continuar.";
  }

  if (password.length < 8) {
    return "Use uma senha com pelo menos 8 caracteres.";
  }

  if (password !== passwordConfirmation) {
    return "A confirmacao da senha nao confere.";
  }

  return null;
}

async function createSessionAndRedirect(session: AppSession, nextPath: FormDataEntryValue | null): Promise<never> {
  await setAuthSession(session);
  redirect(resolveRedirectPath(session, nextPath));
}

export async function loginAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = normalize(formData.get("email"));
  const password = normalize(formData.get("password"));

  if (!email || !password) {
    return { status: "error", message: "Informe email e senha para continuar." };
  }

  const storedAccount = await verifyStoredAccountPassword(email, password);

  if (storedAccount) {
    const roles =
      storedAccount.source === "imported" && storedAccount.memberId
        ? getRolesForMember(storedAccount.memberId)
        : storedAccount.roles;

    return createSessionAndRedirect(
      {
        roles,
        memberId: storedAccount.memberId,
        name: storedAccount.name,
        email: storedAccount.email,
        source: storedAccount.source,
      },
      formData.get("next"),
    );
  }

  const previewAccessAccount = findPreviewAccessAccount(email, password);

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

  const existingStoredAccount = await findStoredAccountByEmail(email);

  if (existingStoredAccount) {
    return {
      status: "error",
      message: "A senha informada nao confere. Tente novamente.",
    };
  }

  if (findImportedMemberByEmail(email)) {
    return {
      status: "error",
      message: "Seu cadastro ja existe. Use a tela de cadastro para confirmar a conta e criar sua senha.",
    };
  }

  return {
    status: "error",
    message: "Nao encontramos esse usuario. Revise o email e a senha informados.",
  };
}

export async function validateExistingMemberAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = normalize(formData.get("email"));
  const phone = normalize(formData.get("phone"));
  const password = normalize(formData.get("password"));
  const passwordConfirmation = normalize(formData.get("passwordConfirmation"));

  if (!email || !phone) {
    return { status: "error", message: "Informe email e telefone cadastrados para validar sua conta." };
  }

  const passwordError = validatePassword(password, passwordConfirmation);

  if (passwordError) {
    return { status: "error", message: passwordError };
  }

  const member = findImportedMemberByPhone(email, phone);

  if (!member) {
    return {
      status: "error",
      message: "Nao encontramos esse cadastro. Confira o email e o telefone informados.",
    };
  }

  const roles = getRolesForMember(member.id);

  await upsertImportedMemberAccount({
    memberId: member.id,
    name: member.name,
    email: member.email,
    password,
    roles,
  });

  return createSessionAndRedirect(
    {
      roles,
      memberId: member.id,
      name: member.name,
      email: member.email,
      source: "imported",
    },
    formData.get("next"),
  );
}

export async function requestMemberAccessAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = normalize(formData.get("name"));
  const email = normalize(formData.get("email"));
  const phone = normalize(formData.get("phone"));
  const neighborhood = normalize(formData.get("neighborhood"));
  const password = normalize(formData.get("password"));
  const passwordConfirmation = normalize(formData.get("passwordConfirmation"));

  if (!name || !email || !phone || !neighborhood) {
    return { status: "error", message: "Preencha nome, email, telefone e bairro para abrir seu cadastro." };
  }

  const passwordError = validatePassword(password, passwordConfirmation);

  if (passwordError) {
    return { status: "error", message: passwordError };
  }

  if (findImportedMemberByEmail(email)) {
    return {
      status: "error",
      message: "Esse email ja esta no cadastro da igreja. Use a aba de validacao para confirmar sua conta.",
    };
  }

  const existingStoredAccount = await findStoredAccountByEmail(email);

  if (existingStoredAccount) {
    return {
      status: "error",
      message: "Ja existe um acesso criado com esse email. Tente entrar ou fale com a secretaria.",
    };
  }

  const createdAccess = await createSignupAccess({
    name,
    email,
    phone,
    neighborhood,
    password,
  });

  if (!createdAccess) {
    return {
      status: "error",
      message: "Nao foi possivel abrir seu cadastro agora. Tente novamente em instantes.",
    };
  }

  return createSessionAndRedirect(
    {
      roles: createdAccess.account.roles,
      memberId: createdAccess.account.memberId,
      name: createdAccess.account.name,
      email: createdAccess.account.email,
      source: "signup",
    },
    formData.get("next"),
  );
}
