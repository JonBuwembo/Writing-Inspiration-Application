import React from 'react';
import './UploadPopup.css';
import { useEffect } from 'react';

const UploadPopup = ({ isOpen, onClose, popupTitle, children }) => {
    if (!isOpen) return null;

     useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') onClose();
            };
    
            if (isOpen) {
                document.addEventListener('keydown', handleKeyDown); // Listen for Escape key to close popup
                document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
            };
    
            return () => {
                document.removeEventListener('keydown', handleKeyDown); // Clean up event listener
                document.body.style.overflow = ''; // Restore scrolling when popup is closed
            }; // Re-run effect if isOpen or onClose changes
    }, [isOpen, onClose]);


    return (
        <div className="upload-popup-overlay">
            <div className="upload-popup-wrapper">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2 className='upload-popup-title'> {popupTitle || "Upload File"}</h2>
                <div className="upload-popup-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UploadPopup;