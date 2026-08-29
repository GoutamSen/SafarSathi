import React from 'react';
import { UserCheck, Car, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Clock, Compass } from 'lucide-react';

export default function DualPersona({ onPassengerClick, onDriverClick }) {
  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Tailored Experience</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Built for Drivers & Passengers Alike
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Whether you have empty seats to share or need a comfortable lift, SafarSaathi gives you complete control.
          </p>
        </div>

        {/* 2-Column Persona Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* PERSONA 1: PASSENGERS */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4CC',
                    color: '#E6A700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <UserCheck size={26} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#C98F00', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FOR PASSENGERS
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                    Find Your Ideal Ride
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.975rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Travel comfortably across intercity routes without paying high solo taxi fares or enduring crowded bus stations.
              </p>

              {/* Feature Checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  'Zero pre-payment asked before driver verification',
                  '1-Tap OTP boarding confirmation at pickup',
                  'Masked phone call relay for total privacy',
                  '₹1,00,000 Trip Insurance protection on every ride',
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={18} style={{ color: '#E6A700', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.925rem', color: '#111827', fontWeight: '500' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Action */}
            <button
              onClick={onPassengerClick}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Book a Ride as Passenger
              <ArrowRight size={18} />
            </button>
          </div>

          {/* PERSONA 2: DRIVERS & CAR OWNERS */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF4CC',
                    color: '#E6A700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Compass size={26} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#C98F00', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    FOR DRIVERS & RIDERS
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                    Share Your Empty Seats
                  </h3>
                </div>
              </div>

              <p style={{ fontSize: '0.975rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Driving somewhere anyway? Share your empty seats (Car or Bike) and offset your fuel costs with verified co-travellers.
              </p>

              {/* Feature Checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  'Set your own seat price & route schedule',
                  'Accept or decline incoming passenger requests',
                  'Instant payout transfer post-ride completion',
                  'Earn SuperHost badges & bonus SafarPoints',
                ].map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <CheckCircle2 size={18} style={{ color: '#E6A700', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.925rem', color: '#111827', fontWeight: '500' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Action */}
            <button
              onClick={onDriverClick}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Offer Seats as Driver
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
