import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const comparisons = [
  {
    title: 'Стеклянный неон',
    points: [
      { label: 'Дороже', text: 'Вывески и логотипы из стеклянного неона в 2−3 раза дороже, чем из гибкого. При этом срок службы слабо отличается.' },
      { label: 'Менее практичен', text: 'Легко разбить, хрупкий, плохо подходит для мест, где посетитель может задеть конструкцию.' },
      { label: 'Не лучше силикона', text: 'Силиконовые трубки устойчивы к температуре, являются герметичными, а современные светодиоды дают свет нужной яркости и интенсивности.' },
    ],
  },
  {
    title: 'Световые короба',
    points: [
      { label: 'Громоздкая конструкция', text: 'Вывески закрытого типа — это сложные и громоздкие конструкции. Из-за этого они используются только на улице и не подходят для мелких площадей.' },
      { label: 'Ограниченность визуала', text: 'В отличии от коробов гибкий неон легкий, изящный, может принимать любую форму и размер. При этом неоновые вывески заметнее и не требуют большой площади.' },
      { label: 'Незаметнее и экономичнее', text: 'Днём короб выполняет роль обычной вывески, это экономичнее в электропотреблении, но менее заметно. Вывески из неона ярче и заметны не только ночью, но и днём.' },
    ],
  },
  {
    title: 'LED-вывески',
    points: [
      { label: 'Ограниченная стилизация', text: 'LED вывески — это экран с множеством светодиодов, который позволяет выводить бегущие строки и символы. Однако сделать логотип или креативное оформление не получится, так как все символы стандартны и это просто табличка.' },
      { label: 'Ограниченность формы', text: 'В отличие от гибкого неона, таким вывескам нельзя придать желаемую форму, они всегда будут простой прямоугольной панелью без какого-либо дизайна.' },
      { label: 'Устаревший вид', text: 'Внешний вид LED вывесок не привлекателен, в отличии от гибкого неона, они выглядят морально устаревшими и дешевыми.' },
    ],
  },
  {
    title: 'Другие источники',
    points: [
      { label: 'Бьют по глазам', text: 'В отличии от люминесцентных и газоразрядных ламп неон дает яркое, но мягкое рассеянное свечение, которое не раздражает нервную систему.' },
      { label: 'Не безопасны', text: 'Галогенные лампы — тусклые, не создают праздничного эффекта, кроме того они пожароопасны. Гибкий неон не нагревается, безопасен.' },
      { label: 'Не экономичны', text: 'Вывески из гибкого неона сравнимы в потреблении с 1 лампочкой накаливания. Остальные источники потребляют значительно больше энергии.' },
    ],
  },
];

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(20px) saturate(1.5) brightness(1.1)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.5) brightness(1.1)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '20px',
  boxShadow: '0 0 10px rgba(0, 200, 255, 0.15), 0 0 40px rgba(0, 200, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
};

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

const ComparisonCard = ({ item, index, total }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 120, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        ...glassStyle,
        padding: '36px 40px',
        width: '100%',
        maxWidth: 800,
        boxSizing: 'border-box',
        marginTop: index === 0 ? 0 : '-24px',
        zIndex: index + 1,
        position: 'relative',
      }}
    >
      <h3 style={{
        fontSize: 'clamp(20px, 2.2vw, 28px)',
        fontWeight: 700,
        color: '#00f0ff',
        margin: '0 0 24px 0',
        letterSpacing: '0.5px',
        fontFamily: 'sans-serif',
        textShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
      }}>
        {item.title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {item.points.map((point) => (
          <div key={point.label}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 4,
            }}>
              {bulletIcon}
              <span style={{
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'sans-serif',
              }}>
                {point.label}
              </span>
            </div>
            <p style={{
              margin: '0 0 0 15px',
              fontSize: 'clamp(12px, 1.1vw, 15px)',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.6,
              fontFamily: 'sans-serif',
              letterSpacing: '0.3px',
            }}>
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const NeonComparison = () => {
  const sectionRef = useRef(null);

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '100px 40px 120px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header text */}
      <div style={{
        textAlign: 'center',
        maxWidth: 800,
        marginBottom: '60px',
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 800,
          color: '#fff',
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '1px',
          fontFamily: 'sans-serif',
          textShadow: '0 0 40px rgba(0, 200, 255, 0.2)',
        }}>
          Гибкий неон в сравнении с аналогами
        </h2>
        <p style={{
          fontSize: 'clamp(13px, 1.2vw, 17px)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.7,
          marginTop: '16px',
          fontFamily: 'sans-serif',
          letterSpacing: '0.5px',
        }}>
          Почему мы изготавливаем вывески и логотипы из гибкого неона, и почему это решение лучше всего подходит для заведений и бизнеса.
        </p>
      </div>

      {/* Stacking glass cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 900,
      }}>
        {comparisons.map((item, i) => (
          <ComparisonCard key={item.title} item={item} index={i} total={comparisons.length} />
        ))}
      </div>
    </div>
  );
};

export default NeonComparison;
