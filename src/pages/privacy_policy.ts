import { layout } from "./layout.ts";

export function privacyPage(): string {
  const effectiveDate = "2026-01-01";
  const body = /* html */ `
    <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem;">Privacy Policy</h1>
    <p style="color:#64748b;margin-bottom:2rem;">Effective date: ${effectiveDate}</p>

    <section style="line-height:1.8;color:#334155;">
      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">1. Information We Collect</h2>
      <p>
        When you sign in with Google, we receive the following information from Google:
      </p>
      <ul style="margin:0.5rem 0 0 1.5rem;">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your profile picture URL</li>
      </ul>
      <p style="margin-top:0.75rem;">
        We do not store this information on our servers. It is held only in a short-lived,
        HTTP-only session cookie in your browser for the duration of your session.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">2. How We Use Your Information</h2>
      <p>We use the information solely to:</p>
      <ul style="margin:0.5rem 0 0 1.5rem;">
        <li>Authenticate you and maintain your session while you use the Service.</li>
        <li>Display your name and profile picture within the Service.</li>
      </ul>
      <p style="margin-top:0.75rem;">
        We do not use your information for advertising, profiling, or any other purpose.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">3. Cookies</h2>
      <p>
        We use two cookies:
      </p>
      <ul style="margin:0.5rem 0 0 1.5rem;">
        <li>
          <strong>oauth_state</strong> – a short-lived (10-minute) cookie used to prevent
          CSRF attacks during the OAuth login flow. It is deleted immediately after login.
        </li>
        <li>
          <strong>session</strong> – a 24-hour HTTP-only cookie that stores your name,
          email, and profile picture for the current session.
        </li>
      </ul>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">4. Data Sharing</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personal information to any third
        parties. We do not share your information with Google beyond what is necessary to
        perform the OAuth authentication flow.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">5. Data Retention</h2>
      <p>
        Because we do not persist your data to a database, your information is automatically
        removed when your session cookie expires (within 24 hours) or when you sign out.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">6. Security</h2>
      <p>
        Session cookies are set with <code>HttpOnly</code> and <code>SameSite=Lax</code>
        flags to mitigate XSS and CSRF attacks. In production the <code>Secure</code> flag
        should be enabled so cookies are only transmitted over HTTPS.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">7. Your Rights</h2>
      <p>
        You may sign out at any time by visiting <a href="/auth/logout">/auth/logout</a>,
        which immediately removes all session data from your browser.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this
        page with an updated effective date.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">9. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please contact <a href="mailto:privacy@greeffer.com">privacy@greeffer.com</a> or open an issue at
        <a href="https://github.com/modster/openclaw">github.com/modster/openclaw</a>.
      </p>
    </section>
  `;

  return layout("Privacy Policy", body);
}
