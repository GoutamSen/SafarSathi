import React from 'react';
import { Search, Users, Car, CheckCircle2, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onPlanJourneyClick }) {
  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Enter your route or browse live rides matching your exact direction and schedule.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Connect',
      description: 'Connect with verified co-travellers and drivers heading along your route.',
      icon: Users,
    },
    {
      number: '03',
      title: 'Travel',
      description: 'Share available vehicle seats, track live location, and enjoy a comfortable ride.',
      icon: Car,
    },
    {
      number: '04',
      title: 'Complete',
      description: 'Verify pickup with OTP, split journey expenses fairly, and rate your experience.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 4rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Simple & Transparent</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            How SafarSaathi Works
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Connecting co-travellers sharing the same route in 4 easy steps.
          </p>
        </div>

        {/* Horizontal Step Flow */}
        <div className="steps-container" style={{ position: 'relative' }}>
          
          {/* Subtle Connecting Line for Desktop */}
          <div className="connecting-line" style={{
            position: 'absolute',
            top: '40px',
            left: '10%',
            right: '10%',
            height: '2px',
            borderTop: '2px dashed rgba(230, 167, 0, 0.4)',
            zIndex: 1,
          }} />

          <div
            className="steps-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.number}
                  className="card"
                  style={{
                    padding: '2rem 1.5rem',
                    borderRadius: '24px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    boxShadow: 'var(--shadow-md)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Step Icon inside Light Yellow Circle */}
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: '#FFF4CC',
                      color: '#E6A700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      position: 'relative',
                      boxShadow: '0 4px 12px rgba(230, 167, 0, 0.2)',
                    }}
                  >
                    <IconComp size={32} />

                    {/* Step Number Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        backgroundColor: '#E6A700',
                        color: '#111827',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {idx + 1}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      marginBottom: '0.5rem',
                      color: '#111827',
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.925rem',
                      color: '#6B7280',
                      lineHeight: '1.6',
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div
          style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            backgroundColor: '#FAFAFA',
            borderRadius: '24px',
            padding: '2.25rem',
            border: '1px solid #E5E7EB',
            maxWidth: '720px',
            margin: '3.5rem auto 0 auto',
          }}
        >
          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>
            Ready to find co-travellers on your next trip?
          </h4>
          <p style={{ color: '#6B7280', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
            Whether you drive or need a ride, SafarSaathi matches your route in seconds.
          </p>
          <button
            onClick={onPlanJourneyClick}
            className="btn btn-primary"
          >
            Start Planning Your Journey
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .connecting-line {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
