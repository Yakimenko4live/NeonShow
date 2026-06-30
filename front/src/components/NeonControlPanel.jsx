import React, { useState } from 'react';
import './NeonControlPanel.css';

const colors = ['#ff0000', '#ff8c00', '#ffcc00', '#00ff00', '#00cccc', '#0088ff', '#5500ff', '#ff00ff', '#e91e63', '#ffffff', '#ffe4b5', '#87ceeb', '#9370db'];

const NeonControlPanel = () => {
  const [effect, setEffect] = useState('Статичный');

  return (
    <div className="neon-container">
      <div className="panel-grid">
        {/* Левая сторона */}
        <div style={{ flex: 1 }}>
          <h1>ЯРКИЙ ВЫБОР</h1>
          <p style={{ color: '#888' }}>Палитра из 13 цветов + SMART-неон</p>
          {/* Сюда можно добавить остальной текст из макета */}
        </div>

        {/* Правая сторона (Панель управления) */}
        <div className="control-block">
          <h4>ЦВЕТ</h4>
          <div className="color-grid">
            {colors.map((c) => (
              <button key={c} className="color-btn" style={{ backgroundColor: c }} />
            ))}
          </div>

          <h4>ЯРКОСТЬ</h4>
          <input type="range" style={{ width: '100%', marginBottom: '20px' }} />

          <h4>ЭФФЕКТ</h4>
          <div className="effect-grid">
            {['Статичный', 'Плавный', 'Перелив', 'Импульс'].map((e) => (
              <button 
                key={e} 
                className={`effect-btn ${effect === e ? 'active' : ''}`}
                onClick={() => setEffect(e)}
              >
                {e}
              </button>
            ))}
          </div>

          <div className="footer-info">
            <span>Защита от влаги</span>
            <span>Яркость днем</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonControlPanel;