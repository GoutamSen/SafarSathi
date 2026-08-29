import React from 'react';
import { ShieldCheck, Phone, CheckCircle2, Lock, UserCheck, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SafetySection({ onSafetyCenterClick }) {
  const safetyPoints = [
    {
      title: 'Govt ID & License Verification',
      description: 'Every driver and passenger must verify their Aadhaar / Driving License before making or accepting ride requests.',
      icon: UserCheck,
    },
    {
      title: 'Private Masked Call Relay',
      description: 'Call co-travellers without exposing your real mobile number using our secure in-app phone proxy.',
      icon: Phone,
    },
    {
      title: 'SOS Emergency Response (24x7)',
      description: 'Instant 1-tap SOS button shares your live GPS location with local police and emergency contacts.',
      icon: AlertTriangle,
    },
    {
      title: 'Bi-Directional Rating System',
      description: 'Both drivers and passengers rate each other after every journey, maintaining a high-quality community standard.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="safety" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Uncompromising Safety</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Your Safety Is Our Top Priority
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            We've built multi-layered verification and live tracking into every single journey.
          </p>
        </div>

        {/* 2-Column Section Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Safety Points Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {safetyPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    padding: '1.25rem',
                    borderRadius: '16px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#FFF4CC',
                      color: '#E6A700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.25rem', color: '#111827' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Central Safety Graphic Card */}
          <div
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '24px',
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#FFF4CC',
                color: '#E6A700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 24px rgba(230, 167, 0, 0.3)',
              }}
            >
              <ShieldCheck size={44} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>
              Verified Trust Network
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#6B7280', marginBottom: '1.75rem', lineHeight: '1.6' }}>
              All profiles pass government ID cross-checking, contact verification, and ongoing rating audits.
            </p>

            <div
              style={{
                padding: '1rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                fontSize: '0.875rem',
                color: '#111827',
                fontWeight: '600',
                marginBottom: '1.75rem',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#C98F00' }}>
                <Lock size={16} />
                <span>100% Data Encryption</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '400' }}>
                Your private phone number and documents are never shared publicly or stored unencrypted.
              </span>
            </div>

            <button
              onClick={onSafetyCenterClick}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Learn More at Safety Center
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
