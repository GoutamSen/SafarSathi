import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Navigation,
  Clock,
  Users,
  ShieldCheck,
  Star,
  Layers,
  Car,
  Info
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Helper component to adjust Leaflet map center dynamically
function MapAutoCenter({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    if (map) {
      map.setView(center, zoom);
      map.invalidateSize();
    }
  }, [center, zoom, map]);
  return null;
}

export default function RouteExplorerModal({ corridor, onClose, onSelectJourney }) {
  if (!corridor) return null;

  const [activeStatus, setActiveStatus] = useState('live'); // 'live' | 'upcoming' | 'completed'
  const [selectedRideId, setSelectedRideId] = useState(null); // Default null
  const [mapStyle, setMapStyle] = useState('google-roadmap'); // 'google-roadmap' | 'google-satellite'
  const [showLegend, setShowLegend] = useState(true);

  // Highway Route Corridor Coordinates (Indore -> Khargone SH-27)
  const routePolyline = [
    [22.7196, 75.8577], // Indore
    [22.6344, 75.8078], // Rau Circle
    [22.6074, 75.6811], // Pithampur Bypass
    [22.5532, 75.7554], // Mhow
    [22.1793, 75.6669], // Mandleshwar
    [21.8247, 75.6102], // Khargone
  ];

  const mapCenter = [22.25, 75.72]; // Midpoint of Indore-Khargone corridor

  const stats = corridor.stats || {
    total: 342,
    completedYesterday: 24,
    activeNow: 8,
    upcomingToday: 17,
  };

  // 1. Live Rides Data
  const liveRides = [
    {
      id: `re-live-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.6074,
      lng: 75.6811,
      currentLocation: 'Pithampur Toll Plaza (SH-27)',
      availableSeats: 2,
      vehicleType: 'Car',
      vehicleModel: 'Tata Nexon EV (AC)',
      driverName: 'Rajesh Sharma',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.9',
      costPerSeat: '₹160',
      departureTime: 'Departed 10 min ago (08:30 AM)',
      status: 'live',
    },
    {
      id: `re-live-2`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.6344,
      lng: 75.8078,
      currentLocation: 'Rau Square Bypass',
      availableSeats: 3,
      vehicleType: 'Car',
      vehicleModel: 'Maruti Suzuki Dzire',
      driverName: 'Vikram Singh',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.85',
      costPerSeat: '₹220',
      departureTime: 'Departed 20 min ago (09:10 AM)',
      status: 'live',
    },
    {
      id: `re-live-3`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.1793,
      lng: 75.6669,
      currentLocation: 'Mandleshwar Narmada Bridge',
      availableSeats: 1,
      vehicleType: 'Bike',
      vehicleModel: 'Royal Enfield Hunter 350',
      driverName: 'Amit Joshi',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.92',
      costPerSeat: '₹60',
      departureTime: 'Departed 45 min ago (08:00 AM)',
      status: 'live',
    },
  ];

  // 2. Upcoming Scheduled Rides
  const upcomingRides = [
    {
      id: `re-up-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.7196,
      lng: 75.8577,
      clusterCount: 4,
      currentLocation: 'Rajwada Pickup Hub (4 Rides)',
      departureTime: 'Today · 10:00 AM',
      driverName: 'Suresh Patel',
      driverRating: '4.90',
      vehicleModel: 'Hyundai Creta (AC)',
      costPerSeat: '₹180',
      availableSeats: 2,
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      status: 'upcoming',
    },
    {
      id: `re-up-2`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.6900,
      lng: 75.8300,
      clusterCount: 3,
      currentLocation: 'Bhawarkua Station (3 Rides)',
      departureTime: 'Today · 12:30 PM',
      driverName: 'Neha Verma',
      driverRating: '4.88',
      vehicleModel: 'Maruti Suzuki Baleno',
      costPerSeat: '₹150',
      availableSeats: 3,
      driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      status: 'upcoming',
    },
  ];

  // 3. Past Trips Log
  const completedRides = [
    {
      id: `re-comp-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.2500,
      lng: 75.7200,
      currentLocation: 'Corridor Highway 3 (24 Completed Yesterday)',
      departureTime: 'Completed Yesterday (24 Trips)',
      driverName: 'Rajesh Sharma & 23 Others',
      driverRating: '4.95 Avg',
      vehicleModel: '100% Aadhaar Verified Corridor Rides',
      costPerSeat: '₹165 Avg',
      availableSeats: 0,
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      status: 'completed',
    },
  ];

  const currentRidesList =
    activeStatus === 'live'
      ? liveRides
      : activeStatus === 'upcoming'
      ? upcomingRides
      : completedRides;

  const selectedRide = selectedRideId
    ? currentRidesList.find((r) => r.id === selectedRideId)
    : null;

  // Distinct Live Vehicle Pin Marker (Car Icon + Pulsing Ring + Subtitle)
  const createCustomMarkerIcon = (ride, isSelected, status) => {
    const color =
      status === 'live'
        ? '#10B981'
        : status === 'upcoming'
        ? '#E6A700'
        : '#64748B';

    let iconSymbol = '🚗';
    let statusTag = 'Live Ride';

    if (status === 'upcoming') {
      iconSymbol = '📅';
      statusTag = 'Upcoming';
    } else if (status === 'completed') {
      iconSymbol = '✓';
      statusTag = 'Past Trip';
    }

    const html = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
        cursor: pointer;
        z-index: ${isSelected ? 1000 : 100};
      ">
        <!-- Vehicle Circle Badge -->
        <div style="
          width: ${isSelected ? '32px' : '28px'};
          height: ${isSelected ? '32px' : '28px'};
          border-radius: 50%;
          background-color: ${color};
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isSelected ? '15px' : '13px'};
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 16px ${color}, 0 0 0 4px rgba(16, 185, 129, 0.25);
          transition: all 0.25s ease;
        ">
          ${iconSymbol}
        </div>

        <!-- Sleek Subtitle Label -->
        <div style="
          background-color: rgba(15, 23, 42, 0.9);
          color: #FFFFFF;
          padding: 1px 6px;
          border-radius: 8px;
          font-size: 9.5px;
          font-weight: 800;
          font-family: sans-serif;
          white-space: nowrap;
          border: 1px solid ${color};
          margin-top: 2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        ">
          🟢 ${statusTag}
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-pin',
      iconSize: [60, 44],
      iconAnchor: [30, 44],
    });
  };

  const getTileUrl = () => {
    if (mapStyle === 'google-satellite') {
      return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    }
    return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
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
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFF',
        }}
      >
        {/* 1. CLEAN COMPACT HEADER */}
        <div
          style={{
            padding: '0.75rem 1.25rem 0.5rem 1.25rem',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            zIndex: 2000,
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
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

        {/* 2. ULTRA SLEEK SEGMENTED UNDERLINE TABS STRIP */}
        <div
          style={{
            backgroundColor: '#1E293B',
            padding: '0 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            zIndex: 2000,
          }}
        >
          {/* Live Tab */}
          <button
            onClick={() => {
              setActiveStatus('live');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.65rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'live' ? '#34D399' : '#94A3B8',
              fontSize: '0.825rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              position: 'relative',
              borderBottom: activeStatus === 'live' ? '2.5px solid #10B981' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            Live {stats.activeNow}
          </button>

          {/* Upcoming Tab */}
          <button
            onClick={() => {
              setActiveStatus('upcoming');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.65rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'upcoming' ? '#FBBF24' : '#94A3B8',
              fontSize: '0.825rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              position: 'relative',
              borderBottom: activeStatus === 'upcoming' ? '2.5px solid #E6A700' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
            Upcoming {stats.upcomingToday}
          </button>

          {/* Past Tab */}
          <button
            onClick={() => {
              setActiveStatus('completed');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.65rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'completed' ? '#CBD5E1' : '#94A3B8',
              fontSize: '0.825rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              position: 'relative',
              borderBottom: activeStatus === 'completed' ? '2.5px solid #94A3B8' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            ✓ Past {stats.total}
          </button>
        </div>

        {/* 3. HERO MAP VIEWPORT CANVAS */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Map Legend Overlay (Top Left) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 1000,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(6px)',
              borderRadius: '20px',
              padding: '0.3rem 0.65rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '0.7rem',
              fontWeight: '800',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              🚗 Live Ride
            </span>
            <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              📅 Upcoming
            </span>
          </div>

          {/* Leaflet Map Container */}
          <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <MapContainer
              center={mapCenter}
              zoom={9}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              <MapAutoCenter center={mapCenter} zoom={9} />

              <TileLayer
                url={getTileUrl()}
                attribution='&copy; Google Maps'
              />

              {/* Google Maps Bold Dark Red Polyline */}
              <Polyline
                positions={routePolyline}
                color="#DC2626"
                weight={7}
                opacity={0.9}
              />

              {/* Vehicle Pins */}
              {currentRidesList.map((ride) => {
                const isSelected = selectedRide && selectedRide.id === ride.id;
                return (
                  <Marker
                    key={ride.id}
                    position={[ride.lat, ride.lng]}
                    icon={createCustomMarkerIcon(ride, isSelected, activeStatus)}
                    eventHandlers={{
                      click: () => setSelectedRideId(ride.id),
                    }}
                  />
                );
              })}
            </MapContainer>

            {/* Floating Satellite Switch Control */}
            <button
              onClick={() => setMapStyle(mapStyle === 'google-roadmap' ? 'google-satellite' : 'google-roadmap')}
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                zIndex: 1000,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '0.35rem 0.75rem',
                color: '#FFFFFF',
                fontSize: '0.725rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              <Layers size={13} />
              <span>{mapStyle === 'google-roadmap' ? 'Satellite' : 'Roadmap'}</span>
            </button>
          </div>

          {/* 4. SLIDE-UP RIDE DETAIL BOTTOM SHEET CARD */}
          {selectedRide && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111827',
                borderRadius: '24px 24px 0 0',
                padding: '1.25rem',
                borderTop: '3px solid #E6A700',
                boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)',
                zIndex: 2000,
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    backgroundColor: activeStatus === 'live' ? '#E6F4EA' : activeStatus === 'upcoming' ? '#FFF4CC' : '#F3F4F6',
                    color: activeStatus === 'live' ? '#137333' : activeStatus === 'upcoming' ? '#C98F00' : '#4B5563',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    fontWeight: '800',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: activeStatus === 'live' ? '#10B981' : activeStatus === 'upcoming' ? '#E6A700' : '#6B7280',
                      display: 'inline-block',
                    }}
                  />
                  <span>
                    {activeStatus === 'live'
                      ? '🟢 LIVE ON ROUTE'
                      : activeStatus === 'upcoming'
                      ? '🟡 UPCOMING DEPARTURE'
                      : '⚪ PAST TRIP'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>{selectedRide.costPerSeat}</span>
                    <span style={{ fontSize: '0.675rem', color: '#6B7280', display: 'block', lineHeight: 1 }}>per seat</span>
                  </div>

                  <button
                    onClick={() => setSelectedRideId(null)}
                    title="Close Details"
                    style={{
                      background: '#F3F4F6',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#4B5563',
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <img
                  src={selectedRide.driverAvatar}
                  alt={selectedRide.driverName}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFF4CC' }}
                />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {selectedRide.driverName}
                    <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Star size={12} fill="#E6A700" style={{ color: '#E6A700' }} />
                    <span>{selectedRide.driverRating}</span>
                    <span>•</span>
                    <span>Verified</span>
                    <span>•</span>
                    <span>{selectedRide.vehicleModel}</span>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#FAFAFA', borderRadius: '12px', padding: '0.65rem 0.85rem', border: '1px solid #F3F4F6', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.775rem', fontWeight: '800', color: '#E6A700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} />
                  <span>{selectedRide.departureTime}</span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span>{corridor.from}</span>
                  <span style={{ color: '#E6A700', fontWeight: '800' }}>──────────────→</span>
                  <span>{corridor.to}</span>
                </div>

                {selectedRide.currentLocation && (
                  <div style={{ fontSize: '0.75rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Navigation size={13} style={{ color: '#E6A700' }} />
                    <span>Location: <strong>{selectedRide.currentLocation}</strong></span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Users size={14} style={{ color: '#E6A700' }} />
                  {selectedRide.availableSeats} seats available
                </span>

                <button
                  onClick={() => {
                    if (onSelectJourney) onSelectJourney({ ...selectedRide, routeFrom: corridor.from, routeTo: corridor.to });
                    onClose();
                  }}
                  className="btn btn-primary btn-shine"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', fontWeight: '800', borderRadius: '12px' }}
                >
                  View & Book Seat ➔
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
