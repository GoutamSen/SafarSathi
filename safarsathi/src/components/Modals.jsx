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

import { realtimeSync } from '../services/realtimeSync';

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
        bookingStatus: 'REQUEST_PENDING',
        departureTime: journey.departureTime || 'Today, 08:30 AM',
      };

      // Broadcast real-time seat request across browser tabs
      realtimeSync.broadcast('SEAT_REQUESTED', newBookingPass);

      if (onBookingConfirmed) {
        onBookingConfirmed(newBookingPass);
      }
      onClose();
    }, 600);
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
        
        {/* Modal Header */}
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
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              Confirm Seat Request
            </h3>
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

        {/* Modal Body - Full Height Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.25rem', maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          
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
   2. OFFER RIDE MODAL (Full Screen + GPS + Calendar Picker)
=================================================== */
export function OfferRideModal({ onClose, onPublishJourney }) {
  const [routeFrom, setRouteFrom] = useState('Indore');
  const [routeTo, setRouteTo] = useState('Khargone');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [departureTime, setDepartureTime] = useState('05:30 PM');
  const [vehicleType, setVehicleType] = useState('SUV');
  const [vehicleModel, setVehicleModel] = useState('Hyundai Creta');
  const [availableSeats, setAvailableSeats] = useState(4);
  const [costPerSeat, setCostPerSeat] = useState('180');
  const [tripNote, setTripNote] = useState('AC Available • Premium SUV • Spacious Luggage');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  const handleVehicleTypeChange = (newType) => {
    setVehicleType(newType);
    if (newType === 'Bike') {
      setVehicleModel('Royal Enfield Hunter 350');
      setAvailableSeats(1);
      setCostPerSeat('60');
      setTripNote('Helmet Provided • Quick Ride • No Traffic Delay');
    } else if (newType === 'Car') {
      setVehicleModel('Swift Dzire');
      setAvailableSeats(3);
      setCostPerSeat('160');
      setTripNote('AC Available • Verified Host • Luggage Space');
    } else if (newType === 'SUV') {
      setVehicleModel('Hyundai Creta');
      setAvailableSeats(4);
      setCostPerSeat('180');
      setTripNote('AC Available • Premium SUV • Spacious Luggage');
    }
  };

  const handleUseCurrentLocation = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setIsGpsLoading(false);
      setRouteFrom('Indore (Current GPS Location)');
    }, 400);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    setTimeout(() => {
      setIsPublishing(false);
      const formattedDateStr = new Date(departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const newJourneyObj = {
        id: `published-${Date.now()}`,
        isLive: true,
        isUserPublished: true,
        routeFrom: routeFrom,
        routeTo: routeTo,
        hubName: 'Vijay Nagar Hub',
        currentLocation: `${routeFrom} Vijay Nagar Circle`,
        etaPickup: 'Live Now',
        availableSeats: parseInt(availableSeats) || (vehicleType === 'Bike' ? 1 : 3),
        totalSeats: vehicleType === 'Bike' ? 1 : 4,
        vehicleType: vehicleType,
        vehicleModel: vehicleModel,
        driverName: 'You (Verified Host)',
        driverAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        driverRating: '5.0 ★ New Host',
        driverTrips: 'Verified Host',
        isVerified: true,
        costPerSeat: `₹${costPerSeat}`,
        departureTime: `${formattedDateStr} · ${departureTime}`,
        dateGroup: 'today',
        estimatedTotalTime: vehicleType === 'Bike' ? '1 hr 30 mins' : '1 hr 45 mins',
        lat: 22.7196 + (Math.random() - 0.5) * 0.02,
        lng: 75.8577 + (Math.random() - 0.5) * 0.02,
        status: 'upcoming',
      };

      // Broadcast real-time published ride across browser tabs
      realtimeSync.broadcast('RIDE_PUBLISHED', newJourneyObj);

      if (onPublishJourney) {
        onPublishJourney(newJourneyObj);
      }
      onClose();
    }, 600);
  };

  const totalEarningsPreview = (parseInt(availableSeats) || 1) * (parseInt(costPerSeat) || 0);

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
        
        {/* Header */}
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
            <Car size={20} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              Publish Your Journey Route (Driver Host)
            </h3>
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

        {/* Form Body - Full Height Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.25rem', maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          <form onSubmit={handlePublish}>
            
            {/* Route Inputs (From & To) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151' }}>
                    Departure City (From)
                  </label>
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D97706',
                      fontSize: '0.725rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: 0,
                    }}
                  >
                    🎯 {isGpsLoading ? 'Locating...' : 'Use Current GPS'}
                  </button>
                </div>
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
                  Destination City (To)
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

            {/* Calendar Date Picker & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Departure Date (Calendar Select)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                  <Calendar size={15} style={{ color: '#E6A700' }} />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Departure Time
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
                  <Clock size={15} style={{ color: '#E6A700' }} />
                  <input
                    type="text"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    placeholder="e.g. 05:30 PM"
                    required
                    style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Type & Model (Dynamic logic for Bike vs Car vs SUV) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => handleVehicleTypeChange(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                >
                  <option value="Car">🚗 Car</option>
                  <option value="SUV">🚙 SUV</option>
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
                  placeholder={vehicleType === 'Bike' ? 'e.g. Hunter 350, Pulsar' : 'e.g. Hyundai Creta, Baleno'}
                  required
                  style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', color: '#111827', outline: 'none' }}
                />
              </div>
            </div>

            {/* Seats & Cost Per Seat */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.15rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                  {vehicleType === 'Bike' ? 'Rider Seat (Max 1)' : 'Available Seats'}
                </label>
                <input
                  type="number"
                  min="1"
                  max={vehicleType === 'Bike' ? 1 : 6}
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

            {/* Dynamic Trip Amenities & Driver Note based on Vehicle Type */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.3rem' }}>
                {vehicleType === 'Bike' ? 'Bike Features & Rider Rules' : 'Car Amenities & Driver Note'}
              </label>
              <input
                type="text"
                value={tripNote}
                onChange={(e) => setTripNote(e.target.value)}
                placeholder={vehicleType === 'Bike' ? 'e.g. Helmet Provided • Quick Ride' : 'e.g. AC Available • Luggage Space'}
                style={{ width: '100%', padding: '0.7rem 0.85rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', color: '#111827', outline: 'none' }}
              />
            </div>

            {/* Estimated Total Revenue Preview */}
            <div style={{ padding: '0.85rem 1rem', backgroundColor: '#FFF4CC', borderRadius: '14px', border: '1px solid rgba(230, 167, 0, 0.3)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#B45309' }}>Estimated Total Revenue ({availableSeats} Seats @ ₹{costPerSeat}):</span>
              <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#B45309' }}>₹{totalEarningsPreview}</span>
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
