import { useEffect } from 'react';
import styles from './SearchPopUp.module.css';

const SearchPopUp = ({ children, onClose, isOpen }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.searchModalOverlay} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-popup-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.searchPopupContainer}>
        <div className={styles.searchPopupContent}>
          <div className={styles.searchPopupBody}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopUp;