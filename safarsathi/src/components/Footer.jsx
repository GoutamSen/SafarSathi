import React from 'react';
import { ShieldCheck, Heart, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#111827', color: '#F9FAFB', paddingTop: '4.5rem', paddingBottom: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(230, 167, 0, 0.3)',
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
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                  SafarSaathi
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: '800', color: '#E6A700' }}>
                  .
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.925rem', color: '#9CA3AF', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              India's premier verified intercity ride-sharing community connecting Indore, Bhopal, Khargone & MP corridors.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#E6A700', fontWeight: '700' }}>
              <ShieldCheck size={16} />
              <span>100% Aadhaar & DL Verified Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              POPULAR CORRIDORS
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#9CA3AF' }}>
              <li><a href="#search-card" style={{ color: 'inherit', textDecoration: 'none' }}>Indore ➔ Khargone Rides</a></li>
              <li><a href="#search-card" style={{ color: 'inherit', textDecoration: 'none' }}>Bhopal ➔ Indore Express</a></li>
              <li><a href="#search-card" style={{ color: 'inherit', textDecoration: 'none' }}>Ujjain ➔ Indore Daily Pool</a></li>
              <li><a href="#search-card" style={{ color: 'inherit', textDecoration: 'none' }}>Pithampur ➔ Dhamnod Route</a></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              SAFETY & TRUST
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#9CA3AF' }}>
              <li><a href="#safety" style={{ color: 'inherit', textDecoration: 'none' }}>Aadhaar Verification</a></li>
              <li><a href="#safety" style={{ color: 'inherit', textDecoration: 'none' }}>Private Phone Relay</a></li>
              <li><a href="#safety" style={{ color: 'inherit', textDecoration: 'none' }}>24x7 SOS Support</a></li>
              <li><a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>Zero-Prepay Escrow Guarantee</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              HELP & SUPPORT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#9CA3AF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} style={{ color: '#E6A700' }} />
                <span>support@safarsaathi.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} style={{ color: '#E6A700' }} />
                <span>+91 98260 12345 (24x7 Helpline)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} style={{ color: '#E6A700' }} />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
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
            © {new Date().getFullYear()} SafarSaathi Technologies Pvt. Ltd. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '600',
            }}
          >
            Back to Top
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
