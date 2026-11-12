# Example finding

**ID:** API-001  
**Title:** Invoice endpoint does not enforce record ownership  
**Severity:** High  
**Confidence:** High  
**Location:** src/routes/invoices.ts:42

## Evidence

The route verifies that the caller is authenticated, but retrieves the invoice only by the identifier supplied by the caller. The server does not verify that the invoice belongs to the authenticated user or tenant.

## Impact

An authenticated user may attempt to access another user's invoice by changing the identifier, exposing data across account boundaries.

## Recommended remediation

Scope the database query to the authenticated user's authorized tenant or ownership context. Enforce authorization on the server and add a negative test using two separate users.

## Validation

Authenticate as user A and request an invoice belonging to user B. Confirm that the API denies access according to the product's response policy.

> This is an illustrative example, not a finding from a real repository.
