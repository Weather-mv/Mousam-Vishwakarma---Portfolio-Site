import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayFilter, setDisplayFilter] = useState('all'); // To update items after grid fade out
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const activeProjectId = searchParams.get('project');

  // 1. Reveal on scroll entry observer
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    if (containerRef.current) {
      const revealElements = containerRef.current.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      revealElements.forEach(el => io.observe(el));
    }

    return () => io.disconnect();
  }, []);

  // 2. Filter list of projects helper
  const getProjectCategories = (id) => {
    if (id === 'zero-orbit') return ['webdev', 'uiux'];
    if (id.startsWith('motion-') || id.startsWith('demo-')) return ['motion'];
    return ['uiux']; // Default to uiux for other dashboard/app designs
  };

  const filteredProjects = Object.entries(PROJECTS_DATA).filter(([id]) => {
    if (displayFilter === 'all') return true;
    const categories = getProjectCategories(id);
    return categories.includes(displayFilter);
  });

  // 3. Smooth grid transition when active filter changes
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
      <main className="container" style={{ paddingTop: '130px' }} ref={containerRef}>
        
        {/* HEADER */}
        <header className="projects-header reveal">
          <h1 className="projects-title">Selected Works</h1>
          <p className="projects-subtitle">A curated collection of UI/UX designs, motion graphics, interactive prototypes, and front-end development.</p>
        </header>

        {/* FILTERS */}
        <div className="filter-wrapper reveal d1">
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

        {/* PROJECTS GRID */}
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
        <section className="projects-cta card reveal" style={{ marginTop: '80px', textAlign: 'center', padding: '48px 32px' }}>
          <h2 className="card-label">Let's Collaborate</h2>
          <div className="cta-heading" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 500, marginBottom: '24px', color: 'var(--white)' }}>
            Have a project where motion and premium UI matter?
          </div>
          <Link to="/#contact" className="contact-btn" id="ctaContactBtn" style={{ margin: '0 auto', display: 'inline-flex' }}>
            Let's Build Something Memorable
            <span style={{ opacity: 0.6, marginLeft: '6px' }}>↗</span>
          </Link>
        </section>

      </main>

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
