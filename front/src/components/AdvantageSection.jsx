import React, { useRef, useEffect, useState } from 'react';
import charLeft from '../assets/1000100983.png';
import charCenter from '../assets/1000100984.png';
import charRight from '../assets/1000100985.png';

const AdvantageSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      setMouseX((e.clientX - cx) / cx);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const clouds = [
      { x: 0.1, y: 0.08, r: 480, speed: 0.0002, phase: 0, color: [0, 200, 255] },
      { x: 0.35, y: 0.12, r: 420, speed: 0.0003, phase: 1.2, color: [0, 180, 240] },
      { x: 0.6, y: 0.06, r: 500, speed: 0.00018, phase: 2.5, color: [0, 210, 255] },
      { x: 0.85, y: 0.1, r: 440, speed: 0.00025, phase: 3.8, color: [0, 190, 245] },
      { x: 0.2, y: 0.25, r: 380, speed: 0.00035, phase: 0.5, color: [0, 170, 230] },
      { x: 0.5, y: 0.3, r: 400, speed: 0.00022, phase: 1.8, color: [0, 220, 255] },
      { x: 0.75, y: 0.28, r: 360, speed: 0.00028, phase: 3.2, color: [0, 160, 220] },
      { x: 0.05, y: 0.45, r: 450, speed: 0.00016, phase: 4.5, color: [0, 195, 248] },
      { x: 0.3, y: 0.5, r: 350, speed: 0.00032, phase: 2.2, color: [0, 200, 250] },
      { x: 0.55, y: 0.48, r: 390, speed: 0.00026, phase: 0.8, color: [0, 175, 235] },
      { x: 0.8, y: 0.55, r: 370, speed: 0.0002, phase: 4.2, color: [0, 210, 252] },
      { x: 0.15, y: 0.65, r: 340, speed: 0.0003, phase: 1.5, color: [0, 185, 242] },
      { x: 0.45, y: 0.7, r: 410, speed: 0.00024, phase: 3.5, color: [0, 195, 248] },
      { x: 0.7, y: 0.72, r: 330, speed: 0.00029, phase: 2.8, color: [0, 165, 225] },
      { x: 0.9, y: 0.68, r: 380, speed: 0.00019, phase: 5, color: [0, 205, 255] },
      { x: 0.4, y: 0.85, r: 460, speed: 0.00017, phase: 1, color: [0, 180, 238] },
      { x: 0.1, y: 0.9, r: 400, speed: 0.00023, phase: 3, color: [0, 200, 250] },
    ];

    const drawCloud = (cx, cy, r, color, alpha) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
      gradient.addColorStop(0.3, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.7})`);
      gradient.addColorStop(0.6, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.3})`);
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
        const offsetX = Math.sin(time * cloud.speed + cloud.phase) * 100;
        const offsetY = Math.cos(time * cloud.speed * 0.7 + cloud.phase) * 60;
        const scale = 1 + Math.sin(time * cloud.speed * 0.5 + cloud.phase) * 0.2;
        const alpha = 0.3 + Math.sin(time * cloud.speed * 0.3 + cloud.phase) * 0.1;

        const cx = cloud.x * canvas.width + offsetX;
        const cy = cloud.y * canvas.height + offsetY;
        const r = cloud.r * scale;

        drawCloud(cx, cy, r, cloud.color, alpha);
        drawCloud(cx + r * 0.35, cy - r * 0.25, r * 0.55, cloud.color, alpha * 0.6);
        drawCloud(cx - r * 0.3, cy + r * 0.35, r * 0.45, cloud.color, alpha * 0.4);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const leftX = -mouseX * 12;
  const centerX = mouseX * 4;
  const rightX = -mouseX * 12;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
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

      {/* Три стеклянных блока над персонажами */}
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
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px) saturate(1.5) brightness(1.1)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.5) brightness(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px 32px',
            color: '#fff',
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 500,
            letterSpacing: '0.5px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0, 200, 255, 0.2), 0 0 30px rgba(0, 200, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
            flex: '1 1 250px',
            maxWidth: '340px',
          }}>
            {text}
          </div>
        ))}
      </div>

      {/* Left character — задний план */}
      <div style={{ position: 'absolute', bottom: 0, left: '18%', height: '60%', transform: `translateX(${leftX}px)`, transition: 'transform 0.1s ease-out', zIndex: 1 }}>
        <img src={charLeft} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7)' }} />
        <img src={charLeft} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7) blur(6px)', maskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)' }} />
      </div>

      {/* Right character — задний план */}
      <div style={{ position: 'absolute', bottom: 0, right: '18%', height: '60%', transform: `translateX(${rightX}px)`, transition: 'transform 0.1s ease-out', zIndex: 1 }}>
        <img src={charRight} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7)' }} />
        <img src={charRight} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(0.7) blur(6px)', maskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)' }} />
      </div>

      {/* Center character — передний план */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', height: '75%', transform: `translateX(calc(-50% + ${centerX}px))`, transition: 'transform 0.1s ease-out', zIndex: 2 }}>
        <img src={charCenter} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <img src={charCenter} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', filter: 'blur(5px)', maskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, black 18%, transparent 25%)' }} />
      </div>

      {/* Дымка на переднем плане — передний слой */}
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
