import Item from './Item/Item';
import { useEffect, useState } from 'react';
import './store.css';

const Store = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("fetchedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(()=> {
    if (items.length > 0) return; // Skip API call if data already exists

    // Fetch both the women's clothing and jewelry category in parallel
    const fetchItems = async () => {
      try {
        const [womensClothing, jewelry] = await Promise.all([
          fetch('https://fakestoreapi.com/products/category/women%27s%20clothing')
            .then(res=>res.json()),
          fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res=>res.json())
        ]);
        const allItems = [...womensClothing, ...jewelry];
        
        // Add the quantity property
        const allItemsWithQuantity = allItems.map(item => ({
          ...item,
          quantity: 1
        }));

        setItems(allItemsWithQuantity);
        localStorage.setItem("fetchedItems", JSON.stringify(allItemsWithQuantity));
      } catch(error) {
        console.error("Failed to fetch items:", error);
      }
    };
    fetchItems();
  }, [items])

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
