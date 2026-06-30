import React, { useRef, useEffect, useCallback } from 'react';
import charLeft from '../assets/components-img/char-left.png';
import charCenter from '../assets/components-img/char-center.png';
import charRight from '../assets/components-img/char-right.png';

const AdvantageSection = () => {
  const canvasRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const rafRef = useRef(null);
  const mouseXRef = useRef(0);
  const currentXRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      mouseXRef.current = (e.clientX - cx) / cx;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const clouds = [
      { x: 0.15, y: 0.15, r: 450, speed: 0.0002, phase: 0, color: [0, 200, 255] },
      { x: 0.5, y: 0.2, r: 500, speed: 0.00018, phase: 2.5, color: [0, 210, 255] },
      { x: 0.85, y: 0.15, r: 440, speed: 0.00025, phase: 3.8, color: [0, 190, 245] },
      { x: 0.3, y: 0.4, r: 400, speed: 0.00022, phase: 1.8, color: [0, 220, 255] },
      { x: 0.7, y: 0.35, r: 380, speed: 0.00028, phase: 3.2, color: [0, 180, 240] },
      { x: 0.1, y: 0.6, r: 420, speed: 0.00016, phase: 4.5, color: [0, 195, 248] },
      { x: 0.5, y: 0.65, r: 400, speed: 0.00026, phase: 0.8, color: [0, 200, 250] },
      { x: 0.85, y: 0.6, r: 370, speed: 0.0002, phase: 4.2, color: [0, 210, 252] },
      { x: 0.35, y: 0.85, r: 460, speed: 0.00017, phase: 1, color: [0, 180, 238] },
      { x: 0.7, y: 0.8, r: 380, speed: 0.00023, phase: 3, color: [0, 200, 250] },
    ];

    const drawCloud = (cx, cy, r, color, alpha) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      clouds.forEach(cloud => {
        const offsetX = Math.sin(time * cloud.speed + cloud.phase) * 80;
        const offsetY = Math.cos(time * cloud.speed * 0.7 + cloud.phase) * 50;
        const scale = 1 + Math.sin(time * cloud.speed * 0.5 + cloud.phase) * 0.15;
        const alpha = 0.25 + Math.sin(time * cloud.speed * 0.3 + cloud.phase) * 0.08;

        const cx = cloud.x * canvas.width + offsetX;
        const cy = cloud.y * canvas.height + offsetY;
        const r = cloud.r * scale;

        drawCloud(cx, cy, r, cloud.color, alpha);
        drawCloud(cx + r * 0.3, cy - r * 0.2, r * 0.5, cloud.color, alpha * 0.5);
      });

      // Smooth parallax without React re-renders
      currentXRef.current += (mouseXRef.current - currentXRef.current) * 0.08;
      const mx = currentXRef.current;

      if (leftRef.current) {
        leftRef.current.style.transform = `translateX(${-mx * 12}px)`;
      }
      if (centerRef.current) {
        centerRef.current.style.transform = `translateX(calc(-50% + ${mx * 4}px))`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateX(${-mx * 12}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#080808',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%)',
        }}
      />

      {/* Glass cards */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        padding: '0 40px',
        boxSizing: 'border-box',
        zIndex: 4,
        flexWrap: 'wrap',
      }}>
        {[
          'Энергопотребление как у 1 лампочки',
          'Срок службы вывески от 5 лет',
          'Неоновые вывески пожаробезопасны',
        ].map((text) => (
          <div key={text} style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px 32px',
            color: '#fff',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 500,
            letterSpacing: '0.5px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0, 200, 255, 0.2), 0 0 30px rgba(0, 200, 255, 0.08)',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
            flex: '1 1 250px',
            maxWidth: '340px',
          }}>
            {text}
          </div>
        ))}
      </div>

      {/* Left character */}
      <div ref={leftRef} style={{ position: 'absolute', bottom: 0, left: '18%', height: '60%', zIndex: 1, willChange: 'transform' }}>
        <img src={charLeft} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7)' }} loading="lazy" />
      </div>

      {/* Right character */}
      <div ref={rightRef} style={{ position: 'absolute', bottom: 0, right: '18%', height: '60%', zIndex: 1, willChange: 'transform' }}>
        <img src={charRight} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7)' }} loading="lazy" />
      </div>

      {/* Center character */}
      <div ref={centerRef} style={{ position: 'absolute', bottom: 0, left: '50%', height: '75%', zIndex: 2, willChange: 'transform' }}>
        <img src={charCenter} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
      </div>

      {/* Fog overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        pointerEvents: 'none',
        zIndex: 3,
        background: `
          radial-gradient(ellipse 70% 60% at 20% 80%, rgba(0, 180, 240, 0.25), transparent),
          radial-gradient(ellipse 60% 50% at 50% 85%, rgba(0, 200, 255, 0.3), transparent),
          radial-gradient(ellipse 70% 60% at 80% 80%, rgba(0, 170, 230, 0.25), transparent),
          radial-gradient(ellipse 90% 40% at 50% 95%, rgba(0, 190, 245, 0.35), transparent)
        `,
      }} />
    </div>
  );
};

export default AdvantageSection;
