import React, { useEffect, useRef } from 'react';

export default function AnalogClock() {
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const secRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      // Calculate India Standard Time (IST)
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = ist.getHours();
      const m = ist.getMinutes();
      const s = ist.getSeconds();

      const hrDeg = ((h % 12) * 30) + (m * 0.5);
      const minDeg = (m * 6) + (s * 0.1);
      const secDeg = s * 6;

      if (hourRef.current) hourRef.current.style.transform = `rotate(${hrDeg}deg)`;
      if (minRef.current) minRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (secRef.current) secRef.current.style.transform = `rotate(${secDeg}deg)`;
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="analog-clock" aria-label="Analog Clock representing local time in Indore">
      <div className="clock-face">
        <div className="clock-tick clock-tick-12"></div>
        <div className="clock-tick clock-tick-3"></div>
        <div className="clock-tick clock-tick-6"></div>
        <div className="clock-tick clock-tick-9"></div>
        <div className="clock-hand hour-hand" ref={hourRef}></div>
        <div className="clock-hand minute-hand" ref={minRef}></div>
        <div className="clock-hand second-hand" ref={secRef}></div>
        <div className="clock-center"></div>
      </div>
    </div>
  );
}
