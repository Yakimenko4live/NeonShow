import React, { useState } from 'react';
import { COLORS } from '../theme/colors';

const NeonButton = ({ color = 'cyan', children = 'Button', style = {}, ...props }) => {
  const [isPressed, setIsPressed] = useState(false);
  const theme = COLORS[color] || COLORS.cyan;

  const buttonStyle = {
    border: `2px solid ${theme.main}`,
    padding: '12px 32px',
    color: theme.main,
    fontSize: '15px',
    fontWeight: 'bold',
    backgroundColor: isPressed ? theme.main : theme.bg,
    borderRadius: '12px',
    outline: 'none',
    boxShadow: isPressed
      ? `0 0 10px ${theme.spread}, inset 0 0 8px ${theme.spread}`
      : `0 0 8px ${theme.spread}, 0 0 20px ${theme.spread}, inset 0 0 6px ${theme.shadow}`,
    textShadow: `0 0 6px ${theme.main}`,
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    ...style,
  };

  const handleMouseEnter = (e) => {
    const btn = e.currentTarget;
    btn.style.backgroundColor = theme.main;
    btn.style.color = '#0a0a0a';
    btn.style.boxShadow = `0 0 12px ${theme.spread}, 0 0 30px ${theme.spread}, inset 0 0 8px ${theme.spread}`;
  };

  const handleMouseLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.backgroundColor = isPressed ? theme.main : theme.bg;
    btn.style.color = theme.main;
    btn.style.boxShadow = isPressed
      ? `0 0 10px ${theme.spread}, inset 0 0 8px ${theme.spread}`
      : `0 0 8px ${theme.spread}, 0 0 20px ${theme.spread}, inset 0 0 6px ${theme.shadow}`;
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;
