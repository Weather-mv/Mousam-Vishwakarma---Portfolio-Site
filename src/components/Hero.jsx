import React, { useEffect, useRef } from 'react';

const FLOATING_CARDS = [
  {
    id: 'zero-orbit',
    title: 'Zero Orbit Labs',
    category: 'Web Dev / UIUX',
    mediaUrl: '/assets/images/zero-orbit.png',
    mediaType: 'image',
    positionClass: 'pos-hero-1',
    sizeClass: 'outer-card',
    floatClass: 'float-slow-1'
  },
  {
    id: 'emr-healthcare',
    title: 'EMR Healthcare',
    category: 'UI/UX System',
    mediaUrl: '/assets/images/emr_preview.png',
    mediaType: 'image',
    positionClass: 'pos-hero-7',
    sizeClass: 'inner-card',
    floatClass: 'float-medium-1'
  },
  {
    id: 'showcase-fire',
    title: 'Fire Simulation',
    category: '3D Simulation',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1781772648/FIre_rel7dw.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-8',
    sizeClass: 'inner-card',
    floatClass: 'float-fast-1'
  },
  {
    id: 'parkit',
    title: 'Parkit Mobile',
    category: 'Mobile UI/UX',
    mediaUrl: '/assets/images/parkit_preview.png',
    mediaType: 'image',
    positionClass: 'pos-hero-3',
    sizeClass: 'outer-card',
    floatClass: 'float-slow-2'
  },
  {
    id: 'showcase-isro',
    title: 'ISRO Launch',
    category: '3D Aerospace',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1781772802/ISRO_emslfl.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-9',
    sizeClass: 'inner-card',
    floatClass: 'float-medium-2'
  },
  {
    id: 'explainer-hive',
    title: 'Hive Curtain Raiser',
    category: 'Product Promo',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1783683542/Hive_Curtain_Raiser_-_9_Final_With_Music_jrgglh.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-4',
    sizeClass: 'outer-card',
    floatClass: 'float-fast-2'
  },
  {
    id: 'showcase-printing',
    title: 'Printing Machine',
    category: '3D Mechanical Rig',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1781772635/Printing_Machine_ajnr3e.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-2',
    sizeClass: 'outer-card',
    floatClass: 'float-slow-1'
  },
  {
    id: 'intro-technovation',
    title: 'Technovation Intro',
    category: 'Corporate Intro',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1781772802/Technovationintro_kn4umb.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-10',
    sizeClass: 'inner-card',
    floatClass: 'float-medium-2'
  },
  {
    id: 'intro-adi-final',
    title: 'Adi Logo Reveal',
    category: 'Final Logo Animation',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1783681267/Adi_Logo_zj1z80.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-5',
    sizeClass: 'outer-card',
    floatClass: 'float-slow-2'
  },
  {
    id: 'intro-adi-draft',
    title: 'Adi Logo Draft',
    category: 'Draft Animation',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1783681265/Draft_3_aywrye.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-6',
    sizeClass: 'outer-card',
    floatClass: 'float-medium-1'
  },
  {
    id: 'explainer-youtube',
    title: 'YouTube Visuals',
    category: 'Kinetic Motion',
    mediaUrl: 'https://res.cloudinary.com/dk8c2tqwo/video/upload/v1783682933/1_rrdmeg.mp4',
    mediaType: 'video',
    positionClass: 'pos-hero-11',
    sizeClass: 'outer-card',
    floatClass: 'float-fast-1'
  },
  {
    id: 'alpa-labs',
    title: 'Alpa Labs UI',
    category: 'Web Interface',
    mediaUrl: '/assets/images/alpa_preview.png',
    mediaType: 'image',
    positionClass: 'pos-hero-12',
    sizeClass: 'outer-card',
    floatClass: 'float-slow-1'
  }
];

export default function Hero({ onViewProject, isVisible }) {
  const containerRef = useRef(null);
  const [ready, setReady] = React.useState(false);

  useEffect(() => {
    // 1. Entrance animation trigger
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // 2. Play/Pause videos based on Hero visibility
    if (!containerRef.current) return;
    const videos = containerRef.current.querySelectorAll('.floating-card-video');
    videos.forEach((video) => {
      if (isVisible) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [isVisible]);

  useEffect(() => {
    // 3. High performance scroll dispersion parallax and name scaling mutations
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.floating-card-item');
    const nameEl = containerRef.current.querySelector('.hero-center-name');
    const roleEl = containerRef.current.querySelector('.hero-center-role');
    const descEl = containerRef.current.querySelector('.hero-center-description');
    const actionEl = containerRef.current.querySelector('.hero-center-actions');
    const hintEl = containerRef.current.querySelector('.hero-floating-scroll-hint');

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const scrollMax = window.innerHeight * 0.75; // Scroll range to animate fully
      const progress = Math.min(1, Math.max(0, scrolled / scrollMax));

      // A. Scale the Name (locks/stuck at max scale)
      if (nameEl) {
        const scaleVal = 0.85 + progress * 0.55; // Scales from 0.85 to 1.40
        nameEl.style.transform = `scale(${scaleVal}) translate3d(0, 0, 0)`;
        nameEl.style.transformOrigin = 'center center';
      }

      // B. Fade out helper text and button layouts
      const detailsOpacity = Math.max(0, 1 - progress * 1.8);
      if (roleEl) roleEl.style.opacity = detailsOpacity;
      if (descEl) descEl.style.opacity = detailsOpacity;
      if (actionEl) actionEl.style.opacity = detailsOpacity;
      if (hintEl) hintEl.style.opacity = detailsOpacity;

      // C. Disperse and fade out cards
      cards.forEach((card) => {
        let speedX = 0;
        let speedY = 0;
        if (card.classList.contains('pos-hero-1')) { speedX = -320; speedY = -240; }
        else if (card.classList.contains('pos-hero-2')) { speedX = -360; speedY = -60; }
        else if (card.classList.contains('pos-hero-3')) { speedX = -320; speedY = 200; }
        else if (card.classList.contains('pos-hero-4')) { speedX = 320; speedY = -240; }
        else if (card.classList.contains('pos-hero-5')) { speedX = 360; speedY = -60; }
        else if (card.classList.contains('pos-hero-6')) { speedX = 320; speedY = 200; }
        else if (card.classList.contains('pos-hero-7')) { speedX = -180; speedY = -120; }
        else if (card.classList.contains('pos-hero-8')) { speedX = -140; speedY = 100; }
        else if (card.classList.contains('pos-hero-9')) { speedX = 180; speedY = -120; }
        else if (card.classList.contains('pos-hero-10')) { speedX = 140; speedY = 100; }
        else if (card.classList.contains('pos-hero-11')) { speedX = -80; speedY = -280; }
        else if (card.classList.contains('pos-hero-12')) { speedX = 80; speedY = -280; }

        const tx = Math.round(progress * speedX * 10) / 10;
        const ty = Math.round(progress * speedY * 10) / 10;
        
        // Cards fade out faster as they disperse off screen
        const cardOpacity = Math.max(0, 1 - progress * 1.3);
        
        card.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        card.style.opacity = cardOpacity;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (id) => {
    if (onViewProject) onViewProject(id);
  };

  return (
    <section className="hero-floating-section" ref={containerRef}>
      {/* Background radial glow */}
      <div className="hero-floating-glow"></div>

      {/* FLOATING CARDS CONTAINER */}
      <div className={`floating-cards-container ${ready ? 'ready' : ''}`}>
        {FLOATING_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`floating-card-item ${card.positionClass} ${card.sizeClass} ${card.floatClass}`}
            title={`Explore Case Study: ${card.title}`}
          >
            <div className="floating-card-glass">
              <div className="floating-card-media-wrapper">
                {card.mediaType === 'video' ? (
                  <video
                    src={card.mediaUrl}
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    className="floating-card-video"
                  />
                ) : (
                  <div 
                    className="floating-card-img"
                    style={{ backgroundImage: `url(${card.mediaUrl})` }}
                  ></div>
                )}
              </div>
              <div className="floating-card-info">
                <span className="floating-card-lbl">{card.category}</span>
                <span className="floating-card-title">{card.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CENTRAL TYPOGRAPHY HEADER */}
      <div className="hero-center-content">
        <h1 className="hero-center-name">
          Mousam <span className="text-gradient">Vishwakarma</span>
        </h1>
        <p className="hero-center-role">
          UI/UX Designer &amp; Motion Specialist
        </p>
        <p className="hero-center-description">
          Designing immersive digital interfaces, organic 3D systems, and high-fidelity motion prototypes.
        </p>
        
        <div className="hero-center-actions">
          <a
            href="#workSection"
            className="hero-scroll-trigger-btn"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('workSection');
              if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
            }}
          >
            <span>Explore My Work</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator line */}
      <a
        href="#workSection"
        className="hero-floating-scroll-hint"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('workSection');
          if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
        }}
      >
        <span className="scroll-hint-text">Scroll Down</span>
        <span className="scroll-hint-line"></span>
      </a>
    </section>
  );
}
