import PropTypes from 'prop-types';

const CartedItem = (props) => {
  return <button onClick={() => props.clickEvent(props.itemName)}>{props.itemName}</button>;
};

CartedItem.propTypes = {
  itemName: PropTypes.number.isRequired,
  clickEvent: PropTypes.func,
};

export default CartedItem;
