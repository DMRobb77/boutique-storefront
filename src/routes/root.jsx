import { Link, Outlet, useLocation } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { useEffect, useState } from 'react';
import './root.css';

export default function Root() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;

  const addItemToCart = (newItem) => {
    if(!isCartDisplayed) setIsCartDisplayed(true);

    setItemsInCart((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      // If the item is already in the cart, update quantity instead
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
          ? { ...item, quantity: item.quantity + newItem.quantity}
          : item
        );
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeItemFromCart = (removedItemId) => {
    setItemsInCart((prevItems) => prevItems.filter((item) => item.id !== removedItemId));
  };

  const toggleCart = () => setIsCartDisplayed(!isCartDisplayed);

  // If we go to checkout, hide the cart when we return to shop
  useEffect(() => {
    if(location.pathname === "/checkout" || location.pathname === "/" ) {
      setIsCartDisplayed(false);
    } 
  }, [location.pathname]);

  return (
    <>
      <header>
        <div className='container'>
          <h1>THE SHOP</h1>
          {currentRoute !== '/checkout' && <Cart items={itemsInCart} 
            removeItemFromCart={removeItemFromCart}
            clickEvent={toggleCart} 
            isCartDisplayed={isCartDisplayed} />}
        </div>
      </header>
      <nav>
        <div className="container">
          <Link to={`/`}>Home</Link>
          <Link to={`store`}>Shop</Link>
          <Link to ={'checkout'}>Checkout</Link>
        </div>
      </nav>
      <main>
        <Outlet context={{ addItemToCart, itemsInCart }} />
      </main>
    </>
  );
}
