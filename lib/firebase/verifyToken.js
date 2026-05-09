import { adminAuth } from "./admin";

class AuthError extends Error {
  constructor(message, status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

const getAdminEmails = () =>
  (process.env.FIREBASE_ADMIN_EMAILS || "admin@myshop.com")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export function isAuthError(error) {
  return error?.name === "AuthError";
}

export function getBearerToken(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthError("Missing or invalid Authorization header");
  }

  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    throw new AuthError("Missing token");
  }

  return token;
}

export async function verifyFirebaseToken(request) {
  if (!adminAuth) {
    throw new AuthError("Firebase Admin Auth is not configured", 500);
  }

  const idToken = getBearerToken(request);
  const checkRevoked = process.env.FIREBASE_CHECK_REVOKED_TOKENS === "true";

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken, checkRevoked);
    const email = decodedToken.email?.toLowerCase();

    if (!email || !getAdminEmails().includes(email)) {
      console.warn(`Unauthorized admin API access attempt: ${email || "unknown"}`);
      throw new AuthError("Access denied", 403);
    }

    return decodedToken;
  } catch (error) {
    if (isAuthError(error)) throw error;

    console.error("Token verification failed:", error.message);
    throw new AuthError("Invalid or expired token");
  }
}
