import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function Hero({ onSearch, onOfferRideClick }) {
  const [fromLocation, setFromLocation] = useState('Indore');
  const [toLocation, setToLocation] = useState('Khargone');
  const [journeyDate, setJourneyDate] = useState('2026-08-28');
  const [journeyTime, setJourneyTime] = useState('08:30');
  const [passengers, setPassengers] = useState(2);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showStickySearch, setShowStickySearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchCard = document.getElementById('search-card');
      if (searchCard) {
        const rect = searchCard.getBoundingClientRect();
        if (rect.bottom < 80) {
          setShowStickySearch(true);
        } else {
          setShowStickySearch(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        padding: '2rem 0 3.5rem 0',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
        
        {/* Main Headline - Refined Warm Yellow */}
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 7vw, 2.4rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              color: '#111827',
              marginBottom: '0.5rem',
            }}
          >
            Your Journey Is Better{' '}
            <span style={{ color: '#E6A700', display: 'block' }}>
              Together.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#6B7280',
              lineHeight: '1.5',
              fontWeight: '400',
              marginBottom: '1.25rem',
            }}
          >
            Find trusted people travelling in your direction.
          </p>

          {/* Top CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <a
              href="#search-card"
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '48px',
                padding: '0 1.25rem',
                backgroundColor: '#E6A700',
                color: '#111827',
                fontSize: '0.95rem',
                fontWeight: '700',
                borderRadius: '16px',
                boxShadow: '0 3px 12px rgba(230, 167, 0, 0.25)',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <Search size={18} />
              Find a Ride
            </a>

            <button
              type="button"
              onClick={onOfferRideClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#E6A700',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem',
              }}
            >
              Offer a Ride →
            </button>
          </div>
        </div>

        {/* RIDE SEARCH CARD - Clean Subtle Design */}
        <div
          id="search-card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '1.6rem 1.35rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid #F3F4F6',
          }}
        >
          {/* Card Title Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.25rem',
            }}
          >
            <Navigation size={20} style={{ color: '#E6A700', transform: 'rotate(45deg)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#111827' }}>
              Find Your Ride
            </h3>
          </div>

          <form onSubmit={handleSearchSubmit}>
            {/* FROM FIELD */}
            <div style={{ position: 'relative', marginBottom: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
                From
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #F3F4F6',
                  borderRadius: '16px',
                }}
              >
                <MapPin size={18} style={{ color: '#E6A700', flexShrink: 0 }} />
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
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '700',
                    color: '#111827',
                  }}
                />
              </div>

              {showFromSuggestions && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F3F4F6',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 30,
                    maxHeight: '160px',
                    overflowY: 'auto',
                  }}
                >
                  {citySuggestions.filter(c => c.toLowerCase().includes(fromLocation.toLowerCase())).map((city) => (
                    <div
                      key={city}
                      onClick={() => { setFromLocation(city); setShowFromSuggestions(false); }}
                      style={{
                        padding: '0.6rem 1rem',
                        fontSize: '0.875rem',
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
                margin: '0.15rem 0',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <button
                type="button"
                onClick={handleSwapLocations}
                title="Swap From & To"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E6A700',
                  color: '#E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(230, 167, 0, 0.18)',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(180deg) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(230, 167, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(230, 167, 0, 0.18)';
                }}
              >
                <ArrowUpDown size={16} />
              </button>
            </div>

            {/* TO FIELD */}
            <div style={{ position: 'relative', marginBottom: '1.1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.35rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E6A700', display: 'inline-block' }} />
                To
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #F3F4F6',
                  borderRadius: '16px',
                }}
              >
                <MapPin size={18} style={{ color: '#E6A700', flexShrink: 0 }} />
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
                    fontSize: '0.95rem',
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
                    marginTop: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F3F4F6',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 30,
                    maxHeight: '160px',
                    overflowY: 'auto',
                  }}
                >
                  {citySuggestions.filter(c => c.toLowerCase().includes(toLocation.toLowerCase())).map((city) => (
                    <div
                      key={city}
                      onClick={() => { setToLocation(city); setShowToSuggestions(false); }}
                      style={{
                        padding: '0.6rem 1rem',
                        fontSize: '0.875rem',
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
                gap: '0.85rem',
                marginBottom: '1.1rem',
              }}
            >
              {/* Date */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.35rem' }}>
                  Date
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #F3F4F6',
                    borderRadius: '16px',
                  }}
                >
                  <Calendar size={16} style={{ color: '#E6A700', flexShrink: 0 }} />
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '700',
                      color: '#111827',
                      paddingLeft: '0.4rem',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.35rem' }}>
                  Time
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.85rem',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #F3F4F6',
                    borderRadius: '16px',
                  }}
                >
                  <Clock size={16} style={{ color: '#E6A700', flexShrink: 0 }} />
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(e) => setJourneyTime(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: '700',
                      color: '#111827',
                      paddingLeft: '0.4rem',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* PASSENGERS ROW */}
            <div style={{ marginBottom: '1.35rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6B7280', marginBottom: '0.35rem' }}>
                Passengers
              </label>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.75rem',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #F3F4F6',
                  borderRadius: '16px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#E6A700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <Minus size={16} strokeWidth={3} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', fontWeight: '800', color: '#111827' }}>
                  <Users size={16} style={{ color: '#E6A700' }} />
                  <span>{passengers} {passengers === 1 ? 'Person' : 'People'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(6, passengers + 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#FFFFFF',
                    color: '#E6A700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="btn btn-primary btn-shine"
              style={{
                width: '100%',
                height: '48px',
                padding: '0 1.25rem',
                backgroundColor: '#E6A700',
                color: '#111827',
                fontSize: '0.95rem',
                fontWeight: '800',
                borderRadius: '16px',
                boxShadow: '0 3px 12px rgba(230, 167, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: 'none',
              }}
            >
              <Search size={18} />
              <span>SEARCH RIDES</span>
            </button>
          </form>
        </div>

      </div>

      {/* Sticky Bottom Search Bar */}
      {showStickySearch && (
        <div
          className="animate-slide-down"
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 2rem)',
            maxWidth: '480px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid #E6A700',
            padding: '0.5rem 0.75rem',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
            <MapPin size={16} style={{ color: '#E6A700' }} />
            <span>{fromLocation} ➔ {toLocation}</span>
          </div>

          <button
            type="button"
            onClick={handleSearchSubmit}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.15rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', backgroundColor: '#E6A700', color: '#111827' }}
          >
            <Search size={14} />
            Search
          </button>
        </div>
      )}
    </section>
  );
}
