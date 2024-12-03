import { useOutletContext } from 'react-router-dom';

const Checkout = () => {
  const { itemsInCart } = useOutletContext();

  const totalCost = itemsInCart.reduce((sum, item) => 
    sum + item.price * item.quantity, 0);

  return (
    <>    
      <ul>
        {itemsInCart.map((item) => (
          <li key={item.id}>{item.name} x {item.quantity} at price of {item.price} each</li>
        ))}
      </ul>
      <p>Total: {totalCost}</p>
    </>
  );
};

export default Checkout;
