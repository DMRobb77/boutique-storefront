import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import { useEffect, useState } from 'react';
import styles from './root.module.css';
import { CartContext } from '../components/Contexts';
import CartButton from '../components/Cart/CartButton/CartButton';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import { StoreProvider } from '../components/Store/StoreProvider';
import MobileSearchWrapper from '../components/SearchBar/MobileSearchWrapper';

export default function Root() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isSearchModalDisplayed, setIsSearchModalDisplayed] = useState(false);
  const [isCartModalDisplayed, setIsCartModalDisplayed] = useState(false);
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

  const clearCart = () => {
    setItemsInCart([]);
  };

  const toggleSearchModal = () => {
    setIsSearchModalDisplayed(!isSearchModalDisplayed);
  };

  const toggleCartModal = () => {
    setIsCartModalDisplayed(!isCartModalDisplayed);
  };

  // If we go to checkout, hide the cart when we return to shop
  useEffect(() => {
    if (location.pathname === '/checkout' || location.pathname === '/') {
      setIsSearchModalDisplayed(false);
    }
  }, [location.pathname]);

  // When the cart is displayed, toggle the ability to scroll the main page
  useEffect(() => {
    if (isSearchModalDisplayed || isCartModalDisplayed) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.querySelector('header').style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = ''; // Reset padding
      document.body.querySelector('header').style.paddingRight = ``;
      window.scrollTo(0, scrollY); // Restore scroll position
      document.body.style.overflow = '';
    }
  }, [isSearchModalDisplayed, isCartModalDisplayed]);

  return (
    <>
      <CartContext.Provider
        value={{
          addItemToCart,
          itemsInCart,
          updateItemQuantity,
          removeItemFromCart,
          clearCart,
        }}
      >
        <header>
          <div className={styles.headerContainer}>
            <NavLink to={'..'}>
              <h1>
                <span className={styles.firstLetter}>L</span>A<span className={styles.firstLetter}> B</span>OUTIQUE
              </h1>
            </NavLink>

            <div className={styles.desktopSearchBar}>
              <img
                src="https://iyddlapmuvfxhvgh.public.blob.vercel-storage.com/header-charcoal-solid-P9zBXDP3Uw4EvtR7C2pqXcU7FyCL7V.png"
                alt=""
                className={styles.flourish}
                width={'300px'}
              />
              <StoreProvider>
                <SearchBar />
              </StoreProvider>
            </div>
            <div className={styles.mobileSearchBar}>
              <MobileSearchWrapper toggleModal={toggleSearchModal} />
            </div>

            <nav className={styles.desktop}>
              <NavLink to={'store'}>Shop</NavLink>

              <a href="#" target="" rel="noopener noreferrer">
                Log in
              </a>
              {pathname === '/checkout' ? (
                <CartButton toggleCart={toggleCartModal} enabled={false} items={itemsInCart} />
              ) : (
                <CartButton toggleCart={toggleCartModal} enabled={true} items={itemsInCart} />
              )}
              {pathname !== '/checkout' && (
                <Cart itemsInCart={itemsInCart} clickEvent={toggleCartModal} isCartDisplayed={isCartModalDisplayed} />
              )}
            </nav>
          </div>
        </header>
        <main>
          <Outlet context={{ addItemToCart, itemsInCart }} />
        </main>
      </CartContext.Provider>
      <footer>
        Site by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/DMRobb77">
          Dalton Robbins
        </a>
        . Items pulled from the Fake Store API by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://fakestoreapi.com/">
          MohammadReza Keikavousi
        </a>
        . Background texture image by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://unsplash.com/@kiwihug?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
        >
          Kiwihug
        </a>{' '}
        on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://unsplash.com/photos/white-textile-with-black-shadow-MS9Tnh3if1o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
        >
          Unsplash
        </a>
        . Vector art by{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://www.vecteezy.com/free-vector/frame">
          Vecteezy
        </a>
        .
      </footer>
    </>
  );
}
