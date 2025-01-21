import PropTypes from "prop-types";
import QuantityInput from "../Utility/QuantityInput";

const CheckoutItem = ({item}) => {
    return (
        <div>
            <img src={item.image} width={'100px'}></img>
            <h1>{item.title}</h1>
            <QuantityInput item={item}/>
        </div>
    )
}

CheckoutItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CheckoutItem;