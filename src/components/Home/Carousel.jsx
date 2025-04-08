import { useStore } from '../Store/StoreProvider';
import { Link } from 'react-router-dom';
import Item from '../Store/Item/Item';

const Carousel = () => {
  // Preload store assets
  const items = useStore();

  // const itemList = items.map((item) => (
  //   <li key={item.id}>
  //     <Link to={`/store/${item.id}`}>
  //       <Item item={item} />
  //     </Link>
  //   </li>
  // ));

  return (
    <div className="carousel">
      <h2>Carousel Component</h2>
      {/* <ul>{itemList}</ul> */}
      {/* Add your carousel content here */}
    </div>
  );
};

export default Carousel;
