import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection({ onJoinClick, onOfferClick }) {
  return (
    <section
      style={{
        padding: '5.5rem 0',
        background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
        color: '#111827',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <div
            className="badge-pill"
            style={{
              backgroundColor: 'rgba(17, 24, 39, 0.12)',
              color: '#111827',
              marginBottom: '1.25rem',
              display: 'inline-flex',
            }}
          >
            <Sparkles size={16} />
            <span>Join 10,000+ Co-Travellers Today</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
              color: '#111827',
            }}
          >
            Your Journey Is Better Together.
          </h2>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#1F2937',
              marginBottom: '2.5rem',
              maxWidth: '620px',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6',
            }}
          >
            Start sharing seats, saving fuel costs, and meeting verified co-travellers heading in your direction.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onJoinClick}
              className="btn btn-lg"
              style={{
                backgroundColor: '#111827',
                color: '#FFFFFF',
                padding: '0.9rem 2.25rem',
                border: 'none',
              }}
            >
              Join SafarSaathi Free
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onOfferClick}
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#111827',
                border: '1.5px solid #111827',
              }}
            >
              Offer Seats as Driver
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
