import admin from "firebase-admin";

const firebaseKey = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
});

export const db = admin.firestore();