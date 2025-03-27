import PropTypes from 'prop-types';
import QuantityInput from '../Utility/QuantityInput';
import { priceFormmatterUSD } from '../Utility/priceFormatterUSD';
import styles from './checkout.module.css';

const CheckoutItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={item.image} width={'100px'}></img>
      </div>
      <div className={styles.details}>
        <div className={styles.top}>
          <span className={styles.itemName}>{item.title}</span>
          <span className={styles.price}>{priceFormmatterUSD(item.price)}</span>
        </div>
        <div className={styles.bottom}>
          <QuantityInput item={item} />
        </div>
      </div>
    </div>
  );
};

CheckoutItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CheckoutItem;
