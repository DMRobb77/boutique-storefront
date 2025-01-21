import { useOutletContext } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';
import './checkout.css';
import { useEffect, useState } from 'react';

const Checkout = () => {
  const { itemsInCart } = useOutletContext();
  const [totalCost, setTotalCost] = useState(0);


  useEffect(() => {
    setTotalCost(itemsInCart.reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    ))
  }, [itemsInCart])

  // const totalCost = itemsInCart.reduce(
  //   (sum, item) => sum + item.price * item.quantity, 
  //   0
  // );

  return (
      <div className='checkout'>
        <div className='items'> 
          <ul>
            {itemsInCart.map((item) => (
              <li key={item.id}>
                <CheckoutItem item={item}/>
              </li>
            ))}
          </ul>
        </div>
        <div className='total'>
          <p>Total: {totalCost}</p>
          <button>Buy Now</button>
        </div>
      </div>
  );
};

export default Checkout;
