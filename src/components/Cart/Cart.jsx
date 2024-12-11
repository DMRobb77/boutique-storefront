import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './cart.css';
import CartedItem from './CartedItem/CartedItem';

const Cart = ({ isCartDisplayed, clickEvent, items, removeItemFromCart}) => {

  const cartedItems = items.map((item) => (
    <li key={item.id}>
      <CartedItem item={item} clickEvent={removeItemFromCart} />
    </li>
  ));

  return (
    <div 
      className={`modal-overlay ${isCartDisplayed ? 'active': ''}`}
      onClick={clickEvent}
    >
      <div className="cart">

        {isCartDisplayed && (
          <div 
            className={`sidebar ${isCartDisplayed ? '' : 'hidden'}`}
            onClick={(e) => e.stopPropagation()}  
          >
            <h2>Your Shopping Cart</h2>
            <button onClick={clickEvent}>Close Cart</button>
            {cartedItems && <ul>{cartedItems}</ul>}
            <Link to={'checkout'}>Checkout</Link>
          </div>
        )}
      </div>
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
