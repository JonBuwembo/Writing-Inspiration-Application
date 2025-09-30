import React from 'react';
import './UploadPopup.css';

const UploadPopup = ({ isOpen, onClose, popupTitle, children }) => {
    if (!isOpen) return null;

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