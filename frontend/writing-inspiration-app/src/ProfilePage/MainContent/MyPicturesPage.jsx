import React from 'react';
import './MyPictures.css'
const MyPicturesPage = () => {

    const [images, setImages] = React.useState([]);
    const [selected, setSelected] = React.useState(null); // selected image for modal view (viewing an image when clicked)

    // Load images on mount
    // why useEffect: to perform side effects in functional components, such as fetching data or directly interacting with the DOM.
    React.useEffect(() => {
        const loadImages = () => {
            try {
                const saved = localStorage.getItem('media');
                if (!saved) return setImages([]);
                const allMedia = JSON.parse(saved);
                setImages(allMedia.filter(item => item.type === "image"));
            } catch (error) {
                console.warn("Failed to parse images from localStorage");
                setImages([]);
            }
        };
        loadImages();

        // Listen for localStorage changes from other components/pages
        window.addEventListener("storage", loadImages);
        return () => window.removeEventListener("storage", loadImages);
    }, []);

    // close modal with Escape
    // Why use useEffect: to manage side effects (like event listeners) in functional components
    // without useEffect, the event listener would be added on every render, leading to multiple listeners and potential memory leaks.
    React.useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setSelected(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const removeImage = (index) => {
        // remove image from local storage
        try {
            const saved = JSON.parse(localStorage.getItem("media")) || [];
            // Only remove from media that are images
            const imageItems = saved.filter(item => item.type === "image");
            const removed = imageItems[index];
            const updated = saved.filter(item => item !== removed);

            localStorage.setItem("media", JSON.stringify(updated));
            setImages(imageItems.filter((_, i) => i !== index)); // update state
        } catch (err) {
            console.error("Failed to remove image:", err);
        }
    }


    const openImage = (image) => {
        setSelected(image);
    }


    return(
        <div>
            <h2 className="margin"> Images</h2>

            <div className="image-gallery">
                {images.map((img, idx) => (
                    <div className="image-card" key={idx}>
                        <img 
                            src={img.src} 
                            alt={img.title} 
                            className="image-card-img"
                            onClick={() => openImage(img)} />
                        <div className="image-card-content">
                            <h3 className="image-card-title">{img.title}</h3>
                            <p className="image-card-desc">{img.description}</p>
                            <button className='delete-btn' onClick={() => removeImage(idx)}><i className="fas fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for viewing selected image */}
            {selected && (
                <div className='image-modal' onClick={() => setSelected(null)}>
                    <div className='image-modal-content' onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">&times;</button>
                        <img src={selected.src} alt={selected.title} className="modal-img" />
                        <div className="modal-meta">
                            <h3 className="modal-title">{selected.title}</h3>
                            <p className="modal-desc">{selected.description}</p>
                            <a className="modal-open-tab" href={selected.src} target="_blank" rel="noopener noreferrer">Open in new tab</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyPicturesPage;