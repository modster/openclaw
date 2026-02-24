import { layout } from "./layout.ts";

export function homePage(): string {
  const body = /* html */ `
    <section style="text-align:center;padding:4rem 0 3rem;">
      <h1 style="font-size:2.5rem;font-weight:800;color:#2563eb;margin-bottom:1rem;">
        Welcome to openclaw
      </h1>
      <p style="font-size:1.125rem;color:#475569;max-width:520px;margin:0 auto 2rem;">
        A secure, lightweight app powered by
        <strong>Deno</strong> and <strong>Hono</strong> with Google OAuth sign-in.
      </p>
      <a href="/auth/login"
         style="display:inline-flex;align-items:center;gap:0.5rem;background:#2563eb;color:#fff;
                padding:0.75rem 1.75rem;border-radius:0.5rem;font-size:1rem;font-weight:600;
                text-decoration:none;">
        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l5.9-5.9C34.3 3.1 29.4 1 24 1 14.9 1 7.2 6.3 3.7 13.9l6.9 5.4C12.4 13.3 17.7 9.5 24 9.5z"/>
          <path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h12.4c-.5 2.7-2.1 5-4.4 6.5l6.9 5.4c4-3.8 6.2-9.3 6.2-16z"/>
          <path fill="#FBBC05" d="M10.6 28.6A14.9 14.9 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-6.9-5.4A23.9 23.9 0 0 0 .1 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
          <path fill="#EA4335" d="M24 47c5.4 0 9.9-1.8 13.2-4.9l-6.9-5.4c-1.8 1.2-4.1 1.9-6.3 1.9-6.3 0-11.6-3.8-13.4-9.3l-7.9 6.1C7.2 41.7 14.9 47 24 47z"/>
        </svg>
        Sign in with Google
      </a>
    </section>

    <section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin-top:2rem;">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;padding:1.5rem;">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">🔒 Secure</h2>
        <p style="color:#64748b;font-size:0.9rem;">
          OAuth 2.0 with PKCE-ready state validation and HTTP-only session cookies.
        </p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;padding:1.5rem;">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">⚡ Fast</h2>
        <p style="color:#64748b;font-size:0.9rem;">
          Built on Deno and Hono — a tiny, ultrafast web framework with zero overhead.
        </p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;padding:1.5rem;">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">🌍 GCP-ready</h2>
        <p style="color:#64748b;font-size:0.9rem;">
          Deployed as a Cloud Run service — scale to zero and pay only for what you use.
        </p>
      </div>
    </section>
  `;

  return layout("Home", body);
}
