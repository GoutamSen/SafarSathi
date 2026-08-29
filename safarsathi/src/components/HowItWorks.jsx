import React from 'react';
import { Search, ShieldCheck, CheckCircle2, Navigation, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onPlanJourneyClick }) {
  const steps = [
    {
      step: '01',
      title: 'Find Your Route',
      description: 'Enter your departure city, destination, and preferred time to discover live matching drivers.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Verify Driver & Vehicle',
      description: 'Check government ID badges, vehicle photos, ratings, and live en-route location.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Share Pickup OTP',
      description: 'Meet your co-traveller at the designated pickup point and verify your secure 4-digit start OTP.',
      icon: CheckCircle2,
    },
    {
      step: '04',
      title: 'Travel & Split Costs',
      description: 'Enjoy a smooth, comfortable journey and pay your fair expense share directly after pickup.',
      icon: Navigation,
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Simple 4-Step Process</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            How SafarSaathi Works
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Connecting trusted co-travellers in under 2 minutes.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Top Number Badge */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '16px',
                        backgroundColor: '#FFF4CC',
                        color: '#E6A700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={24} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: '#E5E7EB',
                      }}
                    >
                      {item.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      marginBottom: '0.65rem',
                      color: '#111827',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: '#6B7280',
                      lineHeight: '1.55',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onPlanJourneyClick}
            className="btn btn-primary btn-lg btn-shine"
          >
            Plan Your Journey Now
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
