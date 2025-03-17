import PropTypes from "prop-types";
import QuantityInput from "../Utility/QuantityInput";
import { priceFormmatterUSD } from "../Utility/priceFormatterUSD";

const CheckoutItem = ({item}) => {

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={item.image} width={'100px'}></img>
            </div>
            <div className="details-container">
                <div className="details-top">
                  <span className="item-name">{item.title}</span>
                  <span className="price">{priceFormmatterUSD(item.price)}</span>
                </div>
                <div className="details-bottom">
                    <QuantityInput item={item}/>
                </div>
            </div>
        </div>
    )
}

CheckoutItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CheckoutItem;