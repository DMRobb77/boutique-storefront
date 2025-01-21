import PropTypes from 'prop-types';
import QuantityInput from '../../Utility/QuantityInput';

const CartedItem = (props) => {

  return (
    <div>
      {props.item.title}
      <QuantityInput item={props.item}/>
      <button onClick={() => props.clickEvent(props.item.id)}>X
      </button>
    </div>
  );
};

CartedItem.propTypes = {
  item: PropTypes.object.isRequired,
  clickEvent: PropTypes.func,
};

export default CartedItem;
