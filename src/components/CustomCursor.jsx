import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let hasMoved = false;
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      
      if (!hasMoved) {
        hasMoved = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, .card, .tool-icon-box, .skill-tag, .tag, .contact-btn, .dl-icon, .arrow-icon, .deliverable-link');
      if (target && ringRef.current) {
        ringRef.current.classList.add('hovering');
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, .card, .tool-icon-box, .skill-tag, .tag, .contact-btn, .dl-icon, .arrow-icon, .deliverable-link');
      if (target && ringRef.current) {
        ringRef.current.classList.remove('hovering');
      }
    };

    const handleMouseLeaveViewport = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnterViewport = () => {
      if (hasMoved) {
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mouseleave', handleMouseLeaveViewport, { capture: true });
    document.addEventListener('mouseenter', handleMouseEnterViewport, { capture: true });

    const updateRing = () => {
      // Lerp with slightly faster coefficient (0.15) for responsive feel
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      
      if (ringRef.current) {
        // Rounding to 1 decimal place to prevent subpixel layout thrashing, while keeping translation performant
        ringRef.current.style.transform = `translate3d(${Math.round(rx * 10) / 10}px, ${Math.round(ry * 10) / 10}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateRing);
    };

    updateRing();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mouseleave', handleMouseLeaveViewport, { capture: true });
      document.removeEventListener('mouseenter', handleMouseEnterViewport, { capture: true });
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="cursor" id="cursor">
      <div className="cursor-ring" id="cursorRing" ref={ringRef}>
        <div className="cursor-ring-inner"></div>
      </div>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
    </div>
  );
}
