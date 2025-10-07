import './ProjectPopUp.css';
import { useEffect } from 'react';

const ProjectPopUp = ({popupTitle = "Edit Project", children, onClose, isOpen}) => {

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
       
            <div 
                className={`modal-overlay ${isOpen ? 'open' : ''}`}
                role="dialog" 
                aria-modal="true"
                aria-labelledby="project-popup-title"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >

                {/* DIALOG KEYWORD: Ensures popup is accessible.*/}
                {/* ARIA-MODAL: When true, viewport (background) is blurred */}
                {/* ARIA-LABELLED-BY: Links the popup title to the dialog for screen readers */}
                {/* OVERLAY: Word that means the background is dimmed when the popup is open */}

                <div className="project-popup-container">
                    <button className="close-button" aria-label="Close popup" onClick={onClose}>
                        &times; {/* Close button */}
                    </button>

                    <div className="project-popup-content">
                        {/* <h2 id="project-popup-title">{popupTitle}</h2> */}
                        <div className="project-popup-body">{children}</div>
                    </div>
                </div>
            </div>
        

    )
};

export default ProjectPopUp;
