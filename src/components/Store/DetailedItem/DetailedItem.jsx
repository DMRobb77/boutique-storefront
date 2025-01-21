import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useStore } from "../StoreProvider";
import QuantityInput from "../../Utility/QuantityInput";
import './detailedItem.css';
import { useState } from "react";

const DetailedItem = () => {
    const { itemId } = useParams();
    const items = useStore();
    const item = items.find((i) => i.id === parseInt(itemId));
    const navigate = useNavigate();
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
            <button onClick={() => navigate(-1)}>Back to Store</button>
            <div>
                <div className="item-details-top">
                    <div className="detailed-image-container">
                        <img src={item.image} width={'250px'}></img>
                    </div>
                    <div className="item-details-top-right">
                        <h2>{item.title}</h2>
                        <p>${item.price}</p>
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