import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const m1ParentRef = useRef(null);
  const m2ParentRef = useRef(null);
  const namesRef = useRef(null);
  const rolesRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          
          if (m1ParentRef.current) {
            m1ParentRef.current.style.transform = `translate3d(0, ${y * 0.055}px, 0)`;
          }
          if (m2ParentRef.current) {
            m2ParentRef.current.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
          }
          if (namesRef.current) {
            namesRef.current.style.opacity = Math.max(0, 1 - y / 280);
          }
          if (rolesRef.current) {
            rolesRef.current.style.opacity = Math.max(0, 1 - y / 180);
          }
          if (orbRef.current) {
            orbRef.current.style.transform = `translate3d(-50%, -52%, 0) translateY(${y * 0.12}px)`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-orb" ref={orbRef}></div>
      <h1 className="hero-names" ref={namesRef}>
        <span className="hero-name-line" ref={m1ParentRef}>
          <span className="hero-name-mousam">Mousam</span>
        </span>
        <span className="hero-divider"></span>
        <span className="hero-name-line" ref={m2ParentRef}>
          <span className="hero-name-vishwa">Vishwakarma</span>
        </span>
      </h1>
      <p className="hero-roles" ref={rolesRef}>
        UI Motion Designer · Interaction Designer · Design Technologist
      </p>
      <div className="hero-scroll">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
