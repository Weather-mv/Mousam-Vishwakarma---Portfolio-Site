import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import BentoCard from '../components/BentoCard';
import AnalogClock from '../components/AnalogClock';
import PDFViewer from '../components/PDFViewer';
import { PROJECTS_DATA } from '../data/projectsData';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayFilter, setDisplayFilter] = useState('all'); // Update items after grid fade out
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [time, setTime] = useState('--:-- --');
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const containerRef = useRef(null);

  const activeProjectId = searchParams.get('project');

  // Lock scroll when resume lightbox is open
  useEffect(() => {
    if (showResumePreview) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setShowResumePreview(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showResumePreview]);

  // Digital clock, Hero visibility, and intersection reveal observers
  useEffect(() => {
    // 1. Digital clock updater (IST) for local time card
    const updateTime = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = ist.getHours();
      const m = ist.getMinutes();
      const ap = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 || 12;
      setTime(`${displayH}:${String(m).padStart(2, '0')} ${ap}`);
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // 2. Hero Visibility Observer (pauses background videos when scrolled out of view)
    const heroEl = document.querySelector('.hero-floating-section');
    const heroIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsHeroVisible(entry.isIntersecting);
      });
    }, { threshold: 0 });

    if (heroEl) heroIO.observe(heroEl);

    // 3. Reveal elements observer (Bento cards, columns, project cards, etc)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    if (containerRef.current) {
      const revealElements = containerRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .exp-col');
      revealElements.forEach(el => io.observe(el));
    }

    // 4. Stagger observers (Tools and Skills list)
    const toolIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.tool-icon-box').forEach((box, idx) => {
            setTimeout(() => box.classList.add('in'), idx * 40);
          });
          toolIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const toolsRow = containerRef.current.querySelector('#toolsRow');
    if (toolsRow) toolIO.observe(toolsRow);

    const skillIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-tag').forEach((tag, idx) => {
            setTimeout(() => tag.classList.add('in'), idx * 45);
          });
          skillIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const skillSections = containerRef.current.querySelectorAll('.skills-section');
    skillSections.forEach(sec => skillIO.observe(sec));

    return () => {
      clearInterval(clockInterval);
      if (heroEl) heroIO.unobserve(heroEl);
      io.disconnect();
      toolIO.disconnect();
      skillIO.disconnect();
    };
  }, [displayFilter]); // Re-run when filter changes to apply scroll spies to new grid elements

  const getProjectCategories = (id) => {
    if (id === 'zero-orbit') return ['webdev', 'uiux'];
    if (id.startsWith('motion-') || id.startsWith('demo-') || id.startsWith('showcase-') || id.startsWith('intro-') || id.startsWith('explainer-')) return ['motion'];
    return ['uiux']; // Default to uiux for other dashboard/app designs
  };

  const filteredProjects = Object.entries(PROJECTS_DATA).filter(([id]) => {
    if (displayFilter === 'all') return true;
    const categories = getProjectCategories(id);
    return categories.includes(displayFilter);
  });

  // Smooth grid transition when active filter changes
  const handleFilterClick = (filter) => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
    setIsTransitioning(true);

    setTimeout(() => {
      setDisplayFilter(filter);
      setIsTransitioning(false);
    }, 250);
  };

  const handleCardClick = (id) => {
    setSearchParams({ project: id });
  };

  const handleModalClose = () => {
    setSearchParams({});
  };

  const selectedProject = activeProjectId ? PROJECTS_DATA[activeProjectId] : null;

  return (
    <>
      <div className="hero-scroll-track">
        <Hero onViewProject={handleCardClick} isVisible={isHeroVisible} />
      </div>
      
      {/* WRAPPER FOR SCROLL REVEALS */}
      <div ref={containerRef}>
        
        {/* ── 1. WORKS SECTION (Pinterest grid) ────────────── */}
        <main className="container" id="workSection" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          
          <header className="work-section-header reveal" style={{ marginBottom: '40px' }}>
            <h2 className="card-label" style={{ marginBottom: '8px' }}>Portfolio Showcase</h2>
            <h3 className="section-title" style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--white)' }}>
              All Creative Works
            </h3>
          </header>

          {/* FILTERS */}
          <div className="filter-wrapper reveal d1" style={{ marginBottom: '32px' }}>
            <div className="filter-tabs" id="filterTabs">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterClick('all')}
                id="filterAll"
              >
                All Projects
              </button>
              <button
                className={`filter-btn ${activeFilter === 'uiux' ? 'active' : ''}`}
                onClick={() => handleFilterClick('uiux')}
                id="filterUiUx"
              >
                UI/UX Design
              </button>
              <button
                className={`filter-btn ${activeFilter === 'motion' ? 'active' : ''}`}
                onClick={() => handleFilterClick('motion')}
                id="filterMotion"
              >
                Motion Design
              </button>
              <button
                className={`filter-btn ${activeFilter === 'webdev' ? 'active' : ''}`}
                onClick={() => handleFilterClick('webdev')}
                id="filterWebDev"
              >
                Web &amp; Dev
              </button>
            </div>
            <div className="projects-count" id="projectsCount">
              {`Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`}
            </div>
          </div>

          {/* PINTEREST STYLE MASONRY GRID */}
          <div
            className="projects-masonry reveal d2"
            id="projectsGrid"
            style={{
              transition: 'opacity .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1)',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            }}
          >
            {filteredProjects.map(([id, project]) => (
              <ProjectCard
                key={id}
                id={id}
                project={project}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* CALL TO ACTION */}
          <section className="projects-cta card reveal" style={{ marginTop: '80px', textAlign: 'center', padding: '56px 32px' }}>
            <h2 className="card-label">Let's Collaborate</h2>
            <div className="cta-heading" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, marginBottom: '24px', color: 'var(--white)', letterSpacing: '-0.02em' }}>
              Have a project where motion and premium UI matter?
            </div>
            <a href="mailto:mousam07999@gmail.com" className="contact-btn" id="ctaContactBtn" style={{ margin: '0 auto', display: 'inline-flex' }}>
              Let's Build Something Memorable
              <span style={{ opacity: 0.6, marginLeft: '6px' }}>↗</span>
            </a>
          </section>

        </main>

        {/* ── 2. ABOUT & CAREER SECTION (Bento grid) ──────── */}
        <section className="container" id="aboutSection" style={{ paddingBottom: '120px' }}>
          
          <header className="about-section-header reveal" style={{ marginBottom: '40px' }}>
            <h2 className="card-label" style={{ marginBottom: '8px' }}>Personal Profile</h2>
            <h3 className="section-title" style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--white)' }}>
              About &amp; Career
            </h3>
          </header>

          <div className="bento">
            
            {/* Top Grid */}
            <div className="top-grid">
              <BentoCard className="about-card reveal-left" id="aboutCard">
                <h2 className="card-label" id="aboutHeading">About</h2>
                <p className="about-text">
                  I design intuitive, user-centered interfaces that blend <strong>visual elegance with functional delight.</strong> Bridging the gap between wireframes, UX research, and high-fidelity motion to craft seamless digital experiences.
                </p>
                <div className="about-footer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Indore, MP — India &nbsp;·&nbsp; 3+ yrs experience
                </div>
              </BentoCard>

              <BentoCard className="portrait-card reveal-right" id="portraitCard">
                <img src="/assets/images/portrait.png" alt="Mousam Vishwakarma" className="portrait-img" />
                <div className="portrait-overlay">
                  <div className="portrait-info">
                    <h2 className="portrait-label" id="portraitHeading">Portrait</h2>
                    <div className="portrait-name">Mousam Vishwakarma</div>
                    <div className="portrait-role-tag">UI/UX &amp; Motion Designer</div>
                  </div>
                </div>
              </BentoCard>

              <BentoCard className="time-card reveal d1" id="timeCard">
                <div className="time-card-content">
                  <div className="time-info">
                    <h2 className="card-label" id="localTimeHeading">Local Time</h2>
                    <div className="time-city">Indore · <span id="timeDisplay">{time}</span></div>
                  </div>
                  <div className="time-visual">
                    <AnalogClock />
                  </div>
                </div>
                <div className="avail">
                  <span className="status-dot"></span>
                  Available for select work
                </div>
              </BentoCard>

              <BentoCard className="resume-card reveal d2" id="resumeCard">
                <h2 className="card-label" id="resumeHeading">Resume</h2>
                <div>
                  <a className="dl-cv" id="resumeDownloadLinkText" href="https://res.cloudinary.com/dk8c2tqwo/image/upload/v1783685432/Mousam_Vishwakarma_UI_Motion_Design_jclpft.pdf" target="_blank" rel="noopener noreferrer">
                    Download CV
                  </a>
                  <button 
                    className="preview-cv-btn" 
                    id="resumePreviewBtn"
                    onClick={() => setShowResumePreview(true)}
                    title="Preview CV"
                  >
                    Preview Resume
                  </button>
                </div>
                <div className="dl-meta">PDF</div>
                <div className="resume-bottom">
                  <a href="https://res.cloudinary.com/dk8c2tqwo/image/upload/v1783685432/Mousam_Vishwakarma_UI_Motion_Design_jclpft.pdf" id="resumeDownloadIconLink" target="_blank" rel="noopener noreferrer" className="dl-icon" title="Open Resume">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                  </a>
                  <a href="#contact" id="resumeContactLink" className="arrow-icon" title="Contact">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </BentoCard>
            </div>

            {/* Row 3: Stack */}
            <BentoCard className="stack-card reveal" id="stackCard">
              <div className="stack-header">
                <h2 className="card-label" id="stackHeading" style={{ marginBottom: 0 }}>Stack &amp; Tools</h2>
                <span className="stack-names">Figma · After Effects · Lottie · Rive</span>
              </div>
              <div className="tools-row" id="toolsRow">
                <div className="tool-icon-box" id="toolFigma" title="Figma">
                  <svg width="26" height="26" viewBox="0 0 38 57" fill="none">
                    <path d="M19 28.5A9.5 9.5 0 1028.5 19 9.5 9.5 0 0019 28.5z" fill="#1ABCFE" />
                    <path d="M9.5 47.5A9.5 9.5 0 0019 57V38H9.5a9.5 9.5 0 000 19z" fill="#0ACF83" />
                    <path d="M9.5 28.5H19V9.5H9.5a9.5 9.5 0 000 19z" fill="#FF7262" />
                    <path d="M9.5 9.5H19A9.5 9.5 0 009.5 0v9.5z" fill="#F24E1E" />
                    <path d="M19 0h9.5A9.5 9.5 0 0019 9.5V0z" fill="#FF7262" />
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolAfterEffects" title="After Effects">
                  <svg width="28" height="28" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="10" fill="#00005B" />
                    <text x="25" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fontFamily="sans-serif" fill="#9999FF">Ae</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolLottie" title="LottieFiles">
                  <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="46" fill="#00C4B4" opacity=".15" stroke="#00C4B4" strokeWidth="2" />
                    <text x="50" y="62" textAnchor="middle" fontSize="30" fontWeight="700" fontFamily="sans-serif" fill="#00C4B4">L</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolRive" title="Rive">
                  <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="18" fill="#111" />
                    <text x="50" y="65" textAnchor="middle" fontSize="38" fontWeight="700" fontFamily="sans-serif" fill="#e0e0e0">Rv</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolProtoPie" title="ProtoPie">
                  <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" rx="18" fill="#1a0010" />
                    <text x="50" y="65" textAnchor="middle" fontSize="34" fontWeight="700" fontFamily="sans-serif" fill="#ff5580">Pp</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolIllustrator" title="Illustrator">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#330000" />
                    <text x="25" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="sans-serif" fill="#FF9A00">Ai</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolPhotoshop" title="Photoshop">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#001E36" />
                    <text x="25" y="35" textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="sans-serif" fill="#31A8FF">Ps</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolBlender" title="Blender">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#111" />
                    <text x="25" y="35" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#e87d0d">Bl</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolAdobeXD" title="Adobe XD">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#2D001D" />
                    <text x="25" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="sans-serif" fill="#FF61F6">XD</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolHTML5" title="HTML5">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#1a0800" />
                    <text x="25" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="sans-serif" fill="#E44D26">HTML</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolCSS3" title="CSS3">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#000a18" />
                    <text x="25" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#1572B6">CSS</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolJS" title="JavaScript">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#1a1600" />
                    <text x="25" y="35" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#F7DF1E">JS</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolFramer" title="Framer">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#111" />
                    <path d="M13 10h24v14H25L13 10zM13 24h12l12 14H13V24z" fill="white" />
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolJira" title="Jira">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#000a1a" />
                    <text x="25" y="35" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="sans-serif" fill="#0052CC">Jr</text>
                  </svg>
                </div>
                <div className="tool-icon-box" id="toolSlack" title="Slack">
                  <svg width="26" height="26" viewBox="0 0 50 50" fill="none">
                    <rect width="50" height="50" rx="8" fill="#0a000b" />
                    <text x="25" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="sans-serif" fill="#e01e5a">Sl</text>
                  </svg>
                </div>
              </div>
            </BentoCard>

            {/* Row 4: Skills */}
            <BentoCard className="skills-card reveal" id="skillsCard">
              <h2 className="card-label" id="skillsHeading">Skills</h2>
              <div className="skills-grid" id="skillsGridContainer">
                <div className="skills-section">
                  <div className="skills-title">Motion &amp; Animation</div>
                  <div className="skills-tags">
                    <span className="skill-tag">After Effects</span>
                    <span className="skill-tag">LottieFiles</span>
                    <span className="skill-tag">Rive</span>
                    <span className="skill-tag">CSS Animations</span>
                    <span className="skill-tag">Micro-interactions</span>
                    <span className="skill-tag">Easing Curves</span>
                    <span className="skill-tag">Spring Physics</span>
                  </div>
                </div>
                <div className="skills-section">
                  <div className="skills-title">Interaction &amp; UI</div>
                  <div className="skills-tags">
                    <span className="skill-tag">Figma</span>
                    <span className="skill-tag">Smart Animate</span>
                    <span className="skill-tag">Variables</span>
                    <span className="skill-tag">Dev Mode</span>
                    <span className="skill-tag">Prototyping</span>
                    <span className="skill-tag">Design Systems</span>
                    <span className="skill-tag">ProtoPie</span>
                    <span className="skill-tag">Framer</span>
                    <span className="skill-tag">WCAG</span>
                  </div>
                </div>
                <div className="skills-section">
                  <div className="skills-title">Front-End</div>
                  <div className="skills-tags">
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">HTML5</span>
                    <span className="skill-tag">CSS3 (Flex, Grid)</span>
                    <span className="skill-tag">Keyframes</span>
                    <span className="skill-tag">JavaScript ES6+</span>
                    <span className="skill-tag">Scroll Animations</span>
                    <span className="skill-tag">Responsive Web</span>
                  </div>
                </div>
                <div className="skills-section">
                  <div className="skills-title">Tools</div>
                  <div className="skills-tags">
                    <span className="skill-tag">Adobe Suite</span>
                    <span className="skill-tag">Adobe Illustrator</span>
                    <span className="skill-tag">Photoshop</span>
                    <span className="skill-tag">Blender</span>
                    <span className="skill-tag">Adobe XD</span>
                    <span className="skill-tag">Jira</span>
                    <span className="skill-tag">Slack</span>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Row 5: Experience */}
            <BentoCard className="exp-card reveal" id="experienceCard">
              <div className="exp-header">
                <h2 className="card-label" id="experienceHeading" style={{ marginBottom: 0 }}>Experience</h2>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>4 roles</span>
              </div>
              <div className="exp-grid">
                <div className="exp-col reveal d1">
                  <div className="exp-period"><span className="exp-dot active"></span> Mar 2026 — Present</div>
                  <div className="exp-role">UI Motion Designer</div>
                  <div className="exp-company">Alphanext Technology</div>
                  <div className="exp-location">Indore, MP</div>
                  <ul className="exp-points">
                    <li>Designing hero section UI + motion graphics to maximise engagement using animation driven storytelling.</li>
                    <li>Producing product demo videos that communicate value and drive conversions.</li>
                  </ul>
                </div>

                <div className="exp-col reveal d2">
                  <div className="exp-period"><span className="exp-dot"></span> Jul 2025 — Mar 2026</div>
                  <div className="exp-role">Motion &amp; UI Designer</div>
                  <div className="exp-company">Vaidik Eduservices Pvt. Ltd</div>
                  <div className="exp-location">Remote</div>
                  <ul className="exp-points">
                    <li>Designed UI animation systems — micro-interactions, onboarding flows, state-based components — improving engagement an estimated 25%.</li>
                    <li>Built a Lottie-based animated component library with easing + trigger state specs for accurate developer handoff.</li>
                  </ul>
                </div>

                <div className="exp-col reveal d3">
                  <div className="exp-period"><span className="exp-dot"></span> Sep — Nov 2024</div>
                  <div className="exp-role">UI/UX Designer</div>
                  <div className="exp-company">Vected Technologies</div>
                  <div className="exp-location">Indore, MP</div>
                  <ul className="exp-points">
                    <li>Coded responsive front-end (HTML5, CSS3, JS) with scroll animations and CSS transitions.</li>
                    <li>Built a Figma design system cutting inconsistencies by 40%; resolved 6+ critical UX issues via usability testing.</li>
                  </ul>
                </div>

                <div className="exp-col reveal d4">
                  <div className="exp-period"><span className="exp-dot"></span> Jan — Feb 2023</div>
                  <div className="exp-role">Junior UI Designer</div>
                  <div className="exp-company">WoodApple Resources Pvt. Ltd</div>
                  <div className="exp-location">Indore, MP</div>
                  <ul className="exp-points">
                    <li>Designed UI animations — button states, loading indicators, hover effects — improving engagement and reducing bounce.</li>
                  </ul>
                </div>
              </div>
            </BentoCard>

            {/* Row 6: Contact + Education */}
            <div className="row6" id="contactSection">
              <BentoCard className="contact-card reveal-left d1" id="contact">
                <h2 className="card-label" id="contactHeading">Contact</h2>
                <div className="contact-heading">Got a project where motion matters?<br />Let's build something memorable.</div>
                <div className="contact-btns">
                  <a href="mailto:mousam07999@gmail.com" id="contactEmailBtn" className="contact-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    mousam07999@gmail.com
                    <span className="ext-arrow">↗</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" id="contactLinkedinBtn" className="contact-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                  <a href="tel:+917999336045" id="contactPhoneBtn" className="contact-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.96-.96a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 15.26z" />
                    </svg>
                    +91 7999336045
                  </a>
                </div>
              </BentoCard>

              <BentoCard className="edu-card reveal-right d2" id="educationCard">
                <h2 className="card-label" id="educationHeading">Education</h2>
                <div className="edu-degree">B.Tech — Computer Science Engineering</div>
                <div className="edu-inst">Shivajirao Kadam Institute of Technology &amp; Management, Indore</div>
                <div className="edu-grad">Graduated · May 2025</div>
              </BentoCard>
            </div>

          </div>
        </section>
      </div>

      {/* Case Study Modal */}
      {activeProjectId && selectedProject && (
        <ProjectModal
          project={{ ...selectedProject, id: activeProjectId }}
          onClose={handleModalClose}
        />
      )}

      {/* Resume Lightbox */}
      {showResumePreview && (
        <div className="pdf-lightbox open" onContextMenu={(e) => e.preventDefault()}>
          <button className="pdf-lightbox-close" onClick={() => setShowResumePreview(false)} aria-label="Close Fullscreen View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="pdf-lightbox-content" id="pdfLightboxContent">
            <PDFViewer pdfUrl="https://res.cloudinary.com/dk8c2tqwo/image/upload/v1783685432/Mousam_Vishwakarma_UI_Motion_Design_jclpft.pdf" isHighRes={true} containerId="lightboxCanvasList" />
          </div>
          <div className="pdf-lightbox-hint">Scroll down to view more pages · Right-click is disabled for security</div>
        </div>
      )}
    </>
  );
}
