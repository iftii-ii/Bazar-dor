import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/mongodb";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = process.env;

export const enabledProviders = {
  google: Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET),
  github: Boolean(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET),
};

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: {
    ...(enabledProviders.google && {
      google: { clientId: GOOGLE_CLIENT_ID!, clientSecret: GOOGLE_CLIENT_SECRET! },
    }),
    ...(enabledProviders.github && {
      github: { clientId: GITHUB_CLIENT_ID!, clientSecret: GITHUB_CLIENT_SECRET! },
    }),
  },
  // must be the last plugin
  plugins: [nextCookies()],
});