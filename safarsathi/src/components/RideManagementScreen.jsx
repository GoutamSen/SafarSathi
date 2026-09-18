import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin, Users, Star, ChevronRight } from 'lucide-react';

// ─── State Config ─────────────────────────────────────────────────
const STATE_CONFIG = {
  UPCOMING: {
    color: '#92400E',
    bg: '#FFFBEB',
    label: 'Upcoming',
    pulse: false,
  },
  ACCEPTING: {
    color: '#9A3412',
    bg: '#FFF7ED',
    label: 'Accepting Requests',
    pulse: false,
  },
  LIVE: {
    color: '#991B1B',
    bg: '#FFF1F2',
    label: '● Live Now',
    pulse: true,
  },
  COMPLETED: {
    color: '#065F46',
    bg: '#ECFDF5',
    label: '✅ Completed',
    pulse: false,
  },
};

function getRideState(ride) {
  if (ride.rideStatus === 'LIVE' || ride.departureTime === 'Live Now') return 'LIVE';
  if (ride.rideStatus === 'COMPLETED') return 'COMPLETED';
  if (ride.pendingRequests > 0 || ride.rideStatus === 'ACCEPTING') return 'ACCEPTING';
  return 'UPCOMING';
}

// ─── Passenger Card ───────────────────────────────────────────────
function PassengerCard({ passenger, onAccept, onContact }) {
  const isConfirmed = passenger.status === 'CONFIRMED';

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        padding: '1rem',
        border: `1.5px solid ${isConfirmed ? '#A7F3D0' : '#FDE68A'}`,
        marginBottom: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Passenger Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.7rem' }}>
        {/* Avatar */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: isConfirmed ? '#ECFDF5' : '#FFFBEB',
            border: `2px solid ${isConfirmed ? '#A7F3D0' : '#FDE68A'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            flexShrink: 0,
          }}
        >
          {isConfirmed ? '😊' : '👤'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.925rem', fontWeight: '800', color: '#111827' }}>
              {passenger.name}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#F59E0B',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.15rem',
              }}
            >
              ★ {passenger.rating}
            </span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: isConfirmed ? '#ECFDF5' : '#FFFBEB',
              color: isConfirmed ? '#065F46' : '#92400E',
              padding: '0.12rem 0.55rem',
              borderRadius: '9999px',
              fontSize: '0.68rem',
              fontWeight: '800',
              marginTop: '0.2rem',
            }}
          >
            {isConfirmed ? '✅ Confirmed' : '⏳ Waiting'}
          </div>
        </div>

        {/* Fare */}
        <div
          style={{
            textAlign: 'right',
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#C98F00' }}>
            ₹{passenger.fare}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#9CA3AF', fontWeight: '600' }}>
            fare share
          </div>
        </div>
      </div>

      {/* Pickup Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#F9FAFB',
          borderRadius: '10px',
          padding: '0.45rem 0.7rem',
          marginBottom: '0.75rem',
        }}
      >
        <MapPin size={13} style={{ color: '#E6A700', flexShrink: 0 }} />
        <span style={{ fontSize: '0.78rem', color: '#374151', fontWeight: '600' }}>
          Pickup: {passenger.pickup}
        </span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {isConfirmed ? (
          <a
            href={`tel:${passenger.phone}`}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: '12px',
              backgroundColor: '#111827',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Phone size={14} />
            Contact
          </a>
        ) : (
          <>
            <button
              onClick={() => onAccept && onAccept(passenger.id)}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '12px',
                backgroundColor: '#E6A700',
                color: '#111827',
                fontSize: '0.82rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
              }}
            >
              ✅ Accept
            </button>
            <button
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '12px',
                backgroundColor: '#F3F4F6',
                color: '#374151',
                fontSize: '0.82rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Seat Visualizer ──────────────────────────────────────────────
function SeatBar({ filled, total }) {
  return (
    <div
      style={{
        backgroundColor: '#FAFAFA',
        borderRadius: '18px',
        padding: '1rem 1.25rem',
        border: '1.5px solid #E5E7EB',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.7rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Users size={16} style={{ color: '#E6A700' }} />
          <span style={{ fontSize: '0.925rem', fontWeight: '700', color: '#111827' }}>
            {filled} / {total} occupied
          </span>
        </div>
        <span
          style={{
            fontSize: '0.72rem',
            color: total - filled > 0 ? '#059669' : '#9CA3AF',
            fontWeight: '700',
            backgroundColor: total - filled > 0 ? '#ECFDF5' : '#F3F4F6',
            padding: '0.15rem 0.55rem',
            borderRadius: '9999px',
          }}
        >
          {total - filled > 0 ? `${total - filled} seat${total - filled > 1 ? 's' : ''} available` : 'Full'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '10px',
              borderRadius: '5px',
              backgroundColor: i < filled ? '#E6A700' : '#E5E7EB',
              transition: 'background-color 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
const DEMO_PASSENGERS = [
  {
    id: 'p1',
    name: 'Rahul Verma',
    rating: 4.9,
    status: 'CONFIRMED',
    pickup: 'Vijay Nagar',
    fare: 120,
    phone: '+919826012345',
  },
  {
    id: 'p2',
    name: 'Aman Gupta',
    rating: 4.7,
    status: 'WAITING',
    pickup: 'Rau',
    fare: 100,
    phone: '+919826098765',
  },
];

export default function RideManagementScreen({ ride, isOpen, onClose }) {
  const [rideState, setRideState] = useState(() =>
    ride ? getRideState(ride) : 'UPCOMING'
  );
  const [passengers, setPassengers] = useState(DEMO_PASSENGERS);

  // Reset state when ride changes
  React.useEffect(() => {
    if (ride) setRideState(getRideState(ride));
    setPassengers(DEMO_PASSENGERS);
  }, [ride?.id]);

  if (!isOpen || !ride) return null;

  const cfg = STATE_CONFIG[rideState];
  const confirmedCount = passengers.filter(p => p.status === 'CONFIRMED').length;
  const totalSeats = ride.availableSeats || 3;

  const handleAccept = (passengerId) => {
    setPassengers(prev =>
      prev.map(p => p.id === passengerId ? { ...p, status: 'CONFIRMED' } : p)
    );
  };

  const handleStartRide = () => setRideState('LIVE');
  const handleEndRide = () => setRideState('COMPLETED');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        overflowY: 'hidden',
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F3F4F6',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 10,
          flexShrink: 0,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1.5px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#374151',
            flexShrink: 0,
            transition: 'border-color 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#111827')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E7EB')}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h2
            style={{
              fontSize: '1rem',
              fontWeight: '800',
              color: '#111827',
              margin: 0,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {ride.routeFrom} → {ride.routeTo}
          </h2>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: cfg.bg,
              color: cfg.color,
              padding: '0.12rem 0.55rem',
              borderRadius: '9999px',
              fontSize: '0.68rem',
              fontWeight: '800',
              marginTop: '0.2rem',
            }}
          >
            {cfg.pulse && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: cfg.color,
                  display: 'inline-block',
                  animation: 'pulseDot 1.2s ease-in-out infinite',
                }}
              />
            )}
            {cfg.label}
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>

        {/* Passengers Section */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.85rem',
            }}
          >
            <h3
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                color: '#6B7280',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Passengers
            </h3>
            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '0.15rem 0.6rem',
                borderRadius: '9999px',
              }}
            >
              {confirmedCount} Confirmed
            </span>
          </div>

          {passengers.map(passenger => (
            <PassengerCard
              key={passenger.id}
              passenger={passenger}
              onAccept={handleAccept}
            />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '0 0 1.25rem' }} />

        {/* Seats Section */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h3
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              color: '#6B7280',
              margin: '0 0 0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Seats
          </h3>
          <SeatBar filled={confirmedCount} total={totalSeats} />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '0 0 1.25rem' }} />

        {/* Route Info Card */}
        <div style={{ marginBottom: '1rem' }}>
          <h3
            style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              color: '#6B7280',
              margin: '0 0 0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Route Info
          </h3>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              padding: '1rem 1.25rem',
              border: '1.5px solid #E5E7EB',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#9CA3AF', fontWeight: '600' }}>From</span>
              <span style={{ color: '#111827', fontWeight: '700' }}>{ride.routeFrom}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#9CA3AF', fontWeight: '600' }}>To</span>
              <span style={{ color: '#111827', fontWeight: '700' }}>{ride.routeTo}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#9CA3AF', fontWeight: '600' }}>Departure</span>
              <span style={{ color: '#C98F00', fontWeight: '700' }}>{ride.departureTime || 'Today • 08:30 AM'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#9CA3AF', fontWeight: '600' }}>Vehicle</span>
              <span style={{ color: '#111827', fontWeight: '700' }}>{ride.vehicleModel || 'Your Vehicle'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ color: '#9CA3AF', fontWeight: '600' }}>Fare per seat</span>
              <span style={{ color: '#C98F00', fontWeight: '800' }}>{ride.costPerSeat || '₹120'}</span>
            </div>
          </div>
        </div>

        {/* Extra bottom padding for CTA */}
        <div style={{ height: '5rem' }} />
      </div>

      {/* Bottom CTA — Fixed */}
      <div
        style={{
          padding: '1rem 1.25rem 1.75rem',
          borderTop: '1px solid #F3F4F6',
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
        }}
      >
        {rideState === 'UPCOMING' || rideState === 'ACCEPTING' ? (
          <button
            onClick={handleStartRide}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: '800',
              backgroundColor: '#E6A700',
              color: '#111827',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(230, 167, 0, 0.35)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🚗 Start Ride
          </button>
        ) : rideState === 'LIVE' ? (
          <button
            onClick={handleEndRide}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '16px',
              fontSize: '1rem',
              fontWeight: '800',
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.35)',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            🏁 End Ride
          </button>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '0.9rem',
              backgroundColor: '#ECFDF5',
              borderRadius: '16px',
              color: '#065F46',
              fontWeight: '800',
              fontSize: '0.925rem',
            }}
          >
            ✅ Ride Completed Successfully
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
