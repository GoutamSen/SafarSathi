// ============================================================
//  SAFARSATHI — Rides Service (Firestore)
//  Real-time rides: publish, fetch, request seat, accept/decline
// ============================================================

import {
  collection,
  collectionGroup,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const RIDES_COLLECTION = 'rides';

// ─── Publish a New Ride (Driver) ─────────────────────────────
// rideData: { driverUid, driverName, driverPhone, driverAvatar, driverRating,
//             vehicleModel, vehicleType, routeFrom, routeTo, departureTime,
//             availableSeats, costPerSeat, pickupNotes }
// Returns: { success: true, rideId } | { success: false, error }
export const publishRide = async (rideData) => {
  try {
    const docRef = await addDoc(collection(db, RIDES_COLLECTION), {
      ...rideData,
      status: 'active', // active | started | completed | cancelled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, rideId: docRef.id };
  } catch (error) {
    console.error('publishRide error:', error);
    return { success: false, error: 'Ride publish nahi ho payi. Try again.' };
  }
};

// ─── Listen to All Active Rides (Real-time) ──────────────────
// callback receives array of ride objects
// Returns: unsubscribe function
export const listenToActiveRides = (callback) => {
  const q = query(
    collection(db, RIDES_COLLECTION),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const rides = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      // Convert Firestore timestamp to readable string
      createdAt: d.data().createdAt?.toDate?.()?.toISOString() || null,
    }));
    callback(rides);
  }, (error) => {
    console.error('listenToActiveRides error:', error);
  });
};

// ─── Listen to Driver's Own Published Rides ──────────────────
export const listenToDriverRides = (driverUid, callback) => {
  const q = query(
    collection(db, RIDES_COLLECTION),
    where('driverUid', '==', driverUid),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const rides = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(rides);
  });
};

// ─── Request a Seat (Passenger) ──────────────────────────────
// Returns: { success: true, requestId } | { success: false, error }
export const requestSeat = async (rideId, passengerData) => {
  try {
    const requestsRef = collection(db, RIDES_COLLECTION, rideId, 'requests');
    const docRef = await addDoc(requestsRef, {
      ...passengerData, // { passengerUid, passengerName, passengerPhone, seats, pickupPoint }
      status: 'pending', // pending | accepted | declined
      requestedAt: serverTimestamp(),
    });
    return { success: true, requestId: docRef.id };
  } catch (error) {
    console.error('requestSeat error:', error);
    return { success: false, error: 'Seat request nahi ho payi. Try again.' };
  }
};

// ─── Listen to Requests for a Ride (Driver's view) ───────────
export const listenToRideRequests = (rideId, callback) => {
  const requestsRef = collection(db, RIDES_COLLECTION, rideId, 'requests');
  const q = query(requestsRef, orderBy('requestedAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(requests);
  });
};

// ─── Listen to Passenger's Own Bookings ──────────────────────
// Listens across all rides for requests where passengerUid matches
export const listenToPassengerBookings = (passengerUid, callback) => {
  // Note: This requires a Firestore Collection Group Query
  // Make sure to create index in Firebase console if prompted
  const { collectionGroup } = require('firebase/firestore');
  const q = query(
    collectionGroup(db, 'requests'),
    where('passengerUid', '==', passengerUid),
    orderBy('requestedAt', 'desc')
  );

  return onSnapshot(q, async (snapshot) => {
    const bookings = await Promise.all(
      snapshot.docs.map(async (d) => {
        // Get parent ride data too
        const rideRef = d.ref.parent.parent;
        const rideSnap = await getDoc(rideRef);
        return {
          id: d.id,
          rideId: rideRef.id,
          ...d.data(),
          ride: rideSnap.exists() ? { id: rideRef.id, ...rideSnap.data() } : null,
        };
      })
    );
    callback(bookings);
  });
};

// ─── Accept Seat Request (Driver) ────────────────────────────
export const acceptRequest = async (rideId, requestId) => {
  try {
    const requestRef = doc(db, RIDES_COLLECTION, rideId, 'requests', requestId);
    await updateDoc(requestRef, {
      status: 'accepted',
      acceptedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('acceptRequest error:', error);
    return { success: false, error: 'Request accept nahi hui. Try again.' };
  }
};

// ─── Decline Seat Request (Driver) ───────────────────────────
export const declineRequest = async (rideId, requestId) => {
  try {
    const requestRef = doc(db, RIDES_COLLECTION, rideId, 'requests', requestId);
    await updateDoc(requestRef, {
      status: 'declined',
      declinedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('declineRequest error:', error);
    return { success: false, error: 'Request decline nahi hui. Try again.' };
  }
};

// ─── Update Ride Status (Driver) ─────────────────────────────
// status: 'active' | 'started' | 'completed' | 'cancelled'
export const updateRideStatus = async (rideId, status) => {
  try {
    const rideRef = doc(db, RIDES_COLLECTION, rideId);
    await updateDoc(rideRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('updateRideStatus error:', error);
    return { success: false, error: 'Status update nahi hua. Try again.' };
  }
};
