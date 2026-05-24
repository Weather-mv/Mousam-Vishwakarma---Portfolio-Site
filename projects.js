// ── PROJECTS DATA STORE ─────────────────────────────────
const PROJECTS_DATA = {
    "zero-orbit": {
        title: "Zero Orbit Labs",
        tagline: "Corporate website designed and coded from scratch with high-fidelity micro-interactions.",
        client: "Zero Orbit Labs Inc.",
        year: "2026",
        role: "Lead UI & Motion Designer",
        tools: ["Figma", "HTML5", "CSS3", "JavaScript", "After Effects"],
        description: "Zero Orbit Labs needed a modern website that communicates their edge in software engineering and R&D. The goal was to establish a high-tech, credible aesthetic that engages visitors through immersive scrolling events and micro-animations.",
        challenge: "Conveying technical complexity without overwhelming visitors, while keeping the page loading speeds under 1.5 seconds. Balancing complex CSS variables, clip paths, and keyframes was critical.",
        solution: "Designed a clean bento-grid layout in Figma. Coded using vanilla technologies to guarantee lightweight performance. Leveraged requestAnimationFrame and custom easing curves for a buttery-smooth scrolling experience.",
        liveUrl: "https://zero-orbit-labs.vercel.app",
        mediaType: "video",
        mediaUrl: "assets/videos/zero-orbit.mp4",
        posterUrl: "assets/images/zero-orbit.png",
        deliverables: [
            { name: "Home Page UI (v1)", url: "Ui Ux/Zero Orbit Labs/Home Page.pdf" },
            { name: "Home Page UI (v2)", url: "Ui Ux/Zero Orbit Labs/Home Page -2.pdf" },
            { name: "Creator Hub Platform", url: "Ui Ux/Zero Orbit Labs/Creator Hub.pdf" },
            { name: "Work & Portfolio Layout", url: "Ui Ux/Zero Orbit Labs/Work.pdf" },
            { name: "Contact & Intake Form", url: "Ui Ux/Zero Orbit Labs/Contact Form.pdf" }
        ]
    },
    "fairshare": {
        title: "Fairshare",
        tagline: "End-to-end UX/UI design for a mobile expense sharing app focusing on social friction reduction.",
        client: "Vaidik Eduservices / Internal R&D",
        year: "2025",
        role: "Lead Product Designer",
        tools: ["Figma", "UX Research", "Prototyping", "Design System"],
        description: "Fairshare is a bill-splitting application that addresses the social discomfort of group expenses. The project involved deep user interviews, wireframing, high-fidelity UI design, and interactive prototyping of complex sharing schemes.",
        challenge: "Simplifying the split workflow. Standard splitting apps require 5+ steps to create a split. The interface had to handle asymmetric splits (e.g. sharing based on ordered food items) while maintaining clarity.",
        solution: "Created an interactive 'drag-and-drop' splitting board. Users drag their avatar to an item to assign shares. Standardized components into a robust Figma Design System, reducing design iterations by 35%.",
        liveUrl: "https://figma.com",
        mediaType: "slider",
        beforeImg: "assets/images/motion-prev.png",
        afterImg: "assets/images/fairshare.png",
        beforeLabel: "Wireframe / Concept",
        afterLabel: "High-Fidelity UI",
        deliverables: [
            { name: "Low-Fi Home Wireframe", url: "Ui Ux/Low Fidelity Designs/Home Page.pdf" },
            { name: "Low-Fi Add Member Flow", url: "Ui Ux/Low Fidelity Designs/Add  Member.pdf" },
            { name: "Low-Fi New Expense Flow", url: "Ui Ux/Low Fidelity Designs/Add New Expense.pdf" },
            { name: "Low-Fi Settle Up Flow", url: "Ui Ux/Low Fidelity Designs/Settle Up.pdf" }
        ]
    },
    "emr-healthcare": {
        title: "EMR Healthcare Suite",
        tagline: "Electronic Medical Records dashboard system designed for clinical workflow efficiency.",
        client: "Hospital Network Client",
        year: "2026",
        role: "Lead UI/UX Designer",
        tools: ["Figma", "UX Research", "Information Architecture", "Healthcare Design"],
        description: "EMR Product Suite is a comprehensive healthcare dashboard designed to streamline doctor clinical workflows, patient chart analysis, prescription logs, and medical history navigation. The interface is optimized to reduce visual fatigue during long clinical shifts.",
        challenge: "Displaying extremely high-density clinical data (vital signs, lab reports, historical medication, active conditions) on a single screen without causing cognitive overload or critical reading errors.",
        solution: "Structured a tabbed widget panel system in Figma with color-coded critical status indicators. Used high-contrast typography, strict layout grids, and a dark mode interface to improve visual speed and reduce fatigue.",
        liveUrl: "Ui Ux/EMR Product.pdf",
        mediaType: "pdf",
        mediaUrl: "Ui Ux/EMR Product.pdf",
        posterUrl: "assets/images/emr_preview.png"
    },
    "alpa-labs": {
        title: "Alpa Labs Corporate Portal",
        tagline: "A corporate website design for Alpa Labs, featuring manufacturing, investor, and market layouts.",
        client: "Alpa Laboratories Ltd.",
        year: "2026",
        role: "Lead UI/UX Designer",
        tools: ["Figma", "UI/UX", "Corporate Branding", "Responsive Design"],
        description: "Alpa Labs corporate portal redesign coordinates brand consistency across public-facing structures, investor dashboards, and pharmaceutical manufacturing pipelines. The UI emphasizes clinical authority and corporate transparency.",
        challenge: "Unifying disparate content sections—such as financial investor filings and heavy pharmaceutical manufacturing metrics—into a singular, cohesive aesthetic that feels clean and modern.",
        solution: "Established a modular card-based architecture with clean typography and dynamic grids. Designed specialized sections for markets and manufacturing capability showcasing.",
        liveUrl: "Ui Ux/Alpa Labs UiUx/Home Page.pdf",
        mediaType: "pdf",
        mediaUrl: "Ui Ux/Alpa Labs UiUx/Home Page.pdf",
        posterUrl: "assets/images/alpa_preview.png",
        deliverables: [
            { name: "Home Page Portal", url: "Ui Ux/Alpa Labs UiUx/Home Page.pdf" },
            { name: "About Us Corporate", url: "Ui Ux/Alpa Labs UiUx/About Us.pdf" },
            { name: "Investor Relations", url: "Ui Ux/Alpa Labs UiUx/Investors.pdf" },
            { name: "Manufacturing Facilities", url: "Ui Ux/Alpa Labs UiUx/Manufacturing.pdf" },
            { name: "Markets & International", url: "Ui Ux/Alpa Labs UiUx/Markets - International Market.pdf" }
        ]
    },
    "chatspark": {
        title: "ChatSpark Messenger",
        tagline: "High-fidelity chat app UI focusing on layout hierarchies, messaging states, and themes.",
        client: "Mobile UI R&D",
        year: "2026",
        role: "Product Designer",
        tools: ["Figma", "Mobile UI", "Visual Design", "Dark/Light Modes"],
        description: "ChatSpark is a conceptual messaging client. The design case explores micro-interactions, input states, gradient accent highlights, and visual information mapping for instant mobile communication.",
        challenge: "Establishing visual distinction between dynamic notification elements, unread badges, multi-type messages (media, voice, text), and user group channels in a small mobile viewport.",
        solution: "Coded dynamic contrast hierarchies using HSL-based color scales. Maintained strict visual balance with soft glassmorphic panels and custom bubble border rounding that adapts to surrounding contexts.",
        liveUrl: "Ui Ux/Mobile UI/ChatSpark - Mobile UI.pdf",
        mediaType: "pdf",
        mediaUrl: "Ui Ux/Mobile UI/ChatSpark - Mobile UI.pdf",
        posterUrl: "assets/images/chatspark_preview.png"
    },
    "parkit": {
        title: "Parkit Parking App",
        tagline: "Mobile application interface designed to find, book, and navigate to parking spaces.",
        client: "IoT Mobility App",
        year: "2026",
        role: "UI/UX Designer",
        tools: ["Figma", "UX Research", "Mobile UI", "Navigation Systems"],
        description: "Parkit is a smart parking app design which interfaces with smart city IoT sensors. It enables drivers to search, book, and get driving navigation directly to reserved slots, minimizing traffic congestion.",
        challenge: "Designing an intuitive booking interface that can be operated quickly while driving, ensuring essential map filters are reachable within single-tap zones.",
        solution: "Conducted user research to design a bottom-sheet system containing key information cards. Placed active routes and filter tabs in the lower 30% of the screen for absolute thumb accessibility.",
        liveUrl: "Ui Ux/Mobile UI/Parkit Mobile UI.pdf",
        mediaType: "pdf",
        mediaUrl: "Ui Ux/Mobile UI/Parkit Mobile UI.pdf",
        posterUrl: "assets/images/parkit_preview.png"
    },
    "dashboard-designs": {
        title: "Admin Dashboard System",
        tagline: "Admin dashboard designs, layouts, and tracking metrics for complex data visualization.",
        client: "SaaS Platform Concept",
        year: "2026",
        role: "UI Designer",
        tools: ["Figma", "Dashboard Design", "Data Visualization", "Component System"],
        description: "This design project details general dashboard system principles—including sidebar component hierarchies, tracking panels, neon analytical charts, and interactive table search states.",
        challenge: "Unifying various dashboard views and complex charts into a singular component library that scales fluidly for desktop, tablet, and widescreen monitors.",
        solution: "Built a fully componentized dashboard system in Figma utilizing auto-layout v5. Developed highly flexible chart components, interactive states, and layout templates.",
        liveUrl: "Ui Ux/Dashboard Ui/Dashboard Designs.pdf",
        mediaType: "pdf",
        mediaUrl: "Ui Ux/Dashboard Ui/Dashboard Designs.pdf",
        posterUrl: "assets/images/dashboard_preview.png"
    },
    "motion-1": {
        title: "Motion Design - Case 1",
        tagline: "Creative motion graphics case study detailing fluid visual transitions and timing.",
        client: "Self / R&D",
        year: "2026",
        role: "Motion Designer",
        tools: ["After Effects", "Illustrator", "Premiere Pro"],
        description: "An exploration of complex visual choreography, focusing on smooth ease curves, spatial interpolation, and rhythmic timing synchronizations.",
        challenge: "Aligning fast-paced element dynamics with minimal visual distraction to maintain high clarity.",
        solution: "Leveraged speed graphs and custom value expressions in After Effects to guarantee organic easing transitions.",
        liveUrl: "https://youtu.be/CdDdJzvh_QU",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/CdDdJzvh_QU?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/CdDdJzvh_QU/hqdefault.jpg"
    },
    "motion-2": {
        title: "Motion Design - Case 2",
        tagline: "High-fidelity interface motion design exploring elastic spring dynamics and states.",
        client: "Self / R&D",
        year: "2026",
        role: "Motion Designer",
        tools: ["After Effects", "Figma", "Lottie"],
        description: "A detailed case study exploring UI micro-interactions, spring physics, dynamic button states, and screen transitions for mobile applications.",
        challenge: "Translating standard static Figma designs into lifelike, organic interface animations without feeling sluggish.",
        solution: "Engineered precise animation timelines with secondary follow-through elements, exporting them to JSON via Bodymovin for web rendering.",
        liveUrl: "https://youtu.be/ZMTBt1dSMco",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/ZMTBt1dSMco?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/ZMTBt1dSMco/hqdefault.jpg"
    },
    "motion-3": {
        title: "Motion Design - Case 3",
        tagline: "Dynamic kinetic typography and audio-reactive vector motion graphics.",
        client: "Self / R&D",
        year: "2026",
        role: "Motion Designer",
        tools: ["After Effects", "Audition", "Illustrator"],
        description: "A rhythmic, high-energy typography reel focusing on audio-reactive keyframes, custom expressions, and camera moves to convey semantic meaning through movement.",
        challenge: "Handling massive keyframe densities while ensuring a smooth rendering pipeline and seamless sync with sound cues.",
        solution: "Created automated motion templates utilizing null objects and camera rigs, optimizing layer hierarchies for preview rendering speeds.",
        liveUrl: "https://youtu.be/rn4no82M-cM",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/rn4no82M-cM?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/rn4no82M-cM/hqdefault.jpg"
    },
    "demo-1": {
        title: "Product Demo - Case 1",
        tagline: "Interactive SaaS product dashboard showcase and feature highlights animation.",
        client: "Various Clients",
        year: "2026",
        role: "UI Motion Designer",
        tools: ["After Effects", "Premiere Pro", "Figma"],
        description: "A clean, story-driven product demo showcasing dashboard usage workflows, dynamic data visualization rendering, and analytics feature walkthroughs.",
        challenge: "Structuring UI workflow walkthroughs to highlight complex capabilities within a 30-second engagement window.",
        solution: "Designed dynamic zoom states, focus blur transitions, and cursor path lines to direct the viewer's attention directly to target telemetry panels.",
        liveUrl: "https://youtu.be/SjHOh26At1I",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/SjHOh26At1I?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/SjHOh26At1I/hqdefault.jpg"
    },
    "demo-2": {
        title: "Product Demo - Case 2",
        tagline: "Mobile application interactive feature walkthrough and commercial promo reel.",
        client: "IoT Mobility Client",
        year: "2026",
        role: "UI Motion Designer",
        tools: ["After Effects", "Figma", "Cinema 4D"],
        description: "A mobile-centric product demo detailing booking workflows, location tracking maps, and payment systems using floating UI mockups and 3D device framing.",
        challenge: "Unifying 3D product hardware visuals with 2D interface animations smoothly without jarring depth discontinuities.",
        solution: "Rendered the device model in Cinema 4D, matching the camera perspective, and tracked the screen surfaces in After Effects for pixel-perfect UI projection mapping.",
        liveUrl: "https://youtu.be/5t2SbQQ2SmU",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/5t2SbQQ2SmU?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/5t2SbQQ2SmU/hqdefault.jpg"
    },
    "demo-3": {
        title: "Product Demo - Case 3",
        tagline: "SaaS platform collaborative workspaces walkthrough and tool highlights.",
        client: "Alphanext Tech",
        year: "2026",
        role: "UI Motion Designer",
        tools: ["After Effects", "Premiere Pro", "UI Mockups"],
        description: "A high-performance product screencast walkthrough demonstrating multi-user collaborative editing, version history rollbacks, and team workspace management tools.",
        challenge: "Conveying the speed of real-time collaboration without creating visual noise or crowded, hard-to-follow viewports.",
        solution: "Curated smooth vector mockups of cursor indicators and highlight flashes, using split-screen elements to detail synchronized workspace updates.",
        liveUrl: "https://youtu.be/wFjTq-WqFEE",
        mediaType: "iframe",
        mediaUrl: "https://www.youtube-nocookie.com/embed/wFjTq-WqFEE?rel=0&modestbranding=1",
        posterUrl: "https://img.youtube.com/vi/wFjTq-WqFEE/hqdefault.jpg"
    }
};


// ── DOM ELEMENTS ────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.getElementById('projectsGrid');
const projectsCount = document.getElementById('projectsCount');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const body = document.body;

// ── HOVER VIDEO CONTROLS ────────────────────────────────
projectCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Ignore autoplay/aborted playback rejections
            });
        }
    });

    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// ── GRID FILTER LOGIC ────────────────────────────────────
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle Active Button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        // Smoothly hide grid, filter elements, and reveal
        if (projectsGrid) {
            projectsGrid.style.opacity = '0';
            projectsGrid.style.transform = 'translateY(10px)';

            setTimeout(() => {
                let count = 0;
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (filterVal === 'all' || categories.includes(filterVal)) {
                        card.style.display = 'flex';
                        count++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Update counts
                if (projectsCount) {
                    projectsCount.textContent = `Showing ${count} project${count !== 1 ? 's' : ''}`;
                }

                // Fade back in
                projectsGrid.style.opacity = '1';
                projectsGrid.style.transform = 'translateY(0)';
            }, 250);
        }
    });
});

if (projectsGrid) {
    projectsGrid.style.transition = 'opacity .3s ease, transform .3s cubic-bezier(.16, 1, .3, 1)';
}

// ── CASE STUDY MODAL LOGIC ──────────────────────────────
projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent click trigger if the user explicitly clicks tags/external links
        if (e.target.closest('.tags') || e.target.closest('.arrow-link')) return;

        const projectId = card.getAttribute('data-id');
        openProjectModal(projectId);
    });
});

function openProjectModal(id) {
    const data = PROJECTS_DATA[id];
    if (!data) return;

    // Build Modal Layout
    let mediaHTML = '';
    if (data.mediaType === 'video') {
        mediaHTML = `
            <video src="${data.mediaUrl}" poster="${data.posterUrl}" autoplay loop muted playsinline controls></video>
        `;
    } else if (data.mediaType === 'slider') {
        mediaHTML = `
            <div class="before-after-container" id="beforeAfterSlider">
                <img class="before-after-img" src="${data.afterImg}" alt="${data.title} Final Screen" />
                <div class="before-after-overlay" id="sliderOverlay">
                    <img src="${data.beforeImg}" alt="${data.title} Wireframe" />
                </div>
                <div class="before-after-handle" id="sliderHandle">
                    <div class="before-after-handle-button">↔</div>
                </div>
                <span class="before-after-label label-before">${data.beforeLabel}</span>
                <span class="before-after-label label-after">${data.afterLabel}</span>
            </div>
        `;
    } else if (data.mediaType === 'pdf') {
        mediaHTML = `
            <div class="pdf-preview-box" id="pdfPreviewBox">
                <div class="pdf-canvas-list" id="pdfCanvasList">
                    <div class="pdf-loading"><div class="spinner"></div><div>Loading preview...</div></div>
                </div>
                <div class="pdf-overlay-trigger" id="pdfOverlayTrigger">
                    <div class="pdf-expand-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                        <span>View Design in Full Screen</span>
                    </div>
                </div>
            </div>
        `;
    } else if (data.mediaType === 'iframe') {
        mediaHTML = `
            <iframe src="${data.mediaUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none; border-radius: 8px;"></iframe>
        `;
    } else {
        mediaHTML = `
            <img src="${data.mediaUrl}" class="modal-img" alt="${data.title} Preview" />
        `;
    }

    const toolsHTML = data.tools.map(t => `<span class="tag">${t}</span>`).join('');

    let deliverablesHTML = '';
    if (data.deliverables && data.deliverables.length > 0) {
        deliverablesHTML = `
            <h3 class="modal-section-label" style="margin-top: 24px;">Project Files / Deliverables</h3>
            <div class="deliverables-grid">
                ${data.deliverables.map(d => `
                    <a href="#" data-pdf-url="${d.url}" class="deliverable-link">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px;">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span>${d.name}</span>
                    </a>
                `).join('')}
            </div>
        `;
    }

    const modalHTML = `
        <div class="modal-grid">
            <div class="modal-details">
                <h2 class="modal-title">${data.title}</h2>
                <div class="modal-tagline">${data.tagline}</div>

                <h3 class="modal-section-label">Overview</h3>
                <div class="modal-info-block">
                    <div>
                        <div class="info-cell-title">Client</div>
                        <div class="info-cell-val">${data.client}</div>
                    </div>
                    <div>
                        <div class="info-cell-title">Year</div>
                        <div class="info-cell-val">${data.year}</div>
                    </div>
                    <div style="grid-column: span 2; margin-top: 6px;">
                        <div class="info-cell-title">Role</div>
                        <div class="info-cell-val">${data.role}</div>
                    </div>
                </div>

                <p class="modal-body-text">${data.description}</p>

                <h3 class="modal-section-label">Challenge</h3>
                <p class="modal-body-text" style="margin-bottom: 20px;">${data.challenge}</p>

                <h3 class="modal-section-label">Solution</h3>
                <p class="modal-body-text" style="margin-bottom: 28px;">${data.solution}</p>
                
                ${deliverablesHTML}

                <div class="modal-actions">
                    ${data.liveUrl !== '#' && data.mediaType !== 'pdf' ? `
                        <a href="${data.liveUrl}" target="_blank" class="contact-btn" style="margin-top: 0;">
                            ${data.mediaType === 'iframe' ? (data.mediaUrl.includes('youtube') ? 'Watch on YouTube ↗' : (data.mediaUrl.includes('wistia') ? 'Open Wistia Folder ↗' : 'Open Vimeo Showcase ↗')) : 'Live Website ↗'}
                        </a>
                    ` : ''}
                    ${data.mediaType === 'pdf' ? `
                        <button class="contact-btn" id="modalPDFFullscreenBtn" style="margin-top: 0;">
                            View in Full Screen ↗
                        </button>
                    ` : ''}
                    <button class="contact-btn secondary-btn" id="modalCloseActionBtn" style="background: transparent; color: var(--muted); border-color: var(--border);">
                        Close Case Study
                    </button>
                </div>
            </div>
            
            <div>
                <div class="modal-section-label" style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Media Preview</span>
                    ${data.mediaType === 'slider' ? '<span style="font-family: Geist Mono; font-size: 9px; color: var(--green);">Drag handle to compare</span>' : ''}
                    ${data.mediaType === 'pdf' ? '<span style="font-family: Geist Mono; font-size: 9px; color: var(--green);">Interactive document view</span>' : ''}
                    ${data.mediaType === 'iframe' ? '<span style="font-family: Geist Mono; font-size: 9px; color: var(--green);">Interactive player view</span>' : ''}
                </div>
                <div class="modal-visual ${data.mediaType === 'pdf' ? 'pdf-mode' : ''} ${data.mediaType === 'iframe' ? 'iframe-mode' : ''}">
                    ${mediaHTML}
                </div>
                <div class="tags" style="margin-top: 16px; gap: 6px; justify-content: center;">
                    ${toolsHTML}
                </div>
            </div>
        </div>
    `;

    modalContent.innerHTML = modalHTML;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
    body.style.overflow = 'hidden';

    // Update URL query parameters silently
    const newUrl = `${window.location.pathname}?project=${id}`;
    window.history.pushState({ project: id }, '', newUrl);

    // If modal visual is a slider, initialize the slider logic
    if (data.mediaType === 'slider') {
        initCompareSlider();
    }

    // Render PDF canvas pages if mediaType is pdf
    if (data.mediaType === 'pdf') {
        renderPDFPages(data.mediaUrl, 'pdfCanvasList', false);
        
        // Disable right-click on the preview box
        const previewBox = document.getElementById('pdfPreviewBox');
        if (previewBox) {
            previewBox.addEventListener('contextmenu', e => e.preventDefault());
        }
        
        // Attach Full Screen Lightbox trigger to preview box
        const overlayTrigger = document.getElementById('pdfOverlayTrigger');
        if (overlayTrigger) {
            overlayTrigger.addEventListener('click', () => {
                openPDFLightbox(data.mediaUrl);
            });
        }
        
        // Attach Full Screen Lightbox trigger to action button
        const pdfFullscreenBtn = document.getElementById('modalPDFFullscreenBtn');
        if (pdfFullscreenBtn) {
            pdfFullscreenBtn.addEventListener('click', () => {
                openPDFLightbox(data.mediaUrl);
            });
        }
    }
    
    // Listen for deliverable link clicks to open in secure lightbox instead of direct download
    const deliverablesContainer = modalContent.querySelector('.deliverables-grid');
    if (deliverablesContainer) {
        deliverablesContainer.addEventListener('click', (e) => {
            const link = e.target.closest('.deliverable-link');
            if (link) {
                e.preventDefault();
                const pdfUrl = link.getAttribute('data-pdf-url');
                openPDFLightbox(pdfUrl);
            }
        });
    }

    // Attach internal close buttons event listeners
    const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
    if (modalCloseActionBtn) {
        modalCloseActionBtn.addEventListener('click', closeModal);
    }
}

function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
    body.style.overflow = '';

    // Clear dynamic content after transitions complete
    setTimeout(() => {
        modalContent.innerHTML = '';
    }, 400);

    // Revert URL query parameters silently
    window.history.pushState({}, '', window.location.pathname);
}

// Attach Close Events
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('pdfLightbox');
    const isModalOpen = modal && modal.classList.contains('open');
    const isLightboxOpen = lightbox && lightbox.classList.contains('open');
    
    // Intercept Save (Ctrl+S / Cmd+S) and Print (Ctrl+P / Cmd+P) when modal/lightbox is active
    if (isModalOpen || isLightboxOpen) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'S' || e.key === 'P')) {
            e.preventDefault();
            return;
        }
    }
    
    if (e.key === 'Escape') {
        if (isLightboxOpen) {
            closePDFLightbox();
            e.stopPropagation();
        } else if (isModalOpen) {
            closeModal();
        }
    }
});

// Custom cursor ring hovering state triggers on filter buttons, close buttons, and dynamic buttons
document.addEventListener('mouseenter', (e) => {
    const target = e.target.closest('a, button, .card, .tool-icon-box, .skill-tag, .tag, .contact-btn, .dl-icon, .arrow-icon');
    const ring = document.getElementById('cursorRing');
    if (target && ring) ring.classList.add('hovering');
}, true);

document.addEventListener('mouseleave', (e) => {
    const target = e.target.closest('a, button, .card, .tool-icon-box, .skill-tag, .tag, .contact-btn, .dl-icon, .arrow-icon');
    const ring = document.getElementById('cursorRing');
    if (target && ring) ring.classList.remove('hovering');
}, true);

// ── COMPARE SLIDER INITIALIZATION ───────────────────────
function initCompareSlider() {
    const container = document.getElementById('beforeAfterSlider');
    const overlay = document.getElementById('sliderOverlay');
    const handle = document.getElementById('sliderHandle');
    if (!container || !overlay || !handle) return;

    let active = false;

    // Mouse events
    handle.addEventListener('mousedown', () => { active = true; });
    container.addEventListener('mouseup', () => { active = false; });
    container.addEventListener('mouseleave', () => { active = false; });
    container.addEventListener('mousemove', (e) => {
        if (!active) return;
        adjustSlider(e.clientX);
    });

    // Touch events for mobile support
    handle.addEventListener('touchstart', () => { active = true; });
    container.addEventListener('touchend', () => { active = false; });
    container.addEventListener('touchmove', (e) => {
        if (!active) return;
        adjustSlider(e.touches[0].clientX);
    });

    function adjustSlider(clientX) {
        const bounds = container.getBoundingClientRect();
        const x = clientX - bounds.left;
        let pct = (x / bounds.width) * 100;

        // Clamp
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;

        handle.style.left = `${pct}%`;
        overlay.style.width = `${pct}%`;
    }
}

// ── DEEP LINK CHECK ──────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projId = params.get('project');
    if (projId && PROJECTS_DATA[projId]) {
        // Delay slightly for render transitions to feel smooth
        setTimeout(() => {
            openProjectModal(projId);
        }, 300);
    }
});

// Handle browser navigation (back/forward history)
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.project && PROJECTS_DATA[e.state.project]) {
        openProjectModal(e.state.project);
    } else {
        // No project state, close modal if open
        if (modal && modal.classList.contains('open')) {
            modal.classList.remove('open');
            body.classList.remove('modal-open');
            body.style.overflow = '';
            modalContent.innerHTML = '';
        }
    }
});

// ── SECURE & FULLSCREEN PDF RENDERING LOGIC ───────────────
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

let activePdfLoadingTask = null;

function renderPDFPages(pdfUrl, containerId, isHighRes = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<div class="pdf-loading"><div class="spinner"></div><div class="pdf-loading-msg">Hold on, the design is just a second away...</div><div class="pdf-loading-progress">Initializing viewer...</div></div>';
    
    if (activePdfLoadingTask) {
        activePdfLoadingTask.destroy();
    }
    
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    activePdfLoadingTask = loadingTask;
    
    loadingTask.onProgress = function(progressData) {
        if (progressData.total > 0) {
            const percent = Math.round((progressData.loaded / progressData.total) * 100);
            container.innerHTML = `
                <div class="pdf-loading">
                    <div class="spinner"></div>
                    <div class="pdf-loading-msg">Hang tight, the design is just a second away...</div>
                    <div class="pdf-loading-progress">${percent}% loaded</div>
                    <div style="font-size: 10px; margin-top: 4px; color: var(--muted);">${Math.round(progressData.loaded / 1024 / 1024 * 10) / 10}MB / ${Math.round(progressData.total / 1024 / 1024 * 10) / 10}MB</div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="pdf-loading">
                    <div class="spinner"></div>
                    <div class="pdf-loading-msg">Hang tight, the design is just a second away...</div>
                    <div class="pdf-loading-progress">${Math.round(progressData.loaded / 1024 / 1024 * 10) / 10}MB loaded</div>
                </div>
            `;
        }
    };
    
    loadingTask.promise.then(pdf => {
        container.innerHTML = '';
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const pageWrapper = document.createElement('div');
            pageWrapper.className = 'pdf-page-wrapper';
            
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page-canvas';
            pageWrapper.appendChild(canvas);
            container.appendChild(pageWrapper);
            
            pageWrapper.addEventListener('contextmenu', e => e.preventDefault());
            
            pdf.getPage(pageNum).then(page => {
                const ctx = canvas.getContext('2d');
                const scale = isHighRes ? 2.0 : 1.2;
                const viewport = page.getViewport({ scale: scale });
                
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }
    }).catch(error => {
        console.warn("pdf.js load blocked or failed (e.g. local file:// CORS restrictions). Falling back to native viewer.", error);
        
        // Render custom loading screen alongside a hidden iframe
        // Inline onload resolves the race condition when loading locally (file:// protocol)
        // relative traversal (previousElementSibling) avoids duplicate ID selector conflicts
        container.innerHTML = `
            <div class="pdf-loading">
                <div class="spinner"></div>
                <div class="pdf-loading-msg">Hold on, the design is just a second away...</div>
                <div class="pdf-loading-progress">Loading preview...</div>
            </div>
            <iframe class="fallback-iframe" src="${pdfUrl}#toolbar=0&navpanes=0" style="border:none; width:100%; height:100%; display:none;" onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none'; this.style.display='block';"></iframe>
        `;
    });
}

function openPDFLightbox(pdfUrl) {
    let lightbox = document.getElementById('pdfLightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'pdfLightbox';
        lightbox.className = 'pdf-lightbox';
        lightbox.innerHTML = `
            <button class="pdf-lightbox-close" id="pdfLightboxClose" aria-label="Close Fullscreen View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="pdf-lightbox-content" id="pdfLightboxContent">
                <div class="pdf-loading"><div class="spinner"></div><div>Loading high-fidelity document...</div></div>
            </div>
            <div class="pdf-lightbox-hint">Scroll down to view more pages · Right-click is disabled for security</div>
        `;
        document.body.appendChild(lightbox);
        
        document.getElementById('pdfLightboxClose').addEventListener('click', closePDFLightbox);
        lightbox.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
    renderPDFPages(pdfUrl, 'pdfLightboxContent', true);
}

function closePDFLightbox() {
    const lightbox = document.getElementById('pdfLightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
        document.body.classList.remove('lightbox-open');
        const content = document.getElementById('pdfLightboxContent');
        if (content) content.innerHTML = '';
        
        if (activePdfLoadingTask) {
            activePdfLoadingTask.destroy();
            activePdfLoadingTask = null;
        }
    }
}
