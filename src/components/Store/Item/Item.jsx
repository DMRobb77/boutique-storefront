import PropTypes from 'prop-types';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Item = (props) => {
  const { addItemToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(0);
  return (
    <span>
      <span>I am an item. In fact, Im {props.item.name}</span>
      <div className="quantity">
        <button>-</button>
        <input name="quantity" type="number" defaultValue={1} min={1} max={99}></input>
        <button>+</button>
      </div>
      <button onClick={() => addItemToCart(props.item)}>Add To Cart</button>;
    </span>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
