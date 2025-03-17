import { useContext } from 'react';
import { CartContext } from '../Contexts';
import PropTypes from 'prop-types';
import 'material-icons/iconfont/outlined.css';

const RemoveItemBtn = ({ item }) => {
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <button className="delete-button" onClick={() => removeItemFromCart(item.id)}>
      <span className="material-icons-outlined">delete</span>
    </button>
  );
};

RemoveItemBtn.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RemoveItemBtn;
