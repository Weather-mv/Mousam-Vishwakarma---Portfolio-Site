import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import CustomCursor from './components/CustomCursor';

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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      <Footer />
    </Router>
  );
}
