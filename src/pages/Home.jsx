import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BentoCard from '../components/BentoCard';
import AnalogClock from '../components/AnalogClock';

export default function Home() {
  const [time, setTime] = useState('--:-- --');
  const containerRef = useRef(null);

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

    // 2. Bento Scroll-Velocity Skewing
    let lastScrollY = window.scrollY;
    let skewTarget = 0;
    let skewCurrent = 0;
    let isSkewing = false;
    let animationFrameId = null;

    const skewLoop = () => {
      skewCurrent += (skewTarget - skewCurrent) * 0.085;
      skewTarget += (0 - skewTarget) * 0.085;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `skewY(${skewCurrent.toFixed(3)}deg)`;
      }

      // If both target and current skew are close to zero, reset to absolute zero and stop loop
      if (Math.abs(skewCurrent) < 0.005 && Math.abs(skewTarget) < 0.005) {
        skewCurrent = 0;
        skewTarget = 0;
        if (containerRef.current) {
          containerRef.current.style.transform = 'skewY(0deg)';
        }
        isSkewing = false;
        animationFrameId = null;
      } else {
        animationFrameId = requestAnimationFrame(skewLoop);
      }
    };

    const handleScrollSkew = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      skewTarget = Math.max(-4, Math.min(4, diff * 0.08));
      
      if (!isSkewing) {
        isSkewing = true;
        animationFrameId = requestAnimationFrame(skewLoop);
      }
    };

    window.addEventListener('scroll', handleScrollSkew, { passive: true });

    // 3. Reveal elements observer (Bento cards, columns, etc)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    const revealElements = containerRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .exp-col');
    revealElements.forEach(el => io.observe(el));

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
      window.removeEventListener('scroll', handleScrollSkew);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      io.disconnect();
      toolIO.disconnect();
      skillIO.disconnect();
    };
  }, []);

  return (
    <>
      <Hero />
      <main className="container" id="mainContent" ref={containerRef}>
        <div className="bento">
          
          {/* Top Grid */}
          <div className="top-grid">
            <BentoCard className="about-card reveal-left" id="aboutCard">
              <h2 className="card-label" id="aboutHeading">About</h2>
              <p className="about-text">
                I make interfaces <strong>feel alive.</strong> Crafting micro-interactions,
                animated components, and Lottie systems that turn static screens into experiences users
                remember.
              </p>
              <div className="about-footer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Indore, MP — India &nbsp;·&nbsp; 3+ yrs experience
              </div>
            </BentoCard>

            <BentoCard className="portrait-card reveal-right" id="portraitCard">
              <img src="assets/images/portrait.png" alt="Mousam Vishwakarma" className="portrait-img" />
              <div className="portrait-overlay">
                <div className="portrait-info">
                  <h2 className="portrait-label" id="portraitHeading">Portrait</h2>
                  <div className="portrait-name">Mousam Vishwakarma</div>
                  <div className="portrait-role-tag">UI Motion Designer</div>
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
              <a className="dl-cv" id="resumeDownloadLinkText" href="Mousam_Vishwakarma_-_Ui_Motion_Designer.doc" download>
                Download CV
              </a>
              <div className="dl-meta">.doc · 30 KB</div>
              <div className="resume-bottom">
                <a href="Mousam_Vishwakarma_-_Ui_Motion_Designer.doc" id="resumeDownloadIconLink" download className="dl-icon" title="Download">
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

          {/* Row 4: Selected Work + Skills */}
          <div className="row4">
            <BentoCard className="work-card reveal-left d1" id="workCard">
              <div className="work-header">
                <h2 className="card-label" id="workHeading" style={{ marginBottom: 0 }}>Selected Work</h2>
                <Link to="/projects" id="workArrowLink" className="arrow-link" title="View all projects">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
              <div className="work-item">
                <div className="work-item-header">
                  <div>
                    <div className="work-title">EMR Healthcare Suite</div>
                    <div className="work-desc">Hospital Network — UI/UX Design System</div>
                  </div>
                  <Link to="/projects?project=emr-healthcare" id="workEMRLink" className="arrow-link" title="View project details">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                </div>
                <div className="tags">
                  <span className="tag">Figma</span>
                  <span className="tag">UX Research</span>
                  <span className="tag">Information Architecture</span>
                </div>
              </div>
              <div className="work-item">
                <div className="work-item-header">
                  <div>
                    <div className="work-title">Motion Design - Case 2</div>
                    <div className="work-desc">Self / R&D — UI Micro-interactions &amp; Spring Physics</div>
                  </div>
                  <Link to="/projects?project=motion-2" id="workMotionLink" className="arrow-link" title="View project details">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                </div>
                <div className="tags">
                  <span className="tag">After Effects</span>
                  <span className="tag">Figma</span>
                  <span className="tag">Lottie</span>
                </div>
              </div>
              <div className="work-item">
                <div className="work-item-header">
                  <div>
                    <div className="work-title">Alpa Labs Corporate Portal</div>
                    <div className="work-desc">Alpa Laboratories Ltd. — Corporate Web Portal &amp; UI/UX</div>
                  </div>
                  <Link to="/projects?project=alpa-labs" id="workAlpaLink" className="arrow-link" title="View project details">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </Link>
                </div>
                <div className="tags">
                  <span className="tag">Figma</span>
                  <span className="tag">UI/UX</span>
                  <span className="tag">Corporate Branding</span>
                  <span className="tag">Responsive Design</span>
                </div>
              </div>
              <div className="work-more">
                <Link to="/projects" id="viewAllProjectsLink" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 500, cursor: 'none' }}>
                  <span>View all live projects</span>
                  <span className="arrow-indicator" style={{ fontSize: '14px', transition: 'transform .3s var(--ease-spring)' }}>→</span>
                </Link>
              </div>
            </BentoCard>

            <BentoCard className="skills-card reveal-right d1" id="skillsCard">
              <h2 className="card-label" id="skillsHeading">Skills</h2>
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
                  <span className="skill-tag">Adobe Illustrator</span>
                  <span className="skill-tag">Photoshop</span>
                  <span className="skill-tag">Blender</span>
                  <span className="skill-tag">Adobe XD</span>
                  <span className="skill-tag">Jira</span>
                  <span className="skill-tag">Slack</span>
                </div>
              </div>
            </BentoCard>
          </div>

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
          <div className="row6">
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
      </main>
    </>
  );
}
