import { useStore } from '../Store/StoreProvider';
import { useEffect, useState, useRef } from 'react';
import styles from './searchBar.module.css';
import 'material-icons/iconfont/outlined.css';
import Result from './Result';
import PropTypes from 'prop-types';

const SearchBar = ({ isMobile = false, closeModal }) => {
  const items = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Filter items based on search term
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredItems = items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.category.toLowerCase().includes(lowerCaseSearchTerm),
    );

    setFilteredItems(newFilteredItems);
  }, [items, searchTerm]);

  // Clear search term when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.searchBar}`) && !isMobile) {
        setSearchTerm('');
      } else if (!event.target.closest(`.${styles.searchBar}`) && isMobile && inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Auto-focus the input field on mobile
  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearAndCloseModal = () => {
    () => setSearchTerm('');
    if (isMobile) {
      closeModal();
    }
  };

  const handleKeyboardInput = (e) => {
    const rawValue = e.target.value;
    setSearchTerm(rawValue);
  };

  // Slight delay so that the clear button can work properly
  const delayUnfocus = () => {
    if (!isMobile) {
      setTimeout(() => {
        setIsFocused(false);
      }, 200); // Adjust the delay as needed
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        value={searchTerm}
        onChange={handleKeyboardInput}
        onFocus={() => setIsFocused(true)}
        onBlur={delayUnfocus}
        type="text"
        placeholder="Search"
        ref={inputRef}
      />

      {isFocused ? (
        <button className={styles.clear} onClick={clearAndCloseModal}>
          <span className="material-icons-outlined">close</span>
        </button>
      ) : (
        <span className="material-icons-outlined">search</span>
      )}

      {searchTerm.length > 2 && (
        <div className={styles.searchResults}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className={styles.result}>
                <Result id={item.id} title={item.title} term={searchTerm} clickEvent={() => setSearchTerm('')} />
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  isMobile: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default SearchBar;
