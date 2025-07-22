import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="dashboard-section">
      <div
        className="section-title"
        onClick={() => setIsOpen((prev) => !prev)}
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
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default CollapsibleSection;
