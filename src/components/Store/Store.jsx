import Item from './Item/Item';
import { useState } from 'react';

// Placeholder items
const placeholderItems = [];
for (let i = 0; i <= 12; i++) {
  placeholderItems.push({
    name: 'Item ' + i,
    id: i,
    price: (i + 1) * 20,
    quantity: 1,
  });
}

const Store = () => {
  const [items, setItems] = useState(placeholderItems);

  const handleQuantityChange = (id, quantity) => {
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? {...item, quantity } : item 
      )
    );
  };

  const itemList = items.map((item) => (
    <li key={item.id}>
      <Item item={item} onQuantityChange={handleQuantityChange} />
    </li>
  ));

  return (
    <>
      <div>STORE</div>
      <ul>{itemList}</ul>
    </>
  );
};

export default Store;
