import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Users,
  Car,
  ShieldCheck,
  Star,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  MessageSquare,
  RefreshCw,
  Award,
  CheckSquare,
  DollarSign,
  AlertTriangle,
  Send,
  UserCheck,
  Eye,
  Sliders
} from 'lucide-react';

export const RIDE_STATUS = {
  REQUEST_PENDING: 'REQUEST_PENDING',
  REQUEST_ACCEPTED: 'REQUEST_ACCEPTED',
  REQUEST_DECLINED: 'REQUEST_DECLINED',
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  PASSENGER_AT_PICKUP: 'PASSENGER_AT_PICKUP',
  DRIVER_VERIFIED: 'DRIVER_VERIFIED',
  OTP_VERIFIED: 'OTP_VERIFIED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_PROCESSING: 'PAYMENT_PROCESSING',
  PAYMENT_SUCCESSFUL: 'PAYMENT_SUCCESSFUL',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  RIDE_IN_PROGRESS: 'RIDE_IN_PROGRESS',
  RIDE_COMPLETED: 'RIDE_COMPLETED',
  ISSUE_REPORTED: 'ISSUE_REPORTED',
  PAYOUT_PROCESSING: 'PAYOUT_PROCESSING',
  PAYOUT_COMPLETED: 'PAYOUT_COMPLETED',
  RATED: 'RATED',
  PASSENGER_CANCELLED: 'PASSENGER_CANCELLED',
  DRIVER_CANCELLED: 'DRIVER_CANCELLED',
};

export default function RideLifecycleModal({
  journey,
  initialRole = 'passenger',
  currentUser,
  onRequireLogin,
  onBookingConfirmed,
  onClose,
  onComplete
}) {
  if (!journey) return null;

  const [platformCommissionPercent, setPlatformCommissionPercent] = useState(5.0);
  const [processingFeeFixed, setProcessingFeeFixed] = useState(10);
  const [issueWindowMinutes, setIssueWindowMinutes] = useState(15);
  const [rewardPointsPerRide, setRewardPointsPerRide] = useState(50);

  const [activeRole, setActiveRole] = useState(initialRole);
  const [passengerAuthed, setPassengerAuthed] = useState(Boolean(currentUser));
  const [isAuthStepOpen, setIsAuthStepOpen] = useState(false);
  const [passengerPhoneInput, setPassengerPhoneInput] = useState('9826012345');
  const [passengerOtpInput, setPassengerOtpInput] = useState('4829');

  const [status, setStatus] = useState(RIDE_STATUS.REQUEST_PENDING);
  const [stepIndex, setStepIndex] = useState(1);

  const [requestedSeats, setRequestedSeats] = useState(1);
  const [pickupPoint, setPickupPoint] = useState(journey.currentLocation || 'Indore Bhawarkua Square');
  const [passengerMessage, setPassengerMessage] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp] = useState('4829');

  const [driverMatched, setDriverMatched] = useState(false);
  const [vehicleMatched, setVehicleMatched] = useState(false);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'driver', text: `Hi! I am heading to ${journey.routeTo}. Pickup at ${pickupPoint} is good.` },
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');

  const [reportedIssueCategory, setReportedIssueCategory] = useState('');
  const [issueText, setIssueText] = useState('');
  const [isIssueSubmitted, setIsIssueSubmitted] = useState(false);

  const [passengerRating, setPassengerRating] = useState(5);
  const [passengerReviewText, setPassengerReviewText] = useState('');

  const perSeatFare = parseInt(journey.costPerSeat.replace('₹', '')) || 160;
  const totalFare = perSeatFare * requestedSeats;
  const platformFee = Math.round((totalFare * platformCommissionPercent) / 100);
  const netPayout = Math.max(0, totalFare - platformFee - processingFeeFixed);

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!currentUser && !passengerAuthed) {
      setIsAuthStepOpen(true);
      return;
    }
    setStatus(RIDE_STATUS.REQUEST_PENDING);
    setStepIndex(3);
  };

  const handleVerifyPassengerOtp = (e) => {
    e.preventDefault();
    setPassengerAuthed(true);
    setIsAuthStepOpen(false);
    setStatus(RIDE_STATUS.REQUEST_PENDING);
    setStepIndex(3);
  };

  const handleDriverAccept = () => {
    setStatus(RIDE_STATUS.BOOKING_CONFIRMED);
    setStepIndex(4);
    if (onBookingConfirmed) {
      onBookingConfirmed({
        ...journey,
        requestedSeats,
        pickupPoint,
        passengerMessage,
        totalFare,
        bookingStatus: 'BOOKING_CONFIRMED',
      });
    }
  };

  const handleDriverDecline = () => {
    setStatus(RIDE_STATUS.REQUEST_DECLINED);
  };

  const handleArrivalAtPickup = () => {
    setStatus(RIDE_STATUS.PASSENGER_AT_PICKUP);
    setStepIndex(5);
  };

  const handleVerifyChecklistComplete = () => {
    if (driverMatched && vehicleMatched) {
      setStatus(RIDE_STATUS.DRIVER_VERIFIED);
      setStepIndex(7);
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      setStatus(RIDE_STATUS.OTP_VERIFIED);
      setStepIndex(8);
      setStatus(RIDE_STATUS.PAYMENT_PENDING);
    }
  };

  const handleSimulatePayment = (willSucceed = true) => {
    setStatus(RIDE_STATUS.PAYMENT_PROCESSING);
    setTimeout(() => {
      if (willSucceed) {
        setStatus(RIDE_STATUS.PAYMENT_SUCCESSFUL);
      } else {
        setStatus(RIDE_STATUS.PAYMENT_FAILED);
      }
    }, 1200);
  };

  const handleStartRide = () => {
    setStatus(RIDE_STATUS.RIDE_IN_PROGRESS);
    setStepIndex(9);
  };

  const handleCompleteRide = () => {
    setStatus(RIDE_STATUS.RIDE_COMPLETED);
    setStepIndex(10);
  };

  const handleProceedToPayout = () => {
    setStatus(RIDE_STATUS.PAYOUT_PROCESSING);
    setStepIndex(12);
    setTimeout(() => {
      setStatus(RIDE_STATUS.PAYOUT_COMPLETED);
    }, 1200);
  };

  const handleReportIssue = (e) => {
    e.preventDefault();
    setStatus(RIDE_STATUS.ISSUE_REPORTED);
    setIsIssueSubmitted(true);
  };

  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setStatus(RIDE_STATUS.RATED);
    setIsReviewSubmitted(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    setChatMessages(prev => [...prev, { sender: activeRole, text: newChatMessage }]);
    setNewChatMessage('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content noise-bg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#E6A700',
            color: '#111827',
            borderTopLeftRadius: 'var(--radius-xl)',
            borderTopRightRadius: 'var(--radius-xl)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="badge-pill" style={{ backgroundColor: 'rgba(17, 24, 39, 0.15)', color: '#111827', fontSize: '0.75rem' }}>
                <span className="pulse-indicator" style={{ backgroundColor: '#111827' }} />
                <span>RIDE LIFECYCLE ENGINE</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#111827', fontWeight: '600' }}>STATUS: <strong>{status}</strong></span>
            </div>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(17, 24, 39, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: '#111827',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>

          {/* ADMIN CONTROL PANEL */}
          {activeRole === 'admin' && (
            <div style={{ padding: '0.25rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>
                    🛡️ Platform Admin Dashboard
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Configure platform rules & commission rates</span>
                </div>
                <div className="badge-pill badge-green" style={{ fontSize: '0.775rem' }}>
                  <span>SYSTEM OPERATIONAL</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#FFF4CC', borderRadius: '16px', border: '1px solid rgba(230, 167, 0, 0.25)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', display: 'block' }}>GROSS VOLUME</span>
                  <strong style={{ fontSize: '1.35rem', color: '#C98F00' }}>₹{totalFare}</strong>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#FFF4CC', borderRadius: '16px', border: '1px solid rgba(230, 167, 0, 0.25)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', display: 'block' }}>COMMISSION ({platformCommissionPercent}%)</span>
                  <strong style={{ fontSize: '1.35rem', color: '#C98F00' }}>₹{platformFee}</strong>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#FFF4CC', borderRadius: '16px', border: '1px solid rgba(230, 167, 0, 0.25)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', display: 'block' }}>DRIVER PAYOUT</span>
                  <strong style={{ fontSize: '1.35rem', color: '#111827' }}>₹{netPayout}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveRole('passenger')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Switch Back to Ride Flow
              </button>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {activeRole !== 'admin' && stepIndex === 1 && (
            <div>
              <div
                style={{
                  backgroundColor: '#FFF4CC',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  color: '#111827',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(230, 167, 0, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600' }}>ROUTE MATCH ENGINE</span>
                  <span style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '700' }}>94% Overlap Match</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span>{journey.routeFrom}</span>
                  <span style={{ color: '#E6A700' }}>➔</span>
                  <span>{journey.routeTo}</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111827' }}>
                    <Navigation size={16} style={{ color: '#E6A700' }} />
                    <span>Pickup: <strong>{journey.currentLocation}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111827' }}>
                    <Clock size={16} style={{ color: '#C98F00' }} />
                    <span>Departure: <strong>{journey.departureTime || 'Today'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Driver & Vehicle Profile */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '0.5rem' }}>DRIVER PROFILE</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={journey.driverAvatar} alt={journey.driverName} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#111827' }}>
                        {journey.driverName}
                        <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Star size={13} fill="#C98F00" /> {journey.driverRating} • {journey.driverTrips}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '0.5rem' }}>VEHICLE SPECIFICATION</span>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>
                    {journey.vehicleType === 'Bike' ? '🏍️ Bike' : '🚗 Car'} • {journey.vehicleModel}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.2rem' }}>
                    Vehicle Plate: <strong>MP-09-AB-4829</strong> (Verified)
                  </div>
                </div>
              </div>

              {/* Fare & Seat Info */}
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#FAFAFA',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block' }}>AVAILABLE SEATS</span>
                  <strong style={{ fontSize: '1.1rem', color: '#111827' }}>{journey.availableSeats} Seats Left</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block' }}>COST / SEAT</span>
                  <strong style={{ fontSize: '1.4rem', color: '#C98F00' }}>{journey.costPerSeat}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStepIndex(2)}
                className="btn btn-primary btn-shine"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}
              >
                Request a Seat <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: REQUEST FORM */}
          {stepIndex === 2 && (
            <div>
              {isAuthStepOpen ? (
                <div style={{ padding: '0.5rem 0' }}>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                      <UserCheck size={28} />
                    </div>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Passenger Verification</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                      Verify mobile number before sending request to driver <strong>{journey.driverName}</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyPassengerOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Mobile Phone Number</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ padding: '0.75rem', backgroundColor: '#FAFAFA', border: '1px solid #E5E7EB', borderRadius: '12px', fontWeight: '700', color: '#111827' }}>+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={passengerPhoneInput}
                          onChange={(e) => setPassengerPhoneInput(e.target.value)}
                          placeholder="98260 12345"
                          style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '0.95rem', fontWeight: '600', color: '#111827' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>SMS Verification Code</label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        value={passengerOtpInput}
                        onChange={(e) => setPassengerOtpInput(e.target.value)}
                        placeholder="4829"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '1.25rem', textAlign: 'center', letterSpacing: '0.2em', fontWeight: '800', color: '#111827' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                      <button type="button" onClick={() => setIsAuthStepOpen(false)} className="btn btn-secondary">
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary btn-shine">
                        Verify OTP & Send Request ➔
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.35rem', color: '#111827' }}>
                    Submit Seat Request
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1.25rem' }}>
                    Select seats and pickup point for <strong>{journey.routeFrom} ➔ {journey.routeTo}</strong>.
                  </p>

                  <form onSubmit={handleSendRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Number of Seats</label>
                      <select
                        value={requestedSeats}
                        onChange={(e) => setRequestedSeats(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7EB',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          backgroundColor: '#FFFFFF',
                          color: '#111827',
                        }}
                      >
                        {[...Array(journey.availableSeats)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Seat ({perSeatFare * (i + 1)} total)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Pickup Landmark / Point</label>
                      <input
                        type="text"
                        required
                        value={pickupPoint}
                        onChange={(e) => setPickupPoint(e.target.value)}
                        placeholder="e.g. Bhawarkua Square / Pithampur Toll"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7EB',
                          fontSize: '0.95rem',
                          color: '#111827',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Optional Note for Driver</label>
                      <input
                        type="text"
                        value={passengerMessage}
                        onChange={(e) => setPassengerMessage(e.target.value)}
                        placeholder="e.g. Carrying 1 small bag"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7EB',
                          fontSize: '0.95rem',
                          color: '#111827',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        padding: '1rem',
                        backgroundColor: '#FAFAFA',
                        borderRadius: '16px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem', color: '#6B7280' }}>
                        <span>Seats ({requestedSeats}x ₹{perSeatFare})</span>
                        <strong>₹{totalFare}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', color: '#C98F00', paddingTop: '0.5rem', borderTop: '1px solid #E5E7EB' }}>
                        <span>Estimated Fare Contribution</span>
                        <span>₹{totalFare}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
                      <button type="button" onClick={() => setStepIndex(1)} className="btn btn-secondary">
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary btn-shine">
                        Send Seat Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: REQUEST PENDING */}
          {stepIndex === 3 && (
            <div>
              {status === RIDE_STATUS.REQUEST_DECLINED ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <AlertCircle size={48} style={{ color: '#EF4444', margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>Request Not Accepted</h4>
                  <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                    Your seat request was not accepted by the host. You can browse other matching routes.
                  </p>
                  <button type="button" onClick={() => setStepIndex(1)} className="btn btn-primary">
                    Find Other Rides
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#FFF4CC',
                        color: '#E6A700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem auto',
                      }}
                    >
                      <Clock size={32} />
                    </div>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Seat Request Sent</h4>
                    <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Status: <strong>Waiting for Driver Response</strong></span>
                  </div>

                  <div style={{ padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '16px', backgroundColor: '#FFFFFF', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#6B7280' }}>Route:</span>
                      <strong style={{ color: '#111827' }}>{journey.routeFrom} ➔ {journey.routeTo}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#6B7280' }}>Requested Seats:</span>
                      <strong style={{ color: '#111827' }}>{requestedSeats} Seat(s)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: '#6B7280' }}>Pickup Location:</span>
                      <strong style={{ color: '#111827' }}>{pickupPoint}</strong>
                    </div>
                  </div>

                  {activeRole === 'driver' ? (
                    <div
                      style={{
                        padding: '1.25rem',
                        backgroundColor: '#FFF4CC',
                        border: '1px solid rgba(230, 167, 0, 0.3)',
                        borderRadius: '20px',
                        color: '#111827',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#C98F00' }}>
                          🔔 INCOMING SEAT REQUEST ALERT
                        </span>
                      </div>

                      <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1rem' }}>
                        Passenger <strong>Rahul (Verified Rider)</strong> wants to join your journey from <strong>{journey.routeFrom} → {journey.routeTo}</strong>.
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <button type="button" onClick={handleDriverDecline} className="btn btn-secondary" style={{ backgroundColor: '#FEE2E2', color: '#991B1B', border: 'none' }}>
                          Decline Request
                        </button>
                        <button type="button" onClick={handleDriverAccept} className="btn btn-primary btn-shine">
                          Accept Request ➔
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button type="button" onClick={() => { setStatus(RIDE_STATUS.PASSENGER_CANCELLED); setStepIndex(1); }} className="btn btn-secondary" style={{ width: '100%' }}>
                        Cancel Seat Request
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: BOOKING CONFIRMED */}
          {stepIndex === 4 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Booking Confirmed!</h4>
                <span style={{ fontSize: '0.85rem', color: '#C98F00', fontWeight: '700' }}>Payment Due After Pickup Verification</span>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#FFF4CC', borderRadius: '20px', color: '#111827', marginBottom: '1.25rem', border: '1px solid rgba(230, 167, 0, 0.3)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#C98F00', marginBottom: '0.75rem' }}>
                  {journey.routeFrom} ➔ {journey.routeTo}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div><span style={{ color: '#6B7280' }}>DRIVER:</span> <strong>{journey.driverName}</strong></div>
                  <div><span style={{ color: '#6B7280' }}>VEHICLE:</span> <strong>{journey.vehicleModel}</strong></div>
                  <div><span style={{ color: '#6B7280' }}>PICKUP POINT:</span> <strong>{pickupPoint}</strong></div>
                  <div><span style={{ color: '#6B7280' }}>FARE DUE:</span> <strong style={{ color: '#C98F00' }}>₹{totalFare}</strong></div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleArrivalAtPickup}
                className="btn btn-primary btn-shine"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                📍 I'm at the Pickup Point
              </button>
            </div>
          )}

          {/* STEP 5: PICKUP COORDINATION */}
          {stepIndex === 5 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                  <MapPin size={32} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Passenger at Pickup Location</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Meet driver at <strong>{pickupPoint}</strong> and verify before onboarding.</p>
              </div>

              <button
                type="button"
                onClick={() => setStepIndex(6)}
                className="btn btn-primary btn-shine"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                Verify Driver & Vehicle Checklist ➔
              </button>
            </div>
          )}

          {/* STEP 6: VERIFICATION CHECKLIST */}
          {stepIndex === 6 && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.25rem', color: '#111827' }}>Verify Your Ride</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Confirm driver and vehicle identity checklist before OTP verification.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: driverMatched ? '2px solid #E6A700' : '1px solid #E5E7EB',
                  backgroundColor: driverMatched ? '#FFF4CC' : '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#111827',
                }}>
                  <input
                    type="checkbox"
                    checked={driverMatched}
                    onChange={(e) => setDriverMatched(e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>✓ Driver identity matches profile photo: <strong>{journey.driverName}</strong></span>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: '16px',
                  border: vehicleMatched ? '2px solid #E6A700' : '1px solid #E5E7EB',
                  backgroundColor: vehicleMatched ? '#FFF4CC' : '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#111827',
                }}>
                  <input
                    type="checkbox"
                    checked={vehicleMatched}
                    onChange={(e) => setVehicleMatched(e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>✓ Vehicle model & license plate match booking: <strong>{journey.vehicleModel}</strong></span>
                </label>
              </div>

              <button
                type="button"
                disabled={!driverMatched || !vehicleMatched}
                onClick={handleVerifyChecklistComplete}
                className="btn btn-primary btn-shine"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  opacity: (!driverMatched || !vehicleMatched) ? 0.5 : 1,
                  cursor: (!driverMatched || !vehicleMatched) ? 'not-allowed' : 'pointer'
                }}
              >
                Verification Complete ➔ Continue to Ride Start OTP
              </button>
            </div>
          )}

          {/* STEP 7: RIDE START OTP */}
          {stepIndex === 7 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                  <ShieldCheck size={32} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Ride Start Verification OTP</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Passenger shares OTP with driver before payment & ride start.</p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#FFF4CC', borderRadius: '20px', textAlign: 'center', color: '#111827', marginBottom: '1.5rem', border: '1px solid rgba(230, 167, 0, 0.3)' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280', display: 'block', marginBottom: '0.35rem' }}>PASSENGER RIDE START OTP</span>
                <strong style={{ fontSize: '2.5rem', letterSpacing: '0.25em', color: '#C98F00', fontFamily: 'monospace' }}>{generatedOtp}</strong>
              </div>

              <form onSubmit={handleOtpVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Driver Entry: Enter Passenger OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter 4-digit OTP (4829)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    letterSpacing: '0.2em',
                    fontWeight: '700',
                    color: '#111827',
                  }}
                />

                <button type="submit" className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.9rem' }}>
                  Verify OTP & Proceed to Payment
                </button>
              </form>
            </div>
          )}

          {/* STEP 8: PAYMENT FLOW */}
          {stepIndex === 8 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.25rem', color: '#111827' }}>Ready to Start Your Journey</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>OTP verified! Complete payment through SafarSaathi to start ride.</p>
              </div>

              {status === RIDE_STATUS.PAYMENT_SUCCESSFUL ? (
                <div style={{ padding: '1rem', backgroundColor: '#FFF4CC', border: '1px solid rgba(230, 167, 0, 0.3)', borderRadius: '16px', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <CheckCircle2 size={36} style={{ color: '#C98F00', margin: '0 auto 0.5rem auto' }} />
                  <strong style={{ color: '#C98F00', display: 'block', fontSize: '1.2rem' }}>Payment Successful!</strong>
                  <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Payment of ₹{totalFare} successfully processed.</span>
                  <button type="button" onClick={handleStartRide} className="btn btn-primary btn-shine" style={{ marginTop: '1rem', width: '100%', padding: '0.9rem' }}>
                    Driver: Start Ride (RIDE_IN_PROGRESS)
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ padding: '1.25rem', backgroundColor: '#FFF4CC', borderRadius: '20px', color: '#111827', marginBottom: '1.25rem', border: '1px solid rgba(230, 167, 0, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#6B7280' }}>
                      <span>Journey:</span>
                      <strong>{journey.routeFrom} ➔ {journey.routeTo}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: '#C98F00', paddingTop: '0.75rem', borderTop: '1px solid rgba(230, 167, 0, 0.2)' }}>
                      <span>Total Ride Fare</span>
                      <span>₹{totalFare}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                    <button type="button" onClick={() => handleSimulatePayment(true)} className="btn btn-primary btn-shine" style={{ padding: '0.9rem' }}>
                      Pay ₹{totalFare} & Start Ride
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 9: RIDE IN PROGRESS */}
          {stepIndex === 9 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div className="badge-pill badge-green" style={{ display: 'inline-flex', marginBottom: '0.5rem' }}>
                  <span className="pulse-indicator" />
                  <span>RIDE IN PROGRESS</span>
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>{journey.routeFrom} ➔ {journey.routeTo}</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Estimated travel time: {journey.estimatedTotalTime || '45 mins'}</p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#FFF4CC', borderRadius: '20px', color: '#111827', marginBottom: '1.25rem', border: '1px solid rgba(230, 167, 0, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  <span>{journey.routeFrom}</span>
                  <span style={{ color: '#C98F00', fontWeight: '700' }}>On Highway (75% En Route)</span>
                  <span>{journey.routeTo}</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#FFFFFF', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '75%', height: '100%', backgroundColor: '#E6A700', borderRadius: '4px' }} />
                </div>
              </div>

              <button type="button" onClick={handleCompleteRide} className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.9rem' }}>
                Complete Ride ➔
              </button>
            </div>
          )}

          {/* STEP 10: RIDE COMPLETED */}
          {stepIndex === 10 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={48} style={{ color: '#E6A700', margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>Ride Completed!</h4>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Destination reached safely.</p>
              </div>

              <button type="button" onClick={handleProceedToPayout} className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.9rem' }}>
                Proceed to Driver Payout ➔
              </button>
            </div>
          )}

          {/* STEP 12: DRIVER PAYOUT */}
          {stepIndex === 12 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem auto' }}>
                  <DollarSign size={28} />
                </div>
                <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Transparent Driver Payout</h4>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#FFF4CC', borderRadius: '20px', color: '#111827', marginBottom: '1.25rem', border: '1px solid rgba(230, 167, 0, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.6rem', color: '#6B7280' }}>
                  <span>Gross Ride Fare</span>
                  <strong style={{ color: '#111827' }}>₹{totalFare}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.6rem', color: '#6B7280' }}>
                  <span>Platform Fee ({platformCommissionPercent}%)</span>
                  <span>- ₹{platformFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '800', color: '#C98F00', paddingTop: '0.85rem', borderTop: '1px solid rgba(230, 167, 0, 0.3)' }}>
                  <span>Driver Net Payout</span>
                  <span>₹{netPayout}</span>
                </div>
              </div>

              <button type="button" onClick={() => setStepIndex(13)} className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.9rem' }}>
                Rate Trip ➔
              </button>
            </div>
          )}

          {/* STEP 13 & 14: RATINGS & REVIEWS */}
          {(stepIndex === 13 || stepIndex === 14) && (
            <div>
              {isReviewSubmitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>
                    Review Submitted Successfully! 🎉
                  </h4>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                    Thank you! Your rating for driver <strong>{journey.driverName}</strong> has been recorded.
                  </p>
                  <button type="button" onClick={onClose} className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                    Done & Close
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>Rate Your Experience</h4>
                  </div>

                  <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.35rem', color: '#111827' }}>
                        Rating for Driver ({journey.driverName})
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setPassengerRating(star)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <Star size={24} fill={star <= passengerRating ? "#C98F00" : "none"} color="#C98F00" />
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Write a review for host..."
                        value={passengerReviewText}
                        onChange={(e) => setPassengerReviewText(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '0.9rem', color: '#111827' }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.9rem' }}>
                      Submit Review & Finish
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
