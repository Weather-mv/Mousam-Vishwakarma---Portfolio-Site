import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('--:-- --');
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  useEffect(() => {
    // 1. Scroll listener for floating effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Digital clock updater (IST)
    const updateTime = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = ist.getHours();
      const m = ist.getMinutes();
      const ap = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 || 12;
      const displayTime = `${displayH}:${String(m).padStart(2, '0')} ${ap}`;
      setTime(displayTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav id="mainNav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-left">
        {isProjectsPage ? (
          <>
            <Link to="/" className="nav-back-btn" id="navBackBtn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ width: '14px', height: '14px', transform: 'translateY(1px)' }}
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Home</span>
            </Link>
            <span className="nav-divider" style={{ opacity: 0.15, margin: '0 4px' }}>|</span>
            <span className="nav-name">Mousam Vishwakarma</span>
          </>
        ) : (
          <>
            <span className="nav-name">Mousam Vishwakarma</span>
            <span className="nav-role">UI/UX &amp; Motion Designer</span>
          </>
        )}
      </div>
      <div className="nav-right">
        <span className="nav-city">Indore ·</span>
        <span id="navTime">{time}</span>
        <span className="status-dot"></span>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          id="themeToggleBtn"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
