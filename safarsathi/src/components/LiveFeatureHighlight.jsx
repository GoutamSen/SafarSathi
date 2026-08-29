import React, { useState } from 'react';
import { MapPin, Navigation, Zap, CheckCircle2, Play, Pause, RefreshCw, ArrowRight } from 'lucide-react';

export default function LiveFeatureHighlight({ onOpenJoinModal }) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span className="pulse-indicator" />
            <span>On-The-Fly Matching Engine</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Already on the Road? Find a SafarSaathi Along the Way.
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            No advance planning required. Drivers broadcast live routes, and passengers instantly match along highway checkpoints.
          </p>
        </div>

        {/* Route Visualization Box */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            backgroundColor: '#111827',
            padding: '2.5rem 1.75rem',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(230, 167, 0, 0.3)',
          }}
        >
          {/* Header Bar of Demo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#E6A700',
                  boxShadow: '0 0 10px #E6A700',
                }}
              />
              <span style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
                Live Match Simulation
              </span>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.825rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            </button>
          </div>

          {/* Grid Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Vector Highway Map */}
            <div
              style={{
                position: 'relative',
                backgroundColor: '#1F2937',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                height: '320px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 450 270" fill="none">
                <defs>
                  <pattern id="highlightGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#highlightGrid)" />

                <path d="M 30 220 Q 150 220 220 130 T 420 50" stroke="#374151" strokeWidth="20" strokeLinecap="round" />
                <path d="M 30 220 Q 150 220 220 130 T 420 50" stroke="#E6A700" strokeWidth="6" strokeLinecap="round" />

                <path d="M 170 170 Q 200 150 260 100" stroke="#C98F00" strokeWidth="8" strokeDasharray="4 4" strokeLinecap="round">
                  <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
                </path>

                <g transform="translate(20, 200)">
                  <circle cx="10" cy="10" r="6" fill="#E6A700" />
                  <text x="22" y="14" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter">Driver: Indore</text>
                </g>

                <g transform="translate(150, 150)">
                  <circle cx="12" cy="12" r="16" fill="#E6A700" fillOpacity="0.25" />
                  <circle cx="12" cy="12" r="7" fill="#E6A700" />
                  <text x="26" y="16" fill="#E6A700" fontSize="11" fontWeight="700" fontFamily="Inter">Current: Pithampur</text>
                </g>

                <g transform="translate(250, 85)">
                  <circle cx="10" cy="10" r="6" fill="#C98F00" />
                  <text x="22" y="14" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="Inter">Passenger Drop: Dhamnod</text>
                </g>
              </svg>
            </div>

            {/* Live Data Summary Card */}
            <div>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                }}
              >
                <div className="badge-pill badge-green" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                  <span>✨ 94% Overlapping Corridor</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem', color: '#FFFFFF' }}>
                  Live Route Match Found
                </h3>

                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  Driver Rajesh is currently near <strong>Pithampur Toll</strong> with 2 available seats heading towards Khargone.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                    <span>Instant pickup point suggestion</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                    <span>Transparent seat expense calculation (₹160)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                    <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                    <span>OTP-verified pickup safety</span>
                  </div>
                </div>

                <button
                  onClick={onOpenJoinModal}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  Try Live Route Matching
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
