import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Anjali Deshmukh',
      role: 'Regular Commuter (Indore ➔ Khargone)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'SafarSaathi is a game-changer for my weekend trips home. I used to pay ₹1200 for solo cabs, but now I get clean EV rides for just ₹160 with verified drivers!',
    },
    {
      name: 'Rohan Sharma',
      role: 'IT Engineer & Car Host (Bhopal ➔ Indore)',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'I drive to Indore office 3 times a week. Offering 2 seats on SafarSaathi completely covers my monthly fuel expenses. The OTP verification gives total peace of mind.',
    },
    {
      name: 'Pooja Agarwal',
      role: 'Student (Ujjain ➔ Indore)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      comment: 'As a woman travelling alone, safety was my top concern. The Aadhaar ID badges and private phone proxy call features make SafarSaathi 100% trustworthy!',
    },
  ];

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-pill badge-green" style={{ marginBottom: '0.85rem' }}>
            <span>Verified User Reviews</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>
            Loved By 10,000+ Travellers
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
            Here is what co-travellers across MP corridors have to say.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem' }}>
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="#E6A700" color="#E6A700" />
                    ))}
                  </div>
                  <Quote size={24} style={{ color: '#E6A700', opacity: 0.5 }} />
                </div>

                <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.6', marginBottom: '1.75rem', italic: 'true' }}>
                  "{item.comment}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFF4CC' }}
                />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {item.name}
                    <ShieldCheck size={16} style={{ color: '#E6A700' }} />
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#6B7280' }}>
                    {item.role}
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
