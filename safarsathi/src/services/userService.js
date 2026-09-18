// ============================================================
//  SAFARSATHI — User Profile Service (Firestore)
//  Create, fetch, update user profiles
// ============================================================

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const USERS_COLLECTION = 'users';

// ─── Create User Profile (after first login) ─────────────────
// uid: Firebase Auth UID
// userData: { name, phone, role }
export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(userRef, {
      uid,
      name: userData.name || '',
      phone: userData.phone || '',
      role: userData.role || 'passenger', // 'passenger' | 'driver' | 'both'
      rating: 5.0,
      totalRides: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true }); // merge: true means won't overwrite if profile already exists

    return { success: true };
  } catch (error) {
    console.error('createUserProfile error:', error);
    return { success: false, error: 'Profile create nahi hua.' };
  }
};

// ─── Get User Profile ─────────────────────────────────────────
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { success: true, profile: { id: snap.id, ...snap.data() } };
    } else {
      return { success: false, error: 'Profile nahi mila.' };
    }
  } catch (error) {
    console.error('getUserProfile error:', error);
    return { success: false, error: 'Profile fetch nahi ho payi.' };
  }
};

// ─── Update User Profile ──────────────────────────────────────
// updates: Partial user data object
export const updateUserProfile = async (uid, updates) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('updateUserProfile error:', error);
    return { success: false, error: 'Profile update nahi hua.' };
  }
};
