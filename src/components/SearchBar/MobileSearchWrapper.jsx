import { useState } from 'react';
import styles from './searchBar.module.css';
import SearchBar from './SearchBar.jsx';
import { StoreProvider } from '../Store/StoreProvider.jsx';
import PropTypes from 'prop-types';

const MobileSearchWrapper = ({ toggleModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    toggleModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    toggleModal();
  };

  return (
    <div className={styles.searchModalContainer}>
      <button onClick={openModal}>
        <span className="material-icons-outlined">search</span>
      </button>

      {isModalOpen && (
        <div className={`${styles.searchModalOverlay} ${isModalOpen ? styles.active : ''}`}>
          <div className={styles.mobileSearch}>
            <StoreProvider>
              <SearchBar isMobile={true} closeModal={closeModal} />
            </StoreProvider>
          </div>
        </div>
      )}
    </div>
  );
};

MobileSearchWrapper.propTypes = {
  toggleModal: PropTypes.func,
};

export default MobileSearchWrapper;
