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
          <PDFViewer pdfUrl={mediaUrl} containerId="previewCanvasList" onExpand={() => setLightboxUrl(mediaUrl)} />
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
            <div className="modal-layout-stacked">
              {/* Header section (full width) */}
              <div className="modal-header-section">
                <h2 className="modal-title">{title}</h2>
                <div className="modal-tagline">{tagline}</div>
              </div>

              {/* Preview section (full width, prominent) */}
              <div className="modal-preview-section">
                <div className="modal-section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Media Preview</span>
                  {getMediaHint() && (
                    <span style={{ fontFamily: 'Geist Mono', fontSize: '9px', color: 'var(--green)' }}>
                      {getMediaHint()}
                    </span>
                  )}
                </div>
                <div className={`modal-visual-large ${mediaType === 'pdf' ? 'pdf-mode' : ''} ${mediaType === 'iframe' ? 'iframe-mode' : ''}`}>
                  {renderMediaPreview()}
                </div>
              </div>

              {/* Details sections (flowing below) */}
              <div className="modal-details-grid">
                <div className="modal-details-main">
                  {project.hasRichCaseStudy ? (
                    <div className="rich-case-study">
                      {/* 1. Overview */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Overview</h3>
                        <p className="modal-body-text cs-text">
                          <strong>Alpha EMR</strong> is a cloud-based electronic medical records (EMR) and clinic management platform built by <strong>AlphaNext Technology Solutions Private Limited</strong> for independent doctors, small clinics, and solo medical practitioners. The product brings together patient records, appointment scheduling, prescription management, and staff/user administration into a single dashboard — anchored by its standout feature, <strong>Alpha Echo</strong>, an AI-powered voice assistant that listens to a doctor-patient encounter and automatically generates structured clinical notes.
                        </p>
                        <p className="modal-body-text cs-text">
                          As the <strong>UI/UX Designer</strong> on this project at AlphaNext, I was responsible for designing the end-to-end experience of Alpha EMR — from the information architecture of the clinic dashboard to the micro-interactions inside the AI transcription flow.
                        </p>
                        
                        <div className="cs-overview-highlights">
                          <div className="cs-highlight-card">
                            <span className="cs-highlight-title">Product Type</span>
                            <span className="cs-highlight-desc">EMR &amp; Clinic Management (Web Platform)</span>
                          </div>
                          <div className="cs-highlight-card">
                            <span className="cs-highlight-title">Core Innovation</span>
                            <span className="cs-highlight-desc">AI-powered ambient voice transcription</span>
                          </div>
                          <div className="cs-highlight-card">
                            <span className="cs-highlight-title">My Focus Areas</span>
                            <span className="cs-highlight-desc">UX Research, UI Design, Design Systems, IA</span>
                          </div>
                        </div>
                      </section>

                      {/* 2. The Problem */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">The Problem: Why Clinics Needed a Better EMR</h3>
                        <p className="modal-body-text cs-text">
                          Independent doctors and small clinic owners were stuck choosing between two bad options: paper-based record keeping that made patient history hard to retrieve, or legacy EMR software designed for large hospital systems — bloated, expensive, and unintuitive for a solo practitioner running a single-room clinic.
                        </p>
                        <div className="cs-callout-box">
                          <h4 className="cs-callout-title">Recurring Doctor Pain Points:</h4>
                          <ol className="cs-list">
                            <li>
                              <strong>Documentation fatigue.</strong> Doctors were spending as much time typing notes after a consultation as they spent with the patient, cutting into the number of patients they could see in a day.
                            </li>
                            <li>
                              <strong>Scattered patient history.</strong> Allergies, past prescriptions, addiction history, and lab reports lived in different notebooks, WhatsApp chats, or loose paper files, making follow-up visits inefficient.
                            </li>
                            <li>
                              <strong>Low tolerance for complexity.</strong> Unlike hospital IT teams, a solo doctor or a single receptionist had to be able to learn the software in minutes, not weeks.
                            </li>
                          </ol>
                        </div>
                        <p className="modal-body-text cs-text" style={{ marginTop: '8px' }}>
                          The brief was clear: design an EMR that feels as simple as a consumer app, but is trustworthy enough to hold sensitive medical data — and use AI to remove the single biggest friction point, clinical note-taking.
                        </p>
                      </section>

                      {/* 3. Design Goals */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Design Goals</h3>
                        <ul className="cs-goals-list">
                          <li className="cs-goal-item">
                            <div className="cs-goal-number">1</div>
                            <div className="cs-goal-content">
                              <strong>Reduce clinical documentation time</strong> using AI-assisted voice-to-text, without making the doctor feel like they're "talking to a computer" mid-consultation.
                            </div>
                          </li>
                          <li className="cs-goal-item">
                            <div className="cs-goal-number">2</div>
                            <div className="cs-goal-content">
                              <strong>Centralize the patient record</strong> — demographics, allergies, addiction history, prescriptions, and uploaded reports — into one scannable profile.
                            </div>
                          </li>
                          <li className="cs-goal-item">
                            <div className="cs-goal-number">3</div>
                            <div className="cs-goal-content">
                              <strong>Keep the interface lightweight</strong> for non-technical clinic staff, using a consistent left-hand navigation, clear status tags, and minimal required fields.
                            </div>
                          </li>
                        </ul>
                      </section>

                      {/* 4. Information Architecture */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Information Architecture</h3>
                        <p className="modal-body-text cs-text">
                          Alpha EMR's navigation is built around how a real clinic actually operates day-to-day, rather than around a technical data model. The persistent left sidebar exposes six core modules:
                        </p>
                        <div className="cs-ia-grid">
                          <div className="cs-ia-card">
                            <h5>Dashboard</h5>
                            <p>Daily snapshot of patient volume, today's queue, and calendar view.</p>
                          </div>
                          <div className="cs-ia-card highlighted">
                            <h5>Alpha Echo</h5>
                            <p>The AI voice-to-notes assistant (Pinned at top of sidebar).</p>
                          </div>
                          <div className="cs-ia-card">
                            <h5>Patients</h5>
                            <p>Searchable patient directory and individual patient profiles.</p>
                          </div>
                          <div className="cs-ia-card">
                            <h5>Appointments</h5>
                            <p>Scheduling and appointment history.</p>
                          </div>
                          <div className="cs-ia-card">
                            <h5>Prescriptions</h5>
                            <p>Prescription creation and history.</p>
                          </div>
                          <div className="cs-ia-card">
                            <h5>Settings</h5>
                            <p>Clinic profile and staff accounts management.</p>
                          </div>
                        </div>
                        <p className="modal-body-text cs-text" style={{ marginTop: '8px' }}>
                          Keeping Echo pinned at the top of the sidebar — above Dashboard in visual priority — was a deliberate design decision to reinforce that AI-assisted documentation is the product's core value proposition, not a buried settings toggle.
                        </p>
                      </section>

                      {/* 5. Key Screens & Design Decisions */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Key Screens &amp; Design Decisions</h3>
                        
                        <div className="cs-screens-container">
                          <div className="cs-screen-item">
                            <h4>1. Alpha Echo — AI Voice-to-Clinical-Notes</h4>
                            <p className="modal-body-text cs-text">
                              The Echo screen was the most design-intensive part of the product. A doctor taps a single microphone button to start recording an encounter; Alpha Echo transcribes the conversation live and, at the end, generates a structured clinical summary.
                            </p>
                            <ul className="cs-bullets">
                              <li>A <strong>large, single-action microphone control</strong> as the dominant visual element, so a doctor mid-consultation never has to hunt for the right button.</li>
                              <li>A <strong>live transcript and AI-generated summary shown side by side</strong>, so the doctor can verify what the AI captured without losing trust in the automation.</li>
                              <li><strong>Multi-language support</strong> built into the interface (English, Hindi, Bangla, Marathi, Gujarati, Tamil, Telugu) as first-class toggle options, reflecting the linguistic diversity of patients across Indian clinics.</li>
                              <li>An explicit <strong>"Link Encounter to Patient"</strong> step, so a transcribed session is never orphaned from the patient record it belongs to.</li>
                            </ul>
                          </div>

                          <div className="cs-screen-item">
                            <h4>2. Dashboard</h4>
                            <p className="modal-body-text cs-text">
                              The dashboard is designed as a doctor's morning briefing: total patients, today's scheduled ratio, an embedded monthly calendar, and a queue view for the day's walk-ins and appointments. Quick-action buttons (Add Patient, Add Prescription, Start Echo, Add Schedule) sit above the fold so the three most common daily tasks never require secondary navigation.
                            </p>
                          </div>

                          <div className="cs-screen-item">
                            <h4>3. Patient Directory &amp; Patient Profile</h4>
                            <p className="modal-body-text cs-text">
                              The patient list surfaces the fields that matter most in a quick clinical glance — name, contact info, gender, known allergies, and addiction history — directly in the table, instead of hiding them behind a click-through. Status tags (e.g., token number, "Done") give front-desk staff an at-a-glance view of where each patient is in the day's flow.
                            </p>
                            <p className="modal-body-text cs-text" style={{ marginTop: '8px' }}>
                              The individual patient profile consolidates demographics, emergency contacts, known allergies, addiction history, uploaded medical files, prescription history, and a dedicated <strong>Alpha Echo Clinical Notes</strong> history. This lets the doctor retrieve the patient's entire history in seconds.
                            </p>
                          </div>

                          <div className="cs-screen-item">
                            <h4>4. Appointments</h4>
                            <p className="modal-body-text cs-text">
                              The appointments module separates the <strong>list view</strong> (searchable, filterable by patient, date, type, and status) from a <strong>structured booking form</strong> that collects patient info, doctor/provider assignment, appointment type, date/time, and a free-text reason for visit — with an optional internal-notes field kept separate from anything patient-facing.
                            </p>
                          </div>

                          <div className="cs-screen-item">
                            <h4>5. Prescriptions</h4>
                            <p className="modal-body-text cs-text">
                              The prescription flow was designed as a clinical form rather than a generic input screen: complaints, past history, examination findings, and investigations are captured in dedicated fields, followed by a repeatable <strong>"Add Medicine"</strong> block (medicine name, dosage, frequency, duration, instructions). This structure mirrors how doctors already write prescriptions on paper, reducing the learning curve to near zero.
                            </p>
                          </div>

                          <div className="cs-screen-item">
                            <h4>6. Settings &amp; User Management</h4>
                            <p className="modal-body-text cs-text">
                              Clinic-level settings (doctor profile, specialization, working hours, weekly off days) and staff/role management (admin, compounder, and other roles) were designed as simple, form-based screens so that a single receptionist — not an IT admin — can onboard new staff or update clinic hours without assistance.
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* 6. Visual & Interaction Design System */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Visual &amp; Interaction Design System</h3>
                        <p className="modal-body-text cs-text">
                          Across Alpha EMR, I maintained a consistent design language:
                        </p>
                        <div className="cs-design-system-grid">
                          <div className="cs-ds-card">
                            <strong>Sidebar-plus-content Layout</strong>
                            <p>Persistent navigation ensures users are never more than one click from any core module.</p>
                          </div>
                          <div className="cs-ds-card">
                            <strong>Card-based UI Components</strong>
                            <p>Consistent patterns for stats, tables, and forms minimize visual search times.</p>
                          </div>
                          <div className="cs-ds-card">
                            <strong>Status Tags &amp; Badges</strong>
                            <p>Interactive tag colors (Scheduled, Done, Tokens) allow fast visual scanning.</p>
                          </div>
                          <div className="cs-ds-card">
                            <strong>Light-mode First Interface</strong>
                            <p>Tailored for typical clinic lighting, with an options toggle for dark mode preference.</p>
                          </div>
                        </div>
                      </section>

                      {/* 7. Impact */}
                      <section className="cs-section">
                        <h3 className="modal-section-label cs-header">Impact</h3>
                        <p className="modal-body-text cs-text">
                          Alpha EMR was designed and shipped as a client project for AlphaNext Technology Solutions Private Limited. As an early-stage product, the immediate design wins were:
                        </p>
                        <ul className="cs-bullets">
                          <li><strong>Hands-free documentation:</strong> A clinical documentation flow (Alpha Echo) that lets a doctor generate structured notes hands-free during a consultation, instead of typing afterward.</li>
                          <li><strong>Centralized profiles:</strong> A single-screen patient profile that consolidates records previously scattered across paper and messaging apps.</li>
                          <li><strong>Low onboarding barrier:</strong> An interface simple enough for non-technical clinic staff to use with minimal onboarding.</li>
                        </ul>
                      </section>

                      {/* 8. Takeaways */}
                      <section className="cs-section cs-takeaways-section">
                        <h3 className="modal-section-label cs-header">Key Takeaways for Healthcare UI/UX</h3>
                        <div className="cs-takeaway-card">
                          <div className="cs-takeaway-num">01</div>
                          <div className="cs-takeaway-body">
                            <h5>Design for the moment of use, not just the feature list.</h5>
                            <p>A doctor mid-consultation needs one obvious action (the Echo microphone), not a menu of settings options.</p>
                          </div>
                        </div>
                        <div className="cs-takeaway-card">
                          <div className="cs-takeaway-num">02</div>
                          <div className="cs-takeaway-body">
                            <h5>Trust is a UX problem before it's a technical one.</h5>
                            <p>Showing the live transcript alongside the AI summary lets the doctor verify the AI rather than blindly trust it — critical in a medical context.</p>
                          </div>
                        </div>
                        <div className="cs-takeaway-card">
                          <div className="cs-takeaway-num">03</div>
                          <div className="cs-takeaway-body">
                            <h5>Simplicity is a clinical safety feature.</h5>
                            <p>In healthcare software, a confusing interface isn't just bad UX — it can lead to missed allergies or mis-recorded history. Every screen in Alpha EMR was designed to surface critical patient information without extra clicks.</p>
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : (
                    <>
                      <h3 className="modal-section-label">Overview</h3>
                      <p className="modal-body-text">{description}</p>

                      <h3 className="modal-section-label">Challenge</h3>
                      <p className="modal-body-text" style={{ marginBottom: '20px' }}>{challenge}</p>

                      <h3 className="modal-section-label">Solution</h3>
                      <p className="modal-body-text" style={{ marginBottom: '28px' }}>{solution}</p>
                    </>
                  )}
                </div>

                <div className="modal-details-sidebar">
                  <h3 className="modal-section-label">Project Details</h3>
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

                  <h3 className="modal-section-label">Tools & Stack</h3>
                  <div className="tags" style={{ gap: '6px', marginBottom: '28px', justifyContent: 'flex-start' }}>
                    {tools.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  {deliverables && deliverables.length > 0 && (
                    <>
                      <h3 className="modal-section-label">Project Files</h3>
                      <div className="deliverables-grid" style={{ marginBottom: '28px' }}>
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

                  <div className="modal-actions-sidebar">
                    {liveUrl !== '#' && mediaType !== 'pdf' && (
                      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 0 }}>
                        {getActionLabel()}
                      </a>
                    )}
                    {mediaType === 'pdf' && (
                      <button className="contact-btn" onClick={() => setLightboxUrl(mediaUrl)} style={{ width: '100%', justifyContent: 'center', marginTop: 0 }}>
                        View in Full Screen ↗
                      </button>
                    )}
                    <button
                      className="contact-btn secondary-btn"
                      onClick={onClose}
                      style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)', marginTop: '8px' }}
                    >
                      Close Case Study
                    </button>
                  </div>
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
