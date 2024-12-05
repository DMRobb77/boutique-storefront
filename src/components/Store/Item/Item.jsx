import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './item.css';

const Item = ({item, onQuantityChange}) => {

  // const [quantity, setQuantity] = useState(item.quantity);

  // const handleQuantityChange = (e) => {
  //   const newQuantity = parseInt(e.target.value, 10) || 0;
  //   setQuantity(newQuantity);
  //   onQuantityChange(item.id, newQuantity);
  // }

  // const { addItemToCart } = useOutletContext();

  return (
    <div className='item'>
      <span>{item.title}</span>
      {/* <div className="quantity">
        <input name="quantity" type="number" min={1} max={99} 
          value={quantity} onChange={handleQuantityChange}></input>
      </div>
      <button onClick={() => addItemToCart(item)}>Add To Cart</button>; */}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func
};

export default Item;
