import React, { useState, useEffect } from 'react';
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
  Info,
  Filter
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Known city coordinates lookup table
const CITY_COORDS = {
  'Indore': [22.7196, 75.8577],
  'Khargone': [21.8247, 75.6102],
  'Ujjain': [23.1765, 75.7885],
  'Bhopal': [23.2599, 77.4126],
  'Omkareshwar': [22.2458, 76.1511],
  'Maheshwar': [22.1793, 75.5855],
  'Khandwa': [21.8258, 76.3526],
  'Dhar': [22.5986, 75.2979],
  'Dewas': [22.9676, 76.0534],
  'Ratlam': [23.3315, 75.0367],
};

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

  // Fallback highway coordinates (Indore -> Khargone via SH-27 / Mhow / Simrol / Maheshwar)
  const defaultFallbackRoute = [
    [22.7196, 75.8577], // Indore
    [22.6850, 75.8450], // Rajendra Nagar
    [22.6344, 75.8078], // Rau Circle
    [22.5700, 75.7800], // Mhow Gate
    [22.5532, 75.7554], // Mhow Town
    [22.4680, 75.8050], // Simrol
    [22.4200, 75.8200], // Bheru Ghat
    [22.3300, 75.8500], // Choral
    [22.2540, 76.0400], // Barwaha
    [22.1793, 75.6669], // Mandleshwar
    [22.1800, 75.5855], // Maheshwar
    [22.0200, 75.6000], // Kasrawad
    [21.8247, 75.6102], // Khargone
  ];

  const [routePolyline, setRoutePolyline] = useState(defaultFallbackRoute);

  // Dynamically fetch accurate OSRM road geometry for smooth curves snapped to highways
  useEffect(() => {
    let isMounted = true;
    const fromName = corridor.from || 'Indore';
    const toName = corridor.to || 'Khargone';

    const startCoords = corridor.fromCoords || CITY_COORDS[fromName] || [22.7196, 75.8577];
    const endCoords = corridor.toCoords || CITY_COORDS[toName] || [21.8247, 75.6102];

    const fetchRoadRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (isMounted && data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates) {
          const latLngs = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRoutePolyline(latLngs);
        }
      } catch (err) {
        console.warn('Could not fetch OSRM route, fallback active', err);
      }
    };

    fetchRoadRoute();
    return () => { isMounted = false; };
  }, [corridor]);

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

  // Distinct Live Vehicle & Cluster Pin Marker
  const createCustomMarkerIcon = (ride, isSelected, status) => {
    const color =
      status === 'live'
        ? '#10B981'
        : status === 'upcoming'
          ? '#E6A700'
          : '#64748B';

    const isCluster = ride.clusterCount && ride.clusterCount > 1;

    // Cluster Marker (+5 / +4 Rides format for crowded areas)
    if (isCluster && !isSelected) {
      const html = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -100%);
          cursor: pointer;
          z-index: 200;
        ">
          <!-- Cluster Counter Circle -->
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: ${color};
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 800;
            font-family: sans-serif;
            border: 3px solid #FFFFFF;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35), 0 0 0 3px ${status === 'live' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(230, 167, 0, 0.3)'};
          ">
            +${ride.clusterCount}
          </div>
          <!-- Compact Cluster Label -->
          <div style="
            background-color: rgba(15, 23, 42, 0.9);
            color: #FFFFFF;
            padding: 1px 6px;
            border-radius: 8px;
            font-size: 9px;
            font-weight: 800;
            white-space: nowrap;
            border: 1px solid ${color};
            margin-top: 2px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          ">
            ${ride.clusterCount} Rides Hub
          </div>
        </div>
      `;
      return L.divIcon({
        html,
        className: 'custom-leaflet-cluster-pin',
        iconSize: [60, 48],
        iconAnchor: [30, 48],
      });
    }

    // Individual Ride Pin (Selected ride gets strong green highlight glow)
    let iconSymbol = status === 'upcoming' ? '📅' : status === 'completed' ? '✓' : '🚗';
    let statusTag = isSelected
      ? '🟢 Selected'
      : status === 'live'
        ? 'Live Ride'
        : status === 'upcoming'
          ? 'Upcoming'
          : 'Past Trip';

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
          width: ${isSelected ? '36px' : '26px'};
          height: ${isSelected ? '36px' : '26px'};
          border-radius: 50%;
          background-color: ${isSelected ? '#10B981' : color};
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isSelected ? '16px' : '12px'};
          border: ${isSelected ? '3px solid #FFFFFF' : '2.5px solid #FFFFFF'};
          box-shadow: ${isSelected ? '0 0 20px #10B981, 0 0 0 5px rgba(16, 185, 129, 0.35)' : '0 2px 8px rgba(0,0,0,0.3)'};
          transition: all 0.25s ease;
        ">
          ${iconSymbol}
        </div>

        <!-- Subtitle Label -->
        <div style="
          background-color: ${isSelected ? '#10B981' : 'rgba(15, 23, 42, 0.88)'};
          color: #FFFFFF;
          padding: ${isSelected ? '2px 8px' : '1px 6px'};
          border-radius: 8px;
          font-size: ${isSelected ? '10px' : '9px'};
          font-weight: 800;
          font-family: sans-serif;
          white-space: nowrap;
          border: ${isSelected ? '1px solid #FFFFFF' : `1px solid ${color}`};
          margin-top: 2px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        ">
          ${statusTag}
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-pin',
      iconSize: [60, 48],
      iconAnchor: [30, 48],
    });
  };

  // Start origin marker pin (Blue GPS dot with city label - Navigation style)
  const startMarkerIcon = L.divIcon({
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -50%);
      ">
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: #2563EB;
          border: 3px solid #FFFFFF;
          box-shadow: 0 0 14px rgba(37, 99, 235, 0.9), 0 3px 8px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 7px; height: 7px; border-radius: 50%; background-color: #FFFFFF;"></div>
        </div>
        <div style="
          background-color: rgba(15, 23, 42, 0.92);
          color: #60A5FA;
          padding: 1px 6px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 800;
          margin-top: 3px;
          border: 1px solid rgba(96, 165, 250, 0.4);
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          white-space: nowrap;
        ">
          Start: ${corridor.from || 'Indore'}
        </div>
      </div>
    `,
    className: 'route-start-pin',
    iconSize: [80, 48],
    iconAnchor: [40, 11],
  });

  // End destination marker pin (Red location drop pin with city label)
  const endMarkerIcon = L.divIcon({
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -100%);
      ">
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50% 50% 50% 0;
          background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.6);
          border: 2.5px solid #FFFFFF;
        ">
          <div style="
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: #FFFFFF;
            transform: rotate(45deg);
          "></div>
        </div>
        <div style="
          background-color: rgba(15, 23, 42, 0.92);
          color: #F87171;
          padding: 1px 6px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 800;
          margin-top: 3px;
          border: 1px solid rgba(248, 113, 113, 0.4);
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          white-space: nowrap;
        ">
          End: ${corridor.to || 'Khargone'}
        </div>
      </div>
    `,
    className: 'route-end-pin',
    iconSize: [80, 56],
    iconAnchor: [40, 56],
  });

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
            padding: '0.45rem 1rem',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            zIndex: 2000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
              }}
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h3 style={{ fontSize: '0.975rem', fontWeight: '800', margin: 0, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
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
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#FFFFFF',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 2. ULTRA SLEEK SEGMENTED UNDERLINE TABS STRIP */}
        <div
          style={{
            backgroundColor: '#1E293B',
            padding: '0 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
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
              padding: '0.45rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'live' ? '#34D399' : '#94A3B8',
              opacity: activeStatus === 'live' ? 1 : 0.65,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative',
              borderBottom: activeStatus === 'live' ? '2.5px solid #10B981' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span>Live</span>
            <span
              style={{
                backgroundColor: activeStatus === 'live' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                color: activeStatus === 'live' ? '#34D399' : '#94A3B8',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '800',
                border: activeStatus === 'live' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
              }}
            >
              {stats.activeNow}
            </span>
          </button>

          {/* Upcoming Tab */}
          <button
            onClick={() => {
              setActiveStatus('upcoming');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.45rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'upcoming' ? '#FBBF24' : '#94A3B8',
              opacity: activeStatus === 'upcoming' ? 1 : 0.65,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative',
              borderBottom: activeStatus === 'upcoming' ? '2.5px solid #E6A700' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
            <span>Upcoming</span>
            <span
              style={{
                backgroundColor: activeStatus === 'upcoming' ? 'rgba(230, 167, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                color: activeStatus === 'upcoming' ? '#FBBF24' : '#94A3B8',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '800',
                border: activeStatus === 'upcoming' ? '1px solid rgba(230, 167, 0, 0.4)' : '1px solid transparent',
              }}
            >
              {stats.upcomingToday}
            </span>
          </button>

          {/* Past Tab */}
          <button
            onClick={() => {
              setActiveStatus('completed');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.45rem 0',
              background: 'none',
              border: 'none',
              color: activeStatus === 'completed' ? '#FFFFFF' : '#94A3B8',
              opacity: activeStatus === 'completed' ? 1 : 0.65,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative',
              borderBottom: activeStatus === 'completed' ? '2.5px solid #94A3B8' : '2.5px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <span>✓ Past</span>
            <span
              style={{
                backgroundColor: activeStatus === 'completed' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                color: activeStatus === 'completed' ? '#FFFFFF' : '#94A3B8',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '800',
                border: activeStatus === 'completed' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
              }}
            >
              {stats.total}
            </span>
          </button>
        </div>

        {/* 3. HERO MAP VIEWPORT CANVAS */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

          {/* Clean Segmented Control Filter Overlay (Top Left) */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 1000,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              padding: '0.2rem 0.35rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
            }}
          >
            {/* Live Rides Segment Button */}
            <button
              onClick={() => {
                setActiveStatus('live');
                setSelectedRideId(null);
              }}
              style={{
                background: activeStatus === 'live' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                border: activeStatus === 'live' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                borderRadius: '16px',
                padding: '0.25rem 0.6rem',
                color: activeStatus === 'live' ? '#34D399' : '#94A3B8',
                fontSize: '0.725rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
              Live Rides
            </button>

            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>|</span>

            {/* Upcoming Segment Button */}
            <button
              onClick={() => {
                setActiveStatus('upcoming');
                setSelectedRideId(null);
              }}
              style={{
                background: activeStatus === 'upcoming' ? 'rgba(230, 167, 0, 0.25)' : 'transparent',
                border: activeStatus === 'upcoming' ? '1px solid rgba(230, 167, 0, 0.4)' : '1px solid transparent',
                borderRadius: '16px',
                padding: '0.25rem 0.6rem',
                color: activeStatus === 'upcoming' ? '#FBBF24' : '#94A3B8',
                fontSize: '0.725rem',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
              Upcoming
            </button>

            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>|</span>

            {/* Filter Icon Button */}
            <button
              onClick={() => {}}
              title="Filter Rides"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.25rem 0.4rem',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Filter size={13} />
            </button>
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

              {/* Polished Navigation-Style Dual-Layer Polyline */}
              {/* Outer Casing/Shadow Line (Dark outline for high contrast) */}
              <Polyline
                positions={routePolyline}
                color="#0F172A"
                weight={10}
                opacity={0.8}
                lineCap="round"
                lineJoin="round"
              />

              {/* Main Navigation Blue Polyline (Slim & Refined) */}
              <Polyline
                positions={routePolyline}
                color="#2563EB"
                weight={6}
                opacity={1}
                lineCap="round"
                lineJoin="round"
              />

              {/* High-contrast Inner Highlight Core */}
              <Polyline
                positions={routePolyline}
                color="#60A5FA"
                weight={2}
                opacity={0.9}
                lineCap="round"
                lineJoin="round"
              />

              {/* Start Location Pin (Blue Halo Dot) */}
              {routePolyline && routePolyline.length > 0 && (
                <Marker position={routePolyline[0]} icon={startMarkerIcon} />
              )}

              {/* End Location Pin (Red Teardrop Pin) */}
              {routePolyline && routePolyline.length > 0 && (
                <Marker position={routePolyline[routePolyline.length - 1]} icon={endMarkerIcon} />
              )}

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
