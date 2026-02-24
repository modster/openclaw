export function layout(title: string, body: string): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} – openclaw</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    header a { text-decoration: none; color: inherit; }
    header .logo { font-size: 1.25rem; font-weight: 700; color: #2563eb; }
    nav a {
      margin-left: 1.5rem;
      color: #64748b;
      font-size: 0.9rem;
    }
    nav a:hover { color: #2563eb; }
    main { flex: 1; padding: 3rem 2rem; max-width: 860px; margin: 0 auto; width: 100%; }
    footer {
      background: #fff;
      border-top: 1px solid #e2e8f0;
      padding: 1.25rem 2rem;
      text-align: center;
      font-size: 0.8rem;
      color: #94a3b8;
    }
    footer a { color: #64748b; }
  </style>
</head>
<body>
  <header>
    <a class="logo" href="/">openclaw</a>
    <nav>
      <a href="/terms">Terms</a>
      <a href="/privacy">Privacy</a>
      <a href="/auth/login">Sign in with Google</a>
    </nav>
  </header>
  <main>${body}</main>
  <footer>
    &copy; ${new Date().getFullYear()} openclaw &mdash;
    <a href="/terms">Terms of Service</a> &middot;
    <a href="/privacy">Privacy Policy</a>
  </footer>
</body>
</html>`;
}
