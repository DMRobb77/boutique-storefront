import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useStore } from "../StoreProvider";
import { useState } from "react";
import './detailedItem.css';

const DetailedItem = () => {
    const { itemId } = useParams();
    const items = useStore();
    const item = items.find((i) => i.id === parseInt(itemId));
    const navigate = useNavigate();
    const { addItemToCart } = useOutletContext();
    const [quantity, setQuantity] = useState(1);

    if (!item) {
        return <p>Item not found!</p>;
    }

    const handleQuantityChange = (e) => {
      const newQuantity = parseInt(e.target.value, 10) || 0;
      setQuantity(newQuantity);
      item.quantity = newQuantity;
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
                        <div className="quantity">
                            <button>-</button>
                            <input name="quantity" type="number" min={1} max={99} 
                            value={quantity} onChange={handleQuantityChange}></input>
                            <button>+</button>
                        </div>
                        <button onClick={() => addItemToCart(item)}>Add to cart</button>
                    </div>
                </div>
                <hr></hr>
                <p>{item.description}</p>
            </div>
        </div>
    );
};

export default DetailedItem;