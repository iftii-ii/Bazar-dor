# বাজার দর – Next.js + Better Auth

Live market prices (Bangla UI) built with Next.js 15 (App Router), Tailwind CSS v4 and Better Auth (email/password + Google + GitHub).

Pages: `/` home · `/category/[slug]` · `/products/[id]` (market-wise prices) · `/sign-in` · `/sign-up` · `/profile` (protected)

## 1. Run locally

```bash
npm install
cp .env.example .env.local      # then fill the values
```

1. **Database** – create a free Postgres DB (e.g. https://neon.tech) and put the connection string in `DATABASE_URL`.
2. **Secret** – `openssl rand -base64 32` → `BETTER_AUTH_SECRET`.
3. **Create the auth tables** (pick one):
   - `npm run db:migrate`  (Better Auth CLI), or
   - paste `db/schema.sql` into the Neon SQL editor and run it.
4. `npm run dev` → http://localhost:3000

## 2. Social login (optional)

| Provider | Create app at | Callback URL |
|---|---|---|
| Google | console.cloud.google.com → Credentials → OAuth client | `https://YOUR_DOMAIN/api/auth/callback/google` |
| GitHub | github.com/settings/developers → New OAuth App | `https://YOUR_DOMAIN/api/auth/callback/github` |

Add both `http://localhost:3000/...` and your Vercel domain callbacks. Buttons stay disabled until the env vars are set.

## 3. Deploy to Vercel

1. Push this folder to GitHub.
2. Vercel → **Add New Project** → import the repo (framework: Next.js, no extra settings).
3. Add Environment Variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (= `https://your-app.vercel.app`) and the optional Google/GitHub keys.
4. Deploy. Make sure the SQL tables from step 1.3 exist in the production database.

## How it works

- `lib/auth.ts` – Better Auth server config (Postgres via `pg`, `nextCookies` plugin).
- `app/api/auth/[...all]/route.ts` – auth API handler.
- `lib/auth-client.ts` – React client used by the forms.
- `middleware.ts` – redirects guests away from `/profile`; the page re-checks the session server-side.
- `lib/api.ts` – typed fetchers for `openapi.programming-hero.com/api/bazardor` (cached 10 min).
