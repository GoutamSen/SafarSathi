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

import { realtimeSync } from './services/realtimeSync';

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
  const [currentRoleMode, setCurrentRoleMode] = useState('passenger'); // 'passenger' | 'driver'
  const [activeModalRole, setActiveModalRole] = useState(null);
  const [pendingDriverNotification, setPendingDriverNotification] = useState(null);

  // Real-Time Multi-Tab Cross-Communication Subscription Engine
  React.useEffect(() => {
    const unsubscribe = realtimeSync.subscribe((data) => {
      const { type, payload } = data;
      if (type === 'RIDE_PUBLISHED' && payload) {
        setPublishedJourneys((prev) => {
          if (prev.some((j) => j.id === payload.id)) return prev;
          return [payload, ...prev];
        });
        showToast(`🔔 LIVE MULTI-TAB ALERT: New Ride Published "${payload.routeFrom} ➔ ${payload.routeTo}" by ${payload.driverName}!`);
      } else if (type === 'SEAT_REQUESTED' && payload) {
        setPendingDriverNotification({
          id: `req-${Date.now()}`,
          passengerName: 'Rahul (Rider ★ 4.9)',
          routeFrom: payload.routeFrom || 'Indore',
          routeTo: payload.routeTo || 'Khargone',
          pickupPoint: payload.pickupPoint || 'Bhawarkua Square',
          requestedSeats: payload.requestedSeats || 1,
          totalFare: payload.totalFare || 160,
          time: 'Just Now',
        });
        showToast(`🔔 REAL-TIME ALERT: New Passenger Seat Request received!`);
      } else if (type === 'BOOKING_ACCEPTED') {
        setConfirmedBookings((prev) =>
          prev.map((b) => ({ ...b, bookingStatus: 'BOOKING_CONFIRMED' }))
        );
        showToast(`🎉 REAL-TIME ALERT: Driver Accepted Request! Pickup OTP Unlocked: 4829.`);
      } else if (type === 'TRIP_STARTED') {
        showToast(`🟢 REAL-TIME ALERT: Trip Started! Highway Live GPS Tracking active.`);
      } else if (type === 'PAYMENT_COMPLETED') {
        showToast(`🎉 REAL-TIME ALERT: Payment Completed Successfully! Fare settled.`);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRoleChange = (newRole) => {
    setCurrentRoleMode(newRole);
    if (newRole === 'driver') {
      showToast('🚗 Switched to Driver Host Mode! Post your route & accept passenger requests.');
    } else {
      showToast('🧳 Switched to Passenger Mode! Search verified rides & book seats.');
    }
  };

  const [requestingJourney, setRequestingJourney] = useState(null);

  const handleBookingConfirmed = (newBooking) => {
    setConfirmedBookings((prev) => [newBooking, ...prev]);
    showToast(`🎉 Seat Request Sent to Driver ${newBooking.driverName}! Waiting for driver approval...`);
    setTimeout(() => {
      const activeSec = document.getElementById('my-active-bookings');
      if (activeSec) {
        activeSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDriverAcceptBooking = (bookingId) => {
    setConfirmedBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: 'BOOKING_CONFIRMED' } : b
      )
    );
    showToast(`🎉 Driver Rajesh Sharma Accepted Request! 4-Digit Pickup OTP Generated: 4829.`);
  };

  const handlePublishJourney = (newJourney) => {
    setPublishedJourneys((prev) => [newJourney, ...prev]);
    showToast(`🎉 Ride Published Successfully! Navigated to My Published Rides dashboard.`);
    setTimeout(() => {
      const pubSec = document.getElementById('my-published-rides');
      if (pubSec) {
        pubSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
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
        currentRoleMode={currentRoleMode}
        onRoleChange={handleRoleChange}
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
          <section id="my-active-bookings" className="container" style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
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
                  <span>🎟️ MY ACTIVE BOOKING REQUESTS & PASSES ({confirmedBookings.length})</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Pay directly to host after verifying OTP</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {confirmedBookings.map((booking, idx) => {
                  const isPending = booking.bookingStatus === 'REQUEST_PENDING';
                  return (
                    <div
                      key={booking.id || idx}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        backgroundColor: '#FFFFFF',
                        padding: '1.15rem 1.25rem',
                        borderRadius: '16px',
                        border: isPending ? '2px dashed #E6A700' : '1px solid #E5E7EB',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.8rem', color: isPending ? '#B45309' : '#15803D', fontWeight: '800', marginBottom: '0.2rem' }}>
                          {isPending ? '⏳ REQUEST SENT (Pending Driver Approval)' : '✅ RIDE CONFIRMED & ACTIVE PASS'} • {booking.departureTime || 'Today'}
                        </div>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '0.4rem' }}>
                          {booking.routeFrom} ➔ {booking.routeTo}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#6B7280' }}>
                          <span>Driver: <strong>{booking.driverName}</strong> (Govt ID Verified)</span>
                          <span>Vehicle: <strong>{booking.vehicleModel}</strong></span>
                          <span>Pickup Point: <strong>{booking.pickupPoint}</strong></span>
                          <span>Fare: <strong style={{ color: '#D97706' }}>₹{booking.totalFare}</strong> ({booking.requestedSeats || 1} Seat)</span>
                        </div>
                      </div>

                      {isPending ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
                          <span style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: '800' }}>Waiting for Driver Response...</span>
                          <button
                            type="button"
                            onClick={() => handleDriverAcceptBooking(booking.id)}
                            className="btn btn-primary"
                            style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem', whiteSpace: 'nowrap', backgroundColor: '#22C55E', borderColor: '#22C55E', color: '#FFFFFF' }}
                          >
                            🔔 Driver: Accept Request ➔
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedJourney(booking)}
                          className="btn btn-primary btn-shine"
                          style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                        >
                          Open Ticket & Pickup OTP ➔
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 2.6 MY PUBLISHED RIDES & DRIVER DASHBOARD */}
        {publishedJourneys.length > 0 && (
          <section id="my-published-rides" className="container" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #E5E7EB',
              borderRadius: '24px',
              padding: '1.5rem',
              color: '#111827',
              boxShadow: 'var(--shadow-md)',
            }}>
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🚗 My Published Rides
                  </h3>
                  <span className="badge-pill" style={{ backgroundColor: '#FFF4CC', color: '#C98F00', fontSize: '0.775rem', fontWeight: '800', padding: '0.2rem 0.65rem' }}>
                    {publishedJourneys.length} Active Ride{publishedJourneys.length > 1 ? 's' : ''}
                  </span>
                </div>

                <button
                  onClick={handleOpenOffer}
                  className="btn btn-primary btn-shine"
                  style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
                >
                  + Offer Another Ride ➔
                </button>
              </div>

              {/* Grid of Simplified Intelligent Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {publishedJourneys.map((j) => {
                  const hasBookedPassengers = (j.confirmedPassengersCount && j.confirmedPassengersCount > 0) ||
                    confirmedBookings.some((b) => (b.rideId === j.id || (b.routeFrom === j.routeFrom && b.routeTo === j.routeTo && b.id !== 'cb-sample-1')) && b.bookingStatus === 'BOOKING_CONFIRMED');
                  const hasPendingRequest = pendingDriverNotification && pendingDriverNotification.routeFrom === j.routeFrom && pendingDriverNotification.routeTo === j.routeTo;
                  const isOtpReady = hasBookedPassengers || hasPendingRequest;

                  return (
                    <div
                      key={j.id}
                      style={{
                        backgroundColor: '#FAFAFA',
                        borderRadius: '18px',
                        padding: '1.25rem',
                        border: '1.5px solid #E5E7EB',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div>
                        {/* Status & Price Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                          <div className="badge-pill badge-green" style={{ fontSize: '0.75rem', padding: '0.2rem 0.65rem' }}>
                            <span className="pulse-indicator" />
                            <span>🟡 PUBLISHED</span>
                          </div>

                          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#C98F00' }}>
                            {j.costPerSeat} <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>/ seat</span>
                          </div>
                        </div>

                        {/* Route Title */}
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{j.routeFrom}</span>
                          <span style={{ color: '#E6A700' }}>➔</span>
                          <span>{j.routeTo}</span>
                        </h4>

                        {/* Simplified Info Box */}
                        <div style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '12px',
                          padding: '0.85rem 1rem',
                          border: '1px solid #E5E7EB',
                          fontSize: '0.85rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.45rem',
                          marginBottom: '1.15rem',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280' }}>📍 Pickup:</span>
                            <strong style={{ color: '#111827' }}>{j.currentLocation}</strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280' }}>🕐 Departure:</span>
                            <strong style={{ color: '#C98F00' }}>{j.departureTime}</strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280' }}>{j.vehicleType === 'Bike' ? '🏍️ Vehicle:' : '🚗 Vehicle:'}</span>
                            <strong style={{ color: '#111827' }}>{j.vehicleModel}</strong>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #E5E7EB', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                            <span style={{ color: '#6B7280' }}>👥 Passenger Status:</span>
                            <strong style={{ color: hasBookedPassengers ? '#15803D' : (hasPendingRequest ? '#D97706' : '#4B5563'), fontWeight: '800' }}>
                              {hasBookedPassengers ? '🟢 1 Passenger Confirmed' : (hasPendingRequest ? '🔔 1 Seat Request Alert!' : `👥 ${j.availableSeats} Seat(s) Available`)}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Context-Aware Primary Action Button */}
                      <div>
                        <button
                          onClick={() => {
                            setSelectedJourney(j);
                            setActiveModalRole('driver');
                          }}
                          className="btn btn-primary btn-shine"
                          style={{
                            width: '100%',
                            padding: '0.8rem',
                            fontSize: '0.9rem',
                            backgroundColor: hasBookedPassengers ? '#111827' : (hasPendingRequest ? '#D97706' : '#E6A700'),
                            borderColor: hasBookedPassengers ? '#111827' : (hasPendingRequest ? '#D97706' : '#E6A700'),
                            color: (hasBookedPassengers || hasPendingRequest) ? '#FFFFFF' : '#111827',
                          }}
                        >
                          {hasBookedPassengers ? '🔐 Open Driver Control Room ➔' : (hasPendingRequest ? '🔔 Review Request & Control Room ➔' : '⚙️ Manage Ride ➔')}
                        </button>

                        {/* 3-Dot Quick Options link */}
                        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => showToast('⚙️ Ride Settings: Edit Route, Share Pass, or Cancel Ride')}
                            style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600' }}
                          >
                            ••• Ride Options & Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 3. LIVE JOURNEYS SECTION */}
        <LiveJourneys
          publishedJourneys={publishedJourneys}
          currentRoleMode={currentRoleMode}
          onSelectJourney={(journey) => {
            const isMine = journey.isUserPublished || (journey.driverName && journey.driverName.includes('You'));
            if (isMine) {
              setSelectedJourney(journey);
              setActiveModalRole('driver');
            } else {
              setRequestingJourney(journey);
            }
          }}
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
      {/* Step 2: Passenger Seat Request Modal */}
      {requestingJourney && (
        <JourneyDetailModal
          journey={requestingJourney}
          onClose={() => setRequestingJourney(null)}
          onBookingConfirmed={(newBookingPass) => {
            setRequestingJourney(null);
            handleBookingConfirmed(newBookingPass);
          }}
        />
      )}

      {/* Step 3: Confirmed Ticket & 4-Digit Pickup OTP Pass */}
      {selectedJourney && (
        <RideLifecycleModal
          journey={selectedJourney}
          initialRole={activeModalRole || (selectedJourney.isUserPublished || (selectedJourney.driverName && selectedJourney.driverName.includes('You')) ? 'driver' : 'passenger')}
          currentUser={currentUser}
          onBookingConfirmed={handleBookingConfirmed}
          onClose={() => { setSelectedJourney(null); setActiveModalRole(null); }}
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
          publishedJourneys={publishedJourneys}
          onClose={() => setSelectedCorridor(null)}
          onSelectJourney={(journey) => {
            const isMine = journey.isUserPublished || (journey.driverName && journey.driverName.includes('You'));
            if (isMine) {
              setSelectedJourney(journey);
              setActiveModalRole('driver');
            } else {
              setRequestingJourney(journey);
            }
          }}
        />
      )}

    </div>
  );
}
