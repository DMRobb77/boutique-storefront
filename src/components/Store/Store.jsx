import Item from './Item/Item';

const Store = () => {
  const items = [];
  for (let i = 0; i <= 12; i++) {
    items.push(i);
  }

  const itemList = items.map((item) => (
    <li key={item}>
      <Item itemName={item} />
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
