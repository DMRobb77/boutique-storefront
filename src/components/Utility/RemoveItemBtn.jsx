import { useContext } from 'react';
import { CartContext } from '../Contexts';
import PropTypes from 'prop-types';
import 'material-icons/iconfont/outlined.css';
import styles from './quantityInput.module.css';

const RemoveItemBtn = ({ item }) => {
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <button className={styles.deleteButton} onClick={() => removeItemFromCart(item.id)}>
      <span className="material-icons-outlined">delete</span>
    </button>
  );
};

RemoveItemBtn.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RemoveItemBtn;
