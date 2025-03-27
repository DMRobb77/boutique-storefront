import Item from './Item/Item';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import styles from './store.module.css';
import { useStore } from './StoreProvider';

const Store = () => {
  const { addItemToCart } = useOutletContext();
  const { pathname } = useLocation();
  const items = useStore();

  const itemList = items.map((item) => (
    <li key={item.id}>
      <Link to={`/store/${item.id}`}>
        <Item item={item} />
      </Link>
    </li>
  ));

  return (
    <div className={styles.store}>
      {pathname === '/store' && <ul>{itemList}</ul>}
      <Outlet context={{ addItemToCart }} />
    </div>
  );
};

export default Store;
