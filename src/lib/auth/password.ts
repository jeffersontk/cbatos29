import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [salt, expectedHash] = passwordHash.split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const calculatedHash = scryptSync(password, salt, KEY_LENGTH);
  const expectedHashBuffer = Buffer.from(expectedHash, "hex");

  if (expectedHashBuffer.length !== calculatedHash.length) {
    return false;
  }

  return timingSafeEqual(expectedHashBuffer, calculatedHash);
}
