import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Search,
  Plus,
  Minus,
  Navigation,
  ArrowUpDown,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Car,
  Lock as LockIcon
} from 'lucide-react';

export default function Hero({ onSearch, onOfferRideClick }) {
  const [fromLocation, setFromLocation] = useState('Indore');
  const [toLocation, setToLocation] = useState('Khargone');
  const [journeyDate, setJourneyDate] = useState('2026-08-28');
  const [journeyTime, setJourneyTime] = useState('08:30');
  const [passengers, setPassengers] = useState(2);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('find');

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const citySuggestions = [
    'Indore, MP',
    'Khargone, MP',
    'Pithampur, MP',
    'Bhopal, MP',
    'Ujjain, MP',
    'Dewas, MP',
    'Dhamnod, MP',
    'Sendhwa, MP',
    'Mumbai, MH',
    'Pune, MH'
  ];

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch({
        from: fromLocation,
        to: toLocation,
        date: journeyDate,
        time: journeyTime,
        passengers,
      });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        padding: 'calc(2rem - 6px) 0 1.25rem 0',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {/* Subtle Gold Ambient Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 167, 0, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 167, 0, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Option 1: Subtle Dotted Travel Route, Location Pins & Minimal Car Illustration */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          right: '8%',
          width: '240px',
          height: '150px',
          opacity: 0.22,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        className="hero-subtle-route-bg"
      >
        <svg width="100%" height="100%" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dotted Route Curve */}
          <path
            d="M 15 125 Q 90 125 125 70 T 225 25"
            stroke="#E6A700"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          {/* Departure Location Pin */}
          <g transform="translate(10, 112)">
            <circle cx="10" cy="10" r="9" fill="#FFF4CC" stroke="#E6A700" strokeWidth="2" />
            <circle cx="10" cy="10" r="3.5" fill="#E6A700" />
          </g>

          {/* En-route Minimal Car Icon */}
          <g transform="translate(112, 52) rotate(-22)">
            <rect x="0" y="0" width="22" height="11" rx="3.5" fill="#E6A700" />
            <circle cx="5" cy="11" r="2.5" fill="#111827" />
            <circle cx="17" cy="11" r="2.5" fill="#111827" />
            <rect x="4" y="2" width="14" height="3.5" rx="1" fill="#FFFFFF" fillOpacity="0.85" />
          </g>

          {/* Destination Location Pin */}
          <g transform="translate(215, 12)">
            <circle cx="10" cy="10" r="9" fill="#E6A700" />
            <circle cx="10" cy="10" r="3.5" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'center' }}>

          {/* LEFT COLUMN: HERO SEARCH FORM & HEADLINE */}
          <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>

            {/* Main Headline */}
            <div style={{ textAlign: 'left', marginBottom: '1.35rem' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: '800',
                  lineHeight: '1.15',
                  letterSpacing: '-0.03em',
                  color: '#111827',
                  marginBottom: '0.25rem',
                }}
              >
                Your Journey Is Better{' '}
                <span style={{ color: '#E6A700', display: 'inline-block' }}>
                  Together.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: '#6B7280',
                  lineHeight: '1.3',
                  fontWeight: '400',
                  marginBottom: '0.85rem',
                }}
              >
                Find trusted people travelling in your direction.
              </p>

              {/* Dual Role Segmented Tab Switcher */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '16px',
                  padding: '4px',
                  margin: '0.5rem 0 0.75rem 0',
                  border: '1px solid #E5E7EB',
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('find')}
                  style={{
                    flex: 1,
                    padding: '0.45rem 0.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: activeTab === 'find' ? '#FFFFFF' : 'transparent',
                    color: activeTab === 'find' ? '#111827' : '#6B7280',
                    fontSize: '0.825rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'find' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Search size={14} style={{ color: activeTab === 'find' ? '#E6A700' : '#9CA3AF' }} />
                  Find a Ride
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('offer');
                    if (onOfferRideClick) onOfferRideClick();
                  }}
                  style={{
                    flex: 1,
                    padding: '0.45rem 0.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: activeTab === 'offer' ? '#E6A700' : 'transparent',
                    color: activeTab === 'offer' ? '#111827' : '#6B7280',
                    fontSize: '0.825rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'offer' ? '0 2px 8px rgba(230, 167, 0, 0.25)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Car size={14} style={{ color: activeTab === 'offer' ? '#111827' : '#9CA3AF' }} />
                  Offer a Ride
                </button>
              </div>

              {/* Option 2: Trust Indicators Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '0.35rem 0.65rem',
                  marginTop: '0.85rem',
                  fontSize: '0.725rem',
                  fontWeight: '700',
                  color: '#4B5563',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={13} style={{ color: '#E6A700' }} />
                  Verified Users
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <LockIcon size={13} style={{ color: '#E6A700' }} />
                  Safe Rides
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={13} style={{ color: '#E6A700' }} />
                  Trusted Community
                </span>
              </div>
            </div>

            {/* RIDE SEARCH CARD */}
            <div
              id="search-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '0.8rem 0.9rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06), 0 0 20px rgba(230, 167, 0, 0.1)',
                border: '1.5px solid rgba(230, 167, 0, 0.25)',
              }}
            >
              {/* Card Title Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.55rem',
                }}
              >
                <Navigation size={15} style={{ color: '#E6A700', transform: 'rotate(45deg)' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827' }}>
                  Find Your Ride
                </h3>
              </div>

              <form onSubmit={handleSearchSubmit}>
                {/* FROM FIELD */}
                <div style={{ position: 'relative', marginBottom: '0.1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.725rem', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
                      From
                    </label>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.65rem 0.5rem 0.75rem',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      minHeight: '44px',
                    }}
                  >
                    <MapPin size={15} style={{ color: '#E6A700', flexShrink: 0 }} />
                    <input
                      type="text"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      onFocus={() => setShowFromSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                      placeholder="Enter pickup location"
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '0.825rem',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '700',
                        color: '#111827',
                      }}
                    />

                    {/* Current Location Quick Button */}
                    <button
                      type="button"
                      onClick={() => setFromLocation('Current Location (Bhawarkua, Indore)')}
                      title="Use Current Location"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: '#FFF4CC',
                        color: '#C98F00',
                        border: '1px solid rgba(230, 167, 0, 0.35)',
                        borderRadius: '8px',
                        fontSize: '0.675rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      <Navigation size={11} style={{ transform: 'rotate(45deg)' }} />
                      <span>Current Location</span>
                    </button>
                  </div>

                  {showFromSuggestions && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '2px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-md)',
                        zIndex: 30,
                        maxHeight: '130px',
                        overflowY: 'auto',
                      }}
                    >
                      {citySuggestions.filter(c => c.toLowerCase().includes(fromLocation.toLowerCase())).map((city) => (
                        <div
                          key={city}
                          onClick={() => { setFromLocation(city); setShowFromSuggestions(false); }}
                          style={{
                            padding: '0.45rem 0.7rem',
                            fontSize: '0.775rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid #F3F4F6',
                            color: '#111827',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF4CC'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          📍 {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CENTERED SWAP BUTTON */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0.3rem 0',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <button
                    type="button"
                    onClick={handleSwapLocations}
                    title="Swap From & To"
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #E6A700',
                      color: '#E6A700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <ArrowUpDown size={13} />
                  </button>
                </div>

                {/* TO FIELD */}
                <div style={{ position: 'relative', marginBottom: '0.45rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.725rem', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.15rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
                    To
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.55rem 0.75rem',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      minHeight: '44px',
                    }}
                  >
                    <MapPin size={15} style={{ color: '#E6A700', flexShrink: 0 }} />
                    <input
                      type="text"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      onFocus={() => setShowToSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                      placeholder="Where are you going?"
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        fontSize: '0.825rem',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '700',
                        color: '#111827',
                      }}
                    />
                  </div>

                  {showToSuggestions && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '2px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-md)',
                        zIndex: 30,
                        maxHeight: '130px',
                        overflowY: 'auto',
                      }}
                    >
                      {citySuggestions.filter(c => c.toLowerCase().includes(toLocation.toLowerCase())).map((city) => (
                        <div
                          key={city}
                          onClick={() => { setToLocation(city); setShowToSuggestions(false); }}
                          style={{
                            padding: '0.45rem 0.7rem',
                            fontSize: '0.775rem',
                            cursor: 'pointer',
                            borderBottom: '1px solid #F3F4F6',
                            color: '#111827',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF4CC'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          📍 {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DATE & TIME ROW (2 COLUMNS) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.45rem',
                    marginBottom: '0.45rem',
                  }}
                >
                  {/* Date */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.1rem' }}>
                      Date
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.65rem',
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        minHeight: '42px',
                      }}
                    >
                      <Calendar size={14} style={{ color: '#E6A700', flexShrink: 0 }} />
                      <input
                        type="date"
                        value={journeyDate}
                        onChange={(e) => setJourneyDate(e.target.value)}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-body)',
                          fontWeight: '700',
                          color: '#111827',
                          paddingLeft: '0.2rem',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.1rem' }}>
                      Time
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.65rem',
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        minHeight: '42px',
                      }}
                    >
                      <Clock size={14} style={{ color: '#E6A700', flexShrink: 0 }} />
                      <input
                        type="time"
                        value={journeyTime}
                        onChange={(e) => setJourneyTime(e.target.value)}
                        style={{
                          width: '100%',
                          border: 'none',
                          background: 'transparent',
                          outline: 'none',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-body)',
                          fontWeight: '700',
                          color: '#111827',
                          paddingLeft: '0.2rem',
                          cursor: 'pointer',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* PASSENGERS / SEATS DYNAMIC ROW */}
                <div style={{ marginBottom: '0.55rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.725rem', fontWeight: '800', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.15rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
                    {activeTab === 'offer' ? 'Available Seats' : 'Passengers'}
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0.65rem',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      minHeight: '44px',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#E6A700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '800', color: '#111827' }}>
                      <Users size={15} style={{ color: '#E6A700' }} />
                      <span>
                        {activeTab === 'offer'
                          ? `${passengers} ${passengers === 1 ? 'Seat' : 'Seats'}`
                          : `${passengers} ${passengers === 1 ? 'Person' : 'People'}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(6, passengers + 1))}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#E6A700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                      }}
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                {/* DYNAMIC SUBMIT BUTTON - Refined Yellow Full Width */}
                <button
                  type="submit"
                  className="btn btn-primary btn-shine"
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    backgroundColor: '#E6A700',
                    color: '#111827',
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    borderRadius: '12px',
                    boxShadow: '0 3px 12px rgba(230, 167, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    border: 'none',
                  }}
                >
                  {activeTab === 'offer' ? <Car size={14} /> : <Search size={14} />}
                  <span>{activeTab === 'offer' ? 'PUBLISH RIDE ROUTE' : 'FIND RIDES'}</span>
                </button>
              </form>

              {/* POPULAR QUICK ROUTES CHIPS */}
              <div style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid #F3F4F6' }}>
                <div style={{ fontSize: '0.675rem', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Zap size={12} style={{ color: '#E6A700' }} />
                  <span>Popular Corridors</span>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {[
                    { from: 'Indore', to: 'Khargone' },
                    { from: 'Indore', to: 'Bhopal' },
                    { from: 'Indore', to: 'Ujjain' },
                  ].map((route) => (
                    <button
                      key={`${route.from}-${route.to}`}
                      type="button"
                      onClick={() => {
                        setFromLocation(route.from);
                        setToLocation(route.to);
                      }}
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#FFF4CC',
                        border: '1px solid rgba(230, 167, 0, 0.3)',
                        color: '#111827',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem',
                      }}
                    >
                      <span>{route.from}</span>
                      <span style={{ color: '#C98F00' }}>➔</span>
                      <span>{route.to}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEARBY LIVE RIDES PREVIEW */}
              <div style={{ marginTop: '0.65rem', paddingTop: '0.6rem', borderTop: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ fontSize: '0.675rem', fontWeight: '800', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Car size={12} style={{ color: '#E6A700' }} />
                    <span>Nearby Active Rides</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#E6A700', fontWeight: '800' }}>Live Now</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div
                    onClick={handleSearchSubmit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.4rem 0.55rem',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>🚗</span>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#111827' }}>
                          Rajesh S. ➔ Khargone
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>
                          Today • 08:30 AM • 2 seats left
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.775rem', fontWeight: '800', color: '#C98F00', backgroundColor: '#FFF4CC', padding: '0.12rem 0.4rem', borderRadius: '6px' }}>
                      ₹160
                    </span>
                  </div>

                  <div
                    onClick={handleSearchSubmit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.4rem 0.55rem',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '10px',
                      border: '1px solid #E5E7EB',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.85rem' }}>🚗</span>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#111827' }}>
                          Vikram S. ➔ Bhopal
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#6B7280' }}>
                          Today • 09:15 AM • 3 seats left
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.775rem', fontWeight: '800', color: '#C98F00', backgroundColor: '#FFF4CC', padding: '0.12rem 0.4rem', borderRadius: '6px' }}>
                      ₹220
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ADVANCED INTERACTIVE CORRIDOR VISUALIZER (DESKTOP) */}
          <div className="hero-desktop-visual" style={{ position: 'relative' }}>

            {/* Main Interactive Map Showcase Card */}
            <div
              style={{
                backgroundColor: '#111827',
                borderRadius: '24px',
                padding: '1.75rem',
                color: '#FFFFFF',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
                border: '1.5px solid rgba(230, 167, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div className="badge-pill badge-green" style={{ backgroundColor: 'rgba(230, 167, 0, 0.2)', color: '#E6A700' }}>
                  <span className="pulse-indicator" style={{ backgroundColor: '#E6A700' }} />
                  <span>LIVE CORRIDOR RADAR</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: '600' }}>Indore ➔ Khargone (Highway 3)</span>
              </div>

              {/* Highway Corridor Map Visualizer */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  backgroundColor: '#1F2937',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none">
                  <path d="M 30 160 Q 140 160 200 90 T 370 40" stroke="#374151" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 30 160 Q 140 160 200 90 T 370 40" stroke="#E6A700" strokeWidth="5" strokeLinecap="round" />

                  <path d="M 140 120 Q 180 100 240 65" stroke="#C98F00" strokeWidth="6" strokeDasharray="4 4" strokeLinecap="round">
                    <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  <g transform="translate(20, 140)">
                    <circle cx="10" cy="10" r="6" fill="#E6A700" />
                    <text x="22" y="14" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter">Indore</text>
                  </g>

                  <g transform="translate(180, 75)">
                    <circle cx="12" cy="12" r="14" fill="#E6A700" fillOpacity="0.25" />
                    <circle cx="12" cy="12" r="6" fill="#E6A700" />
                    <text x="26" y="16" fill="#E6A700" fontSize="11" fontWeight="700" fontFamily="Inter">Pithampur (Live)</text>
                  </g>

                  <g transform="translate(340, 25)">
                    <circle cx="10" cy="10" r="6" fill="#C98F00" />
                    <text x="-65" y="14" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter">Khargone</text>
                  </g>
                </svg>
              </div>

              {/* Driver Live Match Box */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Rajesh Sharma"
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E6A700' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.925rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      Rajesh S.
                      <ShieldCheck size={15} style={{ color: '#E6A700' }} />
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#9CA3AF' }}>
                      Tata Nexon EV • <span style={{ color: '#E6A700', fontWeight: '700' }}>2 Seats Left</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#E6A700' }}>₹160</span>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block' }}>ETA 5 mins</span>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Trust Badge */}
            <div
              className="animate-float-slow"
              style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '0.65rem 1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1.5px solid #E6A700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 10,
              }}
            >
              <Zap size={18} style={{ color: '#E6A700' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', color: '#111827', display: 'block' }}>94% Match</strong>
                <span style={{ fontSize: '0.7rem', color: '#6B7280' }}>On-The-Fly Pickup</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .hero-desktop-visual { display: none; }

        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
          .hero-desktop-visual { display: block !important; }
        }
      `}</style>
    </section>
  );
}
