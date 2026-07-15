import React, { useRef, useEffect } from 'react';
import BentoCard from './BentoCard';

export default function ProjectCard({ id, project, onClick }) {
  const { title, tagline, client, year, tools, mediaType, mediaUrl, posterUrl, afterImg } = project;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleCardClick = (e) => {
    // Guard: e.target must be an Element (not text node / SVG / document)
    if (!(e.target instanceof Element)) { onClick(id); return; }
    // Prevent triggering overlay click if clicking elements in tags or anchor links
    if (e.target.closest('.tags') || e.target.closest('.arrow-link')) return;
    onClick(id);
  };

  // Badge text mappings
  let badgeText = '';
  if (id === 'zero-orbit') badgeText = 'Featured · Web Dev';
  else if (id === 'emr-healthcare') badgeText = 'UI/UX Design';
  else if (id === 'alpa-labs') badgeText = 'UI/UX Design';
  else if (id === 'parkit') badgeText = 'Mobile UI/UX';
  else if (id === 'kids-site-design') badgeText = 'UI/UX Design';
  else if (id.startsWith('motion-')) badgeText = 'Motion Design';
  else if (id.startsWith('demo-')) badgeText = 'Product Demo';
  else if (id.startsWith('showcase-')) badgeText = '3D Showcase';
  else if (id.startsWith('intro-')) badgeText = 'Brand Motion';
  else if (id.startsWith('explainer-')) badgeText = 'Explainer Video';

  const isVideoCard = mediaType === 'video' || mediaType === 'iframe';

  const renderMedia = () => {
    const isDirectVideo = mediaType === 'video';
    const imgSource = mediaType === 'slider' ? afterImg : (mediaType === 'pdf' || mediaType === 'image' ? posterUrl : mediaUrl);

    return (
      <div className="project-media visual-only-media-wrapper" style={{ width: '100%', position: 'relative' }}>
        {isVideoCard ? (
          isDirectVideo ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              poster={posterUrl}
              loop
              muted
              playsInline
              autoPlay
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
      </div>
    );
  };

  return (
    <BentoCard
      className={`project-card visual-only-project-card ${project.isSpan2 ? 'span-2' : ''}`}
      id={`project-card-${id}`}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        onClick={handleCardClick}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      >
        {renderMedia()}
        <div className="project-info-under">
          <h4 className="project-title-under">{title}</h4>
          <p className="project-tagline-under">{badgeText} &middot; {year}</p>
        </div>
      </div>
    </BentoCard>
  );
}
