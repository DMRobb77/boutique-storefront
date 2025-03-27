import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './itemImage.module.css';
import 'material-icons/iconfont/outlined.css';

const ItemImage = ({ src, alt }) => {
  const viewportRef = useRef(null);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = viewportRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xPercentage = Math.min(Math.max((mouseX / width) * 100, 30), 70);
    const yPercentage = Math.min(Math.max((mouseY / height) * 100, 5), 40);

    setPanPosition({ x: xPercentage, y: yPercentage });
  };

  return (
    <button onClick={handleOpenModal} className={styles.itemImage}>
      <div>
        <img src={src} alt="Item" width={'250px'} />
        <div>
          <span className="material-icons-outlined">zoom_in</span>
          <span>Click image to expand</span>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.viewport} ref={viewportRef} onMouseMove={handleMouseMove}>
            <img
              src={src}
              alt={alt}
              className={styles.pannableImage}
              style={{
                transform: `translate(-${panPosition.x}%, -${panPosition.y}%)`,
              }}
            />
          </div>
          <div>
            <span className="material-icons-outlined">zoom_out</span>
            <span>Click anywhere to close</span>
          </div>
        </div>
      )}
    </button>
  );
};

ItemImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ItemImage;
