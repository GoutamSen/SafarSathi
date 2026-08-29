import React from 'react';
import { ShieldCheck, Zap, DollarSign, Leaf, Phone, HeartHandshake } from 'lucide-react';

export default function WhySafarSaathi() {
  const features = [
    {
      title: 'Govt ID Verified',
      subtitle: 'Aadhaar & DL Check',
      description: 'Every user passes automated government ID checks before booking or listing rides.',
      icon: ShieldCheck,
    },
    {
      title: 'Real-Time Match',
      subtitle: 'Instant En-Route Pickup',
      description: 'Our algorithm pairs you with travellers already driving along your exact highway corridor.',
      icon: Zap,
    },
    {
      title: '70% Cost Savings',
      subtitle: 'Fair Expense Sharing',
      description: 'Share fuel costs fairly with co-travellers instead of paying high solo taxi fares.',
      icon: DollarSign,
    },
    {
      title: 'Eco-Friendly Travels',
      subtitle: 'Reduce Carbon Footprint',
      description: 'Fewer empty vehicle seats means lower carbon emissions across major highways.',
      icon: Leaf,
    },
    {
      title: 'Private Call Relay',
      subtitle: 'Masked Contact Info',
      description: 'Connect with drivers via proxy calls without sharing your private phone number.',
      icon: Phone,
    },
    {
      title: 'Trust & Community',
      subtitle: '2-Way Rating Audit',
      description: 'Both riders and drivers maintain ratings to keep SafarSaathi safe and friendly.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Built For Modern Commuters</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Why Choose SafarSaathi?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Experience the safest, most economical intercity carpooling platform in MP.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '2rem 1.75rem',
                  borderRadius: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: '#FFF4CC',
                    color: '#E6A700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <IconComp size={26} />
                </div>

                <div style={{ fontSize: '0.775rem', color: '#C98F00', fontWeight: '700', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.subtitle}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.925rem', color: '#6B7280', lineHeight: '1.55' }}>
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
