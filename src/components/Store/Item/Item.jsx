import PropTypes from 'prop-types';
import styles from './item.module.css';

const Item = ({ item }) => {
  return (
    <div className={styles.item}>
      <div>
        <div className={styles.imageContainer}>
          <img src={item.image} width={'180px'} />
        </div>
        <h3>{item.title}</h3>
      </div>
      <div className={styles.priceContainer}>
        <h4>${item.price}</h4>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
