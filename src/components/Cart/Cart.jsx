import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './cart.css';
import CartedItem from './CartedItem/CartedItem';
import 'material-icons/iconfont/outlined.css';
import { priceFormmatterUSD } from '../Utility/priceFormatterUSD';

const Cart = ({ isCartDisplayed, clickEvent, itemsInCart }) => {
  const cartedItems = itemsInCart.map((item) => (
    <li key={item.id}>
      <CartedItem item={item} />
    </li>
  ));

  const totalCost = itemsInCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`modal-overlay ${isCartDisplayed ? 'active' : ''}`} onClick={clickEvent}>
      {isCartDisplayed && (
        <div className={`sidebar ${isCartDisplayed ? '' : 'hidden'}`} onClick={(e) => e.stopPropagation()}>
          <div className="cart-top">
            <h2>Your Cart</h2>
            <button onClick={clickEvent}>
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
          {cartedItems && <ul className="cart-bottom">{cartedItems}</ul>}
          <div className="checkout-link">
            <p>Total Price: {priceFormmatterUSD(totalCost)}</p>
            <Link to={'checkout'}>Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  itemsInCart: PropTypes.array,
  removeItemFromCart: PropTypes.func,
  clickEvent: PropTypes.func,
  isCartDisplayed: PropTypes.bool,
};

export default Cart;
