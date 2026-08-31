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
  ExternalLink
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';

/* ====================================================================
   LIVE GOOGLE MAP GPS TRACKING SUB-COMPONENT (Uber/Rapido Style)
==================================================================== */
function LiveMapTrackingView({ journey }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fromName = journey?.routeFrom || 'Indore';
  const toName = journey?.routeTo || 'Khargone';

  const startCoords = [22.7196, 75.8577]; // Indore
  const endCoords = [21.8247, 75.6102];   // Khargone
  const currentVehicleCoords = [22.1500, 75.6800]; // Live GPS location en-route

  const startPin = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background:#111827;color:#FFFFFF;padding:4px 8px;border-radius:10px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:1px solid #E6A700;">📍 ${fromName}</div>`,
    iconSize: [80, 30],
    iconAnchor: [40, 15]
  });

  const endPin = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background:#15803D;color:#FFFFFF;padding:4px 8px;border-radius:10px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:1px solid #22C55E;">🏁 ${toName}</div>`,
    iconSize: [90, 30],
    iconAnchor: [45, 15]
  });

  const vehiclePin = L.divIcon({
    className: 'custom-vehicle-pin',
    html: `<div style="background:#E6A700;color:#111827;padding:5px 10px;border-radius:20px;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 6px 16px rgba(230,167,0,0.7);display:flex;align-items:center;gap:4px;border:2px solid #FFFFFF;">🚗 Hyundai Creta (72 km/h)</div>`,
    iconSize: [160, 36],
    iconAnchor: [80, 18]
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
        borderRadius: '18px',
        overflow: 'hidden',
        border: '2px solid #E6A700',
        marginBottom: '1.25rem',
        height: '240px',
      };

  return (
    <div style={containerStyle}>
      <MapContainer
        center={[22.27, 75.73]}
        zoom={isFullScreen ? 10 : 9}
        scrollWheelZoom={true}
        dragging={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <Polyline
          positions={[startCoords, currentVehicleCoords, endCoords]}
          color="#E6A700"
          weight={6}
        />
        <Marker position={startCoords} icon={startPin} />
        <Marker position={currentVehicleCoords} icon={vehiclePin} />
        <Marker position={endCoords} icon={endPin} />
      </MapContainer>

      {/* Floating GPS HUD Overlay */}
      <div style={{
        position: 'absolute',
        top: isFullScreen ? '16px' : '10px',
        left: isFullScreen ? '16px' : '10px',
        right: isFullScreen ? '16px' : '10px',
        zIndex: 1000,
        backgroundColor: 'rgba(17, 24, 39, 0.92)',
        backdropFilter: 'blur(10px)',
        color: '#FFFFFF',
        borderRadius: '14px',
        padding: '0.65rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(230, 167, 0, 0.4)',
        fontSize: '0.825rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: '#E6A700' }}>
          <span className="pulse-indicator" style={{ backgroundColor: '#22C55E' }} />
          <span>LIVE HIGHWAY GPS TRACKING</span>
          {isFullScreen && <span style={{ color: '#9CA3AF', fontWeight: '600' }}>• 18 km to {toName}</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{ fontWeight: '800', color: '#FFFFFF', fontSize: '0.85rem' }}>ETA: 8 mins</span>
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: isFullScreen ? '#E6A700' : 'rgba(255, 255, 255, 0.15)',
              color: isFullScreen ? '#111827' : '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.75rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {isFullScreen ? '🗗 Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
        </div>
      </div>

      {/* Floating Bottom HUD Card for Fullscreen Mode */}
      {isFullScreen && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '16px',
          right: '16px',
          zIndex: 1000,
          backgroundColor: '#111827',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          border: '1.5px solid #E6A700',
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#E6A700', fontWeight: '800', marginBottom: '0.2rem' }}>
              EN-ROUTE LIVE DRIVING DASHBOARD
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
              {fromName} ➔ {toName} (78% Completed)
            </h4>
            <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
              Speed: <strong>72 km/h</strong> • Remaining: <strong>18 km (8 Mins)</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFullScreen(false)}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
          >
            🗗 Back to Controls
          </button>
        </div>
      )}
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

  const [activeRole, setActiveRole] = useState(initialRole);
  const [currentStep, setCurrentStep] = useState(
    initialRole === 'driver' ? RIDE_STATUS.HOST_REQUESTED : RIDE_STATUS.DRIVER_ACCEPTED
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

  const handleDriverAccept = () => {
    setCurrentStep(RIDE_STATUS.DRIVER_ACCEPTED);
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp || enteredOtp === '4829') {
      setOtpError('');
      setCurrentStep(RIDE_STATUS.TRIP_STARTED);
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
  };

  const handleProcessPayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setCurrentStep(RIDE_STATUS.PAYMENT_COMPLETED);

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

        {/* Modal Role Switcher */}
        <div style={{ padding: '1rem 1.5rem', backgroundColor: '#FFF4CC', borderBottom: '1px solid rgba(230, 167, 0, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#C98F00' }}>
            <Sliders size={16} />
            <span>ROLE VIEW:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveRole('passenger')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeRole === 'passenger' ? '#E6A700' : '#FFFFFF',
                color: '#111827',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              👤 Passenger
            </button>

            <button
              onClick={() => setActiveRole('driver')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeRole === 'driver' ? '#E6A700' : '#FFFFFF',
                color: '#111827',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              🚗 Driver Host
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: activeRole === 'admin' ? '#111827' : '#FFFFFF',
                color: activeRole === 'admin' ? '#FFFFFF' : '#111827',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              🛡️ Admin
            </button>
          </div>
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
                <button
                  onClick={() => setCurrentStep(RIDE_STATUS.CHECKLIST_VERIFIED)}
                  className="btn btn-primary btn-shine"
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  Verify Vehicle & Board Ride ➔
                </button>
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
                  <div style={{ backgroundColor: '#FFF4CC', borderRadius: '18px', padding: '1.25rem', border: '1.5px solid #E6A700', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '800' }}>DRIVER HOST CONTROL PANEL</span>
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#FFFFFF', color: '#111827', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                        1 Pending Request
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.25rem' }}>
                      Passenger Seat Request Alert
                    </h4>
                    <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                      Rider <strong>Rahul S.</strong> requested {requestedSeats} seat(s) • Total Fare: <strong style={{ color: '#C98F00' }}>₹{totalFare}</strong>
                    </div>
                  </div>

                  {/* OTP Entry for Driver */}
                  <div style={{ backgroundColor: '#FAFAFA', borderRadius: '18px', padding: '1.25rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                      Verify Passenger Start OTP
                    </h4>
                    <form onSubmit={handleVerifyOtpSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
                      <input
                        type="text"
                        maxLength="4"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="Enter 4-Digit OTP (4829)"
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1rem', fontWeight: '800', outline: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtpSubmit}
                        className="btn btn-primary"
                        style={{ whiteSpace: 'nowrap', padding: '0.75rem 1.15rem' }}
                      >
                        Verify OTP
                      </button>
                    </form>
                    {otpError && <div style={{ fontSize: '0.825rem', color: '#EF4444', marginTop: '0.5rem', fontWeight: '700' }}>{otpError}</div>}
                  </div>

                  {/* Driver Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <button onClick={handleDriverAccept} className="btn btn-primary btn-shine" style={{ padding: '0.85rem' }}>
                      Accept Request ➔
                    </button>
                    <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.85rem' }}>
                      Decline
                    </button>
                  </div>
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
