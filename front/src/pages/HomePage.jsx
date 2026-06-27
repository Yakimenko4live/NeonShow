import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightImage from '../components/SpotlightImage';
import NeonBust from '../components/NeonBust';
import NeonButton from '../components/NeonButton';
import ZoomPictures from '../components/ZoomPictures';
import GalleryModal from '../components/GalleryModal';

const HomePage = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const block2Ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: block2Ref,
    offset: ['start end', 'start 0.4'],
  });
  const block2Opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const block2Y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
    }}>
      <SpotlightImage />

      <motion.div
        ref={block2Ref}
        style={{
          width: '100%',
          height: '100vh',
          background: '#080808',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 80px',
          boxSizing: 'border-box',
          gap: '40px',
          opacity: block2Opacity,
          y: block2Y,
          willChange: 'transform, opacity',
        }}
      >
        <div style={{
          flex: '0 0 50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <NeonBust />
        </div>

        <div style={{
          flex: '0 0 40%',
          color: 'white',
          fontFamily: 'sans-serif',
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '2px',
            color: 'white',
            textShadow: '0 0 60px rgba(0, 200, 255, 0.3), 0 0 120px rgba(0, 200, 255, 0.15), 0 0 200px rgba(0, 200, 255, 0.05)',
          }}>
            Закажите топовую неоновую вывеску для интерьера, бизнеса, видеосъемок и мероприятий
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 22px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginTop: '20px',
            letterSpacing: '0.5px',
          }}>
            От 2500 ₽ и с гарантией 25 месяцев.
            Экспресс доставка по России. В Москву и ЦАО от 2-3 дней!
          </p>

          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 22px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8,
            marginTop: '16px',
            letterSpacing: '0.5px',
          }}>
            Расскажите клиентам, чем вы занимаетесь и почему это важно.
          </p>

          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}>
            <NeonButton color="cyan">
              Запросить стоимость
            </NeonButton>
            <NeonButton color="magenta">
              Конструктор надписей
            </NeonButton>
          </div>
        </div>
      </motion.div>

      <div style={{
        width: '100%',
        padding: '80px 80px',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxSizing: 'border-box',
      }}>
        <p style={{
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          color: 'rgba(255,255,255,0.5)',
          margin: 0,
          fontFamily: 'sans-serif',
          letterSpacing: '1px',
        }}>
          Изготовили неоновых вывесок
        </p>
        <span style={{
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: 900,
          color: '#00dcff',
          fontFamily: 'sans-serif',
          letterSpacing: '3px',
          textShadow: '0 0 30px rgba(0, 220, 255, 0.4), 0 0 60px rgba(0, 220, 255, 0.2), 0 0 100px rgba(0, 220, 255, 0.1)',
        }}>
          32454
        </span>
        <p style={{
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
          fontFamily: 'sans-serif',
          letterSpacing: '0.5px',
        }}>
          Обновлено 21 мая 2026 г.
        </p>
      </div>

      <ZoomPictures />

      {/* Кнопка "Галерея" */}
      <div style={{
        width: '100%',
        padding: '60px 0',
        background: '#080808',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <NeonButton color="magenta" onClick={() => setGalleryOpen(true)}>
          Галерея
        </NeonButton>
      </div>

      <div style={{
        height: '100vh',
        width: '100%',
        background: '#0a0a0a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
      }}>
        Текст под прожектором
      </div>

      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </div>
  );
};

export default HomePage;