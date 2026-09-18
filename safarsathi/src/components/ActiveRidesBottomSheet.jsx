import React, { useEffect } from 'react';
import { X, Clock, Users, ChevronRight, MapPin } from 'lucide-react';

// ─── Ride State Logic ─────────────────────────────────────────────
function getRideState(ride) {
  if (
    ride.rideStatus === 'LIVE' ||
    ride.status === 'live' ||
    ride.departureTime === 'Live Now'
  ) return 'LIVE';
  if (ride.rideStatus === 'COMPLETED' || ride.status === 'completed') return 'COMPLETED';
  if (
    (ride.pendingRequests && ride.pendingRequests > 0) ||
    ride.rideStatus === 'ACCEPTING'
  ) return 'ACCEPTING';
  return 'UPCOMING';
}

const STATE_CONFIG = {
  UPCOMING: {
    color: '#92400E',
    bg: '#FFFBEB',
    border: '#FDE68A',
    dotColor: '#F59E0B',
    label: 'Upcoming',
    emoji: '🟡',
    pulse: false,
  },
  ACCEPTING: {
    color: '#9A3412',
    bg: '#FFF7ED',
    border: '#FED7AA',
    dotColor: '#F97316',
    label: 'Accepting Requests',
    emoji: '🟠',
    pulse: false,
  },
  LIVE: {
    color: '#991B1B',
    bg: '#FFF1F2',
    border: '#FECDD3',
    dotColor: '#EF4444',
    label: 'Live Now',
    emoji: '🔴',
    pulse: true,
  },
  COMPLETED: {
    color: '#065F46',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    dotColor: '#10B981',
    label: 'Completed',
    emoji: '✅',
    pulse: false,
  },
};

// ─── Driver Ride Card ─────────────────────────────────────────────
function DriverRideCard({ ride, onViewRide }) {
  const state = getRideState(ride);
  const cfg = STATE_CONFIG[state];
  const occupiedSeats = ride.confirmedPassengersCount || 1;
  const totalSeats = ride.availableSeats || 3;

  return (
    <div
      style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '20px',
        border: `1.5px solid ${cfg.border}`,
        padding: '1.1rem',
        marginBottom: '0.85rem',
      }}
    >
      {/* Top Row: State Badge + Role Tag */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.7rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: cfg.bg,
            color: cfg.color,
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: '800',
          }}
        >
          {cfg.pulse && (
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: cfg.dotColor,
                display: 'inline-block',
                animation: 'pulseDot 1.4s ease-in-out infinite',
              }}
            />
          )}
          {cfg.emoji} {cfg.label}
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            color: '#9CA3AF',
            fontWeight: '700',
            backgroundColor: '#F3F4F6',
            padding: '0.2rem 0.55rem',
            borderRadius: '8px',
          }}
        >
          🚗 You're driving
        </span>
      </div>

      {/* Route */}
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: '800',
          color: '#111827',
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.01em',
        }}
      >
        {ride.routeFrom} → {ride.routeTo}
      </h3>

      {/* Time + Passengers Row */}
      <div
        style={{
          display: 'flex',
          gap: '1.25rem',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.775rem',
            color: '#6B7280',
            fontWeight: '600',
          }}
        >
          <Clock size={13} style={{ color: '#E6A700' }} />
          {ride.departureTime || 'Today • 08:30 AM'}
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.775rem',
            color: '#6B7280',
            fontWeight: '600',
          }}
        >
          <Users size={13} style={{ color: '#E6A700' }} />
          {occupiedSeats} / {totalSeats} passengers
        </span>
      </div>

      {/* Pickup / Drop Tags */}
      <div
        style={{
          display: 'flex',
          gap: '0.45rem',
          marginBottom: '0.9rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: '#374151',
            backgroundColor: '#F3F4F6',
            padding: '0.25rem 0.65rem',
            borderRadius: '9px',
            fontWeight: '600',
          }}
        >
          📍 {ride.currentLocation || ride.routeFrom}
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            color: '#374151',
            backgroundColor: '#F3F4F6',
            padding: '0.25rem 0.65rem',
            borderRadius: '9px',
            fontWeight: '600',
          }}
        >
          🏁 {ride.routeTo}
        </span>
      </div>

      {/* CTA */}
      <button
        onClick={() => onViewRide && onViewRide(ride, 'driver')}
        style={{
          width: '100%',
          padding: '0.7rem',
          backgroundColor: state === 'LIVE' ? '#DC2626' : '#111827',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '14px',
          fontSize: '0.85rem',
          fontWeight: '800',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        {state === 'LIVE' ? '🔴 Manage Live Ride' : '⚙️ View Ride'}
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Passenger Booking Card ───────────────────────────────────────
function PassengerBookingCard({ booking, onViewTicket }) {
  const isConfirmed = booking.bookingStatus === 'BOOKING_CONFIRMED';

  return (
    <div
      style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '20px',
        border: `1.5px solid ${isConfirmed ? '#A7F3D0' : '#FDE68A'}`,
        padding: '1.1rem',
        marginBottom: '0.85rem',
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.7rem',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: isConfirmed ? '#ECFDF5' : '#FFFBEB',
            color: isConfirmed ? '#065F46' : '#92400E',
            padding: '0.3rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: '800',
          }}
        >
          {isConfirmed ? '✅ Confirmed' : '⏳ Waiting for Driver'}
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            color: '#9CA3AF',
            fontWeight: '700',
            backgroundColor: '#F3F4F6',
            padding: '0.2rem 0.55rem',
            borderRadius: '8px',
          }}
        >
          🎟️ Passenger
        </span>
      </div>

      {/* Route */}
      <h3
        style={{
          fontSize: '1.1rem',
          fontWeight: '800',
          color: '#111827',
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.01em',
        }}
      >
        {booking.routeFrom} → {booking.routeTo}
      </h3>

      {/* Time + Fare */}
      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.775rem', color: '#6B7280', fontWeight: '600' }}>
          🕒 {booking.departureTime || 'Today • 08:30 AM'}
        </span>
        <span style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '800' }}>
          ₹{booking.totalFare}
        </span>
      </div>

      {/* Driver Info Tag */}
      <div
        style={{
          fontSize: '0.72rem',
          color: '#374151',
          backgroundColor: '#F3F4F6',
          padding: '0.25rem 0.65rem',
          borderRadius: '9px',
          fontWeight: '600',
          display: 'inline-block',
          marginBottom: '0.9rem',
        }}
      >
        🚗 {booking.driverName} · {booking.vehicleModel}
      </div>

      {/* CTA */}
      <button
        onClick={() => onViewTicket && onViewTicket(booking)}
        style={{
          width: '100%',
          padding: '0.7rem',
          backgroundColor: isConfirmed ? '#10B981' : '#E6A700',
          color: isConfirmed ? '#FFFFFF' : '#111827',
          border: 'none',
          borderRadius: '14px',
          fontSize: '0.85rem',
          fontWeight: '800',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
        }}
      >
        {isConfirmed ? '🎟️ View Ticket' : '⏳ Track Request'}
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Main Bottom Sheet ────────────────────────────────────────────
export default function ActiveRidesBottomSheet({
  isOpen,
  onClose,
  confirmedBookings = [],
  publishedJourneys = [],
  onViewRide,
  onViewTicket,
}) {
  const totalCount = confirmedBookings.length + publishedJourneys.length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17, 24, 39, 0.55)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Sheet Panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          backgroundColor: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0)' : 'translateY(105%)',
          transition: 'transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -12px 48px rgba(0, 0, 0, 0.18)',
        }}
      >
        {/* Drag Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.8rem 0 0', flexShrink: 0 }}>
          <div style={{ width: '38px', height: '4px', borderRadius: '2px', backgroundColor: '#D1D5DB' }} />
        </div>

        {/* Header */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #F3F4F6',
            flexShrink: 0,
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
              My Active Rides
            </h2>
            <p style={{ fontSize: '0.775rem', color: '#9CA3AF', margin: '0.1rem 0 0', fontWeight: '600' }}>
              {totalCount} {totalCount === 1 ? 'ride' : 'rides'} active
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#6B7280',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable List */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1rem 1.25rem 2.5rem' }}>
          {publishedJourneys.map((ride, idx) => (
            <DriverRideCard
              key={ride.id || `driver-${idx}`}
              ride={ride}
              onViewRide={onViewRide}
            />
          ))}
          {confirmedBookings.map((booking, idx) => (
            <PassengerBookingCard
              key={booking.id || `passenger-${idx}`}
              booking={booking}
              onViewTicket={onViewTicket}
            />
          ))}
          {totalCount === 0 && (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🧳</div>
              <h4 style={{ fontWeight: '800', color: '#111827', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                No Active Rides
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#9CA3AF', fontWeight: '500' }}>
                Search for a ride or offer your route to get started!
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </>
  );
}
