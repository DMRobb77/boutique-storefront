import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './cart.module.css';
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
    <div className={`${styles.modalOverlay} ${isCartDisplayed ? styles.active : ''}`} onClick={clickEvent}>
      {isCartDisplayed && (
        <div
          className={`${styles.sidebar} ${isCartDisplayed ? '' : styles.hidden}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.cartTop}>
            <h2>Your Cart</h2>
            <span className="material-icons-outlined">shopping_cart</span>

            <button onClick={clickEvent}>
              <span className="material-icons-outlined">close</span>
            </button>
          </div>
          {cartedItems && <ul className={styles.cartBottom}>{cartedItems}</ul>}
          <div className={styles.checkoutLink}>
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
