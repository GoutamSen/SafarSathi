import React from 'react';

export default function Footer({ onAdminClick, onDriverClick, onPassengerClick }) {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        
        {/* Main 4-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 8C8 8 11 5 17 5C23 5 24 9.5 24 12C24 16.5 10 16 10 20.5C10 23.5 12 27 20 27C25 27 26.5 24.5 26.5 24.5"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="26.5" cy="24.5" r="2.5" fill="#FFFFFF" />
                  <circle cx="8" cy="8" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                  SafarSaathi
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '800', color: '#E6A700', lineHeight: 1 }}>
                  .
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#9CA3AF', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              India's premier verified carpooling & route-sharing community connecting co-travellers on regional & intercity routes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Platform Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <a href="#hero" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Find a Ride</a>
              <a href="#live-journeys" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Live Journeys</a>
              <a href="#how-it-works" style={{ color: '#9CA3AF', textDecoration: 'none' }}>How It Works</a>
              <a href="#why-us" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Why SafarSaathi</a>
              <a href="#safety" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Safety & Trust</a>
            </div>
          </div>

          {/* User Portals */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              User & Admin Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <button
                onClick={onPassengerClick}
                style={{ background: 'none', border: 'none', color: '#9CA3AF', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
              >
                👤 Passenger Portal
              </button>
              <button
                onClick={onDriverClick}
                style={{ background: 'none', border: 'none', color: '#9CA3AF', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
              >
                🚗 Driver & Rider Portal
              </button>
              <button
                onClick={onAdminClick}
                style={{ background: 'none', border: 'none', color: '#E6A700', textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem', padding: 0, fontWeight: '700' }}
              >
                🛡️ Platform Admin Dashboard
              </button>
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Trust & Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <span>📞 24x7 Safety Relay: +91 1800-SAFAR</span>
              <span>✉️ support@safarsaathi.in</span>
              <span>📍 MP & Regional Hubs</span>
              <span>🔒 Zero Pre-Payment Guarantee</span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#6B7280',
          }}
        >
          <div>
            © {new Date().getFullYear()} SafarSaathi Technologies. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
