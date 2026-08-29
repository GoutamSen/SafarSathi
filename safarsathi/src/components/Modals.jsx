import React, { useState } from 'react';
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
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';

/* ===================================================
   1. JOURNEY DETAIL MODAL
=================================================== */
export function JourneyDetailModal({ journey, onClose, onBookingConfirmed }) {
  if (!journey) return null;

  const [requestedSeats, setRequestedSeats] = useState(1);
  const [pickupPoint, setPickupPoint] = useState(journey.currentLocation || 'Indore Bhawarkua Square');
  const [riderPhone, setRiderPhone] = useState('98260 12345');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pricePerSeatNum = parseInt((journey.costPerSeat || '₹160').replace('₹', '')) || 160;
  const totalFare = pricePerSeatNum * requestedSeats;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newBookingPass = {
        id: `cb-${Date.now()}`,
        routeFrom: journey.routeFrom || 'Indore',
        routeTo: journey.routeTo || 'Khargone',
        driverName: journey.driverName || 'Rajesh Sharma',
        driverRating: journey.driverRating || 4.9,
        driverAvatar: journey.driverAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        vehicleType: journey.vehicleType || 'Car',
        vehicleModel: journey.vehicleModel || 'Tata Nexon EV (AC)',
        pickupPoint: pickupPoint,
        totalFare: totalFare,
        requestedSeats: requestedSeats,
        bookingStatus: 'BOOKING_CONFIRMED',
        departureTime: journey.departureTime || 'Today, 08:30 AM',
      };

      if (onBookingConfirmed) {
        onBookingConfirmed(newBookingPass);
      }
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', borderRadius: '24px' }}>
        
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Navigation size={18} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827' }}>
              Confirm Seat Request
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
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

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* Route Summary Box */}
          <div
            style={{
              backgroundColor: '#FFF4CC',
              borderRadius: '16px',
              padding: '1.15rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(230, 167, 0, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '700' }}>
                LIVE EN-ROUTE ROUTE MATCH
              </div>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#FFFFFF', color: '#111827', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                {journey.vehicleType === 'Bike' ? '🏍️ Bike' : '🚗 Car'}
              </span>
            </div>

            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{journey.routeFrom || 'Indore'}</span>
              <span style={{ color: '#E6A700' }}>➔</span>
              <span>{journey.routeTo || 'Khargone'}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#4B5563' }}>
              <span>Driver: <strong>{journey.driverName || 'Rajesh Sharma'}</strong> ★ {journey.driverRating || 4.9}</span>
              <span>Vehicle: <strong>{journey.vehicleModel || 'Tata Nexon EV'}</strong></span>
            </div>
          </div>

          <form onSubmit={handleConfirmBooking}>
            {/* Input: Pickup Location */}
            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>
                Your Preferred Pickup Point / Landmark
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px' }}>
                <MapPin size={16} style={{ color: '#E6A700', flexShrink: 0 }} />
                <input
                  type="text"
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                  placeholder="e.g. Bhawarkua Square, Near Highway Toll"
                  required
                  style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}
                />
              </div>
            </div>

            {/* Input: Mobile Phone */}
            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>
                Mobile Number (For Private Masked Relay)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px' }}>
                <Phone size={16} style={{ color: '#E6A700', flexShrink: 0 }} />
                <input
                  type="text"
                  value={riderPhone}
                  onChange={(e) => setRiderPhone(e.target.value)}
                  required
                  style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}
                />
              </div>
            </div>

            {/* Seat Counter & Total Fare */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>
                  Seats Needed
                </label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.75rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setRequestedSeats(Math.max(1, requestedSeats - 1))}
                    style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#E6A700', cursor: 'pointer', fontWeight: '800', boxShadow: 'var(--shadow-sm)' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827' }}>
                    {requestedSeats} Seat(s)
                  </span>
                  <button
                    type="button"
                    onClick={() => setRequestedSeats(Math.min(journey.availableSeats || 3, requestedSeats + 1))}
                    style={{ width: '28px', height: '28px', borderRadius: '8px', border: 'none', backgroundColor: '#FFFFFF', color: '#E6A700', cursor: 'pointer', fontWeight: '800', boxShadow: 'var(--shadow-sm)' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>
                  Total Expense Share
                </label>
                <div style={{ padding: '0.65rem 1rem', backgroundColor: '#FFF4CC', border: '1px solid rgba(230, 167, 0, 0.3)', borderRadius: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#C98F00' }}>
                    ₹{totalFare}
                  </span>
                </div>
              </div>
            </div>

            {/* Zero-Prepay Guarantee Banner */}
            <div style={{ padding: '0.85rem 1rem', backgroundColor: '#F9FAFB', borderRadius: '14px', border: '1px solid #E5E7EB', fontSize: '0.8rem', color: '#6B7280', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <LockIcon size={16} style={{ color: '#E6A700', flexShrink: 0 }} />
              <span>Zero Prepay Required! Pay directly to driver host after verifying vehicle & pickup OTP.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-shine"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              {isSubmitting ? 'Confirming Seat Request...' : 'Confirm Seat Booking ➔'}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}

/* ===================================================
   2. OFFER RIDE MODAL
=================================================== */
export function OfferRideModal({ onClose, onPublishJourney }) {
  const [routeFrom, setRouteFrom] = useState('Indore');
  const [routeTo, setRouteTo] = useState('Khargone');
  const [availableSeats, setAvailableSeats] = useState(3);
  const [costPerSeat, setCostPerSeat] = useState('160');
  const [vehicleModel, setVehicleModel] = useState('Tata Nexon EV');
  const [vehicleType, setVehicleType] = useState('Car');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    setTimeout(() => {
      setIsPublishing(false);
      const newJourneyObj = {
        id: `published-${Date.now()}`,
        isLive: true,
        isUserPublished: true,
        routeFrom: routeFrom,
        routeTo: routeTo,
        currentLocation: `${routeFrom} Vijay Nagar Circle`,
        etaPickup: 'Live Now',
        availableSeats: parseInt(availableSeats) || 3,
        totalSeats: 4,
        vehicleType: vehicleType,
        vehicleModel: vehicleModel,
        driverName: 'You (Verified Host)',
        driverAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        driverRating: '5.0',
        driverTrips: 'New Host',
        isVerified: true,
        costPerSeat: `₹${costPerSeat}`,
        departureTime: 'Leaving in 10 mins',
        estimatedTotalTime: '1 hr 45 mins',
      };

      if (onPublishJourney) {
        onPublishJourney(newJourneyObj);
      }
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', borderRadius: '24px' }}>
        
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Car size={18} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827' }}>
              Publish Your Journey Route
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
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

        {/* Form Body */}
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handlePublish}>
            
            {/* Route Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Departure City (From)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                  <MapPin size={15} style={{ color: '#E6A700' }} />
                  <input
                    type="text"
                    value={routeFrom}
                    onChange={(e) => setRouteFrom(e.target.value)}
                    required
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Destination (To)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                  <MapPin size={15} style={{ color: '#E6A700' }} />
                  <input
                    type="text"
                    value={routeTo}
                    onChange={(e) => setRouteTo(e.target.value)}
                    required
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Type & Model */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                >
                  <option value="Car">🚗 Car</option>
                  <option value="Bike">🏍️ Bike</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Vehicle Model Name
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Tata Nexon EV, Swift Dzire"
                  required
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                />
              </div>
            </div>

            {/* Seats & Cost Per Seat */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Available Seats
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Price Per Seat (₹)
                </label>
                <input
                  type="number"
                  value={costPerSeat}
                  onChange={(e) => setCostPerSeat(e.target.value)}
                  placeholder="160"
                  required
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPublishing}
              className="btn btn-primary btn-shine"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              {isPublishing ? 'Publishing Route...' : '🚀 Publish Live Route ➔'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

/* ===================================================
   3. JOIN / LOGIN OTP MODAL
=================================================== */
export function JoinModal({ mode = 'join', onClose, onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('98260 12345');
  const [name, setName] = useState('Rahul Sharma');
  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState('4829');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess({ name: name || 'Rahul Sharma', phone: phoneNumber });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px', borderRadius: '24px' }}>
        
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>
              {mode === 'join' ? 'Join Verified Network' : 'Mobile OTP Login'}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
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

        <div style={{ padding: '1.5rem' }}>
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp}>
              {mode === 'join' && (
                <div style={{ marginBottom: '1.15rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                    Full Name (As per Aadhaar)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Mobile Phone Number
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#E6A700' }}>+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-shine"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                Send 4-Digit OTP ➔
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  Enter the 4-digit security code sent to <strong>+91 {phoneNumber}</strong>
                </div>
                <input
                  type="text"
                  maxLength="4"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    width: '180px',
                    textAlign: 'center',
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    letterSpacing: '0.3em',
                    padding: '0.5rem',
                    borderRadius: '12px',
                    border: '2px solid #E6A700',
                    backgroundColor: '#FFF4CC',
                    color: '#111827',
                    outline: 'none',
                    margin: '0 auto',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-shine"
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
              >
                Verify & Continue ➔
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
