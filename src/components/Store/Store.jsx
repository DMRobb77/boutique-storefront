import Item from './Item/Item';

// Placeholder items
const items = [];
for (let i = 0; i <= 12; i++) {
  items.push({
    name: 'Item ' + i,
    id: i,
    price: i * 20,
    quantity: 1,
  });
}

const Store = () => {
  const itemList = items.map((item) => (
    <li key={item.id}>
      <Item item={item} />
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
