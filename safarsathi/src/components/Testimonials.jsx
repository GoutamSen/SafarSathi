import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rohan Sharma',
      role: 'Regular Commuter (Indore ➔ Khargone)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'SafarSaathi changed my weekend trips home! Shared fuel expenses with a verified driver heading to Khargone. Smooth, safe, and saved over ₹400 compared to solo bus/cab fares.',
      date: '2 days ago',
    },
    {
      name: 'Ananya Verma',
      role: 'IT Professional (Bhopal ➔ Indore)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'As a woman travelling alone on intercity routes, safety was my biggest concern. The 1-tap OTP verification and profile verification gave me complete peace of mind.',
      date: '1 week ago',
    },
    {
      name: 'Deepak Patel',
      role: 'Verified Car Owner (Ujjain ➔ Dewas)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'I travel daily for work. Offering my empty car seats on SafarSaathi covers almost 80% of my monthly fuel cost. Great co-passengers and smooth app interface!',
      date: '3 days ago',
    },
  ];

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Community Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Loved by Thousands of Co-Travellers
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Here is what our community members have to say about their journey experience.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '2rem',
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
                {/* Quote Icon & Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#E6A700" color="#E6A700" />
                    ))}
                  </div>
                  <Quote size={24} style={{ color: '#E6A700', opacity: 0.5 }} />
                </div>

                <p style={{ fontSize: '0.975rem', color: '#374151', lineHeight: '1.65', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {rev.name}
                    <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#6B7280' }}>
                    {rev.role}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
