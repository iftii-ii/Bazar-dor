import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/** Returns the current session or null (never throws, so the site still renders if the DB is down). */
export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}
