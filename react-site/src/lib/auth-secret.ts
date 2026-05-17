export function authSecret() {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV === "development" ? "vmc-local-development-secret" : undefined)
  );
}
