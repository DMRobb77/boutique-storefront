import Item from './Item/Item';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import styles from './store.module.css';
import { useStore } from './StoreProvider';
import { useEffect, useState } from 'react';
import ScrollToTop from '../Utility/ScrollToTop';

const Store = () => {
  const { addItemToCart } = useOutletContext();
  const { pathname } = useLocation();
  const items = useStore();
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const fadeInSequence = () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems((prevItems) => [...prevItems, item]);
        }, index * 275); // Adjusts fade-in delay
      });
    };

    fadeInSequence();
  }, [items]);

  const itemList = items.map((item) => (
    <li
      key={item.id}
      className={visibleItems.includes(item) ? `${styles.fadeIn}` : ''}
      style={{ opacity: visibleItems.includes(item) ? 1 : 0 }}
    >
      <Link to={`/store/${item.id}`}>
        <Item item={item} />
      </Link>
    </li>
  ));

  return (
    <div className={styles.store}>
      <ScrollToTop />
      {pathname === '/store' && <ul>{itemList}</ul>}
      <Outlet context={{ addItemToCart }} />
    </div>
  );
};

export default Store;
