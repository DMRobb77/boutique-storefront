import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Contexts';
import RemoveItemBtn from './RemoveItemBtn';
import styles from './quantityInput.module.css';

const QuantityInput = ({ item, isShop, quantUpdater, large = false }) => {
  // If we're in the shop, automatically set the amount displayed to 1
  const [quantity, setQuantity] = useState(isShop ? 1 : item.quantity || 1);
  const isLowest = quantity <= 1;
  const isHighest = quantity >= 99;
  const { updateItemQuantity } = useContext(CartContext);

  const clampQuantity = (value) => {
    if (isNaN(value) || value < 0) return 0;
    if (value > 99) return 99;
    return value;
  };

  const changeQuantityInCart = () => {
    if (!isShop) {
      updateItemQuantity(item.id, quantity);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => clampQuantity(prevQuantity + 1));
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => clampQuantity(prevQuantity - 1));
  };

  const handleKeyboardInput = (e) => {
    const rawValue = parseInt(e.target.value);
    setQuantity(clampQuantity(rawValue));
  };

  useEffect(() => {
    changeQuantityInCart();
    if (quantUpdater) quantUpdater(quantity);
  }, [quantity]);

  return (
    <div className={`${styles.quantityInput} ${large ? styles.large : ''}`}>
      {/* Changes the decrement button into the delete button */}
      {isLowest && !isShop ? (
        <RemoveItemBtn item={item} />
      ) : (
        <button className={styles.decrement} onClick={handleDecrement} disabled={isLowest}>
          -
        </button>
      )}

      <input
        name="quantity"
        type="number"
        min={1}
        max={99}
        value={Number(quantity).toString()}
        onChange={handleKeyboardInput}
      ></input>
      <button className={styles.increment} onClick={handleIncrement} disabled={isHighest}>
        +
      </button>
    </div>
  );
};

QuantityInput.propTypes = {
  item: PropTypes.object.isRequired,
  isShop: PropTypes.bool,
  quantUpdater: PropTypes.func,
  large: PropTypes.bool,
};

export default QuantityInput;
