import React, { useState, useEffect } from 'react';
import NeonButton from './NeonButton';
import image from '../assets/76633378.jpg';

const words = ['быстро', 'трендово', 'безопасно', 'эффективно'];

const bulletIcon = (
  <span style={{
    display: 'inline-block',
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#00f0ff',
    boxShadow: '0 0 6px rgba(0,240,255,0.6)',
    flexShrink: 0,
    marginTop: 7,
  }} />
);

const AtmosphereBlock = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 60px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    }}>
      {/* Main two-column layout */}
      <div style={{
        display: 'flex',
        gap: '48px',
        maxWidth: 1100,
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>

        {/* LEFT: Image + text + button */}
        <div style={{
          flex: '0 0 280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <img
            src={image}
            alt="Неоновая вывеска"
            style={{
              width: 260,
              height: 360,
              objectFit: 'cover',
              borderRadius: 14,
            }}
          />
          <p style={{
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            lineHeight: 1.5,
            marginTop: 20,
            marginBottom: 20,
            maxWidth: 280,
          }}>
            Изготовим от 3-х дней и доставим в любую точку мира. Рассчитайте стоимость изготовления.
          </p>
          <NeonButton color="cyan">
            Рассчитать стоимость
          </NeonButton>
        </div>

        {/* RIGHT: Text content */}
        <div style={{
          flex: '1 1 500px',
          maxWidth: 650,
        }}>
          {/* H2 */}
          <h2 style={{
            fontSize: 'clamp(22px, 2.8vw, 40px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.25,
            margin: 0,
            letterSpacing: '1px',
          }}>
            Привлекайте внимание к заведению и сделайте его атмосфернее
          </h2>

          {/* Animated words */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '20px',
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}>
            {words.map((word, i) => (
              <span
                key={word}
                style={{
                  fontSize: 'clamp(11px, 1.2vw, 18px)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  whiteSpace: 'nowrap',
                  flexShrink: 1,
                  color: i === activeIndex ? '#00f0ff' : 'rgba(255,255,255,0.25)',
                  textShadow: i === activeIndex
                    ? '0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(0,240,255,0.4), 0 0 80px rgba(0,240,255,0.2)'
                    : 'none',
                  transition: 'color 0.4s ease, text-shadow 0.4s ease',
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Two-column text block */}
          <div style={{
            display: 'flex',
            gap: '36px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}>
            {/* Left column */}
            <div style={{ flex: '1 1 220px' }}>
              <h3 style={{
                fontSize: 'clamp(15px, 1.6vw, 20px)',
                color: '#fff',
                fontWeight: 600,
                marginBottom: 12,
              }}>
                Используйте как вывеску
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Станьте заметнее конкурентов',
                  'Увеличьте узнаваемость заведения',
                  'Получайте отметки в социальных сетях',
                  'Увеличьте посещаемость заведения',
                  'Не тратьте время на объяснения, как вас найти',
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(12px, 1.1vw, 15px)',
                    lineHeight: 1.5,
                    marginBottom: 6,
                  }}>
                    {bulletIcon}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div style={{ flex: '1 1 220px' }}>
              <h3 style={{
                fontSize: 'clamp(15px, 1.6vw, 20px)',
                color: '#fff',
                fontWeight: 600,
                marginBottom: 12,
              }}>
                Обновите интерьер
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Усильте сарафанное радио',
                  'Создайте яркую атмосферу',
                  'Создайте фото-зону для посетителей',
                  'Получите тысячи фотографий в социальных сетях с вашей отметкой',
                  'Привлеките новую аудиторию',
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(12px, 1.1vw, 15px)',
                    lineHeight: 1.5,
                    marginBottom: 6,
                  }}>
                    {bulletIcon}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmosphereBlock;
