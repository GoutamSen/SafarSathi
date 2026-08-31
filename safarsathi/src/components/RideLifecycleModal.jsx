import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Star,
  CheckCircle2,
  Lock as LockIcon,
  Phone,
  Car,
  Navigation,
  AlertTriangle,
  Send,
  CreditCard,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  QrCode,
  Sparkles,
  ArrowRight,
  Shield,
  FileCheck,
  User,
  ExternalLink,
  Compass,
  Volume2,
  Search as SearchIcon,
  ChevronDown,
  Maximize2,
  Target
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

import { realtimeSync } from '../services/realtimeSync';
import LiveRideChat from './LiveRideChat';

// Helper component to trigger Leaflet map resize automatically
function MapResizer({ isFullScreen }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (map) map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [map, isFullScreen]);
  return null;
}

// Helper component to smoothly re-center map view onto live vehicle position
function MapRecenterControl({ targetCoords, trigger }) {
  const map = useMap();
  useEffect(() => {
    if (map && trigger > 0) {
      map.flyTo(targetCoords, 12, { duration: 1.2, animate: true });
    }
  }, [map, trigger, targetCoords]);
  return null;
}

/* ====================================================================
   REAL GOOGLE MAPS NAVIGATION UI SUB-COMPONENT (Screenshot 2 Match)
==================================================================== */
function LiveMapTrackingView({ journey }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recenterTrigger, setRecenterTrigger] = useState(0);
  const [recenterToast, setRecenterToast] = useState(false);

  const fromName = journey?.routeFrom || 'Indore';
  const toName = journey?.routeTo || 'Khargone';

  const startCoords = [22.7196, 75.8577]; // Indore
  const waypoints = [
    [22.6100, 75.8000], // Pithampur
    [22.4200, 75.6700], // Manpur / Maheshwar
    [22.1500, 75.6800], // Kasrawad (Current Live Position)
  ];
  const endCoords = [21.8247, 75.6102];   // Khargone

  // Full Polyline GPS Waypoints from Indore to Khargone
  const fullPolylinePath = [
    [22.7196, 75.8577], // Indore
    [22.6500, 75.8300],
    [22.6100, 75.8000], // Pithampur
    [22.5000, 75.7400],
    [22.4200, 75.6700], // Manpur
    [22.3000, 75.6750], // Maheshwar
    [22.1500, 75.6800], // Kasrawad
    [22.0000, 75.6400],
    [21.8247, 75.6102]  // Khargone
  ];

  const [pathIndex, setPathIndex] = useState(6); // Starts at Kasrawad (~78% completed)
  const currentVehiclePosition = fullPolylinePath[pathIndex];

  // Dynamic remaining distance and ETA calculation
  const remainingDistanceKm = Math.max(2, Math.round(((fullPolylinePath.length - 1 - pathIndex) / (fullPolylinePath.length - 1)) * 88));
  const remainingEtaMins = Math.max(1, Math.round((remainingDistanceKm / 72) * 60));

  // Live GPS movement animation loop (moves car forward along highway)
  useEffect(() => {
    const timer = setInterval(() => {
      setPathIndex((prev) => (prev < fullPolylinePath.length - 1 ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRecenter = () => {
    setRecenterTrigger((prev) => prev + 1);
    setRecenterToast(true);
    setTimeout(() => setRecenterToast(false), 2200);
  };

  const altRouteCoords = [
    [22.7196, 75.8577], // Indore
    [22.5986, 75.2979], // Dhar / Mandav route
    [22.1793, 75.5855], // Maheshwar
    [21.8247, 75.6102]  // Khargone
  ];

  // Google Maps Blue Origin Pulse Dot
  const originDot = L.divIcon({
    className: 'gmap-blue-dot',
    html: `<div style="width:22px;height:22px;background:#2563EB;border:3px solid #FFFFFF;border-radius:50%;box-shadow:0 0 14px rgba(37,99,235,0.8);"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  // Google Maps Alternate Route "3 min slower" Badge
  const altBadgePin = L.divIcon({
    className: 'gmap-alt-badge',
    html: `<div style="background:#FFFFFF;color:#4B5563;padding:4px 9px;border-radius:14px;font-size:11px;font-weight:700;box-shadow:0 3px 10px rgba(0,0,0,0.15);border:1px solid #D1D5DB;white-space:nowrap;">3 min slower</div>`,
    iconSize: [95, 26],
    iconAnchor: [47, 13]
  });

  // Google Maps Vehicle Yellow Capsule Pin
  const vehiclePin = L.divIcon({
    className: 'gmap-vehicle-pin',
    html: `<div style="background:#E6A700;color:#111827;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 6px 18px rgba(230,167,0,0.7);display:flex;align-items:center;gap:4px;border:2px solid #FFFFFF;">🚗 Hyundai Creta (72 km/h)</div>`,
    iconSize: [165, 36],
    iconAnchor: [82, 18]
  });

  // Google Maps Red Destination Marker Pin
  const destinationPin = L.divIcon({
    className: 'gmap-dest-pin',
    html: `<div style="background:#DC2626;color:#FFFFFF;padding:4px 10px;border-radius:10px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 12px rgba(220,38,38,0.5);border:1px solid #FFFFFF;">🏁 ${toName}</div>`,
    iconSize: [95, 30],
    iconAnchor: [47, 15]
  });

  const containerStyle = isFullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        borderRadius: 0,
        margin: 0,
        backgroundColor: '#111827',
      }
    : {
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '2px solid #2563EB',
        marginBottom: '1.25rem',
        height: '280px',
        boxShadow: '0 8px 24px rgba(37,99,235,0.15)',
      };

  return (
    <div style={containerStyle}>
      <MapContainer
        center={[22.27, 75.73]}
        zoom={isFullScreen ? 10 : 9}
        scrollWheelZoom={true}
        dragging={true}
        style={{ width: '100%', height: '100%', backgroundColor: '#E5E3DF' }}
      >
        <MapResizer isFullScreen={isFullScreen} />
        <MapRecenterControl targetCoords={currentVehiclePosition} trigger={recenterTrigger} />

        {/* Clean OpenStreetMap Tile Engine - No Watermarks */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Alternate Route (Light Blue - 3 min slower) */}
        <Polyline
          positions={altRouteCoords}
          color="#93C5FD"
          weight={5}
          opacity={0.85}
        />
        <Marker position={[22.35, 75.40]} icon={altBadgePin} />

        {/* Primary Active Highway Route (Royal Blue like Google Maps) */}
        <Polyline
          positions={[startCoords, ...waypoints, endCoords]}
          color="#2563EB"
          weight={11}
          opacity={0.95}
        />

        {/* Origin Blue GPS Marker */}
        <Marker position={startCoords} icon={originDot} />

        {/* Live Moving Vehicle Marker */}
        <Marker position={currentVehiclePosition} icon={vehiclePin} />

        {/* Destination Marker */}
        <Marker position={endCoords} icon={destinationPin} />
      </MapContainer>

      {/* RE-CENTER TOAST NOTIFICATION OVERLAY */}
      {recenterToast && (
        <div style={{
          position: 'absolute',
          top: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001,
          backgroundColor: '#111827',
          color: '#E6A700',
          padding: '0.45rem 0.95rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '800',
          boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
          border: '1px solid #E6A700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          whiteSpace: 'nowrap',
        }}>
          <span>🎯 Map Re-centered onto Live Hyundai Creta GPS</span>
        </div>
      )}

      {/* TOP LEFT: Google Maps Turn-by-Turn Navigation Header Banner */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 1000,
        backgroundColor: '#064E3B',
        color: '#FFFFFF',
        borderRadius: '14px',
        padding: '0.55rem 0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: isFullScreen ? '360px' : '230px',
      }}>
        <div style={{ backgroundColor: '#10B981', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Navigation size={16} style={{ color: '#FFFFFF', transform: 'rotate(45deg)' }} />
        </div>
        <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
          <div style={{ fontSize: '0.7rem', color: '#6EE7B7', fontWeight: '800', textTransform: 'uppercase' }}>
            Then ➔ Continue 18 km
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            SH-1 (Indore ➔ Khargone)
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Google Maps Navigation Control Stack (Screenshot 2 Match) */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}>
        {/* Re-center Live Vehicle Location Button (Google Maps Style) */}
        <button
          type="button"
          onClick={handleRecenter}
          title="Re-center onto Live Vehicle Location"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(37,99,235,0.4)',
            cursor: 'pointer',
          }}
        >
          <Target size={18} />
        </button>

        {/* Collapse Arrow */}
        <button
          type="button"
          onClick={() => setIsFullScreen(!isFullScreen)}
          title="Toggle Screen View"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#111827',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          {isFullScreen ? <ChevronDown size={18} /> : <Maximize2 size={16} />}
        </button>

        {/* Compass N */}
        <button
          type="button"
          onClick={() => alert('🧭 Compass Centered to North')}
          title="Center North"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#DC2626',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '0.85rem',
          }}
        >
          <Compass size={18} />
        </button>

        {/* Route Search */}
        <button
          type="button"
          onClick={() => alert('🔍 Searching highway petrol pumps & dhabas...')}
          title="Search Route Amenities"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#4B5563',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          <SearchIcon size={16} />
        </button>

        {/* Mute Audio Voice Guidance */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          title="Voice Guidance"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: isMuted ? '#FEE2E2' : '#FFFFFF',
            color: isMuted ? '#DC2626' : '#111827',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          <Volume2 size={16} />
        </button>
      </div>

      {/* BOTTOM FLOATING BAR: Live ETA & Route Info */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(10px)',
        color: '#111827',
        borderRadius: '14px',
        padding: '0.6rem 0.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        border: '1px solid #E5E7EB',
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span className="pulse-indicator" style={{ backgroundColor: '#22C55E' }} />
            <span>Fastest Route • SH-1 Highway</span>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827' }}>
            {fromName} ➔ {toName} ({remainingDistanceKm} km left)
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1rem', fontWeight: '800', color: '#2563EB' }}>
            ETA: {remainingEtaMins} Mins
          </div>
          <span style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: '600' }}>Speed: 72 km/h</span>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   LIFECYCLE ENGINE STATES (21-State Real-Time Engine)
==================================================================== */
const RIDE_STATUS = {
  SEARCHING: 'SEARCHING',
  HOST_REQUESTED: 'HOST_REQUESTED',
  DRIVER_ACCEPTED: 'DRIVER_ACCEPTED',
  OTP_GENERATED: 'OTP_GENERATED',
  EN_ROUTE_PICKUP: 'EN_ROUTE_PICKUP',
  ARRIVED_PICKUP: 'ARRIVED_PICKUP',
  CHECKLIST_VERIFIED: 'CHECKLIST_VERIFIED',
  TRIP_STARTED: 'TRIP_STARTED',
  TRIP_COMPLETED: 'TRIP_COMPLETED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
  FEEDBACK_SUBMITTED: 'FEEDBACK_SUBMITTED',
};

export default function RideLifecycleModal({
  journey,
  initialRole = 'passenger',
  currentUser,
  onBookingConfirmed,
  onClose
}) {
  if (!journey) return null;

  const isMine = journey.isUserPublished || (journey.driverName && journey.driverName.includes('You'));
  const effectiveRole = initialRole === 'driver' || isMine ? 'driver' : 'passenger';
  const [activeRole, setActiveRole] = useState(effectiveRole);
  const [currentStep, setCurrentStep] = useState(
    effectiveRole === 'driver' ? RIDE_STATUS.HOST_REQUESTED : RIDE_STATUS.DRIVER_ACCEPTED
  );

  const pricePerSeatNum = parseInt((journey.costPerSeat || '₹160').replace('₹', '')) || 160;
  const requestedSeats = journey.requestedSeats || 1;
  const totalFare = journey.totalFare || pricePerSeatNum * requestedSeats;
  const platformFee = Math.round(totalFare * 0.05);
  const driverEarnings = totalFare - platformFee;

  const [generatedOtp] = useState('4829');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [driverMatched, setDriverMatched] = useState(true);
  const [vehicleMatched, setVehicleMatched] = useState(true);
  const [checklistError, setChecklistError] = useState('');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [passengerRating, setPassengerRating] = useState(5);
  const [driverRating, setDriverRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  // Real-time Multi-Tab Sync Listener
  useEffect(() => {
    const unsubscribe = realtimeSync.subscribe((event) => {
      if (event.type === 'BOOKING_ACCEPTED') {
        setCurrentStep(RIDE_STATUS.DRIVER_ACCEPTED);
      } else if (event.type === 'TRIP_STARTED') {
        setCurrentStep(RIDE_STATUS.TRIP_STARTED);
      } else if (event.type === 'PAYMENT_PENDING') {
        setCurrentStep(RIDE_STATUS.PAYMENT_PENDING);
      } else if (event.type === 'PAYMENT_COMPLETED') {
        setCurrentStep(RIDE_STATUS.PAYMENT_COMPLETED);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDriverAccept = () => {
    setCurrentStep(RIDE_STATUS.DRIVER_ACCEPTED);
    realtimeSync.broadcast('BOOKING_ACCEPTED', { rideId: journey.id, otp: '4829' });
  };

  const handleVerifyOtpSubmit = (e) => {
    if (e) e.preventDefault();
    if (enteredOtp === generatedOtp || enteredOtp === '4829') {
      setOtpError('');
      setCurrentStep(RIDE_STATUS.TRIP_STARTED);
      realtimeSync.broadcast('TRIP_STARTED', { rideId: journey.id });
    } else {
      setOtpError('❌ Incorrect OTP code! Please check passenger pass.');
    }
  };

  const handleChecklistSubmit = () => {
    if (!driverMatched || !vehicleMatched) {
      setChecklistError('⚠️ You must verify driver identity and vehicle registration before starting.');
      return;
    }
    setChecklistError('');
    setCurrentStep(RIDE_STATUS.TRIP_STARTED);
    realtimeSync.broadcast('TRIP_STARTED', { rideId: journey.id });
  };

  const handleProcessPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setCurrentStep(RIDE_STATUS.PAYMENT_COMPLETED);
      realtimeSync.broadcast('PAYMENT_COMPLETED', { rideId: journey.id, totalFare });

      if (onBookingConfirmed && activeRole === 'passenger') {
        onBookingConfirmed({
          id: `cb-${Date.now()}`,
          routeFrom: journey.routeFrom,
          routeTo: journey.routeTo,
          driverName: journey.driverName,
          driverRating: journey.driverRating,
          driverAvatar: journey.driverAvatar,
          vehicleType: journey.vehicleType,
          vehicleModel: journey.vehicleModel,
          pickupPoint: journey.currentLocation,
          totalFare: totalFare,
          requestedSeats: requestedSeats,
          bookingStatus: 'COMPLETED',
          departureTime: journey.departureTime || 'Today',
        });
      }
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: 0, zIndex: 9999 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          borderRadius: 0,
          padding: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        
        {/* Modal Top Header Bar */}
        <div
          style={{
            padding: '1.1rem 1.5rem',
            background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Navigation size={20} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                Live Journey Control Center
              </h3>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#111827', opacity: 0.85 }}>
                {journey.routeFrom} ➔ {journey.routeTo}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#111827',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', maxWidth: '760px', margin: '0 auto', width: '100%' }}>

          {/* 1. PASSENGER VIEW */}
          {activeRole === 'passenger' && (
            <div>
              {/* Route Summary */}
              <div style={{ backgroundColor: '#FAFAFA', borderRadius: '18px', padding: '1.25rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '700' }}>94% Overlap Match</span>
                  <span style={{ fontSize: '0.775rem', backgroundColor: '#FFF4CC', color: '#C98F00', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                    {journey.departureTime || 'Live Now'}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  {journey.routeFrom} <span style={{ color: '#E6A700' }}>➔</span> {journey.routeTo}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', color: '#4B5563' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Navigation size={16} style={{ color: '#E6A700' }} />
                    <span>Pickup: <strong>{journey.currentLocation}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} style={{ color: '#C98F00' }} />
                    <span>ETA: <strong>5 minutes</strong></span>
                  </div>
                </div>
              </div>

              {/* Driver Host Details */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={journey.driverAvatar}
                    alt={journey.driverName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E6A700' }}
                  />
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.975rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {journey.driverName}
                      <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={13} fill="#C98F00" /> {journey.driverRating} • {journey.driverTrips}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Vehicle</span>
                  <strong style={{ fontSize: '0.875rem', color: '#111827' }}>{journey.vehicleModel}</strong>
                </div>
              </div>

              {/* OTP Pass Box - Only revealed after Passenger clicks "Verify Vehicle & Board Ride ➔" */}
              {(currentStep === RIDE_STATUS.CHECKLIST_VERIFIED || currentStep === RIDE_STATUS.TRIP_STARTED) && (
                <div style={{ backgroundColor: '#FFF4CC', borderRadius: '18px', padding: '1.25rem', border: '1.5px solid #E6A700', textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    YOUR 4-DIGIT PICKUP START OTP
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '0.25em', color: '#111827', fontFamily: 'monospace' }}>
                    {generatedOtp}
                  </div>
                  <span style={{ fontSize: '0.775rem', color: '#4B5563' }}>
                    Share this OTP with driver host {journey.driverName} upon boarding.
                  </span>
                </div>
              )}

              {/* Step Flow Controls */}
              {currentStep === RIDE_STATUS.DRIVER_ACCEPTED && (
                <div style={{ backgroundColor: '#ECFDF5', borderRadius: '18px', padding: '1.25rem', border: '1.5px solid #10B981', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={16} /> YOUR SEAT IS CONFIRMED!
                    </span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.65rem', borderRadius: '12px', fontWeight: '800' }}>
                      🟢 DRIVER ACCEPTED
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                    {journey.routeFrom || 'Indore'} ➔ {journey.routeTo || 'Khargone'}
                  </h4>

                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '0.9rem', border: '1px solid #A7F3D0', marginBottom: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.825rem' }}>
                    <div>
                      <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Verified Driver Host</span>
                      <strong style={{ color: '#111827' }}>{journey.driverName || 'Rajesh Sharma'} (★ 4.9)</strong>
                    </div>
                    <div>
                      <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Departure Time & Date</span>
                      <strong style={{ color: '#111827' }}>{journey.departureTime || 'Today, 08:30 AM'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Vehicle Information</span>
                      <strong style={{ color: '#111827' }}>{journey.vehicleModel || 'Tata Nexon EV'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Confirmed Fare Share</span>
                      <strong style={{ color: '#047857' }}>₹{totalFare}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(RIDE_STATUS.CHECKLIST_VERIFIED)}
                    className="btn btn-primary btn-shine"
                    style={{ width: '100%', padding: '0.9rem', marginBottom: '1.25rem' }}
                  >
                    Verify Vehicle & Reveal Pickup OTP ➔
                  </button>

                  {/* Real-time Cross-Tab Live Chat */}
                  <LiveRideChat journey={journey} currentRole="passenger" />
                </div>
              )}

              {currentStep === RIDE_STATUS.CHECKLIST_VERIFIED && (
                <div style={{ textAlign: 'center', backgroundColor: '#F3F4F6', padding: '0.85rem 1.15rem', borderRadius: '14px', border: '1px dashed #D1D5DB' }}>
                  <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <span className="pulse-indicator" style={{ backgroundColor: '#E6A700' }} />
                    ⏳ Waiting for Driver Host to verify OTP upon boarding...
                  </span>
                </div>
              )}

              {currentStep === RIDE_STATUS.TRIP_STARTED && (
                <div style={{ textAlign: 'center' }}>
                  <div className="badge-pill badge-green" style={{ fontSize: '0.9rem', marginBottom: '1rem', padding: '0.5rem 1.25rem' }}>
                    <span className="pulse-indicator" />
                    <span>🟢 EN ROUTE ON HIGHWAY (LIVE GPS)</span>
                  </div>

                  {/* Real-time Uber/Rapido Style Live Google Map GPS View */}
                  <LiveMapTrackingView journey={journey} />

                  <button
                    onClick={() => setCurrentStep(RIDE_STATUS.PAYMENT_PENDING)}
                    className="btn btn-primary btn-shine"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    Arrive & Proceed to Payment (₹{totalFare}) ➔
                  </button>
                </div>
              )}

              {currentStep === RIDE_STATUS.PAYMENT_PENDING && (
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '1.25rem', border: '1px solid #E5E7EB' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div className="badge-pill badge-green" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      🏁 DESTINATION ARRIVED
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                      Pay Expense Share to Driver
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      Pay directly to host {journey.driverName} for your 1 seat share.
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    {['UPI / GPay / PhonePe', 'Cash directly to Host', 'Credit / Debit Card', 'SafarSaathi Wallet'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(m)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '12px',
                          border: selectedPaymentMethod === m ? '2px solid #E6A700' : '1px solid #E5E7EB',
                          backgroundColor: selectedPaymentMethod === m ? '#FFF4CC' : '#FAFAFA',
                          color: '#111827',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleProcessPayment}
                    disabled={paymentProcessing}
                    className="btn btn-primary btn-shine"
                    style={{ width: '100%', padding: '0.9rem' }}
                  >
                    {paymentProcessing ? 'Processing Payment...' : `Complete Payment of ₹${totalFare} ➔`}
                  </button>
                </div>
              )}

              {currentStep === RIDE_STATUS.PAYMENT_COMPLETED && (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <CheckCircle2 size={52} style={{ color: '#22C55E', margin: '0 auto 0.75rem auto' }} />
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                    Payment Successful & Trip Completed!
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1.5rem' }}>
                    Paid <strong>₹{totalFare}</strong> to driver {journey.driverName}. Thank you for carpooling with SafarSaathi.
                  </p>
                  <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                    Close & Rate Journey
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. DRIVER HOST VIEW */}
          {activeRole === 'driver' && (
            <div>
              {currentStep !== RIDE_STATUS.TRIP_STARTED && currentStep !== RIDE_STATUS.TRIP_COMPLETED && currentStep !== RIDE_STATUS.PAYMENT_COMPLETED && (
                <>
                  {/* Driver Host Alert / Confirmed Card */}
                  {currentStep === RIDE_STATUS.DRIVER_ACCEPTED ? (
                    <div style={{ backgroundColor: '#ECFDF5', borderRadius: '18px', padding: '1.25rem', border: '1.5px solid #10B981', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CheckCircle2 size={16} /> CONFIRMED RIDE BOOKING
                        </span>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.65rem', borderRadius: '12px', fontWeight: '800' }}>
                          🟢 REQUEST ACCEPTED
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                        {journey.routeFrom || 'Indore'} ➔ {journey.routeTo || 'Khargone'}
                      </h4>

                      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '0.9rem', border: '1px solid #A7F3D0', marginBottom: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.825rem' }}>
                        <div>
                          <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Confirmed Passenger</span>
                          <strong style={{ color: '#111827' }}>Rahul S. (★ 4.9 Rider)</strong>
                        </div>
                        <div>
                          <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Departure Time & Date</span>
                          <strong style={{ color: '#111827' }}>{journey.departureTime || 'Today, 08:30 AM'}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Pickup Point</span>
                          <strong style={{ color: '#111827' }}>{journey.currentLocation || 'Bhawarkua Square'}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#6B7280', fontSize: '0.725rem', display: 'block', fontWeight: '600' }}>Confirmed Seat & Fare</span>
                          <strong style={{ color: '#047857' }}>{requestedSeats} Seat(s) • ₹{totalFare}</strong>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: '700', backgroundColor: '#D1FAE5', padding: '0.6rem 0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                        🔑 Enter Passenger's 4-Digit Pickup OTP (4829) below to verify & start live trip!
                      </div>
                    </div>
                  ) : (
                    <div style={{ backgroundColor: '#FFF4CC', borderRadius: '18px', padding: '1.25rem', border: '1.5px solid #E6A700', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '800' }}>DRIVER HOST CONTROL ROOM</span>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#FFFFFF', color: '#15803D', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: '800' }}>
                          🟢 RIDE LIVE (0 Requests)
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                        {journey.routeFrom || 'Indore'} ➔ {journey.routeTo || 'segava'}
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: '#4B5563', backgroundColor: '#FFFFFF', padding: '0.75rem 0.9rem', borderRadius: '12px', border: '1px solid #FDE68A', marginBottom: '0.85rem' }}>
                        📍 Pickup: <strong>{journey.currentLocation || 'Indore Vijay Nagar Circle'}</strong> • Departure: <strong>{journey.departureTime || 'Today'}</strong>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: '700', textAlign: 'center' }}>
                        ⏳ Waiting for passengers to book seats... As soon as a request arrives, you will receive a real-time sound & popup alert!
                      </div>
                    </div>
                  )}

                  {/* OTP Entry for Driver */}
                  <div style={{ backgroundColor: '#FAFAFA', borderRadius: '18px', padding: '1.25rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                        Verify Passenger Start OTP
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '700' }}>4-Digit Pass</span>
                    </div>

                    <form onSubmit={handleVerifyOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <input
                        type="text"
                        maxLength="4"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="Enter 4-Digit OTP (4829)"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px',
                          border: '1.5px solid #E6A700',
                          fontSize: '1.15rem',
                          fontWeight: '800',
                          letterSpacing: '3px',
                          textAlign: 'center',
                          outline: 'none',
                          backgroundColor: '#FFFFFF',
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtpSubmit}
                        className="btn btn-primary btn-shine"
                        style={{
                          width: '100%',
                          padding: '0.85rem',
                          fontSize: '0.95rem',
                          fontWeight: '800',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <span>✓ Verify OTP & Start Trip ➔</span>
                      </button>
                    </form>
                    {otpError && <div style={{ fontSize: '0.825rem', color: '#EF4444', marginTop: '0.6rem', fontWeight: '700', textAlign: 'center' }}>{otpError}</div>}
                  </div>

                  {/* Real-time Cross-Tab Live Chat for Driver */}
                  {currentStep === RIDE_STATUS.DRIVER_ACCEPTED && (
                    <LiveRideChat journey={journey} currentRole="driver" />
                  )}

                  {/* Driver Actions - Only shown BEFORE request is accepted */}
                  {currentStep !== RIDE_STATUS.DRIVER_ACCEPTED && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <button onClick={handleDriverAccept} className="btn btn-primary btn-shine" style={{ padding: '0.85rem' }}>
                        Accept Request ➔
                      </button>
                      <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.85rem' }}>
                        Decline
                      </button>
                    </div>
                  )}
                </>
              )}

              {currentStep === RIDE_STATUS.TRIP_STARTED && (
                <div style={{ textAlign: 'center', backgroundColor: '#F0FDF4', padding: '1.25rem', borderRadius: '18px', border: '1.5px solid #22C55E' }}>
                  <div className="badge-pill badge-green" style={{ fontSize: '0.9rem', marginBottom: '0.75rem', padding: '0.5rem 1.25rem' }}>
                    <span className="pulse-indicator" />
                    <span>🟢 TRIP LIVE EN-ROUTE ON HIGHWAY</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '0.75rem' }}>
                    Passenger Boarded & Verified (Rahul S.)
                  </h4>

                  {/* Real-time Uber/Rapido Style Live Google Map GPS View */}
                  <LiveMapTrackingView journey={journey} />

                  <button
                    onClick={() => setCurrentStep(RIDE_STATUS.PAYMENT_PENDING)}
                    className="btn btn-primary btn-shine"
                    style={{ width: '100%', padding: '0.9rem', backgroundColor: '#15803D', borderColor: '#15803D', color: '#FFFFFF' }}
                  >
                    🏁 End Ride & Request Passenger Payment (₹{totalFare}) ➔
                  </button>
                </div>
              )}

              {(currentStep === RIDE_STATUS.TRIP_COMPLETED || currentStep === RIDE_STATUS.PAYMENT_COMPLETED) && (
                <div style={{ textAlign: 'center', backgroundColor: '#FFF4CC', padding: '1.5rem', borderRadius: '18px', border: '1.5px solid #E6A700' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                    Trip Completed & Payment Settled!
                  </h4>
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '1rem', margin: '1rem 0', border: '1px solid #FDE68A', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#374151' }}>
                      <span>Total Fare Collected:</span>
                      <strong>₹{totalFare}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#6B7280' }}>
                      <span>Platform Fee (5%):</span>
                      <span>-₹{platformFee}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', color: '#15803D' }}>
                      <span>Net Driver Payout Credited:</span>
                      <span>₹{driverEarnings}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`💸 ₹${driverEarnings} has been transferred to your connected UPI ID!`);
                      onClose();
                    }}
                    className="btn btn-primary btn-shine"
                    style={{ width: '100%', padding: '0.85rem', marginBottom: '0.5rem' }}
                  >
                    💸 Instant Withdrawal to Bank / UPI (₹{driverEarnings}) ➔
                  </button>

                  <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}>
                    Close & Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. ADMIN VIEW */}
          {activeRole === 'admin' && (
            <div>
              <div style={{ backgroundColor: '#111827', color: '#FFFFFF', borderRadius: '18px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#E6A700', fontWeight: '800' }}>PLATFORM ADMIN AUDIT PANEL</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255, 184, 0, 0.2)', color: '#E6A700', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                    Audit Log #9826
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>Total Fare: <strong style={{ color: '#E6A700' }}>₹{totalFare}</strong></div>
                  <div>Platform Fee (5%): <strong style={{ color: '#E6A700' }}>₹{platformFee}</strong></div>
                  <div>Driver Payout: <strong style={{ color: '#E6A700' }}>₹{driverEarnings}</strong></div>
                </div>
              </div>

              <div style={{ padding: '1rem', backgroundColor: '#FAFAFA', borderRadius: '16px', border: '1px solid #E5E7EB', fontSize: '0.85rem', color: '#4B5563', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: '700', color: '#111827', marginBottom: '0.35rem' }}>Security Checks Passed:</div>
                <div>✔ Aadhaar Govt ID Verified • ✔ License Verified • ✔ Masked Relay Active</div>
              </div>

              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }}>
                Close Admin Panel
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
