import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Contexts";

const QuantityInput = ({item, isShop, quantUpdater}) => {
    const [quantity, setQuantity] = useState(isShop ? 1 : item.quantity || 1);
    const {updateItemQuantity} = useContext(CartContext);

    const clampQuantity = (value) => {
        if (isNaN(value) || value < 1) return 1;
        if (value > 99) return 99;
        return value;
    }

    const changeQuantityInCart = () => {
        if(!isShop){ updateItemQuantity(item.id, quantity)};
    }

    const handleIncrement = () => {
        setQuantity((prevQuantity) =>  clampQuantity(prevQuantity + 1));
    }

    const handleDecrement = () => {
        setQuantity((prevQuantity) => clampQuantity(prevQuantity - 1));
    }

    const handleKeyboardInput = (e) => {
        const rawValue = parseInt(e.target.value, 10);
        setQuantity(clampQuantity(rawValue));
    }

    useEffect(() => {
        changeQuantityInCart();
        if (quantUpdater) quantUpdater(quantity);
    }, [quantity]);

    return (
        <div className="quantity">
            <button onClick={handleDecrement}>-</button>
            <input name="quantity" type="number" min={1} max={99} 
            value={quantity} onChange={handleKeyboardInput} ></input>
            <button onClick={handleIncrement}>+</button>
        </div>
    )
}

QuantityInput.propTypes = {
    item: PropTypes.object.isRequired,
    isShop: PropTypes.bool,
    quantUpdater: PropTypes.func
};


export default QuantityInput;