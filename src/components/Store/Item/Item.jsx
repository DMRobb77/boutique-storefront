import PropTypes from 'prop-types';
import './item.css';

const Item = ({item}) => {

  console.log(`displaying ${item.title}`);
  return (
    <div className='item'>
      <div className='image-container'>
        <img src={item.image} width={'120px'}></img>
      </div>
      <h3>{item.title}</h3>
      <h4>${item.price}</h4>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default Item;
