import * as admin from "firebase-admin";
// TODO: login
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: "https:/my-scheduler-16652.firebaseio.com",
  });
}

const db = admin.firestore();
export { admin, db };
