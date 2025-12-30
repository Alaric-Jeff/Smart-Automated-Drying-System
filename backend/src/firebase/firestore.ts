import { initFirebaseAdmin } from "./firebase-admin.js";

const admin = initFirebaseAdmin()

export const db = admin.firestore()