import { useOutletContext } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';
import styles from './checkout.module.css';
import { priceFormmatterUSD } from '../Utility/priceFormatterUSD';
import ScrollToTop from '../Utility/ScrollToTop';
import ArrivalEstimate from '../Utility/ArrivalEstimate';
import 'material-icons/iconfont/outlined.css';

const Checkout = () => {
  const { itemsInCart } = useOutletContext();

  const totalCost = itemsInCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`${styles.checkout} ${itemsInCart.length === 0 ? styles.emptyCart : ''}`}>
      <div>
        <ScrollToTop />
        {itemsInCart.length > 0 ? (
          <>
            <h1>Your Items</h1>
            <ul className={styles.checkoutList}>
              {itemsInCart.map((item, index) => (
                <li key={item.id}>
                  <CheckoutItem item={item} />
                  {index !== itemsInCart.length - 1 && <hr></hr>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1>Your Cart is Empty</h1>
            <p>
              It appears your cart is empty. You can add items to it by visiting the <a href="/store">store</a> page.
            </p>
          </>
        )}
      </div>
      {itemsInCart.length > 0 && (
        <div className={styles.orderBox}>
          <p>Subtotal:</p>
          <p>{priceFormmatterUSD(totalCost)}</p>
          <p>+ Shipping:</p>
          <p>{priceFormmatterUSD(5.99)}</p>
          <p>Total:</p>
          <p>{priceFormmatterUSD(totalCost + 5.99)}</p>
          <p>Arrives by:</p>
          <p>
            <ArrivalEstimate />
          </p>
          <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/dQw4w9WgXcQ">
            Buy Now
            <span className="material-icons-outlined">open_in_new</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Checkout;
