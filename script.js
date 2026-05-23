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

// ── CARD MOUSE-FOLLOW RADIAL HIGHLIGHT ─────────────────
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
});

// ── NAV SCROLL ─────────────────────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });

// ── CLOCK IST ──────────────────────────────────────────
function tick() {
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    let h = ist.getHours(), m = ist.getMinutes();
    const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    const s = h + ':' + String(m).padStart(2, '0') + ' ' + ap;
    document.getElementById('navTime').textContent = s;
    document.getElementById('timeDisplay').textContent = s;
}
tick(); setInterval(tick, 10000);

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
