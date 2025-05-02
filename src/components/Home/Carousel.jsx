import { useStore } from '../Store/StoreProvider';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.css';

const Carousel = () => {
  // Preload store assets
  const items = useStore();

  // Preload next three items
  const [displayedItems, setDisplayedItems] = useState(items.slice(0, 3));
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 3) % 9;
        setDisplayedItems(items.slice(nextIndex, nextIndex + 3));
        if (containerRef.current) {
          containerRef.current.className = `${styles.carousel} ${styles.slideIn}`;
          setTimeout(() => {
            containerRef.current.className = `${styles.carousel} ${styles.slideOut}`;
            setDisplayedItems(items.slice(nextIndex, nextIndex + 3));
          }, 800);
        }
        console.log(nextIndex, nextIndex + 3);

        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className={styles.carousel} ref={containerRef}>
      {displayedItems.map((item, idx) => (
        <div key={idx} className={styles.carouselItem}>
          <Link to={`/store/${item.id}`}>
            <img src={item.image} alt={item.name} width={'200px'} className={styles.carouselImage} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
