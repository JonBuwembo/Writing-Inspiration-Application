import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CollapsibleSection.css';

function CollapsibleSection({ title, children, depth = 0 }) {
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
    <div 
        className="dashboard-section-collapse" 
        style={{ marginLeft: `${depth * 1.5}rem` }}
    >
      <div
        className="section-title"
        onClick={handleTitleClick}
      >
        {title}
      </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className='section-content-collapse'
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing the section.
            >
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, { depth: depth + 1 })
                  : child
              )}
            </motion.div>
          )}
        </AnimatePresence>

    </div>
  );
}

export default CollapsibleSection;
