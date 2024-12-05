import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {

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

    return <StoreContext.Provider value={items}>{children}</StoreContext.Provider>;
};

StoreProvider.propTypes = {
    children: PropTypes.children,
};