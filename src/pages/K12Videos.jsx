import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';

export default function K12Videos() {
  const project = PROJECTS_DATA['motion-k12-edtech'];
  const [activeVideo, setActiveVideo] = useState(() => {
    return project && project.playlist && project.playlist.length > 0
      ? project.playlist[0]
      : null;
  });
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll reveal observer
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    if (containerRef.current) {
      const revealElements = containerRef.current.querySelectorAll('.reveal');
      revealElements.forEach(el => io.observe(el));
    }

    return () => io.disconnect();
  }, []);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        Project not found.
      </div>
    );
  }

  const categories = ['All', 'Kindergarten', '1st Grade', '2nd Grade', 'Review Pipeline'];

  const filteredPlaylist = project.playlist.filter((video) => {
    if (filter === 'All') return true;
    return video.grade === filter;
  });

  return (
    <main className="container" style={{ paddingTop: '130px', paddingBottom: '80px' }} ref={containerRef}>
      {/* HEADER */}
      <header className="projects-header reveal" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Link to="/" className="filter-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 14px', background: 'var(--card2)', border: '1px solid var(--border)' }}>
            ← Back to Showcase
          </Link>
          <span className="card-label" style={{ margin: 0 }}>K-12 EdTech Project</span>
        </div>
        <h1 className="projects-title" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: '8px' }}>
          {project.title}
        </h1>
        <p className="projects-subtitle" style={{ maxWidth: '800px', fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6' }}>
          {project.tagline}
        </p>
      </header>

      {/* DETAILED PROJECT INFO BLOCK */}
      <div className="reveal d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'Geist Mono', letterSpacing: '0.05em', marginBottom: '4px' }}>Client</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{project.client}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'Geist Mono', letterSpacing: '0.05em', marginBottom: '4px' }}>Role</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{project.role}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'Geist Mono', letterSpacing: '0.05em', marginBottom: '4px' }}>Year</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--white)' }}>{project.year}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'Geist Mono', letterSpacing: '0.05em', marginBottom: '4px' }}>Tools & Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
            {project.tools.map(tool => (
              <span key={tool} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', background: 'var(--border)', border: '1px solid rgba(255,255,255,0.02)', color: 'var(--muted)' }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DUAL COLUMN GALLERY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        
        {/* Cinema Video Player Container */}
        {activeVideo && (
          <div className="reveal d2" style={{ width: '100%' }}>
            <div style={{
              background: '#000',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16/9',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
            }}>
              <video
                key={activeVideo.id}
                src={activeVideo.url}
                autoPlay
                controls
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10px', fontFamily: 'Geist Mono', color: 'var(--green)', textTransform: 'uppercase' }}>Currently Playing</span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--white)', margin: '2px 0 0' }}>{activeVideo.title}</h2>
              </div>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(0, 210, 255, 0.08)', border: '1px solid rgba(0, 210, 255, 0.15)', color: 'var(--green)', fontWeight: 600 }}>
                {activeVideo.grade}
              </span>
            </div>
          </div>
        )}

        {/* Video Grid Section */}
        <div className="reveal d3" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <h3 className="section-title" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', margin: 0 }}>
              Lesson Collection ({project.playlist.length} Video Clips)
            </h3>
            
            {/* Filter tabs */}
            <div className="playlist-tabs" style={{ margin: 0 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`playlist-tab-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                  style={{ border: '1px solid var(--border)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="playlist-grid">
            {filteredPlaylist.map((video, idx) => {
              const isActive = activeVideo && activeVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  className={`playlist-item-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveVideo(video);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ padding: '16px' }}
                >
                  <div className="playlist-item-thumbnail" style={{ width: '80px', height: '52px' }}>
                    <div className="thumbnail-icon">
                      {isActive ? (
                        <span className="playing-pulse-container">
                          <span className="playing-pulse-dot"></span>
                        </span>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px' }}>
                          <polygon points="6 4 20 12 6 20 6 4"></polygon>
                        </svg>
                      )}
                    </div>
                    <div className="thumbnail-badge" style={{ fontSize: '7px', padding: '1px 3px' }}>{video.grade}</div>
                  </div>
                  <div className="playlist-item-details" style={{ gap: '4px' }}>
                    <span className="playlist-item-num">Lesson {idx + 1}</span>
                    <h4 className="playlist-item-title" style={{ fontSize: '13px', whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {video.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
