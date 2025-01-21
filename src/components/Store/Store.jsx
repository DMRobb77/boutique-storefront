import Item from './Item/Item';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import './store.css';
import { useStore } from './StoreProvider';

const Store = () => {
  const { addItemToCart } = useOutletContext();
  const location = useLocation();
  const currentRoute = location.pathname;
  const items = useStore();

  const itemList = items.map((item) => (
    <li key={item.id}>
      <Link to={`/store/${item.id}`}>
        <Item item={item} />
      </Link>
    </li>
  ));

  return (
    <>
      {currentRoute === '/store' && <ul>{itemList}</ul> }
      <Outlet context={{ addItemToCart  }} />
    </>
  );
};

export default Store;
