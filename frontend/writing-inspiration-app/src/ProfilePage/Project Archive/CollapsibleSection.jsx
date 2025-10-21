import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CollapsibleSection.css';

const CollapsibleSection = forwardRef(function CollapsibleSection(
  { title, children, depth = 0, droppableProps = {}}, ref) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div 
        className="dashboard-section-collapse" 
        style={{ marginLeft: `${depth * 1.5}rem` }}
    >
      <div className="section-title" onClick={handleTitleClick}>
        {title}  
      </div>

      <motion.div
        className='section-content-collapse'
        initial={false}
        animate={{ height: isOpen ? 'auto': 0, 
          opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          overflow: 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the section.
      >
          {children}
      </motion.div>
          


    </div>
  );
});

export default CollapsibleSection;
