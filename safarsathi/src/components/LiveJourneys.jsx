import React, { useState } from 'react';
import { MapPin, Clock, Users, Car, Star, ShieldCheck, ArrowRight, Navigation, Sparkles } from 'lucide-react';

export default function LiveJourneys({ publishedJourneys = [], onSelectJourney, onOpenAllJourneys }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const defaultJourneysData = [
    {
      id: 'lj-1',
      isLive: true,
      routeFrom: 'Indore',
      routeTo: 'Khargone',
      currentLocation: 'Near Pithampur Toll',
      etaPickup: '5 minutes',
      availableSeats: 2,
      totalSeats: 4,
      vehicleType: 'Car',
      vehicleModel: 'Tata Nexon EV (AC)',
      driverName: 'Rajesh Sharma',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.9',
      driverTrips: '48 journeys',
      isVerified: true,
      costPerSeat: '₹160',
      departureTime: 'Live Now (Left 15 mins ago)',
      estimatedTotalTime: '1 hr 40 mins',
      amenities: ['AC', 'Music', 'No Smoking', 'Luggage Space'],
    },
    {
      id: 'lj-2',
      isLive: true,
      routeFrom: 'Bhopal',
      routeTo: 'Indore',
      currentLocation: 'Near Ashta Bypass',
      etaPickup: '12 minutes',
      availableSeats: 3,
      totalSeats: 4,
      vehicleType: 'Car',
      vehicleModel: 'Maruti Suzuki Dzire',
      driverName: 'Vikram Singh',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.85',
      driverTrips: '62 journeys',
      isVerified: true,
      costPerSeat: '₹220',
      departureTime: 'Live Now (Left 25 mins ago)',
      estimatedTotalTime: '2 hrs 15 mins',
      amenities: ['AC', 'Charging Port', 'Spacious Seats'],
    },
    {
      id: 'lj-3',
      isLive: true,
      routeFrom: 'Ujjain',
      routeTo: 'Dewas',
      currentLocation: 'Near Narwar Crossing',
      etaPickup: '8 minutes',
      availableSeats: 1,
      totalSeats: 3,
      vehicleType: 'Car',
      vehicleModel: 'Hyundai Creta',
      driverName: 'Priya Verma',
      driverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.95',
      driverTrips: '35 journeys',
      isVerified: true,
      costPerSeat: '₹95',
      departureTime: 'Live Now (Left 10 mins ago)',
      estimatedTotalTime: '45 mins',
      amenities: ['AC', 'Female Friendly', 'Clean Vehicle'],
    },
    {
      id: 'lj-4',
      isLive: true,
      routeFrom: 'Indore',
      routeTo: 'Pithampur',
      currentLocation: 'Near Rajendra Nagar',
      etaPickup: '3 minutes',
      availableSeats: 1,
      totalSeats: 1,
      vehicleType: 'Bike',
      vehicleModel: 'Royal Enfield Hunter 350',
      driverName: 'Amit Joshi',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      driverRating: '4.92',
      driverTrips: '85 rides',
      isVerified: true,
      costPerSeat: '₹60',
      departureTime: 'Live Now',
      estimatedTotalTime: '25 mins',
      amenities: ['Helmet Provided', 'Quick Ride', 'No Traffic Delay'],
    },
  ];

  const liveJourneysData = [...publishedJourneys, ...defaultJourneysData];

  const routesFilter = ['All', '🚗 Cars Only', '🏍️ Bikes Only', 'Indore → Khargone', 'Bhopal → Indore'];

  const filteredJourneys = activeFilter === 'All'
    ? liveJourneysData
    : activeFilter === '🚗 Cars Only'
    ? liveJourneysData.filter(j => j.vehicleType === 'Car')
    : activeFilter === '🏍️ Bikes Only'
    ? liveJourneysData.filter(j => j.vehicleType === 'Bike')
    : liveJourneysData.filter(j => `${j.routeFrom} → ${j.routeTo}` === activeFilter);

  return (
    <section id="live-journeys" style={{ padding: '5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span className="pulse-indicator" />
            <span>Real-Time Route Matching</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Live Journeys Near You
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Find travellers already on the road (Cars & Bikes) heading your way.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          {routesFilter.map((route) => {
            const isActive = activeFilter === route;
            return (
              <button
                key={route}
                onClick={() => setActiveFilter(route)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1.5px solid #E6A700' : '1px solid #E5E7EB',
                  backgroundColor: isActive ? '#E6A700' : '#FFFFFF',
                  color: isActive ? '#111827' : '#111827',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(230, 167, 0, 0.3)' : 'var(--shadow-sm)',
                }}
              >
                {route === 'All' ? '🌐 All Active Journeys' : route}
              </button>
            );
          })}
        </div>

        {/* Responsive Grid of Journey Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem',
        }}>
          {filteredJourneys.map((journey) => (
            <div
              key={journey.id}
              className="card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: journey.isUserPublished ? '2px solid #E6A700' : '1px solid #E5E7EB',
                boxShadow: journey.isUserPublished ? '0 10px 30px rgba(230, 167, 0, 0.2)' : 'var(--shadow-md)',
              }}
            >
              {/* Top Header */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                }}>
                  {journey.isUserPublished ? (
                    <div className="badge-pill badge-green" style={{ fontSize: '0.775rem', padding: '0.25rem 0.75rem' }}>
                      <span className="pulse-indicator" />
                      <span style={{ fontWeight: '700' }}>🌟 YOUR PUBLISHED RIDE</span>
                    </div>
                  ) : (
                    <div className="badge-pill badge-green" style={{ fontSize: '0.775rem', padding: '0.25rem 0.75rem' }}>
                      <span className="pulse-indicator" />
                      <span>🟡 {journey.vehicleType === 'Bike' ? 'BIKE RIDE' : 'CAR POOL'}</span>
                    </div>
                  )}

                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: '800',
                    color: '#C98F00',
                  }}>
                    {journey.costPerSeat}
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}> / seat</span>
                  </div>
                </div>

                {/* Route Title */}
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: '800',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                }}>
                  <span>{journey.routeFrom}</span>
                  <span style={{ color: '#E6A700' }}>➔</span>
                  <span>{journey.routeTo}</span>
                </div>

                {/* Details Box */}
                <div style={{
                  backgroundColor: '#FFF4CC',
                  borderRadius: '16px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  fontSize: '0.875rem',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(230, 167, 0, 0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Navigation size={15} style={{ color: '#C98F00' }} />
                      Current location:
                    </span>
                    <span style={{ fontWeight: '700', color: '#111827' }}>{journey.currentLocation}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={15} style={{ color: '#C98F00' }} />
                      ETA to pickup:
                    </span>
                    <span style={{ fontWeight: '800', color: '#C98F00' }}>{journey.etaPickup}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Users size={15} style={{ color: '#E6A700' }} />
                      Available seats:
                    </span>
                    <span style={{ fontWeight: '800', color: '#111827', backgroundColor: '#FFFFFF', padding: '0.15rem 0.6rem', borderRadius: '6px' }}>
                      {journey.availableSeats} {journey.vehicleType === 'Bike' ? 'Rider Seat' : 'Seats Left'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Car size={15} style={{ color: '#C98F00' }} />
                      Vehicle:
                    </span>
                    <span style={{
                      fontWeight: '700',
                      color: '#111827',
                      backgroundColor: '#FFFFFF',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}>
                      {journey.vehicleType === 'Bike' ? '🏍️ Bike • ' : '🚗 Car • '}{journey.vehicleModel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver & CTA Footer */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid #E5E7EB',
                  marginBottom: '1rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={journey.driverAvatar}
                      alt={journey.driverName}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #FFF4CC',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {journey.driverName}
                        {journey.isVerified && (
                          <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', color: '#C98F00', fontWeight: '700' }}>
                          <Star size={13} fill="#C98F00" /> {journey.driverRating}
                        </span>
                        <span>•</span>
                        <span>{journey.driverTrips}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectJourney(journey)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.8rem' }}
                >
                  View Journey
                  <ArrowRight size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onOpenAllJourneys}
            className="btn btn-secondary btn-lg"
          >
            <Sparkles size={18} style={{ color: '#E6A700' }} />
            View All Live Journeys
          </button>
        </div>

      </div>
    </section>
  );
}
