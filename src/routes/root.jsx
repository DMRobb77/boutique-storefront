import { Link, Outlet, useLocation } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { useState } from 'react';

export default function Root() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const location = useLocation();
  const currentRoute = location.pathname;

  const addItemToCart = (newItem) => {
    console.log(newItem);
    setItemsInCart((prevItems) => [...prevItems, newItem]);
    console.log(itemsInCart);
  };

  const removeItemFromCart = (removedItemId) => {
    setItemsInCart((prevItems) => prevItems.filter((item) => item.id !== removedItemId));
  };

  return (
    <>
      <header>
        <h1>THE SHOP</h1>
        {currentRoute !== '/checkout' && <Cart items={itemsInCart} removeItemFromCart={removeItemFromCart} />}
      </header>
      <nav>
        <Link to={`/`}>Home</Link>
        <Link to={`store`}>Shop</Link>
      </nav>
      <Outlet context={{ addItemToCart, itemsInCart }} />
    </>
  );
}
