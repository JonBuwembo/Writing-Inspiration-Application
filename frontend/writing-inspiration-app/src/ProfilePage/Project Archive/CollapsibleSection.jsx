import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
  };

  // prevent collapsing when clicking inside the section
  // const handleTogglingWithinSection = (e) => {
  //   if (e.target.tagName === 'a' || e.target.closest('a')) {
  //     e.preventDefault();
  //     const href = e.target.getAttribute('href') || e.target.closest('a').getAttribute('href');

  //     if (href) {
  //       console.log('Sidebar navigation to:', href);
  //     }
  //   }
  // };

  return (
    <li className="dashboard-section">
      <div
        className="section-title"
        onClick={handleTitleClick}
      >
        {title}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="details-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the section.
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default CollapsibleSection;
