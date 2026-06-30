import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import image from '../assets/IMG_2863_1_1.jpg';

const ProductionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 80, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        width: '100%',
        height: '70vh',
        minHeight: 480,
        position: 'relative',
        overflow: 'hidden',
        background: '#080808',
      }}
    >
      {/* Image background */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '12%',
        width: '48%',
        height: '100%',
      }}>
        <img
          src={image}
          alt="Производство неоновых вывесок"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        {/* Fade right-to-left into background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #080808 0%, #080808 15%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Subtle fade at edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, transparent 15%, transparent 85%, rgba(8,8,8,0.3) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Text overlay on left side */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 12%',
        boxSizing: 'border-box',
        maxWidth: '55%',
      }}>
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(22px, 2.6vw, 36px)',
            fontWeight: 800,
            color: '#fff',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '1px',
            fontFamily: 'sans-serif',
            textShadow: '0 0 40px rgba(0, 200, 255, 0.15)',
          }}
        >
          Собственное производство в центре СПб
        </motion.h2>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
            marginTop: '20px',
            fontFamily: 'sans-serif',
            letterSpacing: '0.3px',
          }}
        >
          Работаем без посредников. Изготавливаем вывески с индивидуальным дизайном на собственном производстве в СПб с доставкой в любую точку мира.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: '28px',
            display: 'flex',
            gap: '36px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '2500₽', label: 'от стоимости' },
            { value: '25', label: 'месяцев гарантии' },
            { value: '3', label: 'дня до Москвы' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontSize: 'clamp(22px, 2.2vw, 32px)',
                fontWeight: 800,
                color: '#00f0ff',
                fontFamily: 'sans-serif',
                textShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 'clamp(10px, 0.9vw, 12px)',
                color: 'rgba(255,255,255,0.35)',
                fontFamily: 'sans-serif',
                letterSpacing: '0.5px',
                marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductionSection;
