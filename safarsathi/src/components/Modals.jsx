import React, { useState } from 'react';
import { X, MapPin, Clock, Users, Car, ShieldCheck, Star, Navigation, CheckCircle2, DollarSign, Calendar, ArrowRight } from 'lucide-react';

export function JourneyDetailModal({ journey, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [requestSent, setRequestSent] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [paymentOption, setPaymentOption] = useState('boarding');

  if (!journey) return null;

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
  };

  const perSeatPriceNumber = parseInt(journey.costPerSeat.replace('₹', '')) || 160;
  const totalPrice = perSeatPriceNumber * selectedSeats;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        
        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF4CC',
          }}
        >
          <div>
            <div className="badge-pill badge-green" style={{ fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              <span className="pulse-indicator" />
              <span>{isAccepted ? "🎉 CONFIRMED BOOKING PASS" : "LIVE JOURNEY DETAILS"}</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>
              {journey.routeFrom} ➔ {journey.routeTo}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111827',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          {isAccepted ? (
            <div style={{ padding: '0.5rem 0' }}>
              {/* Ticket Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  color: '#111827',
                  marginBottom: '1.5rem',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge-pill" style={{ backgroundColor: 'rgba(17, 24, 39, 0.15)', color: '#111827', fontSize: '0.8rem' }}>
                    ✅ RIDE ACCEPTED & CONFIRMED
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: '700' }}>Seat Locked (1 Seat)</span>
                </div>

                <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>
                  {journey.routeFrom} ➔ {journey.routeTo}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(17, 24, 39, 0.15)', fontSize: '0.875rem' }}>
                  <div>
                    <span style={{ color: '#4B5563', display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>DRIVER NAME</span>
                    <strong>{journey.driverName}</strong> (Govt ID Verified)
                  </div>
                  <div>
                    <span style={{ color: '#4B5563', display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>VEHICLE DETAILS</span>
                    <strong>{journey.vehicleType === 'Bike' ? '🏍️ ' : '🚗 '}{journey.vehicleModel}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#4B5563', display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>PICKUP POINT</span>
                    <strong>{journey.currentLocation}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#4B5563', display: 'block', fontSize: '0.75rem', fontWeight: '700' }}>TRIP START OTP</span>
                    <strong style={{ color: '#111827', fontSize: '1.2rem', letterSpacing: '0.05em' }}>4829</strong>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div
                style={{
                  backgroundColor: '#FFF4CC',
                  border: '1px solid rgba(230, 167, 0, 0.3)',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem',
                  color: '#111827',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div>💬 <strong>Next Step:</strong> Host {journey.driverName} will arrive at {journey.currentLocation}. Show OTP <strong>4829</strong> before boarding!</div>
                <div style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '700' }}>
                  🛡️ SafarSaathi Guarantee: ₹1,00,000 Trip Insurance Active.
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <button
                  onClick={() => alert(`🔒 Connecting via SafarSaathi Masked Call Relay... Calling ${journey.driverName}...`)}
                  className="btn btn-primary btn-shine"
                  style={{ height: '48px', fontSize: '0.9rem' }}
                >
                  📞 Masked Call (Private)
                </button>
                <button onClick={onClose} className="btn btn-secondary" style={{ height: '48px' }}>
                  Close Ticket
                </button>
              </div>
            </div>
          ) : requestSent ? (
            <div style={{ padding: '0.5rem 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4CC',
                    color: '#E6A700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '0.35rem', color: '#111827' }}>
                  Seat Share Request Sent!
                </h4>
                <p style={{ color: '#6B7280', fontSize: '0.925rem', maxWidth: '440px', margin: '0 auto' }}>
                  Request sent to <strong>{journey.driverName}</strong> for <strong>{journey.routeFrom} ➔ {journey.routeTo}</strong>.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' }}>
                <button
                  onClick={() => setIsAccepted(true)}
                  className="btn btn-primary btn-shine"
                  style={{ height: '48px' }}
                >
                  ⚡ View Confirmed Booking Pass (Demo)
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Route Map Preview snippet */}
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  color: '#111827',
                  marginBottom: '1.5rem',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600' }}>ROUTE MAP SUMMARY</span>
                  <span style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '700' }}>94% Route Match</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <Navigation size={18} style={{ color: '#E6A700' }} />
                  <span>Current Position: <strong>{journey.currentLocation}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <Clock size={18} style={{ color: '#C98F00' }} />
                  <span>Pickup ETA: <strong>{journey.etaPickup}</strong></span>
                </div>
              </div>

              {/* Driver info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  border: '1px solid #E5E7EB',
                  borderRadius: '16px',
                  marginBottom: '1.5rem',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={journey.driverAvatar}
                    alt={journey.driverName}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {journey.driverName}
                      <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      Vehicle: <strong>{journey.vehicleModel}</strong> ({journey.vehicleType})
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.9rem', fontWeight: '700', color: '#C98F00' }}>
                    <Star size={14} fill="#C98F00" />
                    <span>{journey.driverRating}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    {journey.driverTrips}
                  </div>
                </div>
              </div>

              {/* Seat Selector & Price Calculation */}
              <form onSubmit={handleRequestSubmit}>
                <div
                  style={{
                    padding: '1.25rem',
                    backgroundColor: '#FAFAFA',
                    borderRadius: '16px',
                    marginBottom: '1.5rem',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                      Select Number of Seats
                    </label>
                    <select
                      value={selectedSeats}
                      onChange={(e) => setSelectedSeats(Number(e.target.value))}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        backgroundColor: '#FFFFFF',
                        color: '#111827',
                      }}
                    >
                      {[...Array(journey.availableSeats)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Seat ({journey.costPerSeat} each)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Mode */}
                  <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #E5E7EB' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
                      Choose Payment Method
                    </label>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '12px',
                          border: paymentOption === 'boarding' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                          backgroundColor: paymentOption === 'boarding' ? '#FFF4CC' : '#FFFFFF',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          value="boarding"
                          checked={paymentOption === 'boarding'}
                          onChange={() => setPaymentOption('boarding')}
                        />
                        <span>🤝 Pay on Boarding / Pickup (Cash / UPI to Driver)</span>
                      </label>

                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '12px',
                          border: paymentOption === 'escrow' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                          backgroundColor: paymentOption === 'escrow' ? '#FFF4CC' : '#FFFFFF',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          color: '#111827',
                        }}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          value="escrow"
                          checked={paymentOption === 'escrow'}
                          onChange={() => setPaymentOption('escrow')}
                        />
                        <span>💳 In-App Online Pay (100% Refundable Protection)</span>
                      </label>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      marginTop: '1rem',
                      borderTop: '1px solid #E5E7EB',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#6B7280' }}>
                      Total Shared Contribution
                    </span>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#C98F00' }}>
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem' }}
                >
                  Request Seat Share ({paymentOption === 'boarding' ? 'Pay ₹' + totalPrice + ' on Boarding' : 'Pay ₹' + totalPrice + ' Online'})
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export function OfferRideModal({ onClose, onPublishJourney }) {
  const [submitted, setSubmitted] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journeyDate, setJourneyDate] = useState('2026-08-28');
  const [journeyTime, setJourneyTime] = useState('08:30');
  const [vehicleType, setVehicleType] = useState('Car');
  const [vehicleModel, setVehicleModel] = useState('');
  const [seats, setSeats] = useState(2);
  const [fare, setFare] = useState(150);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isBike = vehicleType === 'Bike';
    const defaultModel = isBike ? 'Royal Enfield / Scooter' : 'Registered Sedan / SUV';
    const newJourney = {
      id: `user-j-${Date.now()}`,
      isLive: true,
      isUserPublished: true,
      routeFrom: from || 'Indore',
      routeTo: to || 'Khargone',
      currentLocation: `${from || 'Indore'} Pickup Point`,
      etaPickup: `Scheduled (${journeyDate} at ${journeyTime})`,
      availableSeats: seats || 1,
      totalSeats: isBike ? 1 : 4,
      vehicleType: vehicleType,
      vehicleModel: vehicleModel || defaultModel,
      driverName: 'You (Host)',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      driverRating: '5.0',
      driverTrips: 'Verified Host',
      isVerified: true,
      costPerSeat: `₹${fare || (isBike ? 70 : 150)}`,
      departureTime: `📅 ${journeyDate} (${journeyTime})`,
      estimatedTotalTime: 'Scheduled',
      amenities: isBike ? ['Helmet Provided', 'Quick Ride'] : ['AC', 'Verified Host', 'Luggage Space'],
    };

    if (onPublishJourney) {
      onPublishJourney(newJourney);
    }
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF4CC',
          }}
        >
          <div>
            <div className="badge-pill badge-green" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <span>DRIVER & RIDER PORTAL</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#111827' }}>
              Offer a Journey & Share Expenses
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111827',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF4CC',
                  color: '#E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>
                Journey Published Successfully!
              </h4>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Your <strong>{vehicleType === 'Bike' ? '🏍️ Bike' : '🚗 Car'}</strong> journey from <strong>{from || 'Indore'}</strong> to <strong>{to || 'Khargone'}</strong> is now live on SafarSaathi.
              </p>
              <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>
                  Select Vehicle Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => { setVehicleType('Car'); setSeats(2); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: vehicleType === 'Car' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                      backgroundColor: vehicleType === 'Car' ? '#FFF4CC' : '#FFFFFF',
                      color: '#111827',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    🚗 Car
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVehicleType('Bike'); setSeats(1); setFare(60); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: vehicleType === 'Bike' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                      backgroundColor: vehicleType === 'Bike' ? '#FFF4CC' : '#FFFFFF',
                      color: '#111827',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    🏍️ Bike / Scooter
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Vehicle Model & Name</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder={vehicleType === 'Bike' ? 'e.g. Royal Enfield Hunter 350 / Activa 6G' : 'e.g. Tata Nexon EV / Honda City'}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>From (Start Location)</label>
                  <input
                    type="text"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="e.g. Indore, MP"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>To (Destination Location)</label>
                  <input
                    type="text"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="e.g. Khargone, MP"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Journey Date</label>
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Departure Time</label>
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(e) => setJourneyTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Available Seats</label>
                  <select
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value={1}>1 Seat</option>
                    {vehicleType === 'Car' && <option value={2}>2 Seats</option>}
                    {vehicleType === 'Car' && <option value={3}>3 Seats</option>}
                    {vehicleType === 'Car' && <option value={4}>4 Seats</option>}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>Cost / Seat (₹)</label>
                  <input
                    type="number"
                    value={fare}
                    onChange={(e) => setFare(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
                Publish {vehicleType === 'Bike' ? 'Bike' : 'Car'} Journey
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function JoinModal({ onClose, onSuccess, mode = 'join' }) {
  const [authStep, setAuthStep] = useState(1);
  const [phone, setPhone] = useState('9826012345');
  const [otp, setOtp] = useState('4829');
  const [userRole, setUserRole] = useState('passenger');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setAuthStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setAuthStep(3);
  };

  const handleContinueSuccess = () => {
    if (onSuccess) {
      const userName = userRole === 'driver' ? 'Rajesh (Driver Host)' : 'Rahul (Passenger)';
      onSuccess({ name: userName, phone: phone || '9826012345', role: userRole });
    } else {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF4CC',
          }}
        >
          <div>
            <div className="badge-pill badge-green" style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>
              <span>SECURE AUTHENTICATION</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>
              {mode === 'login' ? 'Login to SafarSaathi' : 'Create SafarSaathi Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {authStep === 3 ? (
            <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
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
                  margin: '0 auto 1rem auto',
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>Identity Verified!</h4>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.35rem', marginBottom: '1.25rem' }}>
                Phone number <strong>+91 {phone}</strong> successfully verified with Govt ID & Rating Trust Badges.
              </p>
              <button onClick={handleContinueSuccess} className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.85rem' }}>
                Continue to Offer / Book Ride ➔
              </button>
            </div>
          ) : authStep === 2 ? (
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Enter 4-Digit SMS Code sent to</span>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: '#111827' }}>+91 {phone}</strong>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={4}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4829"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    letterSpacing: '0.3em',
                    fontWeight: '800',
                    color: '#111827',
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.85rem' }}>
                Verify & Continue
              </button>
              <button type="button" onClick={() => setAuthStep(1)} className="btn btn-secondary" style={{ width: '100%' }}>
                Change Phone Number
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>
                  I want to use SafarSaathi primarily as:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => { setUserRole('passenger'); setPhone('9826011111'); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: userRole === 'passenger' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                      backgroundColor: userRole === 'passenger' ? '#FFF4CC' : '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      color: '#111827',
                      cursor: 'pointer',
                    }}
                  >
                    👤 Passenger (9826011111)
                  </button>

                  <button
                    type="button"
                    onClick={() => { setUserRole('driver'); setPhone('9826099999'); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: userRole === 'driver' ? '2px solid #E6A700' : '1px solid #E5E7EB',
                      backgroundColor: userRole === 'driver' ? '#FFF4CC' : '#FFFFFF',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      color: '#111827',
                      cursor: 'pointer',
                    }}
                  >
                    🚗 Driver (9826099999)
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem', color: '#111827' }}>
                  Mobile Phone Number
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ padding: '0.75rem 0.85rem', backgroundColor: '#FAFAFA', border: '1px solid #E5E7EB', borderRadius: '12px', fontWeight: '700', fontSize: '0.95rem', color: '#111827' }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98260 12345"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#111827',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                🔒 Zero Spam Policy: 1-Tap SMS OTP verification for rider and driver safety.
              </div>

              <button type="submit" className="btn btn-primary btn-shine" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}>
                Send 1-Tap OTP Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
