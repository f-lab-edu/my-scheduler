import * as admin from "firebase-admin";
import serviceAccount from "@/lib/firebaseAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
export { admin, db };
