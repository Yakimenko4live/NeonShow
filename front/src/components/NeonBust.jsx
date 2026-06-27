import React from 'react';
import head from '../assets/Head.png';
import './NeonBust.css';

const NeonBust = () => {
  return (
    <div className="neon-bust">
      <div className="neon-bust__wrapper">

        <svg className="neon-bust__diamond" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="80,20 155,95 80,170 5,95"
            fill="none"
            stroke="#ffe600"
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polygon
            points="80,20 155,95 80,170 5,95"
            fill="none"
            stroke="#fffbe6"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <svg className="neon-bust__triangle neon-bust__triangle--back" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <line x1="100" y1="12" x2="171" y2="169" stroke="#00f0ff" strokeWidth="6" strokeLinecap="round" />
          <line x1="100" y1="12" x2="171" y2="169" stroke="#e0feff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <img src={head} alt="bust" className="neon-bust__img" />

        <svg className="neon-bust__triangle neon-bust__triangle--front" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="mask-ac">
              <rect width="200" height="200" fill="white" />
              <circle cx="36" cy="115" r="28" fill="black" />
            </mask>
          </defs>
          <line x1="100" y1="12" x2="41" y2="169" stroke="#00f0ff" strokeWidth="6" strokeLinecap="round" mask="url(#mask-ac)" />
          <line x1="100" y1="12" x2="41" y2="169" stroke="#e0feff" strokeWidth="1.5" strokeLinecap="round" mask="url(#mask-ac)" />
          <line x1="41" y1="169" x2="171" y2="169" stroke="#00f0ff" strokeWidth="6" strokeLinecap="round" />
          <line x1="41" y1="169" x2="171" y2="169" stroke="#e0feff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg className="neon-bust__circle" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="115" r="28" fill="none" stroke="#ff2d7b" strokeWidth="6" strokeLinecap="round" />
          <circle cx="36" cy="115" r="28" fill="none" stroke="#ffe0ee" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default NeonBust;
