import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import image1 from '../assets/components-img/1.png';
import image2 from '../assets/components-img/2.png';
import './SpotlightImage.css';

const SpotlightImage = () => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [spotlightRadius, setSpotlightRadius] = useState(0);
  const currentRadiusRef = useRef(0);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  const raindrops = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 0.5 + Math.random() * 0.8,
    animationDelay: Math.random() * 2,
    height: 20 + Math.random() * 30,
    opacity: 0.2 + Math.random() * 0.4,
  })), []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsHovering(false);
        setSpotlightRadius(0);
        currentRadiusRef.current = 0;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const animateSpotlight = (targetRadius, duration) => {
    const startRadius = currentRadiusRef.current;
    const startTime = performance.now();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentRadius = startRadius + (targetRadius - startRadius) * ease;
      currentRadiusRef.current = currentRadius;
      setSpotlightRadius(currentRadius);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || document.hidden) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setPosition({ x, y });
      
      if (!isHovering) {
        setIsHovering(true);
        animateSpotlight(300, 300);
      }
    } else {
      if (isHovering) {
        animateSpotlight(0, 200);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsHovering(false), 200);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      animateSpotlight(0, 200);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsHovering(false), 200);
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (containerRef.current && touch) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setPosition({ x, y });
      setIsHovering(true);
      
      const targetRadius = isMobile ? 250 : 300;
      animateSpotlight(targetRadius, 400);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (containerRef.current && touch) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setPosition({ x, y });
    }
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    animateSpotlight(0, 500);
    
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 500);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (!isMobile) {
          setIsHovering(true);
          animateSpotlight(300, 300);
        }
      }}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        cursor: 'default',
        touchAction: 'none',
        opacity,
        scale,
        y,
        willChange: 'transform, opacity',
      }}
    >
      <img
        src={image1}
        alt="background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          maskImage: isHovering && spotlightRadius > 0
            ? `radial-gradient(circle ${spotlightRadius}px at ${position.x}px ${position.y}px, transparent 40%, rgba(0,0,0,0.3) 60%, black 80%)`
            : 'none',
          WebkitMaskImage: isHovering && spotlightRadius > 0
            ? `radial-gradient(circle ${spotlightRadius}px at ${position.x}px ${position.y}px, transparent 40%, rgba(0,0,0,0.3) 60%, black 80%)`
            : 'none',
        }}
      >
        <img
          src={image2}
          alt="foreground"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {raindrops.map((drop) => (
            <div
              key={drop.id}
              style={{
                position: 'absolute',
                left: `${drop.left}%`,
                top: '-10%',
                width: isMobile ? '3px' : '2px',
                height: `${drop.height}px`,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.6))',
                borderRadius: '50%',
                opacity: drop.opacity,
                animation: `rain ${drop.animationDuration}s linear infinite`,
                animationDelay: `${drop.animationDelay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {isHovering && spotlightRadius > 0 && (
        <>
          <div
            style={{
              position: 'absolute',
              top: position.y - 40,
              left: position.x - 40,
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: position.y - 70,
              left: position.x - 70,
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(100, 200, 255, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

{/* ============ ТЕКСТОВЫЙ КОНТЕНТ ============ */}
<div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '65%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px 100px',
    zIndex: 10,
    pointerEvents: 'none',
  }}
>
  <h1
    style={{
      fontSize: 'clamp(64px, 10vw, 130px)',
      fontWeight: 900,
      color: 'rgb(255, 255, 255)',
      textTransform: 'uppercase',
      letterSpacing: '8px',
      margin: 0,
      lineHeight: 1,
      fontFamily: 'sans-serif',
      textShadow: '0 0 60px rgba(0, 200, 255, 0.3), 0 0 120px rgba(0, 200, 255, 0.15), 0 0 200px rgba(0, 200, 255, 0.05)',
    }}
  >
    НЕОН ШОУ
  </h1>
  
  <p
    style={{
      fontSize: 'clamp(34px, 4vw, 60px)',
      color: 'rgb(255, 255, 255)',
      marginTop: '24px',
      fontFamily: 'sans-serif',
      letterSpacing: '3px',
      fontWeight: 300,
    }}
  >
    делаем этот мир{' '}
    <span
      style={{
        color: 'rgb(255, 255, 255)',
        fontWeight: 300,
        textShadow: `
          0 0 20px rgba(0, 200, 255, 0.4),
          0 0 40px rgba(0, 200, 255, 0.2),
          0 0 80px rgba(0, 200, 255, 0.1),
          0 0 20px rgba(255, 0, 200, 0.3),
          0 0 60px rgba(255, 0, 200, 0.1)
        `,
        animation: 'neonPulse 2.5s ease-in-out infinite',
      }}
    >
      ярче
    </span>
  </p>
</div>

{/* Стили для пульсации неона */}
<style>
  {`
    @keyframes neonPulse {
      0%, 100% {
        text-shadow: 
          0 0 20px rgba(0, 200, 255, 0.4),
          0 0 40px rgba(0, 200, 255, 0.2),
          0 0 80px rgba(0, 200, 255, 0.1),
          0 0 20px rgba(255, 0, 200, 0.3),
          0 0 60px rgba(255, 0, 200, 0.1);
      }
      50% {
        text-shadow: 
          0 0 30px rgba(0, 200, 255, 0.7),
          0 0 60px rgba(0, 200, 255, 0.4),
          0 0 120px rgba(0, 200, 255, 0.2),
          0 0 30px rgba(255, 0, 200, 0.5),
          0 0 80px rgba(255, 0, 200, 0.2),
          0 0 150px rgba(255, 0, 200, 0.1);
      }
    }
  `}
</style>
    </motion.div>
  );
};

export default SpotlightImage;