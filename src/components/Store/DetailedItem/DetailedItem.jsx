import { useParams, useOutletContext, NavLink } from 'react-router-dom';
import { useStore } from '../StoreProvider';
import QuantityInput from '../../Utility/QuantityInput';
import styles from './detailedItem.module.css';
import { priceFormmatterUSD } from '../../Utility/priceFormatterUSD';
import { useState } from 'react';
import 'material-icons/iconfont/outlined.css';
import ScrollToTop from '../../Utility/ScrollToTop';
import ArrivalEstimate from '../../Utility/ArrivalEstimate';
import ItemImage from './ItemImage';

const DetailedItem = () => {
  const { itemId } = useParams();
  const items = useStore();
  const item = items.find((i) => i.id === parseInt(itemId));
  const { addItemToCart } = useOutletContext();
  const [possibleItem, setPossibleItem] = useState(item);

  const updateProspectiveQuantity = (newQuantity) => {
    setPossibleItem((prevItem) => {
      return { ...prevItem, quantity: newQuantity };
    });
  };

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.itemDetails}>
      <ScrollToTop />
      <NavLink to=".." preventScrollReset>
        <span className="material-icons-outlined">arrow_back</span>
      </NavLink>

      <div className={styles.top}>
        <ItemImage src={item.image} alt={`Picture of ${item.category}`} />
        <div className={styles.right}>
          <div className={styles.topRight}>
            <h2>{item.title}</h2>
            <div className={styles.price}>
              <span className="material-icons-outlined">sell</span>
              <span>{priceFormmatterUSD(item.price)}</span>
            </div>
            <p className={styles.orderNow}>
              Order now to receive by <br></br> <ArrivalEstimate />
            </p>
            <QuantityInput item={item} isShop={true} quantUpdater={updateProspectiveQuantity} large={true} />
          </div>
          <button onClick={() => addItemToCart(possibleItem)} className={styles.checkoutBtn}>
            <div>Add to cart</div>
          </button>
          <img className={styles.flourishImg} src="../src/assets/flourish-charcoal.png" alt="" width={'250px'} />
        </div>
      </div>
      <hr></hr>
      <h3>Item Details</h3>
      <p className={styles.description}>{item.description}</p>
    </div>
  );
};

export default DetailedItem;
