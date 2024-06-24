import React from 'react';
import PropTypes from 'prop-types';
import styles from './Model.module.css';

const Modal = ({ images, onClose }) => (
  <div className={styles.ModalOverlay}>
    <div className={styles.ModalContent}>
      <button className={styles.CloseButton} onClick={onClose}>Close</button>
      <div className={styles.ImageGrid}>
        {images.map((item, index) => (
          <div key={index} className={styles.ImageItem}>
            <img src={item.image} alt={`Resume Template Preview ${index + 1}`} className={styles.TemplateImage} />
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.OpenTemplateButton}>
              Open Template
            </a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  images: []
};

export default Modal;
