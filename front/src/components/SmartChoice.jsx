import React, { useState, useEffect, useRef } from 'react';
import heroImage from '../assets/components-img/Hero2.png';
import neonOverlay from '../assets/Hero3.svg';

const colors = [
  { bg: '#ff3b3b', glow: 'rgba(255,59,59,0.6)' },
  { bg: '#ff7a2e', glow: 'rgba(255,122,46,0.6)' },
  { bg: '#ffc52e', glow: 'rgba(255,197,46,0.6)' },
  { bg: '#3bff5e', glow: 'rgba(59,255,94,0.6)' },
  { bg: '#2effe0', glow: 'rgba(46,255,224,0.6)' },
  { bg: '#2ea8ff', glow: 'rgba(46,168,255,0.6)' },
  { bg: '#6c3bff', glow: 'rgba(108,59,255,0.6)' },
  { bg: '#ff2ea8', glow: 'rgba(255,46,168,0.6)' },
  { bg: '#ff6bc1', glow: 'rgba(255,107,193,0.6)' },
  { bg: '#e8e0d0', glow: 'rgba(232,224,208,0.4)' },
  { bg: '#3d3d3d', glow: 'rgba(61,61,61,0.4)' },
  { bg: '#a0d4ff', glow: 'rgba(160,212,255,0.5)' },
  { bg: '#c8b8ff', glow: 'rgba(200,184,255,0.5)' },
];

const features = [
  { icon: '✏️', title: 'Работаем по вашему эскизу', sub: 'Воплощаем любые идеи в неоне' },
  { icon: '⭐', title: 'Дорабатываем дизайн бесплатно', sub: 'Предлагаем решения лучше, чем у конкурентов' },
  { icon: '🛡️', title: 'Гарантия качества', sub: 'Премиальные материалы и надежная сборка' },
];

const getHue = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  return h;
};

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  boxShadow: '0 0 10px rgba(0, 200, 255, 0.1), 0 0 30px rgba(0, 200, 255, 0.04)',
};

const SmartChoice = () => {
  const [activeColor, setActiveColor] = useState(8);
  const [brightness, setBrightness] = useState(50);
  const [activeTab, setActiveTab] = useState(0);
  const [smartHue, setSmartHue] = useState(0);
  const smartIntervalRef = useRef(null);

  useEffect(() => {
    if (activeTab === 1) {
      smartIntervalRef.current = setInterval(() => {
        setSmartHue(prev => (prev + 2) % 360);
      }, 100);
    } else {
      if (smartIntervalRef.current) {
        clearInterval(smartIntervalRef.current);
        smartIntervalRef.current = null;
      }
    }
    return () => {
      if (smartIntervalRef.current) clearInterval(smartIntervalRef.current);
    };
  }, [activeTab]);

  const isSmart = activeTab === 1;
  const currentColor = colors[activeColor];
  const brightnessValue = brightness / 100;

  const neonHue = isSmart ? smartHue : getHue(currentColor.bg);
  const neonGlow = isSmart ? `hsl(${smartHue}, 100%, 60%)` : currentColor.bg;
  const neonGlowAlpha = isSmart ? `hsla(${smartHue}, 100%, 60%, 0.6)` : currentColor.glow;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 60px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        gap: '40px',
        maxWidth: 1200,
        width: '100%',
        alignItems: 'stretch',
        flexWrap: 'wrap',
      }}>

        {/* LEFT COLUMN — all content */}
        <div style={{
          flex: '1 1 420px',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>
          <div>
            <p style={{
              fontSize: 'clamp(10px, 0.9vw, 12px)',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 600,
              margin: '0 0 12px 0',
              fontFamily: 'sans-serif',
            }}>
              Технологии Неон Шоу
            </p>

            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 900,
              color: '#fff',
              margin: 0,
              lineHeight: 1.1,
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
            }}>
              Яркий
              <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: '#00f0ff',
                  textShadow: '0 0 20px rgba(0, 240, 255, 0.6), 0 0 40px rgba(0, 240, 255, 0.3)',
                  pointerEvents: 'none',
                }}>
                  Выбор
                </span>
                <span style={{
                  position: 'relative',
                  background: 'linear-gradient(90deg, #00f0ff, #00c8ff, #00a8ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Выбор
                </span>
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              marginTop: '20px',
              fontFamily: 'sans-serif',
              letterSpacing: '0.3px',
              maxWidth: 400,
            }}>
              Палитра из 13 цветов + SMART-неон с дистанционным управлением цветом. Создаем яркое и равномерное свечение и в дождь, и в солнце.
            </p>

            <p style={{
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              marginTop: '14px',
              fontFamily: 'sans-serif',
              letterSpacing: '0.3px',
              maxWidth: 400,
            }}>
              Учитываем все пожелания, помогаем проработать эскиз, в том числе с упором на то, чтобы сделать лучше, чем у конкурентов.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Все цвета 🎨', 'SMART режим 📡'].map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i)}
                style={{
                  ...glassStyle,
                  padding: '12px 24px',
                  color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  fontWeight: 600,
                  fontFamily: 'sans-serif',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  border: activeTab === i ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === i ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.05)',
                  transition: 'all 0.3s ease',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Colors */}
          <div>
            <p style={{
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              margin: '0 0 12px 0',
              fontFamily: 'sans-serif',
            }}>
              Цвет
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveColor(i); setActiveTab(0); }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: c.bg,
                    border: i === activeColor && !isSmart
                      ? '2px solid rgba(255,255,255,0.8)'
                      : '2px solid transparent',
                    boxShadow: i === activeColor && !isSmart
                      ? `0 0 0 3px rgba(255,255,255,0.15), 0 0 16px ${c.glow}`
                      : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    padding: 0,
                    transform: i === activeColor && !isSmart ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Brightness */}
          <div>
            <p style={{
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              margin: '0 0 12px 0',
              fontFamily: 'sans-serif',
            }}>
              Яркость
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <span style={{ fontSize: 14, opacity: 0.4, flexShrink: 0 }}>☀️</span>
              <input
                type="range"
                min="50"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                style={{
                  width: '200px',
                  height: 4,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  background: `linear-gradient(to right, #c084fc ${((brightness - 50) / 50) * 100}%, rgba(255,255,255,0.1) ${((brightness - 50) / 50) * 100}%)`,
                  borderRadius: 2,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {features.map((f) => (
              <div key={f.title} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}>
                <div style={{
                  ...glassStyle,
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 600,
                    color: '#fff',
                    fontFamily: 'sans-serif',
                    marginBottom: 2,
                  }}>
                    {f.title}
                  </div>
                  <div style={{
                    fontSize: 'clamp(11px, 0.9vw, 13px)',
                    color: 'rgba(255,255,255,0.35)',
                    fontFamily: 'sans-serif',
                  }}>
                    {f.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — image only */}
        <div style={{
          flex: '0 0 460px',
          display: 'flex',
          alignItems: 'stretch',
        }}>
          <div style={{
            ...glassStyle,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxHeight: '100%',
            boxShadow: '0 0 15px rgba(0, 240, 255, 0.2), 0 0 40px rgba(0, 240, 255, 0.1), 0 0 80px rgba(0, 240, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}>
            <img
              src={heroImage}
              alt="Персонаж"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '12px',
                display: 'block',
              }}
            />
            <img
              src={neonOverlay}
              alt="Неоновые линии"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '12px',
                pointerEvents: 'none',
                filter: `
                  drop-shadow(0 0 2px rgba(255,255,255,0.9))
                  drop-shadow(0 0 ${Math.round(4 * brightnessValue)}px ${neonGlow})
                  drop-shadow(0 0 ${Math.round(12 * brightnessValue)}px ${neonGlow})
                  drop-shadow(0 0 ${Math.round(28 * brightnessValue)}px ${neonGlow})
                `,
                transition: isSmart ? 'none' : 'filter 0.4s ease',
              }}
            />

            {/* SMART badge */}
            <div style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '10px 14px',
              maxWidth: 120,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 6,
              }}>
                <span style={{ fontSize: 11 }}>✦</span>
                <span style={{
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'sans-serif',
                  letterSpacing: '1px',
                }}>
                  SMART
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                marginBottom: 3,
              }}>
                <div style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: isSmart ? neonGlow : '#4ade80',
                  boxShadow: isSmart ? `0 0 6px ${neonGlowAlpha}` : '0 0 6px rgba(74,222,128,0.6)',
                  flexShrink: 0,
                  transition: 'background 0.3s, box-shadow 0.3s',
                }} />
                <span style={{
                  fontSize: 'clamp(9px, 0.75vw, 11px)',
                  color: isSmart ? neonGlow : '#4ade80',
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}>
                  {isSmart ? 'Авто перелив' : 'Ожидание'}
                </span>
              </div>
              <p style={{
                fontSize: 'clamp(8px, 0.7vw, 10px)',
                color: 'rgba(255,255,255,0.35)',
                fontFamily: 'sans-serif',
                margin: '2px 0 0',
                lineHeight: 1.3,
              }}>
                Управление цветом и яркостью
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px rgba(192,132,252,0.6), 0 0 20px rgba(192,132,252,0.3);
          cursor: pointer;
          border: none;
          margin-top: -7px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px rgba(192,132,252,0.6), 0 0 20px rgba(192,132,252,0.3);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SmartChoice;
