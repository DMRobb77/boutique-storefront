import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';

const Item = (props) => {
  const { addItemToCart } = useOutletContext();
  return <button onClick={() => addItemToCart(props.itemName)}>I am an item. In fact, Im {props.itemName}</button>;
};

Item.propTypes = {
  itemName: PropTypes.number.isRequired,
};

export default Item;
