import React, { useRef } from 'react';
import BentoCard from './BentoCard';

export default function ProjectCard({ id, project, onClick }) {
  const { title, tagline, client, year, tools, mediaType, mediaUrl, posterUrl, afterImg } = project;
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCardClick = (e) => {
    // Prevent triggering overlay click if clicking elements in tags or anchor links
    if (e.target.closest('.tags') || e.target.closest('.arrow-link')) return;
    onClick(id);
  };

  // Badge text mappings matching the original projects.html
  let badgeText = '';
  if (id === 'zero-orbit') badgeText = 'Featured · Web Dev';
  else if (id === 'emr-healthcare') badgeText = 'UI/UX Design';
  else if (id === 'alpa-labs') badgeText = 'UI/UX Design';
  else if (id === 'parkit') badgeText = 'Mobile UI/UX';
  else if (id === 'kids-site-design') badgeText = 'UI/UX Design';
  else if (id.startsWith('motion-')) badgeText = 'Motion Design';
  else if (id.startsWith('demo-')) badgeText = 'Motion Design';

  const renderMedia = () => {
    if (mediaType === 'video') {
      return (
        <div className="project-media">
          <video
            ref={videoRef}
            src={mediaUrl}
            poster={posterUrl}
            loop
            muted
            playsInline
          />
          <div className="play-overlay">
            <div className="play-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          {badgeText && <span className="project-badge">{badgeText}</span>}
        </div>
      );
    }

    const imgSource = mediaType === 'slider' ? afterImg : (mediaType === 'pdf' || mediaType === 'iframe' || mediaType === 'image' ? posterUrl : mediaUrl);

    return (
      <div className="project-media">
        <img src={imgSource} alt={title} className="project-thumbnail" />
        {mediaType === 'iframe' && (
          <div className="play-overlay">
            <div className="play-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        )}
        {badgeText && <span className="project-badge">{badgeText}</span>}
      </div>
    );
  };

  return (
    <BentoCard
      className="project-card"
      id={`project-card-${id}`}
      style={{ display: 'flex' }}
    >
      <div
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {renderMedia()}
        <div className="project-info">
          <div className="project-meta-row">
            <span className="project-client">{client}</span>
            <span className="project-year">{year}</span>
          </div>
          <h3 className="project-card-title">{title}</h3>
          <p className="project-card-desc">{tagline}</p>
          <div className="tags">
            {tools.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
