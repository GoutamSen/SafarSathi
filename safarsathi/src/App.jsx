import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import LiveJourneys from './components/LiveJourneys';
import HowItWorks from './components/HowItWorks';
import WhySafarSaathi from './components/WhySafarSaathi';
import LiveFeatureHighlight from './components/LiveFeatureHighlight';
import DualPersona from './components/DualPersona';
import SafetySection from './components/SafetySection';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { JourneyDetailModal, OfferRideModal, JoinModal } from './components/Modals';
import RideLifecycleModal from './components/RideLifecycleModal';
import RouteExplorerModal from './components/RouteExplorerModal';

export default function App() {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalMode, setJoinModalMode] = useState('join');
  const [toastMessage, setToastMessage] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [publishedJourneys, setPublishedJourneys] = useState([]);

  const [confirmedBookings, setConfirmedBookings] = useState([
    {
      id: 'cb-sample-1',
      routeFrom: 'Indore',
      routeTo: 'Khargone',
      driverName: 'Rajesh Sharma',
      driverRating: 4.9,
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      vehicleType: 'Car',
      vehicleModel: 'Tata Nexon EV (AC)',
      pickupPoint: 'Near Pithampur Toll',
      totalFare: 160,
      requestedSeats: 1,
      bookingStatus: 'BOOKING_CONFIRMED',
      departureTime: 'Tomorrow, 08:00 AM',
    }
  ]);
  const [activeModalRole, setActiveModalRole] = useState('passenger');

  const handleBookingConfirmed = (newBooking) => {
    setConfirmedBookings((prev) => [newBooking, ...prev]);
    showToast(`🎉 Booking Confirmed! Ticket for "${newBooking.routeFrom} → ${newBooking.routeTo}" saved to My Confirmed Bookings.`);
  };

  const handlePublishJourney = (newJourney) => {
    setPublishedJourneys((prev) => [newJourney, ...prev]);
    showToast(`🎉 Journey Published! Your route "${newJourney.routeFrom} → ${newJourney.routeTo}" is now live.`);
    setTimeout(() => {
      const liveSec = document.getElementById('live-journeys');
      if (liveSec) {
        liveSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const el = e.target;
      if (
        el &&
        (el.tagName === 'A' ||
          el.tagName === 'BUTTON' ||
          el.closest('button') ||
          el.closest('a') ||
          el.closest('.input-focus-wrapper'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSearchSubmit = (searchParams) => {
    showToast(`🔍 Searching route-matched journeys from ${searchParams.from} to ${searchParams.to} for ${searchParams.passengers} passenger(s)...`);
    setTimeout(() => {
      const liveSec = document.getElementById('live-journeys');
      if (liveSec) {
        liveSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenJoin = () => {
    setJoinModalMode('join');
    setIsJoinModalOpen(true);
  };

  const handleOpenLogin = () => {
    setJoinModalMode('login');
    setIsJoinModalOpen(true);
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [pendingActionAfterAuth, setPendingActionAfterAuth] = useState(null);

  const handleOpenOffer = () => {
    if (!currentUser) {
      showToast('🔒 Mobile OTP Login required to offer a ride and share expenses.');
      setJoinModalMode('login');
      setPendingActionAfterAuth('offer_ride');
      setIsJoinModalOpen(true);
    } else {
      setIsOfferModalOpen(true);
    }
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData || { name: 'Rahul Sharma', phone: '9826012345' });
    setIsJoinModalOpen(false);
    showToast(`🎉 Verification Complete! Welcome, ${userData?.name || 'Rahul'}.`);

    if (pendingActionAfterAuth === 'offer_ride') {
      setPendingActionAfterAuth(null);
      setIsOfferModalOpen(true);
    }
  };

  const handleFindClick = () => {
    const searchCard = document.getElementById('search-card');
    if (searchCard) {
      searchCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePassengerRoleClick = () => {
    showToast('👤 Passenger Mode: Browse live rides below and click "Request Seat" to share a journey!');
    handleFindClick();
  };

  const [pendingDriverNotification, setPendingDriverNotification] = useState(null);

  const handleDriverRoleClick = () => {
    setActiveModalRole('driver');
    if (!currentUser) {
      setCurrentUser({ name: 'Rajesh (Driver Host)', phone: '9826099999', role: 'driver' });
    }
    setPendingDriverNotification({
      id: 'req-1',
      passengerName: 'Rahul (Rider ★ 4.9)',
      routeFrom: 'Bhopal',
      routeTo: 'Indore',
      pickupPoint: 'Near Ashta Bypass',
      requestedSeats: 1,
      totalFare: 220,
      time: 'Just Now',
    });
    showToast('🚗 Driver Mode Active: 1 New Seat Request Alert received below!');
  };

  const handleOpenDriverNotification = () => {
    setActiveModalRole('driver');
    setSelectedJourney({
      id: 'req-journey-1',
      driverName: 'Rajesh Sharma',
      driverRating: 4.9,
      driverTrips: '142 Trips',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      vehicleType: 'Car',
      vehicleModel: 'Maruti Suzuki Dzire',
      routeFrom: pendingDriverNotification ? pendingDriverNotification.routeFrom : 'Bhopal',
      routeTo: pendingDriverNotification ? pendingDriverNotification.routeTo : 'Indore',
      currentLocation: pendingDriverNotification ? pendingDriverNotification.pickupPoint : 'Near Ashta Bypass',
      availableSeats: 3,
      costPerSeat: `₹${pendingDriverNotification ? pendingDriverNotification.totalFare : 220}`,
      departureTime: 'Live Now',
    });
  };

  const handleAdminRoleClick = () => {
    setActiveModalRole('admin');
    setSelectedJourney({
      id: 'admin-demo',
      driverName: 'Rajesh Sharma',
      driverRating: 4.9,
      driverTrips: '142 Trips',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      vehicleType: 'Car',
      vehicleModel: 'Tata Nexon EV',
      routeFrom: 'Indore',
      routeTo: 'Khargone',
      currentLocation: 'Indore Bhawarkua Square',
      availableSeats: 3,
      costPerSeat: '₹160',
      departureTime: 'Today, 05:30 PM',
    });
    showToast('🛡️ Platform Admin Control Panel Opened!');
  };

  return (
    <div
      className={isHovered ? 'custom-cursor-hover' : ''}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-slate)' }}
    >

      
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 99,
          backgroundColor: '#111827',
          color: '#FFFFFF',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.9rem',
          fontWeight: '600',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          {toastMessage}
        </div>
      )}

      {/* Sticky Navigation */}
      <Navbar
        onOpenJoinModal={handleOpenJoin}
        onOpenLoginModal={handleOpenLogin}
        onOpenOfferModal={handleOpenOffer}
        onPassengerClick={handlePassengerRoleClick}
        onDriverClick={handleDriverRoleClick}
        onAdminClick={handleAdminRoleClick}
        driverNotificationsCount={pendingDriverNotification ? 1 : 0}
        onOpenDriverNotification={handleOpenDriverNotification}
      />

      {/* Main Content Flow: Screen 1 = Hero Viewport, Scroll down = All Remaining Sections */}
      <main style={{ flex: 1 }}>
        
        {/* DRIVER INCOMING REQUEST NOTIFICATION ALERT BANNER */}
        {pendingDriverNotification && (
          <section className="container" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
            <div style={{
              backgroundColor: '#111827',
              border: '2px solid #FFB800',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.5rem',
              color: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(255, 184, 0, 0.25)',
              animation: 'fadeIn 0.3s ease-out',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div className="badge-pill" style={{ backgroundColor: 'rgba(255, 184, 0, 0.2)', color: '#FFB800', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'inline-flex' }}>
                    <span className="pulse-indicator" style={{ backgroundColor: '#FFB800' }} />
                    <span>🔔 NEW SEAT REQUEST NOTIFICATION • {pendingDriverNotification.time}</span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '0.35rem' }}>
                    Passenger {pendingDriverNotification.passengerName} requested {pendingDriverNotification.requestedSeats} Seat(s)
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                    Route: <strong>{pendingDriverNotification.routeFrom} ➔ {pendingDriverNotification.routeTo}</strong> • Pickup Point: <strong>{pendingDriverNotification.pickupPoint}</strong> • Fare Total: <strong style={{ color: '#FFB800' }}>₹{pendingDriverNotification.totalFare}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleOpenDriverNotification}
                    className="btn btn-primary btn-shine"
                    style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                  >
                    Review Request & Accept/Decline ➔
                  </button>

                  <button
                    type="button"
                    onClick={() => setPendingDriverNotification(null)}
                    title="Dismiss Notification"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#94A3B8',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                    }}
                  >
                    Dismiss ✕
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 1. HERO SECTION (Fills Screen 1 Viewport Exactly) */}
        <Hero
          onSearch={handleSearchSubmit}
          onOfferRideClick={handleOpenOffer}
          onOpenCorridorExplorer={(corridor) => setSelectedCorridor(corridor)}
        />

        {/* 2. TRUST / STATS SECTION (Visible on Scroll) */}
        <TrustStats />

        {/* 2.5 MY CONFIRMED BOOKINGS & ACTIVE TRIPS */}
        {confirmedBookings.length > 0 && (
          <section className="container" style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              backgroundColor: '#FFF8E6',
              border: '2px solid #FFB800',
              borderRadius: '20px',
              padding: '1.5rem',
              color: '#111827',
              boxShadow: '0 10px 30px rgba(255, 184, 0, 0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="badge-pill badge-green" style={{ fontSize: '0.8rem' }}>
                  <span className="pulse-indicator" />
                  <span>🎟️ MY CONFIRMED BOOKINGS & PASSES ({confirmedBookings.length})</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Payment Due After Pickup Verification</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {confirmedBookings.map((booking, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      backgroundColor: '#FFFFFF',
                      padding: '1.15rem 1.25rem',
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: '700', marginBottom: '0.2rem' }}>
                        ✅ CONFIRMED BOOKING PASS • {booking.departureTime || 'Today'}
                      </div>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.4rem' }}>
                        {booking.routeFrom} ➔ {booking.routeTo}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                        <span>Driver: <strong>{booking.driverName}</strong> (Govt ID Verified)</span>
                        <span>Vehicle: <strong>{booking.vehicleModel}</strong></span>
                        <span>Pickup Point: <strong>{booking.pickupPoint}</strong></span>
                        <span>Fare: <strong style={{ color: '#D97706' }}>₹{booking.totalFare}</strong></span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedJourney(booking)}
                      className="btn btn-primary btn-shine"
                      style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                    >
                      Open Ticket & Pickup OTP ➔
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. LIVE JOURNEYS SECTION */}
        <LiveJourneys
          publishedJourneys={publishedJourneys}
          onSelectJourney={(journey) => setSelectedJourney(journey)}
          onOpenAllJourneys={() => showToast('🌐 Loading all 50+ live active journey routes in your region...')}
        />

        {/* 4. HOW IT WORKS SECTION */}
        <HowItWorks
          onPlanJourneyClick={handleFindClick}
        />

        {/* 5. WHY SAFARSAATHI SECTION */}
        <WhySafarSaathi />

        {/* 6. LIVE JOURNEY FEATURE HIGHLIGHT */}
        <LiveFeatureHighlight
          onOpenJoinModal={handleOpenJoin}
        />

        {/* 7. DUAL PERSONA */}
        <DualPersona
          onOfferClick={handleOpenOffer}
          onFindClick={handleFindClick}
        />

        {/* 8. SAFETY SECTION */}
        <SafetySection
          onOpenJoinModal={handleOpenJoin}
        />

        {/* 9. TESTIMONIAL SECTION */}
        <Testimonials />

        {/* 10. FINAL CTA SECTION */}
        <CTASection
          onFindClick={handleFindClick}
          onOfferClick={handleOpenOffer}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal Dialogs */}
      {selectedJourney && (
        <RideLifecycleModal
          journey={selectedJourney}
          initialRole={activeModalRole}
          currentUser={currentUser}
          onBookingConfirmed={handleBookingConfirmed}
          onClose={() => { setSelectedJourney(null); setActiveModalRole('passenger'); }}
        />
      )}

      {isOfferModalOpen && (
        <OfferRideModal
          onClose={() => setIsOfferModalOpen(false)}
          onPublishJourney={handlePublishJourney}
        />
      )}

      {isJoinModalOpen && (
        <JoinModal
          mode={joinModalMode}
          onClose={() => setIsJoinModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {selectedCorridor && (
        <RouteExplorerModal
          corridor={selectedCorridor}
          onClose={() => setSelectedCorridor(null)}
          onSelectJourney={(journey) => {
            setSelectedJourney(journey);
            setActiveModalRole('passenger');
          }}
        />
      )}

    </div>
  );
}
