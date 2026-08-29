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
  Compass
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
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
  const [selectedRideId, setSelectedRideId] = useState('re-live-1');
  const [mapStyle, setMapStyle] = useState('google-roadmap'); // 'google-roadmap' | 'google-satellite' | 'osm'

  // Route Corridor Coordinates (Indore -> Khargone Highway SH-27 / NH-52)
  const routePolyline = [
    [22.7196, 75.8577], // Indore
    [22.6344, 75.8078], // Rau Circle
    [22.6074, 75.6811], // Pithampur Bypass
    [22.5532, 75.7554], // Mhow
    [22.1793, 75.6669], // Mandleshwar
    [21.8247, 75.6102], // Khargone
  ];

  const mapCenter = [22.25, 75.72]; // Midpoint of Indore-Khargone corridor

  // Stats fallback
  const stats = corridor.stats || {
    total: 342,
    completedYesterday: 24,
    activeNow: 8,
    upcomingToday: 17,
  };

  // Live Rides Data with Real Lat/Lng GPS Coordinates
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

  // Upcoming Scheduled Rides
  const upcomingRides = [
    {
      id: `re-up-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 22.7196,
      lng: 75.8577,
      currentLocation: 'Indore Rajwada Pickup Hub',
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
      currentLocation: 'Bhawarkua Bus Station',
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

  // Completed History Items
  const completedRides = [
    {
      id: `re-comp-1`,
      routeFrom: corridor.from || 'Indore',
      routeTo: corridor.to || 'Khargone',
      lat: 21.8247,
      lng: 75.6102,
      currentLocation: 'Khargone Bus Terminal (Completed)',
      departureTime: 'Completed Yesterday (24 Rides)',
      driverName: 'Verified Corridor Trips Log',
      driverRating: '4.95 Avg',
      vehicleModel: '100% Aadhaar Verified Rides',
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

  const selectedRide =
    currentRidesList.find((r) => r.id === selectedRideId) || currentRidesList[0] || liveRides[0];

  // Helper function to create custom Leaflet HTML Marker Icons
  const createCustomMarkerIcon = (driverName, price, isSelected, status) => {
    const bgColor =
      status === 'live'
        ? '#10B981'
        : status === 'upcoming'
        ? '#E6A700'
        : '#64748B';

    const html = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
        cursor: pointer;
        z-index: ${isSelected ? 1000 : 100};
      ">
        <div style="
          background-color: ${isSelected ? bgColor : '#1E293B'};
          color: #FFFFFF;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 800;
          font-family: sans-serif;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 1.5px solid ${bgColor};
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>🚗 ${driverName.split(' ')[0]}</span>
          <span style="background: rgba(255,255,255,0.25); padding: 1px 4px; border-radius: 4px; font-size: 10px;">${price}</span>
        </div>
        <div style="
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: ${bgColor};
          border: 2px solid #FFFFFF;
          margin-top: 2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        "></div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-pin',
      iconSize: [80, 40],
      iconAnchor: [40, 40],
    });
  };

  // Custom Origin / Destination Pin Icons
  const createCityPinIcon = (cityName, isOrigin) => {
    const color = isOrigin ? '#EA4335' : '#34A853';
    const html = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
      ">
        <span style="
          background-color: #1E293B;
          color: #FFFFFF;
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 800;
          font-family: sans-serif;
          white-space: nowrap;
          border: 1px solid ${color};
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ">
          ${isOrigin ? '📍' : '🏁'} ${cityName}
        </span>
        <div style="
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: ${color};
          border: 3px solid #FFFFFF;
          margin-top: 2px;
          box-shadow: 0 0 10px ${color};
        "></div>
      </div>
    `;
    return L.divIcon({
      html,
      className: 'custom-city-pin',
      iconSize: [70, 35],
      iconAnchor: [35, 35],
    });
  };

  // Map Tile URL based on style selection
  const getTileUrl = () => {
    if (mapStyle === 'google-satellite') {
      return 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
    }
    if (mapStyle === 'google-roadmap') {
      return 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
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
        {/* 1. TOP REAL MAP BRANDED HEADER */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <span style={{ fontSize: '0.675rem', color: '#4285F4', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
                <span style={{ color: '#94A3B8', marginLeft: '4px' }}>MAPS REAL TILE LAYER</span>
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {corridor.from} <span style={{ color: '#E6A700' }}>➔</span> {corridor.to}
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setMapStyle(mapStyle === 'google-roadmap' ? 'google-satellite' : 'google-roadmap')}
              title="Toggle Map Style"
              style={{
                padding: '0.35rem 0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Layers size={14} />
              <span>{mapStyle === 'google-roadmap' ? 'Satellite' : 'Roadmap'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 2. STATUS FILTER PILLS BAR */}
        <div
          style={{
            backgroundColor: '#1E293B',
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            zIndex: 2000,
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setActiveStatus('live');
                setSelectedRideId(liveRides[0].id);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                border: activeStatus === 'live' ? '1.5px solid #10B981' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: activeStatus === 'live' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                color: activeStatus === 'live' ? '#34D399' : '#94A3B8',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              🟢 {stats.activeNow} Live Rides
            </button>

            <button
              onClick={() => {
                setActiveStatus('upcoming');
                setSelectedRideId(upcomingRides[0].id);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                border: activeStatus === 'upcoming' ? '1.5px solid #E6A700' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: activeStatus === 'upcoming' ? 'rgba(230, 167, 0, 0.25)' : 'transparent',
                color: activeStatus === 'upcoming' ? '#FBBF24' : '#94A3B8',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              🟡 {stats.upcomingToday} Upcoming
            </button>

            <button
              onClick={() => {
                setActiveStatus('completed');
                setSelectedRideId(completedRides[0].id);
              }}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                border: activeStatus === 'completed' ? '1.5px solid #94A3B8' : '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: activeStatus === 'completed' ? 'rgba(148, 163, 184, 0.25)' : 'transparent',
                color: activeStatus === 'completed' ? '#CBD5E1' : '#94A3B8',
                fontSize: '0.8rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              ⚪ {stats.total} Completed
            </button>
          </div>

          <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: '600' }}>
            {activeStatus === 'live' && `${stats.completedYesterday} completed yesterday on SH-27`}
            {activeStatus === 'upcoming' && `17 scheduled departures today`}
            {activeStatus === 'completed' && `Historical trips on Highway 3`}
          </div>
        </div>

        {/* 3. LEAFLET REAL MAP TILE CONTAINER */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Floating Helper Banner */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              border: '1px solid rgba(66, 133, 244, 0.4)',
              fontSize: '0.75rem',
              fontWeight: '800',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              pointerEvents: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            }}
          >
            <Compass size={14} className="spin-slow" />
            <span>Tap any driver marker on Google Map to inspect & book</span>
          </div>

          {/* Real Leaflet Map */}
          <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
            <MapContainer
              center={mapCenter}
              zoom={9}
              scrollWheelZoom={true}
              style={{ width: '100%', height: '100%' }}
            >
              <MapAutoCenter center={mapCenter} zoom={9} />

              {/* Real Tile Layer (Google Maps Vector / Satellite / OSM) */}
              <TileLayer
                url={getTileUrl()}
                attribution='&copy; <a href="https://maps.google.com">Google Maps Platform</a>'
              />

              {/* Highway Corridor Blue Polyline */}
              <Polyline
                positions={routePolyline}
                color="#4285F4"
                weight={6}
                opacity={0.85}
              />

              {/* Origin Marker (Indore) */}
              <Marker
                position={[22.7196, 75.8577]}
                icon={createCityPinIcon('Indore', true)}
              />

              {/* Destination Marker (Khargone) */}
              <Marker
                position={[21.8247, 75.6102]}
                icon={createCityPinIcon('Khargone', false)}
              />

              {/* Driver Ride Markers */}
              {currentRidesList.map((ride) => {
                const isSelected = selectedRide.id === ride.id;
                return (
                  <Marker
                    key={ride.id}
                    position={[ride.lat, ride.lng]}
                    icon={createCustomMarkerIcon(ride.driverName, ride.costPerSeat, isSelected, activeStatus)}
                    eventHandlers={{
                      click: () => setSelectedRideId(ride.id),
                    }}
                  />
                );
              })}
            </MapContainer>
          </div>

          {/* 4. SLIDE-UP RIDE DETAIL BOTTOM SHEET CARD */}
          {selectedRide && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111827',
                borderRadius: '24px 24px 0 0',
                padding: '1.25rem',
                borderTop: '3px solid #4285F4',
                boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)',
                zIndex: 2000,
                position: 'relative',
              }}
            >
              {/* Header Status & Price */}
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
                      ? '🟢 LIVE ON GOOGLE MAPS'
                      : activeStatus === 'upcoming'
                      ? '🟡 UPCOMING SCHEDULED'
                      : '⚪ COMPLETED TRIP'}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827' }}>{selectedRide.costPerSeat}</span>
                  <span style={{ fontSize: '0.675rem', color: '#6B7280', display: 'block', lineHeight: 1 }}>per seat</span>
                </div>
              </div>

              {/* Driver Details */}
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

              {/* Location & Time Banner */}
              <div style={{ backgroundColor: '#FAFAFA', borderRadius: '12px', padding: '0.65rem 0.85rem', border: '1px solid #F3F4F6', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.775rem', fontWeight: '800', color: '#E6A700', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={13} />
                  <span>{selectedRide.departureTime}</span>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span>{corridor.from}</span>
                  <span style={{ color: '#4285F4', fontWeight: '800' }}>──────────────→</span>
                  <span>{corridor.to}</span>
                </div>

                {selectedRide.currentLocation && (
                  <div style={{ fontSize: '0.75rem', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Navigation size={13} style={{ color: '#4285F4' }} />
                    <span>Google Maps GPS: <strong>{selectedRide.currentLocation}</strong> ({selectedRide.lat}, {selectedRide.lng})</span>
                  </div>
                )}
              </div>

              {/* Seats & CTA */}
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
