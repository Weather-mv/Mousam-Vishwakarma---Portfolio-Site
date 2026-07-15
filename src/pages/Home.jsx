import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { PROJECTS_DATA } from '../data/projectsData';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayFilter, setDisplayFilter] = useState('all'); // Update items after grid fade out
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const containerRef = useRef(null);

  const activeProjectId = searchParams.get('project');

  // Hero visibility, and intersection reveal observers
  useEffect(() => {
    // 1. Hero Visibility Observer (pauses background videos when scrolled out of view)
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

    return () => {
      if (heroEl) heroIO.unobserve(heroEl);
      io.disconnect();
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
    if (id === 'motion-k12-edtech') {
      navigate('/k12-videos');
    } else {
      setSearchParams({ project: id });
    }
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
            {filteredProjects.map(([id, project], index) => (
              <ProjectCard
                key={id}
                id={id}
                project={{
                  ...project,
                  isSpan2: index % 3 === 0
                }}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* CALL TO ACTION */}
          <section id="contact" className="projects-cta card reveal" style={{ marginTop: '80px', textAlign: 'center', padding: '56px 32px' }}>
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
      </div>

      {/* Case Study Modal */}
      {activeProjectId && selectedProject && (
        <ProjectModal
          project={{ ...selectedProject, id: activeProjectId }}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
