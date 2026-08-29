import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Navigation,
  Clock,
  Users,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Check
} from 'lucide-react';

export default function RouteExplorerModal({ corridor, onClose, onSelectJourney }) {
  if (!corridor) return null;

  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'upcoming' | 'completed'
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All');
  const [selectedSeatsFilter, setSelectedSeatsFilter] = useState('All');

  // Default Stats fallback
  const stats = corridor.stats || {
    total: 342,
    completedYesterday: 24,
    activeNow: 8,
    upcomingToday: 17,
  };

  // Mock Live Rides Data for Route
  const liveRides = [
    {
      id: `re-live-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      currentLocation: 'Near Pithampur Toll',
      etaPickup: '5 minutes',
      availableSeats: 2,
      vehicleType: 'Car',
      vehicleModel: 'Tata Nexon EV (AC)',
      driverName: 'Rajesh Sharma',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.9',
      driverTrips: '48 journeys',
      isVerified: true,
      costPerSeat: '₹160',
      departureTime: 'Live Now (Left 10 mins ago)',
    },
    {
      id: `re-live-2`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      currentLocation: 'Near Rau Circle',
      etaPickup: '12 minutes',
      availableSeats: 3,
      vehicleType: 'Car',
      vehicleModel: 'Maruti Suzuki Dzire',
      driverName: 'Vikram Singh',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.85',
      driverTrips: '62 journeys',
      isVerified: true,
      costPerSeat: '₹220',
      departureTime: 'Live Now (Left 20 mins ago)',
    },
    {
      id: `re-live-3`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      currentLocation: 'Near Rajendra Nagar',
      etaPickup: '3 minutes',
      availableSeats: 1,
      vehicleType: 'Bike',
      vehicleModel: 'Royal Enfield Hunter 350',
      driverName: 'Amit Joshi',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.92',
      driverTrips: '85 rides',
      isVerified: true,
      costPerSeat: '₹60',
      departureTime: 'Live Now',
    },
  ];

  // Mock Upcoming Scheduled Rides for Today
  const upcomingRides = [
    {
      id: `re-up-1`,
      time: '08:30 AM',
      driverName: 'Rajesh Sharma',
      driverRating: '4.9',
      vehicleModel: 'Tata Nexon EV (AC)',
      costPerSeat: '₹160',
      availableSeats: 2,
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      status: 'Departing Soon',
    },
    {
      id: `re-up-2`,
      time: '10:00 AM',
      driverName: 'Amit Joshi',
      driverRating: '4.92',
      vehicleModel: 'Royal Enfield Hunter 350',
      costPerSeat: '₹60',
      availableSeats: 1,
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      status: 'Scheduled',
    },
    {
      id: `re-up-3`,
      time: '12:30 PM',
      driverName: 'Neha Patel',
      driverRating: '4.88',
      vehicleModel: 'Maruti Suzuki Baleno',
      costPerSeat: '₹150',
      availableSeats: 3,
      driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      status: 'Scheduled',
    },
    {
      id: `re-up-4`,
      time: '04:00 PM',
      driverName: 'Rohit Kumar',
      driverRating: '4.95',
      vehicleModel: 'Hyundai Creta (AC)',
      costPerSeat: '₹180',
      availableSeats: 2,
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      status: 'Scheduled',
    },
    {
      id: `re-up-5`,
      time: '06:30 PM',
      driverName: 'Suresh Verma',
      driverRating: '4.80',
      vehicleModel: 'Kia Seltos (AC)',
      costPerSeat: '₹210',
      availableSeats: 4,
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      status: 'Scheduled',
    },
  ];

  // Mock Completed History Logs
  const completedHistory = [
    { date: 'Yesterday (Aug 28)', count: stats.completedYesterday, verified: '100% Aadhaar Verified', rating: '4.92 Avg Rating', fare: '₹165 Avg Fare' },
    { date: 'Aug 27, 2026', count: 31, verified: '100% Aadhaar Verified', rating: '4.95 Avg Rating', fare: '₹160 Avg Fare' },
    { date: 'Aug 26, 2026', count: 28, verified: '100% Aadhaar Verified', rating: '4.89 Avg Rating', fare: '₹170 Avg Fare' },
    { date: 'Aug 25, 2026', count: 35, verified: '100% Aadhaar Verified', rating: '4.94 Avg Rating', fare: '₹155 Avg Fare' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '660px',
          borderRadius: '24px',
          padding: 0,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Top Explorer Header Bar */}
        <div
          style={{
            padding: '1.2rem 1.5rem',
            background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1.5px solid rgba(230, 167, 0, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#E6A700', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                POPULAR CORRIDOR EXPLORER
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {corridor.from} <span style={{ color: '#E6A700' }}>➔</span> {corridor.to}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFFFFF',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Route Activity Insight Banner */}
        <div
          style={{
            backgroundColor: '#FFF4CC',
            padding: '0.9rem 1.5rem',
            borderBottom: '1px solid rgba(230, 167, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.925rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} style={{ color: '#C98F00' }} />
              <span>{stats.total} total rides completed on this corridor</span>
            </div>
            <div style={{ fontSize: '0.775rem', color: '#4B5563', fontWeight: '600', marginTop: '0.1rem' }}>
              <span style={{ color: '#C98F00', fontWeight: '800' }}>{stats.completedYesterday} completed yesterday</span> •{' '}
              <span style={{ color: '#111827', fontWeight: '800' }}>{stats.activeNow} active now</span> •{' '}
              <span style={{ color: '#4B5563', fontWeight: '700' }}>{stats.upcomingToday} upcoming today</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div style={{ padding: '0.85rem 1.5rem 0 1.5rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('live')}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                borderBottom: activeTab === 'live' ? '3px solid #E6A700' : '3px solid transparent',
                backgroundColor: activeTab === 'live' ? '#FFF4CC' : 'transparent',
                color: activeTab === 'live' ? '#111827' : '#6B7280',
                fontSize: '0.85rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              Live Now ({stats.activeNow})
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                borderBottom: activeTab === 'upcoming' ? '3px solid #E6A700' : '3px solid transparent',
                backgroundColor: activeTab === 'upcoming' ? '#FFF4CC' : 'transparent',
                color: activeTab === 'upcoming' ? '#111827' : '#6B7280',
                fontSize: '0.85rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Clock size={14} style={{ color: '#E6A700' }} />
              Next Rides ({stats.upcomingToday})
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '12px 12px 0 0',
                border: 'none',
                borderBottom: activeTab === 'completed' ? '3px solid #E6A700' : '3px solid transparent',
                backgroundColor: activeTab === 'completed' ? '#FFF4CC' : 'transparent',
                color: activeTab === 'completed' ? '#111827' : '#6B7280',
                fontSize: '0.85rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <CheckCircle2 size={14} style={{ color: '#E6A700' }} />
              History Log
            </button>
          </div>
        </div>

        {/* Filters Strip */}
        {activeTab !== 'completed' && (
          <div
            style={{
              padding: '0.65rem 1.5rem',
              backgroundColor: '#FAFAFA',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.775rem',
              color: '#6B7280',
              overflowX: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '800', color: '#111827' }}>
              <Filter size={13} style={{ color: '#E6A700' }} />
              <span>Filters:</span>
            </div>
            <select
              value={selectedTimeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value)}
              style={{ padding: '0.25rem 0.6rem', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', fontSize: '0.75rem', fontWeight: '700', color: '#111827', outline: 'none' }}
            >
              <option value="All">Today (All Hours)</option>
              <option value="Morning">Morning (6 AM - 12 PM)</option>
              <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="Evening">Evening (5 PM - 10 PM)</option>
            </select>

            <select
              value={selectedSeatsFilter}
              onChange={(e) => setSelectedSeatsFilter(e.target.value)}
              style={{ padding: '0.25rem 0.6rem', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', fontSize: '0.75rem', fontWeight: '700', color: '#111827', outline: 'none' }}
            >
              <option value="All">All Seats</option>
              <option value="1">1+ Seat</option>
              <option value="2">2+ Seats</option>
              <option value="3">3+ Seats</option>
            </select>
          </div>
        )}

        {/* Modal Scrollable Content Container */}
        <div style={{ padding: '1.25rem 1.5rem', maxHeight: '420px', overflowY: 'auto' }}>

          {/* 1. LIVE NOW TAB CONTENT */}
          {activeTab === 'live' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {liveRides.map((ride) => (
                <div
                  key={ride.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1.15rem',
                    border: '1.5px solid #E6A700',
                    boxShadow: '0 4px 14px rgba(230, 167, 0, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img
                        src={ride.driverAvatar}
                        alt={ride.driverName}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFF4CC' }}
                      />
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          {ride.driverName}
                          <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#C98F00', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Star size={12} fill="#C98F00" /> {ride.driverRating} • {ride.vehicleModel}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#C98F00' }}>{ride.costPerSeat}</span>
                      <span style={{ fontSize: '0.7rem', color: '#6B7280', display: 'block' }}>per seat</span>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#FFF4CC', borderRadius: '12px', padding: '0.65rem 0.85rem', fontSize: '0.825rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Navigation size={14} style={{ color: '#C98F00' }} />
                      En-route: <strong>{ride.currentLocation}</strong>
                    </span>
                    <span style={{ fontWeight: '800', color: '#111827', backgroundColor: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                      {ride.availableSeats} Seats Left
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectJourney) onSelectJourney(ride);
                      onClose();
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.7rem' }}
                  >
                    View & Book Seat ➔
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 2. NEXT / UPCOMING RIDES TAB CONTENT */}
          {activeTab === 'upcoming' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {upcomingRides.map((ride) => (
                <div
                  key={ride.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '1rem 1.15rem',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#FFF4CC',
                        borderRadius: '12px',
                        textAlign: 'center',
                        border: '1px solid rgba(230, 167, 0, 0.3)',
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827', display: 'block' }}>{ride.time}</span>
                      <span style={{ fontSize: '0.65rem', color: '#C98F00', fontWeight: '800' }}>{ride.status}</span>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.925rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {ride.driverName}
                        <ShieldCheck size={15} style={{ color: '#E6A700' }} />
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#6B7280' }}>
                        {ride.vehicleModel} • {ride.availableSeats} Seats Available
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#C98F00' }}>{ride.costPerSeat}</span>
                    <button
                      onClick={() => {
                        if (onSelectJourney) onSelectJourney({ ...ride, routeFrom: corridor.from, routeTo: corridor.to });
                        onClose();
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.775rem' }}
                    >
                      Reserve ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. COMPLETED HISTORY LOG TAB CONTENT */}
          {activeTab === 'completed' && (
            <div>
              <div style={{ padding: '0.85rem 1rem', backgroundColor: '#FAFAFA', borderRadius: '14px', border: '1px solid #E5E7EB', marginBottom: '1rem', fontSize: '0.825rem', color: '#4B5563' }}>
                🛡️ <strong>Privacy Protection Active:</strong> Driver personal contact info is anonymized. History shows verified trip completion statistics on Highway 3 corridor.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {completedHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827', marginBottom: '0.2rem' }}>
                        {item.date}
                      </div>
                      <div style={{ fontSize: '0.775rem', color: '#6B7280', display: 'flex', gap: '0.5rem' }}>
                        <span>{item.verified}</span> • <span>{item.rating}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#10B981', display: 'block' }}>
                        ✓ {item.count} Trips Done
                      </span>
                      <span style={{ fontSize: '0.725rem', color: '#6B7280' }}>{item.fare}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
