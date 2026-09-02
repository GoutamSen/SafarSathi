import React, { useState } from 'react';
import { X, CheckCircle2, User, Phone, ShieldCheck, Car, Calendar, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function MyRidesHubModal({
  isOpen,
  onClose,
  confirmedBookings = [],
  publishedJourneys = [],
  onOpenDriverControlRoom,
  onOpenPassengerTicket,
  onOfferRideClick,
  onFindRideClick,
  pendingDriverNotification,
}) {
  const [activeTab, setActiveTab] = useState('passenger'); // 'passenger' | 'driver'

  if (!isOpen) return null;

  const totalPassengerCount = confirmedBookings.length;
  const totalDriverCount = publishedJourneys.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 0,
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              🧳 My Journeys & Active Rides
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#6B7280', margin: 0, marginTop: '0.2rem' }}>
              Manage your confirmed passenger passes and published driver routes
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: '#F3F4F6',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4B5563',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Segmented Role Switcher Tabs */}
        <div style={{ padding: '1rem 1.5rem 0.5rem 1.5rem', backgroundColor: '#FFFFFF' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              backgroundColor: '#F3F4F6',
              padding: '0.35rem',
              borderRadius: '16px',
            }}
          >
            <button
              onClick={() => setActiveTab('passenger')}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: activeTab === 'passenger' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'passenger' ? '#111827' : '#6B7280',
                fontWeight: activeTab === 'passenger' ? '800' : '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'passenger' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🎟️ As Passenger</span>
              {totalPassengerCount > 0 && (
                <span
                  style={{
                    backgroundColor: activeTab === 'passenger' ? '#E6A700' : '#E5E7EB',
                    color: activeTab === 'passenger' ? '#111827' : '#4B5563',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '12px',
                  }}
                >
                  {totalPassengerCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('driver')}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: activeTab === 'driver' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'driver' ? '#111827' : '#6B7280',
                fontWeight: activeTab === 'driver' ? '800' : '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'driver' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🚗 As Driver Host</span>
              {totalDriverCount > 0 && (
                <span
                  style={{
                    backgroundColor: activeTab === 'driver' ? '#E6A700' : '#E5E7EB',
                    color: activeTab === 'driver' ? '#111827' : '#4B5563',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '12px',
                  }}
                >
                  {totalDriverCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: PASSENGER BOOKINGS */}
          {activeTab === 'passenger' && (
            <div>
              {confirmedBookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎫</div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                    No Active Passenger Passes
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' }}>
                    Search for live journeys in your region and request a seat!
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onFindRideClick();
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    Explore Live Rides ➔
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {confirmedBookings.map((b, idx) => {
                    const isConfirmed = b.bookingStatus === 'BOOKING_CONFIRMED';

                    return (
                      <div
                        key={b.id || idx}
                        style={{
                          backgroundColor: '#FAFAFA',
                          borderRadius: '18px',
                          padding: '1.25rem',
                          border: isConfirmed ? '1.5px solid #10B981' : '1.5px dashed #E6A700',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <span
                            className="badge-pill"
                            style={{
                              backgroundColor: isConfirmed ? '#ECFDF5' : '#FFF4CC',
                              color: isConfirmed ? '#047857' : '#C98F00',
                              fontWeight: '800',
                              fontSize: '0.75rem',
                            }}
                          >
                            {isConfirmed ? '✅ CONFIRMED PASS' : '⏳ REQUEST SENT'}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '600' }}>
                            {b.departureTime || 'Today'}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.4rem' }}>
                          {b.routeFrom} ➔ {b.routeTo}
                        </h4>

                        <div
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '0.75rem 0.9rem',
                            border: '1px solid #E5E7EB',
                            fontSize: '0.825rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <div>Driver Host: <strong>{b.driverName || 'Rajesh Sharma'}</strong> (Govt ID Verified)</div>
                          <div>Vehicle: <strong>{b.vehicleModel || 'Tata Nexon EV'}</strong></div>
                          <div>Pickup Point: <strong>{b.pickupPoint || 'Near Toll Plaza'}</strong></div>
                          <div>Fare Share: <strong style={{ color: '#C98F00' }}>₹{b.totalFare}</strong> ({b.requestedSeats || 1} Seat)</div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onOpenPassengerTicket(b);
                          }}
                          className="btn btn-primary btn-shine"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '0.875rem',
                            backgroundColor: isConfirmed ? '#10B981' : '#E6A700',
                            borderColor: isConfirmed ? '#10B981' : '#E6A700',
                            color: isConfirmed ? '#FFFFFF' : '#111827',
                          }}
                        >
                          {isConfirmed ? '🎟️ View Ticket Pass & Pickup OTP (4829) ➔' : '⏳ Check Request Status ➔'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DRIVER PUBLISHED RIDES */}
          {activeTab === 'driver' && (
            <div>
              {publishedJourneys.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚗</div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827', marginBottom: '0.35rem' }}>
                    No Published Driver Routes
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1.25rem' }}>
                    Share your daily route or upcoming highway journey to earn & save fuel!
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOfferRideClick();
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                  >
                    + Offer a Ride ➔
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {publishedJourneys.map((j) => {
                    const hasBookedPassengers = (j.confirmedPassengersCount && j.confirmedPassengersCount > 0) ||
                      confirmedBookings.some((b) => (b.rideId === j.id || (b.routeFrom === j.routeFrom && b.routeTo === j.routeTo && b.id !== 'cb-sample-1')) && b.bookingStatus === 'BOOKING_CONFIRMED');
                    const hasPendingRequest = pendingDriverNotification && pendingDriverNotification.routeFrom === j.routeFrom && pendingDriverNotification.routeTo === j.routeTo;

                    return (
                      <div
                        key={j.id}
                        style={{
                          backgroundColor: '#FAFAFA',
                          borderRadius: '18px',
                          padding: '1.25rem',
                          border: '1.5px solid #E5E7EB',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <div className="badge-pill badge-green" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                            <span className="pulse-indicator" />
                            <span>🟡 PUBLISHED</span>
                          </div>
                          <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#C98F00' }}>
                            {j.costPerSeat} <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>/ seat</span>
                          </div>
                        </div>

                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', marginBottom: '0.4rem' }}>
                          {j.routeFrom} ➔ {j.routeTo}
                        </h4>

                        <div
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '0.75rem 0.9rem',
                            border: '1px solid #E5E7EB',
                            fontSize: '0.825rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.35rem',
                            marginBottom: '1rem',
                          }}
                        >
                          <div>📍 Pickup: <strong>{j.currentLocation}</strong></div>
                          <div>🕒 Departure: <strong style={{ color: '#C98F00' }}>{j.departureTime}</strong></div>
                          <div>{j.vehicleType === 'Bike' ? '🏍️ Vehicle:' : '🚗 Vehicle:'} <strong>{j.vehicleModel}</strong></div>
                          <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '0.35rem', marginTop: '0.2rem' }}>
                            Passenger Status: <strong style={{ color: hasBookedPassengers ? '#15803D' : (hasPendingRequest ? '#D97706' : '#4B5563') }}>
                              {hasBookedPassengers ? '🟢 1 Passenger Confirmed' : (hasPendingRequest ? '🔔 1 Seat Request Alert!' : `👥 ${j.availableSeats} Seat(s) Available`)}
                            </strong>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onOpenDriverControlRoom(j);
                          }}
                          className="btn btn-primary btn-shine"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '0.875rem',
                            backgroundColor: hasBookedPassengers ? '#111827' : (hasPendingRequest ? '#D97706' : '#E6A700'),
                            borderColor: hasBookedPassengers ? '#111827' : (hasPendingRequest ? '#D97706' : '#E6A700'),
                            color: (hasBookedPassengers || hasPendingRequest) ? '#FFFFFF' : '#111827',
                          }}
                        >
                          {hasBookedPassengers ? '🔐 Open Driver Control Room ➔' : (hasPendingRequest ? '🔔 Review Request & Control Room ➔' : '⚙️ Manage Ride ➔')}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
