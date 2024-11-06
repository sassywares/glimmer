"use server";

import { cookies } from "next/headers";

export async function getTokenFromCookies(): Promise<string | null> {
  return cookies().get("token")?.value ?? null;
}

export async function setTokenInCookies(value: string): Promise<void> {
  cookies().set("token", value);
}

export async function removeTokenFromCookies(): Promise<void> {
  cookies().delete("token");
}
