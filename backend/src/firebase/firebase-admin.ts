import admin from "firebase-admin";

export function initFirebaseAdmin() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Firebase env vars missing");
  }

  if (!admin.apps.length) {
    const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

    console.log("Initializing Firebase Admin SDK...");
    console.log("Project ID:", FIREBASE_PROJECT_ID);
    console.log("Client Email:", FIREBASE_CLIENT_EMAIL);
    console.log("Private Key starts with:", privateKey.slice(0, 30));
 
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });

    console.log("Firebase Admin initialized successfully");
  }

  return admin;
}
