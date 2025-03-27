import PropTypes from 'prop-types';
import QuantityInput from '../../Utility/QuantityInput';
import { priceFormmatterUSD } from '../../Utility/priceFormatterUSD';
import styles from './cartedItem.module.css';

const CartedItem = ({ item }) => {
  return (
    <div className={styles.details}>
      <div className={styles.imageContainer}>
        <img src={item.image} width={'50px'}></img>
      </div>
      <div className={styles.right}>
        <h2>{item.title}</h2>
        <p className={styles.price}>{priceFormmatterUSD(item.price)}</p>
        <QuantityInput item={item} />
      </div>
    </div>
  );
};

CartedItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartedItem;
