import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './cart.css';
import CartedItem from './CartedItem/CartedItem';



const Cart = ({ isCartDisplayed, clickEvent, items, removeItemFromCart}) => {
  /*
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

  const toggleCart = () => setIsCartDisplayed(!isCartDisplayed);

  */
  const cartedItems = items.map((item) => (
    <li key={item.id}>
      <CartedItem item={item} clickEvent={removeItemFromCart} />
    </li>
  ));

  return (
    <div className="cart">
      <button onClick={clickEvent}>{isCartDisplayed ? 'Close Cart' : 'Open Cart'}</button>

      {isCartDisplayed && (
        <div className={`sidebar ${isCartDisplayed ? '' : 'hidden'}`}>
          <h2>Your Shopping Cart</h2>
          <button onClick={clickEvent}>Close Cart</button>
          {cartedItems && <ul>{cartedItems}</ul>}
          <Link to={'checkout'}>Checkout</Link>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array,
  removeItemFromCart: PropTypes.func,
  clickEvent: PropTypes.func,
  isCartDisplayed: PropTypes.bool
};

export default Cart;
