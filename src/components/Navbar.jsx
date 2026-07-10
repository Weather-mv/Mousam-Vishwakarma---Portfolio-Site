import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('--:-- --');
  const [activeSection, setActiveSection] = useState('workSection');

  useEffect(() => {
    // 1. Scroll listener for floating effect & Active Section spy
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const workEl = document.getElementById('workSection');
      const aboutEl = document.getElementById('aboutSection');
      const y = window.scrollY + 180; // Offset

      if (aboutEl && y >= aboutEl.offsetTop) {
        setActiveSection('aboutSection');
      } else {
        setActiveSection('workSection');
      }
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
        <Link to="/" className="nav-logo" id="navLogo" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          <span className="nav-name">Mousam Vishwakarma</span>
          <span className="nav-role">UI/UX &amp; Motion Designer</span>
        </Link>
      </div>
      <div className="nav-center" id="navCenterMenu">
        <a 
          href="#workSection" 
          className={`nav-link ${activeSection === 'workSection' ? 'active' : ''}`} 
          id="navLinkWork"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('workSection');
            if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
          }}
        >
          Work
        </a>
        <a 
          href="#aboutSection" 
          className={`nav-link ${activeSection === 'aboutSection' ? 'active' : ''}`} 
          id="navLinkAbout"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('aboutSection');
            if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
          }}
        >
          About &amp; Career
        </a>
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
