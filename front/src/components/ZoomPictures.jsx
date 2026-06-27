import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const imagesGlob = import.meta.glob('../assets/Gallery/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
});

const ZoomPictures = () => {
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
    return sorted;
  }, []);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 7.5]);

  const rotate0 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, 3]);

  const layouts = useMemo(() => [
    { top: '0', left: '0', width: '38vw', aspect: '16/10', scale: scale1, rotate: rotate0 },
    { top: '-18vh', left: '-16vw', width: '16vw', aspect: '3/4', scale: scale2, rotate: rotate1 },
    { top: '-20vh', left: '14vw', width: '14vw', aspect: '4/3', scale: scale2, rotate: rotate2 },
    { top: '18vh', left: '-14vw', width: '15vw', aspect: '1/1', scale: scale2, rotate: rotate3 },
    { top: '16vh', left: '16vw', width: '17vw', aspect: '16/9', scale: scale2, rotate: rotate4 },
    { top: '-32vh', left: '2vw', width: '12vw', aspect: '3/4', scale: scale3, rotate: rotate1 },
    { top: '30vh', left: '4vw', width: '13vw', aspect: '4/3', scale: scale3, rotate: rotate2 },
    { top: '2vh', left: '-32vw', width: '14vw', aspect: '16/9', scale: scale3, rotate: rotate3 },
    { top: '-2vh', left: '30vw', width: '13vw', aspect: '3/4', scale: scale3, rotate: rotate4 },
    { top: '-28vh', left: '-28vw', width: '10vw', aspect: '1/1', scale: scale4, rotate: rotate1 },
    { top: '-26vh', left: '26vw', width: '11vw', aspect: '16/9', scale: scale4, rotate: rotate2 },
    { top: '28vh', left: '-26vw', width: '11vw', aspect: '4/3', scale: scale4, rotate: rotate3 },
    { top: '26vh', left: '28vw', width: '9vw', aspect: '3/4', scale: scale4, rotate: rotate4 },
    { top: '-14vh', left: '-40vw', width: '9vw', aspect: '16/9', scale: scale4, rotate: rotate1 },
    { top: '14vh', left: '38vw', width: '10vw', aspect: '1/1', scale: scale4, rotate: rotate2 },
    { top: '38vh', left: '-14vw', width: '10vw', aspect: '3/4', scale: scale4, rotate: rotate3 },
  ], [scale1, scale2, scale3, scale4, rotate0, rotate1, rotate2, rotate3, rotate4]);

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative', width: '100%' }}>
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
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        {images.map((src, index) => {
          const layout = layouts[index] || layouts[layouts.length - 1];

          return (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scale: layout.scale,
                zIndex: index === 0 ? 10 : 1,
                willChange: 'transform',
              }}
            >
              <motion.div style={{
                position: 'relative',
                top: layout.top,
                left: layout.left,
                width: layout.width,
                aspectRatio: layout.aspect,
                rotate: layout.rotate,
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#111',
                zIndex: index === 0 ? 10 : 1,
                boxShadow: index === 0
                  ? '0 0 60px rgba(0, 220, 255, 0.12), 0 0 15px rgba(0, 220, 255, 0.2), inset 0 0 15px rgba(0, 220, 255, 0.05)'
                  : '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 12px rgba(0, 220, 255, 0.15), inset 0 0 12px rgba(0, 220, 255, 0.03)',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}>
                <img
                  src={src}
                  alt=""
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomPictures;
