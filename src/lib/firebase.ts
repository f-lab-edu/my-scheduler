import * as admin from "firebase-admin";

const databaseURL =
  process.env.FIREBASE_DATABASE_URL ??
  `https://${process.env.FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL,
  });
}

const db = admin.firestore();
const rtdbAdmin = admin.database();
export { admin, db, rtdbAdmin };
