import { Link, Outlet, useLocation } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { useEffect, useState } from 'react';
import './root.css';
import { CartContext } from '../components/Contexts';


export default function Root() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;

  const addItemToCart = (newItem) => {
    if(!isCartDisplayed) setIsCartDisplayed(true);

    // Make the new item its own object, so it's not just a reference
    newItem = {...newItem};

    setItemsInCart((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);

      // If the item is already in the cart, update its quantity
      if (existingItemIndex !== -1){
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + newItem.quantity,
        };

        return updatedItems;
      }
      return [...prevItems, newItem];
    })

  };

  const updateItemQuantity = (updatedItemId, quantity) => {
    
    setItemsInCart((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === updatedItemId);

      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...prevItems[existingItemIndex],
        quantity: quantity
      };
      return updatedItems;
    })
  }

  const removeItemFromCart = (removedItemId) => {
    setItemsInCart((prevItems) => prevItems.filter((item) => item.id !== removedItemId));
  };

  const toggleCart = () => {
    setIsCartDisplayed(!isCartDisplayed);
  };

  // If we go to checkout, hide the cart when we return to shop
  useEffect(() => {
    if(location.pathname === "/checkout" || location.pathname === "/" ) {
      setIsCartDisplayed(false);
    } 
  }, [location.pathname]);

  return (
    <>
      <CartContext.Provider value={{addItemToCart, itemsInCart, updateItemQuantity}}>
        <header>
          <div className='header-container'>
            <h1>THE SHOP</h1>
            <nav>
              <Link to={`/`}>Home</Link>
              <Link to={`store`}>Shop</Link>
              <Link to ={'checkout'}>Checkout</Link>
              <div>
                  { currentRoute === '/checkout' ? 
                    <button onClick={toggleCart} disabled>Open Cart</button> :
                    <button onClick={toggleCart}>Open Cart</button>}
                    {currentRoute !== '/checkout'
                    && <Cart itemsInCart={itemsInCart} 
                    removeItemFromCart={removeItemFromCart}
                    clickEvent={toggleCart} 
                    isCartDisplayed={isCartDisplayed} />}
              </div>
            </nav> 
          </div>
        </header>
        <main>
            <Outlet context={{ addItemToCart, itemsInCart }} />
        </main>
      </CartContext.Provider>
    </>
  );
}
