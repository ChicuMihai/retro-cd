export const firebase = {
  apiKey: "AIzaSyAMoruOrvejlwGRcbQRSjIfxl-Bk5YzFu4",
  authDomain: "retro-disks.firebaseapp.com",
  databaseURL: "https://retro-disks.firebaseio.com",
  projectId: "retro-disks",
  storageBucket: "retro-disks.appspot.com",
  messagingSenderId: "548494367024",
  appId: "1:548494367024:web:0970d87ebce523f5fd90f5",
};

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false,
  enableClaims: true,
};

export default { firebase, rrfConfig };
