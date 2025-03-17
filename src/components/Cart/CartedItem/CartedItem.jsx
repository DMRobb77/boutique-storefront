import PropTypes from 'prop-types';
import QuantityInput from '../../Utility/QuantityInput';
import { priceFormmatterUSD } from '../../Utility/priceFormatterUSD';

const CartedItem = ({item}) => {

  return (
    <div className="cart-details">
      <div className="cart-image-container">
          <img src={item.image} width={'50px'}></img>
      </div>
      <div className="cart-details-right">
          <h2>{item.title}</h2>
          <p className="price">{priceFormmatterUSD(item.price)}</p>
          <QuantityInput item={item}/>
      </div>
    </div>
  );
};

CartedItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartedItem;
