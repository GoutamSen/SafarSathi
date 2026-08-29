import React, { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle2, Lock, UserCheck, AlertTriangle, ArrowRight, Eye, Check } from 'lucide-react';

export default function SafetySection({ onOpenJoinModal }) {
  const [activeSafetyTab, setActiveSafetyTab] = useState('verification');

  const safetyPoints = [
    {
      id: 'verification',
      title: 'Govt ID & License Verification',
      description: 'Every driver and passenger must verify their Aadhaar / Driving License before making or accepting ride requests.',
      icon: UserCheck,
      details: 'Strict 100% Aadhaar & DL automated cross-check via Govt DigiLocker APIs.'
    },
    {
      id: 'privacy',
      title: 'Private Masked Call Relay',
      description: 'Call co-travellers without exposing your real mobile number using our secure in-app phone proxy.',
      icon: Phone,
      details: 'Dual-way masked call relay protects personal privacy for both rider and host.'
    },
    {
      id: 'emergency',
      title: 'SOS Emergency Response (24x7)',
      description: 'Instant 1-tap SOS button shares your live GPS location with local police and emergency contacts.',
      icon: AlertTriangle,
      details: 'Direct 112 police integration and automatic emergency SMS broadcasts.'
    },
    {
      id: 'rating',
      title: 'Bi-Directional Rating System',
      description: 'Both drivers and passengers rate each other after every journey, maintaining a high-quality community standard.',
      icon: ShieldCheck,
      details: 'Riders with ratings below 4.0 are restricted to ensure community trust.'
    },
  ];

  return (
    <section id="safety" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <ShieldCheck size={16} />
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
          {/* Left Column: Interactive Safety Features List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {safetyPoints.map((item) => {
              const IconComp = item.icon;
              const isSelected = activeSafetyTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveSafetyTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    padding: '1.35rem',
                    borderRadius: '20px',
                    backgroundColor: isSelected ? '#FFF8E6' : '#FAFAFA',
                    border: isSelected ? '2px solid #FFB800' : '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 8px 25px rgba(255, 184, 0, 0.2)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#FFB800' : '#FFFFFF',
                      color: isSelected ? '#111827' : '#FFB800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>
                        {item.title}
                      </h3>
                      {isSelected && (
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#FFB800', color: '#111827', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                    {isSelected && (
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 184, 0, 0.3)', fontSize: '0.825rem', color: '#D97706', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Check size={15} />
                        {item.details}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Central Safety Graphic Card */}
          <div
            style={{
              padding: '2.75rem 2rem',
              borderRadius: '24px',
              backgroundColor: '#FAFAFA',
              border: '1.5px solid rgba(255, 184, 0, 0.25)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: '#FFF8E6',
                color: '#FFB800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                boxShadow: '0 8px 30px rgba(255, 184, 0, 0.35)',
              }}
            >
              <ShieldCheck size={46} />
            </div>

            <h3 style={{ fontSize: '1.55rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111827' }}>
              100% Verified Community
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#4B5563', marginBottom: '1.75rem', lineHeight: '1.6' }}>
              All profiles pass government ID cross-checking, contact verification, and ongoing rating audits.
            </p>

            <div
              style={{
                padding: '1.15rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #E5E7EB',
                fontSize: '0.875rem',
                color: '#111827',
                fontWeight: '600',
                marginBottom: '1.75rem',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: '#D97706' }}>
                <Lock size={16} />
                <span>100% Data Encryption</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: '400' }}>
                Your private phone number and documents are never shared publicly or stored unencrypted.
              </span>
            </div>

            <button
              onClick={onOpenJoinModal}
              className="btn btn-primary btn-shine"
              style={{ width: '100%', padding: '0.9rem' }}
            >
              Join Verified Community
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
