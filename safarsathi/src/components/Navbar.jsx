import React, { useState, useEffect } from 'react';
import { Menu, X, User, ArrowRight, Bell } from 'lucide-react';

export default function Navbar({
  onOpenJoinModal,
  onOpenLoginModal,
  onOpenOfferModal,
  onPassengerClick,
  onDriverClick,
  onAdminClick,
  driverNotificationsCount = 1,
  onOpenDriverNotification
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Find a Ride', href: '#search-card' },
    { label: 'Offer a Ride', action: 'offer' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Safety', href: '#safety' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Brand Logo - Refined Warm Yellow */}
        <a
          href="#hero"
          onClick={() => setActiveTab('Home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', flexShrink: 0 }}
        >
          {/* Refined Warm Yellow Badge Icon */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#E6A700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(230, 167, 0, 0.3)',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 8C8 8 11 5 17 5C23 5 24 9.5 24 12C24 16.5 10 16 10 20.5C10 23.5 12 27 20 27C25 27 26.5 24.5 26.5 24.5"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26.5" cy="24.5" r="2.5" fill="#FFFFFF" />
              <circle cx="8" cy="8" r="2.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Brand Name "SafarSaathi." */}
          <div style={{ display: 'flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: '800',
                color: '#111827',
                letterSpacing: '-0.03em',
              }}
            >
              SafarSaathi
            </span>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: '800',
                color: '#E6A700',
                lineHeight: 1,
              }}
            >
              .
            </span>
          </div>
        </a>

        {/* Centered Desktop Nav Links */}
        <nav
          style={{ display: 'none', alignItems: 'center', gap: '2rem' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href || '#'}
                onClick={(e) => {
                  setActiveTab(link.label);
                  if (link.action === 'offer') {
                    e.preventDefault();
                    onOpenOfferModal();
                  }
                }}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: '600',
                  fontSize: '0.925rem',
                  color: isActive ? '#111827' : '#4B5563',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div
          style={{ display: 'none', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
          className="desktop-actions"
        >
          {driverNotificationsCount > 0 && (
            <button
              type="button"
              onClick={onOpenDriverNotification}
              title={`${driverNotificationsCount} New Passenger Seat Request(s)`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FFF4CC',
                border: '1px solid rgba(230, 167, 0, 0.3)',
                color: '#C98F00',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Bell size={19} />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#E6A700',
                  color: '#111827',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {driverNotificationsCount}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenLoginModal}
            className="btn btn-secondary"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.875rem' }}
          >
            <User size={16} />
            Log In
          </button>

          <button
            type="button"
            className="btn btn-primary btn-shine"
            onClick={onOpenJoinModal}
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.875rem' }}
          >
            Join SafarSaathi
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#111827',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="animate-slide-down"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            padding: '1.25rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href || '#'}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setActiveTab(link.label);
                  if (link.action === 'offer') {
                    e.preventDefault();
                    onOpenOfferModal();
                  }
                }}
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#111827',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFF4CC';
                  e.target.style.color = '#C98F00';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#111827';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #E5E7EB',
            }}
          >
            <button
              className="btn btn-secondary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              style={{ width: '100%', minHeight: '46px', justifyContent: 'center' }}
            >
              <User size={18} />
              Log In
            </button>

            <button
              className="btn btn-primary btn-shine"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              style={{ width: '100%', minHeight: '46px', justifyContent: 'center' }}
            >
              Join SafarSaathi
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Inline Responsive Styles */}
      <style>{`
        .desktop-nav { display: none; }
        .desktop-actions { display: none; }
        .mobile-toggle { display: flex; }

        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
