// Retrieves the JWT secret for token signing and verification.
export function getJWTSecret() {
  const secret = process.env.TOKEN_SECRET;

  if (!secret) throw new Error("Secret is not defined in Env");
  return secret;
}
