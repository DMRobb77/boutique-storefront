import { useState } from 'react';
import 'material-icons/iconfont/outlined.css';

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <nav className="hamburger-menu">
      <button className="hamburger-btn" onClick={handleToggle}>
        <span className="material-icons-outlined">menu</span>
      </button>
      {open && (
        <ul className="menu-list">
          <li>
            <a href="/store">Shop</a>
          </li>
          <li>
            <a href="/checkout">Checkout</a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default HamburgerMenu;
