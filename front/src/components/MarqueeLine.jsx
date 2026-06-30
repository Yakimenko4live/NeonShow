import React from 'react';

const MarqueeLine = () => {
  const text = 'ЗАКАЗАТЬ НЕОНОВУЮ ВЫВЕСКУ ДЛЯ БИЗНЕСА ⧫ ЗАКАЗАТЬ НЕОНОВУЮ ВЫВЕСКУ ДЛЯ ИНТЕРЬЕРА ⧫ ЗАКАЗАТЬ НЕОНОВУЮ ВЫВЕСКУ В ПОДАРОК ⧫ ';

  const textStyle = {
    fontSize: 'clamp(28px, 4vw, 56px)',
    fontWeight: 900,
    color: 'rgba(255,255,255,0.08)',
    letterSpacing: '4px',
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
    paddingRight: '40px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: '#080808',
      padding: '36px 0',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 120,
        height: '100%',
        background: 'linear-gradient(to right, #080808, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 120,
        height: '100%',
        background: 'linear-gradient(to left, #080808, transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      <div className="marquee-track">
        <span style={textStyle}>{text}{text}{text}{text}</span>
        <span style={textStyle}>{text}{text}{text}{text}</span>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          white-space: nowrap;
          width: max-content;
          animation: marqueeScroll 75s linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default MarqueeLine;
