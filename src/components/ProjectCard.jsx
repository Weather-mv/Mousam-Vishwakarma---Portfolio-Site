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

  const isVideoCard = mediaType === 'video' || mediaType === 'iframe';

  const renderMedia = () => {
    const isDirectVideo = mediaType === 'video';
    const imgSource = mediaType === 'slider' ? afterImg : (mediaType === 'pdf' || mediaType === 'image' ? posterUrl : mediaUrl);

    return (
      <div className="project-media visual-only-media-wrapper" style={{ height: '100%', width: '100%', position: 'relative' }}>
        {isVideoCard ? (
          isDirectVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              poster={posterUrl}
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img 
              src={posterUrl} 
              alt={title} 
              className="project-thumbnail" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )
        ) : (
          <img 
            src={imgSource} 
            alt={title} 
            className="project-thumbnail" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        
        <div className="video-card-hover-overlay">
          <div className="video-card-play-btn">
            {isVideoCard ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4"></polygon>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BentoCard
      className="project-card visual-only-project-card"
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
      </div>
    </BentoCard>
  );
}
