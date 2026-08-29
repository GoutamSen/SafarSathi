import React from 'react';
import { DollarSign, Users, Zap, Radio, ShieldCheck, Leaf } from 'lucide-react';

export default function WhySafarSaathi() {
  const features = [
    {
      icon: DollarSign,
      title: 'Save More',
      subTitle: 'Share Journey Costs',
      description: 'Split fuel and toll expenses fairly among co-travellers to make intercity trips up to 60% more affordable.',
    },
    {
      icon: Users,
      title: 'Connect & Travel',
      subTitle: 'Travel Together',
      description: 'Connect with verified individuals travelling along your exact path for a social, friendly, and comfortable ride.',
    },
    {
      icon: Zap,
      title: 'Smart Route Matching',
      subTitle: 'Route Optimization',
      description: 'Our proprietary algorithm detects high route overlap so neither driver nor passenger goes out of their way.',
    },
    {
      icon: Radio,
      title: 'Live Journey Matching',
      subTitle: 'On-The-Fly Pickup',
      description: 'Hop onto rides already in motion with live location updates and instant pickup location recommendations.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Trusted',
      subTitle: 'Safety-Focused Experience',
      description: 'Government ID verification, bi-directional community ratings, SOS emergency button, and live tracking links.',
    },
    {
      icon: Leaf,
      title: 'Eco Friendly',
      subTitle: 'Reduce Carbon Emissions',
      description: 'Reduce vehicle carbon emissions and highway congestion by filling empty seats already heading in the same direction.',
    },
  ];

  return (
    <section id="why-us" style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Purpose-Built Co-Travel</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Why Travel with SafarSaathi?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            We're not a taxi service—we're a community platform connecting people heading in the exact same direction.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #E5E7EB',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Minimal Icon inside Soft Yellow Circle */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4CC',
                    color: '#E6A700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <IconComponent size={26} />
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: '#111827',
                    marginBottom: '0.35rem',
                  }}
                >
                  {item.title}
                </h3>

                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: '#C98F00',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.subTitle}
                </div>

                <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
