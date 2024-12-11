import PropTypes from 'prop-types';
import { useState } from 'react';

const CartedItem = (props) => {

  const [quantity, setQuantity] = useState(props.item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    props.item.quantity = newQuantity;
  }

  return (
    <div>
      {props.item.title}
      <div className="quantity">
                    <input name="quantity" type="number" min={1} max={99} 
                    value={quantity} onChange={handleQuantityChange}></input>
      </div>
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
