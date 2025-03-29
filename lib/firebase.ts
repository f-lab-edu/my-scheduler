import * as admin from "firebase-admin";
import serviceAccount from "./firebaseAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
export { admin, db };
