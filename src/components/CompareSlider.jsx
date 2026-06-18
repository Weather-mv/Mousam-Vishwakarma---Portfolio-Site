import React, { useState, useRef, useEffect } from 'react';

export default function CompareSlider({ beforeImg, afterImg, beforeLabel, afterLabel, title }) {
  const [pct, setPct] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleStart = (e) => {
    isDragging.current = true;
    e.preventDefault(); // Prevent text highlights/drag actions
  };

  useEffect(() => {
    const handleMove = (clientX) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let newPct = (x / rect.width) * 100;
      if (newPct < 0) newPct = 0;
      if (newPct > 100) newPct = 100;
      setPct(newPct);
    };

    const handleMouseMove = (e) => {
      handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div
      className="before-after-container"
      id="beforeAfterSlider"
      ref={containerRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <img className="before-after-img" src={afterImg} alt={`${title} Final Screen`} />
      <div className="before-after-overlay" id="sliderOverlay" style={{ width: `${pct}%` }}>
        <img src={beforeImg} alt={`${title} Wireframe`} />
      </div>
      <div className="before-after-handle" id="sliderHandle" style={{ left: `${pct}%` }}>
        <div className="before-after-handle-button">↔</div>
      </div>
      <span className="before-after-label label-before">{beforeLabel}</span>
      <span className="before-after-label label-after">{afterLabel}</span>
    </div>
  );
}
