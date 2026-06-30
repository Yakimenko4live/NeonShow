import React from 'react';

const PricingBlock = () => {
  return (
    <div style={{
      width: '100%',
      background: '#080808',
      padding: '80px 60px',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
      }}>
        {/* Text block — centered */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            letterSpacing: '1px',
            lineHeight: 1.2,
          }}>
            Стоимость изделия из неона
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 1.3vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginTop: '20px',
          }}>
            Стоимость изготовления вывесок и логотипов из неона зависит от ряда факторов:
          </p>

          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '16px auto 0',
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '10px',
            textAlign: 'left',
          }}>
            {[
              'Общий метраж затраченного неона',
              'Общая площадь подложки',
              'Мощность блока питания',
              'Количество элементов для пайки',
            ].map((item) => (
              <li key={item} style={{
                fontSize: 'clamp(14px, 1.3vw, 17px)',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00f0ff',
                  boxShadow: '0 0 6px rgba(0,240,255,0.6)',
                  flexShrink: 0,
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cards — centered below */}
        <div style={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}>
          {/* Price */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '28px 40px',
            textAlign: 'center',
            flex: '1 1 200px',
            maxWidth: '260px',
          }}>
            <div style={{
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              fontWeight: 900,
              color: '#00f0ff',
              textShadow: '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)',
              letterSpacing: '2px',
            }}>
              от 2500 ₽
            </div>
          </div>

          {/* Рассрочка */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px 28px',
            flex: '1 1 200px',
            maxWidth: '320px',
          }}>
            <div style={{
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '10px',
            }}>
              Есть рассрочка
            </div>
            <p style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Возможна рассрочка на 3, 4 или 6 мес.
            </p>
            <p style={{
              fontSize: 'clamp(12px, 1vw, 13px)',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.5,
              margin: '8px 0 0 0',
            }}>
              Рассрочка не суммируется с акциями и скидками
            </p>
          </div>

          {/* Долями */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '24px 28px',
            flex: '1 1 200px',
            maxWidth: '320px',
          }}>
            <div style={{
              fontSize: 'clamp(18px, 1.8vw, 22px)',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '10px',
            }}>
              Оплата «Долями»
            </div>
            <p style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Сумму оплаты можно разбить на части с сервисом «Долями»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBlock;
