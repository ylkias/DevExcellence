# Application security checklist

- [ ] Authentication is required for all protected functionality.
- [ ] Authorization is checked server-side for every protected operation.
- [ ] Least privilege and deny-by-default are applied.
- [ ] Object-level and function-level access are tested (IDOR/BOLA).
- [ ] Tenant isolation is enforced in server-side data access.
- [ ] Passwords use Argon2id or an appropriate password-hashing alternative.
- [ ] Sessions, cookies, expiry, rotation, logout, and revocation are protected.
- [ ] Recovery and MFA controls are appropriate to risk.
- [ ] Inputs and file uploads are validated at trust boundaries.
- [ ] Injection, XSS, CSRF, SSRF, path traversal, and command injection are assessed.
- [ ] Rate limits and abuse controls protect sensitive endpoints.
- [ ] CORS, security headers, TLS, and error handling are reviewed.
- [ ] Secrets are not present in source, history, logs, or client bundles.
- [ ] Logs avoid credentials, tokens, and unnecessary personal data.
- [ ] Dependencies and deployment configuration are reviewed.
- [ ] Debug, admin, internal, and metrics endpoints are intentionally protected.
- [ ] Testing is restricted to authorized systems and scope.
