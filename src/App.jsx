import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Lazy load heavy page components for better initial bundle size
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const K12Videos = lazy(() => import('./pages/K12Videos'));

// ── SCROLL TO TOP ROUTE TRANSITION ─────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ── SCROLL PROGRESS BAR ──────────────────────────────
function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" id="scrollProgress" ref={progressBarRef}></div>;
}

export default function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // ── LENIS SMOOTH MOMENTUM SCROLL ────────────────────────
  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      window.lenis = lenis;
    });
  }, []);

  // ── VISITOR ACCESS EMAIL ALERT ─────────────────────────
  useEffect(() => {
    // Only send the email notification once per session to prevent duplicates
    if (!sessionStorage.getItem('access_notified')) {
      const notifyAccess = async () => {
        // Mark session immediately to prevent React StrictMode double-run race conditions
        sessionStorage.setItem('access_notified', 'true');

        if (import.meta.env.DEV) {
          console.log('[Access Alert System] Development mode: Mocking access notification email alert.');
          return;
        }

        try {
          const response = await fetch('/api/notify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (!response.ok) {
            console.warn('[Access Alert System] Failed to send email alert:', data.error || response.statusText);
          } else {
            console.log('[Access Alert System] Access email notification sent successfully.');
          }
        } catch (err) {
          // Fail silently on the client side to avoid impacting the visitor's UX
          console.warn('[Access Alert System] Client side silent warning:', err);
        }
      };

      notifyAccess();
    }
  }, []);

  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      
      <Suspense fallback={
        <div style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 36,
            height: 36,
            border: '2.5px solid #1a1a2e',
            borderTop: '2.5px solid #00d2ff',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/k12-videos" element={<K12Videos />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}
