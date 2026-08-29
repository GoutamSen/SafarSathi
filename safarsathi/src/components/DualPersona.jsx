import React from 'react';
import { User, Car, Check, ArrowRight } from 'lucide-react';

export default function DualPersona({ onOfferClick, onFindClick }) {
  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Dual Role Flexibility</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Whether You Drive Or Need A Ride
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Switch seamlessly between passenger and driver host with one verified profile.
          </p>
        </div>

        {/* 2 Persona Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Passenger Persona Card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '24px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E5E7EB',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: '#FFF4CC',
                  color: '#E6A700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <User size={28} />
              </div>

              <div style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                FOR PASSENGERS
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
                Travel Comfortably & Pay Less
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Find reliable co-travellers heading to your destination, split travel expenses, and enjoy stress-free rides.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Up to 70% cheaper than private intercity cabs</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Doorstep or highway junction pickup options</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>100% Verified drivers & private proxy calling</span>
                </div>
              </div>
            </div>

            <button
              onClick={onFindClick}
              className="btn btn-primary btn-shine"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Find a Ride Now
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Driver Host Persona Card */}
          <div
            className="card"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '24px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid rgba(230, 167, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(230, 167, 0, 0.12)',
            }}
          >
            <div>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: '#E6A700',
                  color: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 6px 18px rgba(230, 167, 0, 0.3)',
                }}
              >
                <Car size={28} />
              </div>

              <div style={{ fontSize: '0.8rem', color: '#C98F00', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                FOR DRIVERS / CAR OWNERS
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
                Offer Empty Seats & Cover Fuel
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Travelling intercity alone? Publish your route, choose verified co-passengers, and offset your travel expenses.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Recover up to 100% of fuel & toll costs</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Full control over passenger requests & route stops</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#374151' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF4CC', color: '#E6A700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>Automatic instant fare payouts directly to Bank / UPI</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOfferClick}
              className="btn btn-primary btn-shine"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              Offer a Ride & Share Costs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
