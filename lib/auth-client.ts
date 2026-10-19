import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

type AuthError = { message?: string; status?: number; code?: string } | null | undefined;

/** Turns Better Auth errors into Bangla messages. */
export function authErrorBn(error: AuthError, fallback = "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।") {
  if (!error) return fallback;
  const code = error.code ?? "";
  if (code.includes("USER_ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || error.status === 401)
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  if (code.includes("PASSWORD_TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (code.includes("INVALID_EMAIL")) return "সঠিক ইমেইল দিন।";
  if (error.status === 429) return "অনেকবার চেষ্টা করা হয়েছে, কিছুক্ষণ পরে আবার চেষ্টা করুন।";
  return error.message || fallback;
}
