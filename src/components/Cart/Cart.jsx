import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './cart.css';
import CartedItem from './CartedItem/CartedItem';

const Cart = (props) => {
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);

  const toggleCart = () => setIsCartDisplayed(!isCartDisplayed);

  const cartedItems = props.items.map((item) => (
    <li key={item}>
      <CartedItem itemName={item} clickEvent={props.removeItemFromCart} />
    </li>
  ));

  return (
    <div className="cart">
      <button onClick={toggleCart}>{isCartDisplayed ? 'Close Cart' : 'Open Cart'}</button>

      {isCartDisplayed && (
        <div className={`sidebar ${isCartDisplayed ? '' : 'hidden'}`}>
          <h2>Your Shopping Cart</h2>
          <button onClick={toggleCart}>Close Cart</button>
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
};

export default Cart;
