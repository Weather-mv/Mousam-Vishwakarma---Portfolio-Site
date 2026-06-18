import React, { useRef, useEffect } from 'react';

export default function BentoCard({ children, className = '', id, style, revealType = '' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 1. Mouse movement tilt and highlight effects using requestAnimationFrame throttling
    let ticking = false;
    let rafId = null;

    const handleMouseMove = (e) => {
      if (!ticking) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        rafId = requestAnimationFrame(() => {
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);

          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const dx = x - xc;
          const dy = y - yc;
          const rx = -(dy / yc) * 4; // Max 4 degrees rotation on X
          const ry = (dx / xc) * 4;  // Max 4 degrees rotation on Y

          card.style.setProperty('--rx', `${rx}deg`);
          card.style.setProperty('--ry', `${ry}deg`);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      ticking = false;
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // 2. Intersection observer for reveal animations
    let observer = null;
    if (revealType || className.includes('reveal')) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(card);
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (observer) {
        observer.disconnect();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [className, revealType]);

  // Combine reveal classes
  const revealClass = revealType ? `reveal-${revealType}` : '';
  const finalClass = `card ${revealClass} ${className}`.trim();

  return (
    <div
      ref={cardRef}
      className={finalClass}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
}
