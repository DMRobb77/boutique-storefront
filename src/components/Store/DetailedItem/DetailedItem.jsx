import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useStore } from "../StoreProvider";
import { useState } from "react";

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
        <div>
            <button onClick={() => navigate(-1)}>Back to Store</button>
            <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity">
                    <input name="quantity" type="number" min={1} max={99} 
                    value={quantity} onChange={handleQuantityChange}></input>
                </div>
                <button onClick={() => addItemToCart(item)}>Add to cart</button>
            </div>
        </div>
    );
};

export default DetailedItem;