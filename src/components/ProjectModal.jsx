import React, { useState, useEffect } from 'react';
import CompareSlider from './CompareSlider';
import PDFViewer from './PDFViewer';

export default function ProjectModal({ project, onClose }) {
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const {
    title,
    tagline,
    client,
    year,
    role,
    tools,
    description,
    challenge,
    solution,
    mediaType,
    mediaUrl,
    posterUrl,
    beforeImg,
    afterImg,
    beforeLabel,
    afterLabel,
    liveUrl,
    deliverables,
  } = project;

  // Intercept escape key and save/print commands
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'S', 'P'].includes(e.key)) {
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') {
        if (lightboxUrl) {
          setLightboxUrl(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [lightboxUrl, onClose]);

  const renderMediaPreview = () => {
    if (mediaType === 'video') {
      return (
        <video src={mediaUrl} poster={posterUrl} autoPlay loop muted playsInline controls></video>
      );
    }
    if (mediaType === 'slider') {
      return (
        <CompareSlider
          beforeImg={beforeImg}
          afterImg={afterImg}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
          title={title}
        />
      );
    }
    if (mediaType === 'pdf') {
      return (
        <div className="pdf-preview-box" id="pdfPreviewBox">
          <PDFViewer pdfUrl={mediaUrl} containerId="previewCanvasList" />
          <div className="pdf-overlay-trigger" id="pdfOverlayTrigger" onClick={() => setLightboxUrl(mediaUrl)}>
            <div className="pdf-expand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span>View Design in Full Screen</span>
            </div>
          </div>
        </div>
      );
    }
    if (mediaType === 'iframe') {
      return (
        <iframe
          src={mediaUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ border: 'none', borderRadius: '8px' }}
          title={title}
        ></iframe>
      );
    }
    return (
      <img src={mediaUrl} className="modal-img" alt={`${title} Preview`} />
    );
  };

  const getMediaHint = () => {
    if (mediaType === 'slider') return 'Drag handle to compare';
    if (mediaType === 'pdf') return 'Interactive document view';
    if (mediaType === 'iframe') return 'Interactive player view';
    return '';
  };

  const handleDeliverableClick = (e, url) => {
    e.preventDefault();
    setLightboxUrl(url);
  };

  // Label for live action button
  const getActionLabel = () => {
    if (mediaType === 'iframe') {
      if (mediaUrl.includes('youtube')) return 'Watch on YouTube ↗';
      if (mediaUrl.includes('wistia')) return 'Open Wistia Folder ↗';
      return 'Open Vimeo Showcase ↗';
    }
    return 'Live Website ↗';
  };

  return (
    <>
      <div className="modal-overlay open" id="projectModal" role="dialog" aria-modal="true">
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="modal-container">
          <button className="modal-close-btn" id="modalCloseBtn" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="modal-content" id="modalContent">
            <div className="modal-grid">
              <div className="modal-details">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-tagline">{tagline}</div>

                <h3 className="modal-section-label">Overview</h3>
                <div className="modal-info-block">
                  <div>
                    <div className="info-cell-title">Client</div>
                    <div className="info-cell-val">{client}</div>
                  </div>
                  <div>
                    <div className="info-cell-title">Year</div>
                    <div className="info-cell-val">{year}</div>
                  </div>
                  <div style={{ gridColumn: 'span 2', marginTop: '6px' }}>
                    <div className="info-cell-title">Role</div>
                    <div className="info-cell-val">{role}</div>
                  </div>
                </div>

                <p className="modal-body-text">{description}</p>

                <h3 className="modal-section-label">Challenge</h3>
                <p className="modal-body-text" style={{ marginBottom: '20px' }}>{challenge}</p>

                <h3 className="modal-section-label">Solution</h3>
                <p className="modal-body-text" style={{ marginBottom: '28px' }}>{solution}</p>

                {deliverables && deliverables.length > 0 && (
                  <>
                    <h3 className="modal-section-label" style={{ marginTop: '24px' }}>Project Files / Deliverables</h3>
                    <div className="deliverables-grid">
                      {deliverables.map((d, index) => (
                        <a
                          key={index}
                          href="#"
                          onClick={(e) => handleDeliverableClick(e, d.url)}
                          className="deliverable-link"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '14px', height: '14px' }}>
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span>{d.name}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                <div className="modal-actions">
                  {liveUrl !== '#' && mediaType !== 'pdf' && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{ marginTop: 0 }}>
                      {getActionLabel()}
                    </a>
                  )}
                  {mediaType === 'pdf' && (
                    <button className="contact-btn" onClick={() => setLightboxUrl(mediaUrl)} style={{ marginTop: 0 }}>
                      View in Full Screen ↗
                    </button>
                  )}
                  <button
                    className="contact-btn secondary-btn"
                    onClick={onClose}
                    style={{ background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)', marginTop: 0 }}
                  >
                    Close Case Study
                  </button>
                </div>
              </div>

              <div>
                <div className="modal-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Media Preview</span>
                  {getMediaHint() && (
                    <span style={{ fontFamily: 'Geist Mono', fontSize: '9px', color: 'var(--green)' }}>
                      {getMediaHint()}
                    </span>
                  )}
                </div>
                <div className={`modal-visual ${mediaType === 'pdf' ? 'pdf-mode' : ''} ${mediaType === 'iframe' ? 'iframe-mode' : ''}`}>
                  {renderMediaPreview()}
                </div>
                <div className="tags" style={{ marginTop: '16px', gap: '6px', justifyContent: 'center' }}>
                  {tools.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxUrl && (
        <div className="pdf-lightbox open" onContextMenu={(e) => e.preventDefault()}>
          <button className="pdf-lightbox-close" onClick={() => setLightboxUrl(null)} aria-label="Close Fullscreen View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="pdf-lightbox-content" id="pdfLightboxContent">
            <PDFViewer pdfUrl={lightboxUrl} isHighRes={true} containerId="lightboxCanvasList" />
          </div>
          <div className="pdf-lightbox-hint">Scroll down to view more pages · Right-click is disabled for security</div>
        </div>
      )}
    </>
  );
}
