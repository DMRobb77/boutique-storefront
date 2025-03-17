import { useParams, useOutletContext, NavLink } from "react-router-dom";
import { useStore } from "../StoreProvider";
import QuantityInput from "../../Utility/QuantityInput";
import './detailedItem.css';
import { priceFormmatterUSD } from "../../Utility/priceFormatterUSD";
import { useState } from "react";
import 'material-icons/iconfont/outlined.css';
import ScrollToTop from "../../Utility/ScrollToTop";

const DetailedItem = () => {
    const { itemId } = useParams();
    const items = useStore();
    const item = items.find((i) => i.id === parseInt(itemId));
    const { addItemToCart } = useOutletContext();
    const [possibleItem, setPossibleItem] = useState(item);

    const updateProspectiveQuantity = (newQuantity) => {
        setPossibleItem((prevItem) => {
            return {...prevItem, quantity: newQuantity};
        })
    }

    if (!item) {
        return <p>Item not found!</p>;
    }
    
    return (
        <div className="detailed-item">
            <ScrollToTop />
            <NavLink to=".." preventScrollReset>
              <span className="material-icons-outlined">arrow_back</span>
            </NavLink>
            <div>
                <div className="item-details-top">
                    <div className="detailed-image-container">
                        <img src={item.image} width={'250px'}></img>
                    </div>
                    <div className="item-details-top-right">
                        <h2>{item.title}</h2>
                        <p>{priceFormmatterUSD(item.price)}</p>
                        <QuantityInput item={item} isShop={true} quantUpdater={updateProspectiveQuantity}/>
                        <button onClick={() => addItemToCart(possibleItem)}>Add to cart</button>
                    </div>
                </div>
                <hr></hr>
                <p>{item.description}</p>
            </div>
        </div>
    );
};

export default DetailedItem;