import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import barImg from '../assets/bar_doski.jpg';

const QualityGuarantee = () => {
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
      {/* Image background — справа */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '12%',
        width: '48%',
        height: '100%',
      }}>
        <img
          src={barImg}
          alt="Качество с гарантией"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #080808 0%, #080808 15%, transparent 70%)',
          pointerEvents: 'none',
        }} />
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
          Качество с гарантией
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
          Гарантируем 100% соответствие макета и вывески. На каждое изделие предоставляем длительную гарантию на 25 месяцев независимо от вашего местонахождения.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default QualityGuarantee;
