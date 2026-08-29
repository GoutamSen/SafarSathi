import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function CTASection({ onFindClick, onOfferClick }) {
  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
            borderRadius: '32px',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: '#111827',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 45px rgba(230, 167, 0, 0.3)',
          }}
        >
          {/* Subtle Decorative Circle Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: '800',
                marginBottom: '1.25rem',
              }}
            >
              <Zap size={16} />
              <span>START SAVING TODAY</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.25rem)',
                fontWeight: '800',
                marginBottom: '1rem',
                color: '#111827',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              }}
            >
              Ready To Upgrade Your Daily Intercity Travels?
            </h2>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#1F2937',
                marginBottom: '2.5rem',
                fontWeight: '500',
                lineHeight: 1.6,
              }}
            >
              Join 10,000+ verified commuters sharing rides across Indore, Bhopal, Khargone & MP corridors.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={onFindClick}
                className="btn btn-lg"
                style={{
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  padding: '1rem 2.25rem',
                  fontSize: '1.05rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.25)',
                }}
              >
                Find a Ride Now
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onOfferClick}
                className="btn btn-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  border: '1.5px solid rgba(17, 24, 39, 0.15)',
                  padding: '1rem 2.25rem',
                  fontSize: '1.05rem',
                  borderRadius: 'var(--radius-xl)',
                }}
              >
                Offer a Ride & Earn
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
