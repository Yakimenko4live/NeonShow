import React, { useRef, useEffect, useMemo } from 'react';

const imagesGlob = import.meta.glob('../assets/Gallery/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
});

const ZoomPictures = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  const images = useMemo(() => {
    const imageEntries = Object.entries(imagesGlob).map(([path, url]) => ({ path, url }));
    const heroIndex = imageEntries.findIndex(img => img.path.includes('Hero.png'));

    let sorted = [];
    if (heroIndex !== -1) {
      sorted.push(imageEntries[heroIndex].url);
      sorted = sorted.concat(imageEntries.filter((_, i) => i !== heroIndex).map(img => img.url));
    } else {
      sorted = imageEntries.map(img => img.url);
    }
    return sorted.slice(0, 10);
  }, []);

  const layouts = useMemo(() => [
    { top: 0, left: 0, width: 38, aspect: '16/10', scale: [1, 3], rotate: 0, zIndex: 10, spread: 0 },
    { top: -18, left: -16, width: 16, aspect: '3/4', scale: [1, 1], rotate: -2, zIndex: 1, spread: 1 },
    { top: -20, left: 14, width: 14, aspect: '4/3', scale: [1, 1], rotate: 2, zIndex: 1, spread: 1 },
    { top: 18, left: -14, width: 15, aspect: '1/1', scale: [1, 1], rotate: -3, zIndex: 1, spread: 1 },
    { top: 16, left: 16, width: 17, aspect: '16/9', scale: [1, 1], rotate: 3, zIndex: 1, spread: 1 },
    { top: -32, left: 2, width: 12, aspect: '3/4', scale: [1, 1], rotate: -2, zIndex: 1, spread: 1 },
    { top: 30, left: 4, width: 13, aspect: '4/3', scale: [1, 1], rotate: 2, zIndex: 1, spread: 1 },
    { top: 2, left: -32, width: 14, aspect: '16/9', scale: [1, 1], rotate: -3, zIndex: 1, spread: 1 },
    { top: -2, left: 30, width: 13, aspect: '3/4', scale: [1, 1], rotate: 3, zIndex: 1, spread: 1 },
    { top: -28, left: -28, width: 10, aspect: '1/1', scale: [1, 1], rotate: -2, zIndex: 1, spread: 1 },
  ], []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const scrollRange = containerHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

        imagesRef.current.forEach((el, i) => {
          if (!el) return;
          const layout = layouts[i];
          if (!layout) return;

          if (layout.spread === 0) {
            const currentScale = layout.scale[0] + (layout.scale[1] - layout.scale[0]) * progress;
            el.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
          } else {
            const spreadX = layout.left * progress * 0.8;
            const spreadY = layout.top * progress * 0.8;
            const currentRotate = layout.rotate * progress;
            el.style.transform = `translate(calc(-50% + ${spreadX}vw), calc(-50% + ${spreadY}vh)) rotate(${currentRotate}deg)`;
          }
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [layouts]);

  return (
    <div ref={containerRef} style={{ height: '250vh', position: 'relative', width: '100%' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#080808',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vmin',
          height: '100vmin',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0, 220, 255, 0.06), transparent 55%)',
          pointerEvents: 'none',
        }} />

        {images.map((src, index) => {
          const layout = layouts[index];
          if (!layout) return null;

          return (
            <div
              key={index}
              ref={el => imagesRef.current[index] = el}
              style={{
                position: 'absolute',
                top: `${50 + layout.top}%`,
                left: `${50 + layout.left}%`,
                width: `${layout.width}vw`,
                aspectRatio: layout.aspect,
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#111',
                zIndex: layout.zIndex,
                boxShadow: index === 0
                  ? '0 0 60px rgba(0, 220, 255, 0.12), 0 0 15px rgba(0, 220, 255, 0.2)'
                  : '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 220, 255, 0.15)',
                willChange: 'transform',
                transformOrigin: 'center center',
              }}
            >
              <img
                src={src}
                alt=""
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomPictures;
