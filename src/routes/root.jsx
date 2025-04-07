import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { useEffect, useState } from 'react';
import styles from './root.module.css';
import { CartContext } from '../components/Contexts';
import CartButton from '../components/Cart/CartButton/CartButton';

export default function Root() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isCartDisplayed, setIsCartDisplayed] = useState(false);
  const { pathname } = useLocation();

  const addItemToCart = (newItem) => {
    // Make the new item its own object, so it's not just a reference
    newItem = { ...newItem };

    setItemsInCart((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id);

      // If the item is already in the cart, update its quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  const updateItemQuantity = (updatedItemId, quantity) => {
    setItemsInCart((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === updatedItemId);

      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...prevItems[existingItemIndex],
        quantity: quantity,
      };
      return updatedItems;
    });
  };

  const removeItemFromCart = (removedItemId) => {
    setItemsInCart((prevItems) => prevItems.filter((item) => item.id !== removedItemId));
  };

  const toggleCart = () => {
    setIsCartDisplayed(!isCartDisplayed);
  };

  // If we go to checkout, hide the cart when we return to shop
  useEffect(() => {
    if (location.pathname === '/checkout' || location.pathname === '/') {
      setIsCartDisplayed(false);
    }
  }, [location.pathname]);

  // When the cart is displayed, toggle the ability to scroll the main page
  useEffect(() => {
    if (isCartDisplayed) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = ''; // Reset padding
      window.scrollTo(0, scrollY); // Restore scroll position
      document.body.style.overflow = '';
    }
  }, [isCartDisplayed]);

  return (
    <>
      <CartContext.Provider
        value={{
          addItemToCart,
          itemsInCart,
          updateItemQuantity,
          removeItemFromCart,
        }}
      >
        <header>
          <div className={styles.headerContainer}>
            <NavLink to={'..'}>
              <h1>
                <span className={styles.firstLetter}>L</span>A<span className={styles.firstLetter}> B</span>OUTIQUE
              </h1>
            </NavLink>

            <div>
              <img src="src\assets\header-charcoal-solid.png" alt="" className={styles.flourish} width={'300px'} />

              <NavLink to={'store'}>Browse Our Wares</NavLink>
            </div>

            <nav>
              {/* <NavLink to={'store'}>Shop</NavLink> */}

              <a href="#" target="" rel="noopener noreferrer">
                Log in
              </a>
              {pathname === '/checkout' ? (
                <CartButton toggleCart={toggleCart} enabled={false} items={itemsInCart} />
              ) : (
                <CartButton toggleCart={toggleCart} enabled={true} items={itemsInCart} />
              )}
              {pathname !== '/checkout' && (
                <Cart itemsInCart={itemsInCart} clickEvent={toggleCart} isCartDisplayed={isCartDisplayed} />
              )}
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
