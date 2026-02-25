import { layout } from "./layout.ts";

export function tosPage(): string {
  const effectiveDate = "2026-01-01";
  const body = /* html */ `
    <h1 style="font-size:2rem;font-weight:800;margin-bottom:0.5rem;">Terms of Service</h1>
    <p style="color:#64748b;margin-bottom:2rem;">Effective date: ${effectiveDate}</p>

    <section style="line-height:1.8;color:#334155;">
      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">1. Acceptance of Terms</h2>
      <p>
        By accessing or using openclaw ("Service"), you agree to be bound by these Terms of Service
        ("Terms"). If you do not agree to these Terms, please do not use the Service.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">2. Description of Service</h2>
      <p>
        openclaw is a web application that allows users to sign in with their Google account via
        OAuth 2.0 and access features provided by the Service.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">3. User Accounts</h2>
      <p>
        You may only use the Service if you have a valid Google account and are authorized to grant
        the Service access to your account information. You are responsible for maintaining the
        confidentiality of your account and for all activities that occur under it.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul style="margin:0.5rem 0 0 1.5rem;">
        <li>Use the Service for any unlawful purpose or in violation of any applicable law.</li>
        <li>Interfere with or disrupt the integrity or performance of the Service.</li>
        <li>Attempt to gain unauthorized access to any part of the Service.</li>
        <li>Reverse-engineer, decompile, or disassemble any part of the Service.</li>
      </ul>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">5. Intellectual Property</h2>
      <p>
        All content, trademarks, and other intellectual property in the Service are owned by or
        licensed to openclaw. Nothing in these Terms transfers any such rights to you.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">6. Disclaimer of Warranties</h2>
      <p>
        The Service is provided "as is" and "as available" without warranties of any kind, express
        or implied, including but not limited to warranties of merchantability, fitness for a
        particular purpose, or non-infringement.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, openclaw shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising out of or related to your
        use of or inability to use the Service.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">8. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of any changes by posting
        the new Terms on this page with an updated effective date. Continued use of the Service
        after changes constitutes acceptance of the new Terms.
      </p>

      <h2 style="font-size:1.2rem;font-weight:700;margin:2rem 0 0.5rem;">9. Contact</h2>
      <p>
        If you have any questions about these Terms, please contact <a href="mailto:support@greeffer.com">support@greeffer.com</a> or open an issue at
        <a href="https://github.com/modster/openclaw">github.com/modster/openclaw</a>.
      </p>
    </section>
  `;

  return layout("Terms of Service", body);
}
