// ============================================================
//  SAFARSATHI — Firebase App Initialization
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAG6XUbrq0eSRkNxZ0kBkR1s_fjQ9rJoek",
  authDomain: "safarsathi-1fd44.firebaseapp.com",
  projectId: "safarsathi-1fd44",
  storageBucket: "safarsathi-1fd44.firebasestorage.app",
  messagingSenderId: "882372437327",
  appId: "1:882372437327:web:0102e42746da78c200113a",
  measurementId: "G-BXY608S8H9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth (Phone OTP)
export const auth = getAuth(app);

// Firestore Database (Rides, Users, Bookings)
export const db = getFirestore(app);

export default app;
