import React, { useEffect, useRef } from 'react';

export default function Hero({ onViewProject, isVisible }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const imgEl = containerRef.current.querySelector('.hero-portrait-image');
    const leftCol = containerRef.current.querySelector('.hero-left-col');
    const rightCol = containerRef.current.querySelector('.hero-right-col');
    const bottomRow = containerRef.current.querySelector('.hero-bottom-row');

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const scrollMax = window.innerHeight * 0.8;
      const progress = Math.min(1, Math.max(0, scrolled / scrollMax));

      // Parallax effect on the portrait image (translate down and slightly scale)
      if (imgEl) {
        const translateY = progress * 150;
        const scaleVal = 1.0 + progress * 0.08;
        imgEl.style.transform = `translate(-50%, -50%) translate3d(0, ${translateY}px, 0) scale(${scaleVal})`;
      }

      // Fade out details and slide them slightly upwards
      const opacityVal = Math.max(0, 1 - progress * 1.8);
      const translateYText = -progress * 60;

      if (leftCol) {
        leftCol.style.opacity = opacityVal;
        leftCol.style.transform = `translate3d(0, ${translateYText}px, 0)`;
      }
      if (rightCol) {
        rightCol.style.opacity = opacityVal;
        rightCol.style.transform = `translate3d(0, ${translateYText}px, 0)`;
      }
      if (bottomRow) {
        bottomRow.style.opacity = opacityVal;
        bottomRow.style.transform = `translate3d(-50%, ${translateYText}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-pdf-section" ref={containerRef}>
      {/* Large Centered Portrait Image */}
      <img
        src="/assets/images/portrait.png"
        className="hero-portrait-image"
        alt="Mousam Vishwakarma"
      />

      {/* Grid Container for content overlay */}
      <div className="hero-grid-container">
        {/* Left Column: Name */}
        <div className="hero-left-col">
          <h1 className="hero-name-title">
            <span className="hero-name-first">Mousam</span> <br />
            <span className="hero-name-last">Vishwakarma</span>
          </h1>
        </div>

        {/* Right Column: Roles */}
        <div className="hero-right-col">
          <div className="hero-roles-list">
            <span className="hero-role-item">UIUX Designer</span>
            <span className="hero-role-item">Motion Designer</span>
            <span className="hero-role-item">Creative Technologist</span>
            <span className="hero-role-item">UI Motion Designer</span>
          </div>
        </div>

        {/* Bottom Row: Description */}
        <div className="hero-bottom-row">
          <p className="hero-description-text">
            I create digital experiences that move, respond, and convert. As a UI/UX and Motion Designer with a Creative Technologist's mind, I turn static ideas into interfaces that feel alive. Your brand deserves an experience people remember.
          </p>
        </div>
      </div>
    </section>
  );
}
