import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLinkClick = (selector) => {
    setIsMenuOpen(false); // Close mobile menu
    if (isHomePage) {
      const el = document.getElementById(selector);
      if (el) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        if (window.lenis) {
          window.lenis.scrollTo(offsetPosition, { duration: 1.2 });
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const showScrolledNavbar = scrolled || !isHomePage;

  return (
    <>
      <nav id="mainNav" className={`${showScrolledNavbar ? 'scrolled' : 'hero-mode'} ${isMenuOpen ? 'menu-open' : ''}`}>
        {/* Brand/Logo for desktop and mobile */}
        <div className="nav-logo-container">
          <Link to="/" className="nav-brand-logo" onClick={() => setIsMenuOpen(false)}>
            MOUSAM
          </Link>
        </div>

        {/* Desktop Links (Hidden on mobile via CSS) */}
        <div className="nav-desktop-links">
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
            id="navLinkAbout"
          >
            ABOUT
          </Link>
          {isHomePage ? (
            <a
              href="#workSection"
              className="nav-link"
              id="navLinkWork"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('workSection');
              }}
            >
              WORKS
            </a>
          ) : (
            <Link to="/" className="nav-link" id="navLinkWork">
              WORKS
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#contact"
              className="nav-link"
              id="navLinkContact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
            >
              CONTACT
            </a>
          ) : (
            <Link to="/#contact" className="nav-link" id="navLinkContact">
              CONTACT
            </Link>
          )}
        </div>

        {/* Right Section: Theme Toggle and Mobile Hamburger */}
        <div className="nav-right-actions">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit'
            }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link 
            to="/about" 
            className={`mobile-menu-link ${location.pathname === '/about' ? 'active' : ''}`} 
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT
          </Link>
          {isHomePage ? (
            <a
              href="#workSection"
              className="mobile-menu-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('workSection');
              }}
            >
              WORKS
            </a>
          ) : (
            <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              WORKS
            </Link>
          )}
          {isHomePage ? (
            <a
              href="#contact"
              className="mobile-menu-link"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
            >
              CONTACT
            </a>
          ) : (
            <Link to="/#contact" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
              CONTACT
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
