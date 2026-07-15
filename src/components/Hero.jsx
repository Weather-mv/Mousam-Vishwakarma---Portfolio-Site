import React, { useEffect, useRef } from 'react';

export default function Hero({ onViewProject, isVisible }) {
  const containerRef = useRef(null);

  // Helper function to split text into hover-sensitive thick words
  const renderHoverWords = (text) => {
    return text.split(' ').map((word, idx) => (
      <React.Fragment key={idx}>
        <span className="hover-thick-word" data-text={word}>
          {word}
        </span>
        {idx < text.split(' ').length - 1 ? ' ' : ''}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const imgEl = containerRef.current.querySelector('.hero-portrait-image');
    const centerCol = containerRef.current.querySelector('.hero-video-overlay-content');
    const bottomRow = containerRef.current.querySelector('.hero-bottom-row');

    const handleScroll = () => {
      // Disable scroll positioning and translation effects on mobile viewports
      if (window.innerWidth <= 768) {
        if (centerCol) {
          centerCol.style.opacity = '';
          centerCol.style.transform = '';
        }
        if (bottomRow) {
          bottomRow.style.opacity = '';
          bottomRow.style.transform = '';
        }
        return;
      }

      const scrolled = window.scrollY;
      const scrollMax = window.innerHeight * 0.8; // Duration of 80vh
      const progress = Math.min(1, Math.max(0, scrolled / scrollMax));

      // Scroll scale and parallax vertical translation for background video (desktop only)
      if (imgEl) {
        const translateY = progress * 150;
        const scaleVal = 1.0 + progress * 0.08;
        imgEl.style.transform = `translate(-50%, -50%) translate3d(0, ${translateY}px, 0) scale(${scaleVal})`;
      }

      // Fade out details and slide them slightly upwards (desktop only)
      const opacityVal = Math.max(0, 1 - progress * 1.8);
      const translateYText = -progress * 60;

      if (centerCol) {
        centerCol.style.opacity = opacityVal;
        centerCol.style.transform = `translate3d(0, ${translateYText}px, 0)`;
      }
      if (bottomRow) {
        bottomRow.style.opacity = opacityVal;
        bottomRow.style.transform = `translate3d(-50%, ${translateYText}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load to establish state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-pdf-section" ref={containerRef}>
      {/* Grid Container for content overlay */}
      <div className="hero-grid-container">
        {/* Video Wrapper: Video + Overlay Name & Roles */}
        <div className="hero-video-overlay-wrapper">
          <video
            src="https://res.cloudinary.com/dk8c2tqwo/video/upload/v1784137442/Hero_section_Video_e2zyvw.mp4"
            className="hero-portrait-image"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero-video-overlay-content">
            <h1 className="hero-name-title">
              <span className="hero-name-first">
                <span className="hover-thick-word" data-text="Mousam">Mousam</span>
              </span> <br />
              <span className="hero-name-last">
                <span className="hover-thick-word" data-text="Vishwakarma">Vishwakarma</span>
              </span>
            </h1>
            <div className="hero-roles-line">
              {renderHoverWords("UIUX Designer  •  Motion Designer  •  Creative Technologist")}
            </div>
          </div>
        </div>

        {/* Bottom Row: Description */}
        <div className="hero-bottom-row">
          <p className="hero-description-text">
            {renderHoverWords("I create digital experiences that move, respond, and convert. As a UI/UX and Motion Designer with a Creative Technologist's mind, I turn static ideas into interfaces that feel alive. Your brand deserves an experience people remember.")}
          </p>
        </div>
      </div>
    </section>
  );
}
