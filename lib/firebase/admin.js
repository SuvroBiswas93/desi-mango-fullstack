import admin from "firebase-admin";

let adminAuth;

const requiredEnv = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

if (!admin.apps.length) {
  try {
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);

    if (missingEnv.length > 0) {
      throw new Error(`Missing Firebase Admin env: ${missingEnv.join(", ")}`);
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Firebase Admin init error:", error.message);
  }
}

try {
  adminAuth = admin.auth();
} catch (error) {
  console.error("Firebase Admin Auth error:", error.message);
}

export { adminAuth };
export default admin;
