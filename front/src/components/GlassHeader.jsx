import React, { useRef, useEffect, useState } from 'react';
import './GlassHeader.css';

const GlassHeader = ({
  children,
  width = '90%',
  maxWidth = '1400px',
  height = '80px',
  borderRadius = '20px',
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`glass-header ${className} ${!isVisible ? 'glass-header-hidden' : ''}`}
      style={{ width, maxWidth, height, borderRadius, ...style }}
    >
      <div className="glass-header-glow" />
      <div className="glass-header-content">{children}</div>
    </div>
  );
};

export default GlassHeader;
