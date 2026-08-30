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

  // Fallback left alternative highway coordinates (Indore -> Khargone via Mandav/Dhamnod) - Image 2 Left Route
  const defaultAlternativeLeft = [
    [22.7196, 75.8577], // Indore
    [22.6344, 75.8078], // Rau Circle
    [22.6074, 75.6811], // Pithampur Bypass
    [22.4000, 75.4500], // Dhar Road Junction
    [22.3300, 75.4000], // Mandav
    [22.2155, 75.4716], // Dhamnod
    [22.0200, 75.6000], // Kasrawad
    [21.8247, 75.6102], // Khargone
  ];

  // Fallback right alternative highway coordinates (Indore -> Khargone via Barwaha/Sanawad) - Image 2 Right Route
  const defaultAlternativeRight = [
    [22.7196, 75.8577], // Indore
    [22.6850, 75.8450], // Rajendra Nagar
    [22.4680, 75.8050], // Simrol
    [22.3300, 75.8500], // Choral
    [22.2540, 76.0400], // Barwaha
    [22.1800, 76.0600], // Sanawad
    [21.9000, 75.9000], // Gogawan Bypass
    [21.8247, 75.6102], // Khargone
  ];

  const [routePolyline, setRoutePolyline] = useState(defaultFallbackRoute);
  const [alternativeLeftPolyline, setAlternativeLeftPolyline] = useState(defaultAlternativeLeft);
  const [alternativeRightPolyline, setAlternativeRightPolyline] = useState(defaultAlternativeRight);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // 0 = Lowest Km Main Route (127 km), 1 = Mandav Alt, 2 = Sanawad Alt

  // Route metadata options - Lowest distance route (127 km) is default main route
  const routeOptionsData = [
    {
      index: 0,
      name: 'Fastest Highway (SH-27)',
      shortName: 'Fastest',
      duration: '3 hr 15 min',
      distance: '127 km',
      eta: '7:09 pm',
      tag: 'Main Route'
    },
    {
      index: 1,
      name: 'Via Mandav / Dhamnod',
      shortName: 'Mandav',
      duration: '3 hr 45 min',
      distance: '161 km',
      eta: '7:39 pm',
      tag: 'Alt Route'
    },
    {
      index: 2,
      name: 'Via Sanawad / Barwaha',
      shortName: 'Sanawad',
      duration: '3 hr 38 min',
      distance: '148 km',
      eta: '7:32 pm',
      tag: 'Alt Route'
    }
  ];

  const activeRouteInfo = routeOptionsData[selectedRouteIndex] || routeOptionsData[0];

  // Google Maps Exact 2-Style Route Configurations (Matching Reference Image)
  const ACTIVE_ROUTE_STYLE = {
    casingColor: '#00004D',
    casingWeight: 16,
    casingOpacity: 0.95,
    mainColor: '#0500B8',
    mainWeight: 11,
    mainOpacity: 1,
    coreColor: '#2015ED',
    coreWeight: 4,
    coreOpacity: 0.9,
  };

  const INACTIVE_ROUTE_STYLE = {
    outerColor: '#4355B9',
    outerWeight: 7,
    outerOpacity: 0.95,
    innerColor: '#F8FAFC',
    innerWeight: 3,
    innerOpacity: 1,
  };

  const fromName = corridor.from || 'Indore';
  const toName = corridor.to || 'Khargone';
  const originCoords = corridor.fromCoords || CITY_COORDS[fromName] || [22.7196, 75.8577];
  const destinationCoords = corridor.toCoords || CITY_COORDS[toName] || [21.8247, 75.6102];

  // Dynamically fetch accurate OSRM road geometry for smooth curves snapped to highways for all 3 routes
  useEffect(() => {
    let isMounted = true;

    const fetchRoadRoute = async () => {
      try {
        // Route 0 (Direct SH-27 Maheshwar)
        const res0 = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`
        );
        const data0 = await res0.json();
        if (isMounted && data0.code === 'Ok' && data0.routes?.[0]?.geometry?.coordinates) {
          const coords0 = data0.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          if (coords0.length > 0) {
            coords0[0] = originCoords;
            coords0[coords0.length - 1] = destinationCoords;
          }
          setRoutePolyline(coords0);
        }

        // Route 1 (Via Mandav / Dhamnod NH-52)
        const res1 = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};75.4000,22.3300;${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`
        );
        const data1 = await res1.json();
        if (isMounted && data1.code === 'Ok' && data1.routes?.[0]?.geometry?.coordinates) {
          const coords1 = data1.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          if (coords1.length > 0) {
            coords1[0] = originCoords;
            coords1[coords1.length - 1] = destinationCoords;
          }
          setAlternativeLeftPolyline(coords1);
        }

        // Route 2 (Via Sanawad / Barwaha SH-27)
        const res2 = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${originCoords[1]},${originCoords[0]};76.0400,22.2540;${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`
        );
        const data2 = await res2.json();
        if (isMounted && data2.code === 'Ok' && data2.routes?.[0]?.geometry?.coordinates) {
          const coords2 = data2.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          if (coords2.length > 0) {
            coords2[0] = originCoords;
            coords2[coords2.length - 1] = destinationCoords;
          }
          setAlternativeRightPolyline(coords2);
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
        ? '#EF4444'
        : status === 'upcoming'
          ? '#E6A700'
          : '#64748B';

    const isCluster = ride.clusterCount && ride.clusterCount > 1;

    // Crisp Vector SVG Car Icon for high-res visibility
    const carSvg = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.4 2 12v4c0 .6.4 1 1 1h2"/>
        <circle cx="7" cy="17" r="2.2" fill="#FFFFFF"/>
        <path d="M9 17h6"/>
        <circle cx="17" cy="17" r="2.2" fill="#FFFFFF"/>
      </svg>
    `;

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
            background: ${status === 'live' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : color};
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 800;
            font-family: sans-serif;
            border: 3px solid #FFFFFF;
            box-shadow: ${status === 'live' ? '0 0 16px rgba(239, 68, 68, 0.8), 0 4px 12px rgba(0,0,0,0.35)' : '0 4px 12px rgba(0,0,0,0.35)'};
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
        iconAnchor: [0, 0],
      });
    }

    // Individual Ride Pin
    let iconContent = status === 'live' ? carSvg : (status === 'upcoming' ? '📅' : '✓');

    if (isSelected) {
      // 1. Selected Ride Pin (Highly Prominent Red Glow + Active Driver Label)
      const html = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -100%);
          cursor: pointer;
          z-index: 1000;
        ">
          <!-- Active Vehicle Circle Badge -->
          <div style="
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: ${status === 'live' ? 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)' : color};
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            border: 3.5px solid #FFFFFF;
            box-shadow: ${status === 'live' ? '0 0 24px #EF4444, 0 0 0 5px rgba(239, 68, 68, 0.35)' : '0 4px 14px rgba(0,0,0,0.4)'};
            transition: all 0.25s ease;
          ">
            ${iconContent}
          </div>

          <!-- Active Details Label (Shown ONLY for selected ride) -->
          <div style="
            background-color: ${status === 'live' ? '#EF4444' : color};
            color: #FFFFFF;
            padding: 3px 9px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 800;
            font-family: sans-serif;
            white-space: nowrap;
            border: 1px solid #FFFFFF;
            margin-top: 3px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5);
          ">
            ${status === 'live' ? '🔴 LIVE:' : '🚗'} ${ride.driverName || 'Live Driver'} (${ride.costPerSeat || 'Book'})
          </div>
        </div>
      `;
      return L.divIcon({
        html,
        className: 'custom-leaflet-selected-pin',
        iconSize: [120, 54],
        iconAnchor: [0, 0],
      });
    }

    // 2. Unselected Live Ride Marker (Vibrant Red Pin with Radar Pulse Animation)
    const html = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: 100;
      ">
        <div style="
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: ${status === 'live' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : color};
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          border: 2.5px solid #FFFFFF;
          box-shadow: ${status === 'live' ? '0 0 16px rgba(239, 68, 68, 0.9), 0 3px 8px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.35)'};
          transition: all 0.2s ease;
        ">
          ${iconContent}
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-leaflet-compact-pin',
      iconSize: [26, 26],
      iconAnchor: [0, 0],
    });
  };

  // Google Maps Style Route Label Chip Marker Icon (White Speech Bubble Badge - Exact Reference Match)
  const createRouteChipIcon = (routeData, isSelected) => {
    // Hide chip on active selected route so main highway line is clear
    if (isSelected) {
      return L.divIcon({ html: '', className: 'hidden-route-chip', iconSize: [0, 0] });
    }

    let tagText = 'Similar ETA';
    if (routeData.shortName === 'Sanawad') {
      tagText = '23 min slower';
    } else if (routeData.shortName === 'Fastest') {
      tagText = 'Fastest';
    }

    return L.divIcon({
      html: `
        <div style="
          background-color: #FFFFFF;
          color: #374151;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 800;
          font-family: sans-serif;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${tagText}</span>
        </div>
      `,
      className: 'custom-google-maps-route-chip',
      iconSize: [110, 28],
      iconAnchor: [0, 0],
    });
  };

  const getRouteMidpoint = (coordsArray) => {
    if (!coordsArray || coordsArray.length === 0) return null;
    const midIdx = Math.floor(coordsArray.length / 2);
    return coordsArray[midIdx];
  };

  // Start origin marker pin (Google Maps style: 🔵 Blue circular marker)
  const startMarkerIcon = L.divIcon({
    html: `
      <div style="
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: #1A73E8;
        border: 3.5px solid #FFFFFF;
        box-shadow: 0 0 16px rgba(26, 115, 232, 0.95), 0 3px 10px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
      ">
        <div style="width: 6px; height: 6px; border-radius: 50%; background-color: #FFFFFF;"></div>
      </div>
    `,
    className: 'route-start-pin',
    iconSize: [22, 22],
    iconAnchor: [0, 0],
  });

  // End destination marker pin (Google Maps style: 🔴 Red destination pin)
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
          background: linear-gradient(135deg, #EA4335 0%, #D93025 100%);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(234, 67, 53, 0.65);
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
      </div>
    `,
    className: 'route-end-pin',
    iconSize: [28, 28],
    iconAnchor: [0, 0],
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
          {/* Live Tab (Vibrant Crimson Red Button when Selected) */}
          <button
            onClick={() => {
              setActiveStatus('live');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.35rem 0.7rem',
              backgroundColor: activeStatus === 'live' ? '#DC2626' : 'transparent',
              border: activeStatus === 'live' ? '1.5px solid #F87171' : '1px solid transparent',
              borderRadius: '20px',
              color: '#FFFFFF',
              opacity: activeStatus === 'live' ? 1 : 0.65,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: activeStatus === 'live' ? '0 2px 12px rgba(220, 38, 38, 0.65)' : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeStatus === 'live' ? '#FFFFFF' : '#EF4444',
                display: 'inline-block',
                boxShadow: activeStatus === 'live' ? '0 0 6px #FFFFFF' : '0 0 6px #EF4444',
              }}
            />
            <span style={{ color: activeStatus === 'live' ? '#FFFFFF' : '#F87171', fontWeight: '800', letterSpacing: '0.03em' }}>Live</span>
            <span
              style={{
                backgroundColor: activeStatus === 'live' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(239, 68, 68, 0.18)',
                color: activeStatus === 'live' ? '#FFFFFF' : '#F87171',
                padding: '1px 6.5px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '800',
                border: activeStatus === 'live' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              {stats.activeNow}
            </span>
          </button>

          {/* Upcoming Tab (Vibrant Warm Amber Button when Selected) */}
          <button
            onClick={() => {
              setActiveStatus('upcoming');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.35rem 0.7rem',
              backgroundColor: activeStatus === 'upcoming' ? '#D97706' : 'transparent',
              border: activeStatus === 'upcoming' ? '1.5px solid #FBBF24' : '1px solid transparent',
              borderRadius: '20px',
              color: '#FFFFFF',
              opacity: activeStatus === 'upcoming' ? 1 : 0.65,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: activeStatus === 'upcoming' ? '0 2px 12px rgba(217, 119, 6, 0.65)' : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            <span style={{ width: '6.5px', height: '6.5px', borderRadius: '50%', backgroundColor: activeStatus === 'upcoming' ? '#FFFFFF' : '#F59E0B', display: 'inline-block' }} />
            <span style={{ color: activeStatus === 'upcoming' ? '#FFFFFF' : '#FBBF24', fontWeight: '800' }}>Upcoming</span>
            <span
              style={{
                backgroundColor: activeStatus === 'upcoming' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(245, 158, 11, 0.18)',
                color: activeStatus === 'upcoming' ? '#FFFFFF' : '#FBBF24',
                padding: '1px 6.5px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: '800',
                border: activeStatus === 'upcoming' ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              {stats.upcomingToday}
            </span>
          </button>

          {/* Past Tab (Clean Slate Gray Button when Selected) */}
          <button
            onClick={() => {
              setActiveStatus('completed');
              setSelectedRideId(null);
            }}
            style={{
              padding: '0.35rem 0.7rem',
              backgroundColor: activeStatus === 'completed' ? '#475569' : 'transparent',
              border: activeStatus === 'completed' ? '1.5px solid #94A3B8' : '1px solid transparent',
              borderRadius: '20px',
              color: '#FFFFFF',
              opacity: activeStatus === 'completed' ? 1 : 0.6,
              fontSize: '0.775rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.25s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: activeStatus === 'completed' ? '#FFFFFF' : '#64748B', display: 'inline-block' }} />
            <span style={{ color: activeStatus === 'completed' ? '#FFFFFF' : '#94A3B8' }}>Past</span>
            <span
              style={{
                backgroundColor: activeStatus === 'completed' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(148, 163, 184, 0.16)',
                color: activeStatus === 'completed' ? '#FFFFFF' : '#94A3B8',
                padding: '1px 6.5px',
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

              {/* --- EXACT GOOGLE MAPS 2-STYLE ROUTE RENDERING SYSTEM --- */}
              {[
                { id: 0, positions: routePolyline },
                { id: 1, positions: alternativeLeftPolyline },
                { id: 2, positions: alternativeRightPolyline },
              ]
                .sort((a, b) => (a.id === selectedRouteIndex ? 1 : b.id === selectedRouteIndex ? -1 : 0))
                .map((r) => {
                  if (!r.positions || r.positions.length === 0) return null;
                  const idx = r.id;
                  const isSelected = selectedRouteIndex === idx;

                return (
                  <React.Fragment key={`route-style-${idx}-${isSelected ? 'active' : 'inactive'}`}>
                    {/* Wide 25px Invisible Touch Target for Easy Map Tapping */}
                    <Polyline
                      positions={r.positions}
                      color="transparent"
                      weight={25}
                      opacity={0.001}
                      eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                    />

                    {isSelected ? (
                      /* STYLE 1: MAIN SELECTED ROUTE (Solid Thick Royal Blue Highway) */
                      <>
                        <Polyline
                          positions={r.positions}
                          color={ACTIVE_ROUTE_STYLE.casingColor}
                          weight={ACTIVE_ROUTE_STYLE.casingWeight}
                          opacity={ACTIVE_ROUTE_STYLE.casingOpacity}
                          lineCap="round"
                          lineJoin="round"
                          eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                        />
                        <Polyline
                          positions={r.positions}
                          color={ACTIVE_ROUTE_STYLE.mainColor}
                          weight={ACTIVE_ROUTE_STYLE.mainWeight}
                          opacity={ACTIVE_ROUTE_STYLE.mainOpacity}
                          lineCap="round"
                          lineJoin="round"
                          eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                        />
                        <Polyline
                          positions={r.positions}
                          color={ACTIVE_ROUTE_STYLE.coreColor}
                          weight={ACTIVE_ROUTE_STYLE.coreWeight}
                          opacity={ACTIVE_ROUTE_STYLE.coreOpacity}
                          lineCap="round"
                          lineJoin="round"
                        />
                      </>
                    ) : (
                      /* STYLE 2: NORMAL ALTERNATIVE ROUTE (Outlined Blue Road) */
                      <>
                        <Polyline
                          positions={r.positions}
                          color={INACTIVE_ROUTE_STYLE.outerColor}
                          weight={INACTIVE_ROUTE_STYLE.outerWeight}
                          opacity={INACTIVE_ROUTE_STYLE.outerOpacity}
                          lineCap="round"
                          lineJoin="round"
                          eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                        />
                        <Polyline
                          positions={r.positions}
                          color={INACTIVE_ROUTE_STYLE.innerColor}
                          weight={INACTIVE_ROUTE_STYLE.innerWeight}
                          opacity={INACTIVE_ROUTE_STYLE.innerOpacity}
                          lineCap="round"
                          lineJoin="round"
                          eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                        />
                      </>
                    )}
                  </React.Fragment>
                );
              })}

              {/* --- GOOGLE MAPS STYLE ROUTE LABEL CHIPS ON MAP --- */}
              {[
                { id: 0, positions: routePolyline, data: routeOptionsData[0] },
                { id: 1, positions: alternativeLeftPolyline, data: routeOptionsData[1] },
                { id: 2, positions: alternativeRightPolyline, data: routeOptionsData[2] },
              ].map((r, idx) => {
                const mid = getRouteMidpoint(r.positions);
                if (!mid) return null;
                const isSelected = selectedRouteIndex === idx;
                return (
                  <Marker
                    key={`chip-${idx}-${isSelected ? 'sel' : 'unsel'}`}
                    position={mid}
                    icon={createRouteChipIcon(r.data, isSelected)}
                    eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                  />
                );
              })}

              {/* Start Location Pin (Blue Halo Dot - Locked to exact start of route) */}
              <Marker position={originCoords} icon={startMarkerIcon} />

              {/* End Location Pin (Red Teardrop Pin - Locked to exact end of route) */}
              <Marker position={destinationCoords} icon={endMarkerIcon} />

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
                bottom: selectedRide ? '16px' : '82px',
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
                transition: 'all 0.2s ease',
              }}
            >
              <Layers size={13} />
              <span>{mapStyle === 'google-roadmap' ? 'Satellite' : 'Roadmap'}</span>
            </button>

            {/* Google Maps Style Bottom Route Summary Bar (Exact Match to Reference Screenshot) */}
            {!selectedRide && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  zIndex: 1000,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '36px',
                  padding: '0.65rem 1.15rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Dismiss / Close Round Button */}
                <button
                  onClick={onClose}
                  title="Close Map"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#334155',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={18} />
                </button>

                {/* Center Route Metrics Block (Big Bold Green Time + Distance km & ETA) */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#15803D', lineHeight: 1.1, fontFamily: 'sans-serif' }}>
                    {activeRouteInfo.duration}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', marginTop: '2px', fontFamily: 'sans-serif' }}>
                    {activeRouteInfo.distance} <span style={{ opacity: 0.5 }}>•</span> {activeRouteInfo.eta}
                  </div>
                </div>

                {/* Navigation / Route Switch Action Button */}
                <button
                  onClick={() => setSelectedRouteIndex((prev) => (prev + 1) % routeOptionsData.length)}
                  title="Switch Route"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#334155',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Navigation size={18} style={{ transform: 'rotate(45deg)' }} />
                </button>
              </div>
            )}
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
