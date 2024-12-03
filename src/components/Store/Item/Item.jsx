import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';


const Item = ({item, onQuantityChange}) => {

  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  }

  const { addItemToCart } = useOutletContext();

  return (
    <span>
      <span>I am an item. In fact, Im {item.name}</span>
      <div className="quantity">
        <input name="quantity" type="number" min={1} max={99} 
          value={quantity} onChange={handleQuantityChange}></input>
      </div>
      <button onClick={() => addItemToCart(item)}>Add To Cart</button>;
    </span>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func
};

export default Item;
