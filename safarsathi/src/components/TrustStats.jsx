import React from 'react';
import { Users, Route, MapPin, Leaf } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      number: '10,000+',
      label: 'Verified Co-Travellers',
      subtext: 'Daily intercity journeys',
      icon: Users,
    },
    {
      number: '2,500+',
      label: 'Rides Completed',
      subtext: 'Zero prepay guarantee',
      icon: Route,
    },
    {
      number: '50+',
      label: 'Active Corridors',
      subtext: 'Indore, Bhopal, Ujjain & more',
      icon: MapPin,
    },
    {
      number: '18.5 Tons',
      label: 'CO₂ Emissions Saved',
      subtext: 'Eco-friendly car pooling',
      icon: Leaf,
    },
  ];

  return (
    <section
      style={{
        padding: '3.5rem 0',
        background: 'linear-gradient(135deg, #E6A700 0%, #C98F00 100%)',
        color: '#111827',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(230, 167, 0, 0.25)',
      }}
    >
      {/* Background Decorative Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.18) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  paddingRight: idx < stats.length - 1 ? '1.5rem' : '0',
                  borderRight: idx < stats.length - 1 ? '1px solid rgba(17, 24, 39, 0.15)' : 'none',
                }}
                className="stat-item"
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    backdropFilter: 'blur(8px)',
                    color: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <IconComponent size={26} />
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
                      fontWeight: '800',
                      color: '#111827',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.number}
                  </div>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      color: '#111827',
                      marginTop: '0.2rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.775rem',
                      color: '#1F2937',
                      fontWeight: '600',
                    }}
                  >
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stat-item {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
