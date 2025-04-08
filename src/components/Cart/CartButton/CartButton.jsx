import PropTypes from 'prop-types';
import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/outlined.css';
import styles from './CartButton.module.css';
import { useEffect, useState } from 'react';

const CartButton = ({ toggleCart, enabled, items }) => {
  const [bump, setBump] = useState(false);

  const totalCount = items.reduce((acc, currentItem) => acc + currentItem.quantity, 0);

  useEffect(() => {
    if (totalCount === 0) return;
    setBump(true);

    const timer = setTimeout(() => setBump(false), 800);

    return () => clearTimeout(timer);
  }, [totalCount]);

  return (
    <div className={styles.container}>
      {enabled ? (
        <button onClick={toggleCart}>
          {totalCount > 0 ? (
            <>
              <span className={styles.count}>{totalCount}</span>
              <div className={styles.iconWrapper}>
                <span className={`material-icons ${bump ? styles.bump : ''}`}>shopping_cart</span>
              </div>
            </>
          ) : (
            <div className={styles.iconWrapper}>
              <span className="material-icons-outlined">shopping_cart</span>
            </div>
          )}
        </button>
      ) : (
        <button onClick={toggleCart} disabled>
          {totalCount > 0 ? (
            <div className={styles.iconWrapper}>
              <span className="material-icons">shopping_cart</span>
            </div>
          ) : (
            <div className={styles.iconWrapper}>
              <span className="material-icons-outlined">shopping_cart</span>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

CartButton.propTypes = {
  toggleCart: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  items: PropTypes.array,
};

export default CartButton;
