import React from 'react';
import { Zap, ShieldCheck, ArrowRight, Navigation, CheckCircle2, User } from 'lucide-react';

export default function LiveFeatureHighlight({ onOpenJoinModal }) {
  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        <div
          style={{
            backgroundColor: '#111827',
            borderRadius: '32px',
            padding: '3.5rem 2.5rem',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
            border: '1.5px solid rgba(230, 167, 0, 0.3)',
          }}
        >
          {/* Subtle Ambient Lighting */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230, 167, 0, 0.15) 0%, rgba(17, 24, 39, 0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Column Text */}
            <div>
              <div className="badge-pill badge-green" style={{ backgroundColor: 'rgba(230, 167, 0, 0.2)', color: '#E6A700', marginBottom: '1.25rem' }}>
                <span className="pulse-indicator" style={{ backgroundColor: '#E6A700' }} />
                <span>DYNAMIC HIGHWAY RADAR</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.1rem, 4vw, 3rem)',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  marginBottom: '1rem',
                  letterSpacing: '-0.025em',
                }}
              >
                No Long Waiting. Match En-Route In Seconds.
              </h2>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#9CA3AF',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                SafarSaathi continuously scans active vehicles driving along your highway corridor, matching you with empty seats passing your exact pickup spot.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                  <span>Real-time GPS en-route tracking & ETA prediction</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                  <span>Zero upfront prepay – pay after verifying driver & vehicle</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.95rem', color: '#E2E8F0' }}>
                  <CheckCircle2 size={18} style={{ color: '#E6A700' }} />
                  <span>Integrated 4-digit pickup OTP verification safety lock</span>
                </div>
              </div>

              <button
                onClick={onOpenJoinModal}
                className="btn btn-primary btn-lg btn-shine"
              >
                Experience Live Radar
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right Column Graphic Simulation Box */}
            <div
              style={{
                backgroundColor: '#1F2937',
                borderRadius: '24px',
                padding: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Box Top Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '700', color: '#E6A700' }}>
                  <Navigation size={16} />
                  <span>Highway 3 • Indore ➔ Khargone</span>
                </div>
                <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(230, 167, 0, 0.2)', color: '#E6A700', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: '700' }}>
                  14 Active
                </span>
              </div>

              {/* Match Card 1 */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1rem',
                  border: '1.5px solid #E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                    alt="Rajesh Sharma"
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E6A700' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      Rajesh Sharma
                      <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#9CA3AF' }}>
                      Tata Nexon EV • ETA 5 mins
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#E6A700' }}>₹160</span>
                  <span style={{ fontSize: '0.725rem', color: '#E6A700', display: 'block', fontWeight: '700' }}>94% Match</span>
                </div>
              </div>

              {/* Match Card 2 */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                  padding: '1rem 1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0.85,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    alt="Vikram Singh"
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #374151' }}
                  />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#FFFFFF' }}>
                      Vikram Singh
                    </div>
                    <div style={{ fontSize: '0.775rem', color: '#9CA3AF' }}>
                      Maruti Dzire • ETA 12 mins
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#E6A700' }}>₹220</span>
                  <span style={{ fontSize: '0.725rem', color: '#9CA3AF', display: 'block' }}>88% Match</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
