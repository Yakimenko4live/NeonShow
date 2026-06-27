import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GalleryModal.css';

const imagesGlob = import.meta.glob('../assets/Gallery/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default'
});

const GalleryModal = ({ isOpen, onClose }) => {
  const images = useMemo(() => Object.values(imagesGlob), []);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="gallery-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-modal__header">
              <h2 className="gallery-modal__title">Галерея</h2>
              <button className="gallery-modal__close" onClick={onClose}>✕</button>
            </div>

            <div className="gallery-modal__body">
              <div className="gallery-modal__preview">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected}
                    src={images[selected]}
                    alt=""
                    className="gallery-modal__preview-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>
              </div>

              <div className="gallery-modal__grid">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className={`gallery-modal__item ${i === selected ? 'gallery-modal__item--active' : ''}`}
                    onClick={() => setSelected(i)}
                  >
                    <img src={src} alt="" className="gallery-modal__img" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
