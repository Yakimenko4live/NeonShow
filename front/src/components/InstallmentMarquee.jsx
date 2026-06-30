import React from 'react';

const InstallmentMarquee = () => {
  const text = 'Есть рассрочка ⧫ 3,4,6 месяцев ⧫ При заказе от 30.000 ₽ ⧫ ';

  const textStyle = {
    fontSize: 'clamp(28px, 4vw, 56px)',
    fontWeight: 900,
    color: '#00f0ff',
    textShadow: '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(0, 240, 255, 0.1)',
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

      <div className="marquee-scroll">
        <span style={textStyle}>{text}{text}{text}{text}</span>
        <span style={textStyle}>{text}{text}{text}{text}</span>
      </div>
    </div>
  );
};

export default InstallmentMarquee;
