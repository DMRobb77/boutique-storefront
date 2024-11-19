import { useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

const Checkout = () => {
  const { itemsInCart } = useOutletContext();
  return (
    <ul>
      {itemsInCart.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Checkout;
