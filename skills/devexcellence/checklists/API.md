# API and route checklist

- [ ] Route inventory includes path, method, handler, and middleware.
- [ ] Routes are classified as public, authenticated, or privileged.
- [ ] Public routes are intentional, minimal, and documented.
- [ ] Admin, debug, internal, maintenance, and metrics endpoints are protected.
- [ ] Authentication and authorization are enforced server-side.
- [ ] Object and tenant access is validated for every relevant request.
- [ ] Request schemas, IDs, filters, sorting, and payload sizes are validated.
- [ ] Every field has intentional type, format, min/max length, numeric range, precision/scale, and allowed values.
- [ ] Per-field and total request-body limits are enforced server-side; oversized values are rejected, not silently truncated.
- [ ] Frontend validation is duplicated by authoritative server-side validation.
- [ ] Boundary tests cover min/max, just-outside limits, null/empty, whitespace, malformed input, and Unicode.
- [ ] Pagination has stable ordering and bounded page size.
- [ ] Rate limits and abuse protections are appropriate.
- [ ] CORS and CSRF controls match the authentication model.
- [ ] Error responses do not leak stack traces or sensitive internals.
- [ ] Outbound calls have timeouts and bounded retries.
- [ ] API contracts, versioning, and compatibility are tested.
- [ ] Logs and correlation IDs avoid sensitive values.
