import { useOutletContext } from 'react-router-dom';

const Checkout = () => {
  const { itemsInCart } = useOutletContext();
  return (
    <ul>
      {itemsInCart.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default Checkout;
