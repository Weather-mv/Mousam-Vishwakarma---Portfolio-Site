// ── DYNAMIC GLOBAL ANIMATIONS (SCROLL SKEW & PROGRESS BAR) ─
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Scroll Progress Bar
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.id = 'scrollProgress';
    document.body.prepend(progress);

    // 2. Scroll Progress Bar Update
    window.addEventListener('scroll', () => {
        const winScroll = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const progressEl = document.getElementById('scrollProgress');
        if (progressEl) progressEl.style.width = scrolled + '%';
    }, { passive: true });

    // 3. Dynamic Scroll-Velocity Skewing on Bento content
    let lastScrollY = window.scrollY;
    let skewTarget = 0;
    let skewCurrent = 0;
    const skewElement = document.getElementById('mainContent') || document.querySelector('.container');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
        
        // Cap the skew velocity target (subtle tilt)
        skewTarget = Math.max(-5, Math.min(5, diff * 0.12));
    }, { passive: true });

    (function skewLoop() {
        // Lerp towards target skew
        skewCurrent += (skewTarget - skewCurrent) * 0.085;
        // Decay target skew towards 0
        skewTarget += (0 - skewTarget) * 0.085;
        
        if (skewElement) {
            // Apply the skewY transform
            skewElement.style.transform = `skewY(${skewCurrent.toFixed(3)}deg)`;
        }
        
        requestAnimationFrame(skewLoop);
    })();
});

// ── SMOOTH CURSOR (lerp ring) ───────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});
(function loop() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = Math.round(rx * 10) / 10 + 'px';
    ring.style.top = Math.round(ry * 10) / 10 + 'px';
    requestAnimationFrame(loop);
})();
const hoverEls = document.querySelectorAll('a,.card,.tool-icon-box,.skill-tag,.tag,.contact-btn,.dl-icon,.arrow-icon');
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

// ── CARD MOUSE-FOLLOW RADIAL HIGHLIGHT & 3D TILT ───────
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        
        // Dynamic Apple-like 3D Card Tilt
        const xc = r.width / 2;
        const yc = r.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        const rx = -(dy / yc) * 4; // Max 4 degrees rotation on X axis
        const ry = (dx / xc) * 4;  // Max 4 degrees rotation on Y axis
        card.style.setProperty('--rx', rx + 'deg');
        card.style.setProperty('--ry', ry + 'deg');
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
    });
});

// ── NAV SCROLL ─────────────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });

// ── CLOCK IST ──────────────────────────────────────────
function tick() {
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = ist.getHours();
    const m = ist.getMinutes();
    const s = ist.getSeconds();
    
    // Digital Time formatting
    const ap = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    const displayTime = displayH + ':' + String(m).padStart(2, '0') + ' ' + ap;
    
    const navTimeEl = document.getElementById('navTime');
    const timeDisplayEl = document.getElementById('timeDisplay');
    if (navTimeEl) navTimeEl.textContent = displayTime;
    if (timeDisplayEl) timeDisplayEl.textContent = displayTime;
    
    // Analog Clock Hand Rotations
    const hrHand = document.getElementById('clockHour');
    const minHand = document.getElementById('clockMin');
    const secHand = document.getElementById('clockSec');
    
    if (hrHand && minHand && secHand) {
        const hrDeg = ((h % 12) * 30) + (m * 0.5);
        const minDeg = (m * 6) + (s * 0.1);
        const secDeg = s * 6;
        
        hrHand.style.transform = `rotate(${hrDeg}deg)`;
        minHand.style.transform = `rotate(${minDeg}deg)`;
        secHand.style.transform = `rotate(${secDeg}deg)`;
    }
}
tick(); setInterval(tick, 1000);

// ── INTERSECTION OBSERVER ──────────────────────────────
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.exp-col').forEach(el => io.observe(el));

// ── SKILL TAGS stagger ─────────────────────────────────
const skillIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-tag').forEach((t, i) => {
                setTimeout(() => t.classList.add('in'), i * 45);
            });
            skillIO.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-section').forEach(s => skillIO.observe(s));

// ── TOOL ICONS stagger ─────────────────────────────────
const toolIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.tool-icon-box').forEach((t, i) => {
                setTimeout(() => t.classList.add('in'), i * 40);
            });
            toolIO.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
const toolsRow = document.getElementById('toolsRow');
if (toolsRow) toolIO.observe(toolsRow);

// ── HERO PARALLAX (rAF-throttled) ─────────────────────
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const y = scrollY;
            const m1 = document.querySelector('.hero-name-mousam');
            const m2 = document.querySelector('.hero-name-vishwa');
            if (m1) m1.style.transform = `translateY(${y * .055}px)`;
            if (m2) m2.style.transform = `translateY(${y * -.04}px)`;
            const names = document.querySelector('.hero-names');
            const roles = document.querySelector('.hero-roles');
            const orb = document.querySelector('.hero-orb');
            if (names) names.style.opacity = Math.max(0, 1 - y / 280);
            if (roles) roles.style.opacity = Math.max(0, 1 - y / 180);
            if (orb) orb.style.transform = `translate(-50%,-52%) translateY(${y * .12}px)`;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });
