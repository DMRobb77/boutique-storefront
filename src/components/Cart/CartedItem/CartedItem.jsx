import PropTypes from 'prop-types';

const CartedItem = (props) => {
  return (
    <button onClick={() => props.clickEvent(props.item.id)}>
      {props.item.name} x {props.item.quantity}
    </button>
  );
};

CartedItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickEvent: PropTypes.func,
};

export default CartedItem;
