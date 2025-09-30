import React from 'react';
import './MyPictures.css'
const MyPicturesPage = () => {

    const [images, setImages] = React.useState(() => {
        try {
            const saved = localStorage.getItem('images');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn("Failed to parse images from localStorage");
            return [];
        }   
    });

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');




    const addImage = (src, title, description) => {
        // add image to local storage
        const images = JSON.parse(localStorage.getItem('images')) || [];
        images.push({ src, title, description });
        localStorage.setItem('images', JSON.stringify(images));
    }

    const removeImage = (index) => {
        // remove image from local storage
        const images = JSON.parse(localStorage.getItem('images')) || [];
        images.splice(index, 1);
        localStorage.setItem('images', JSON.stringify(images));
    }

    return(
        <div>
            <h2 className="margin"> Images</h2>

            <div className="image-gallery">
                {[
                    {
                        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                        title: "Mountain View",
                        description: "A beautiful mountain landscape."
                    },
                    {
                        src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
                        title: "Forest Path",
                        description: "A serene path through the forest."
                    },
                    {
                        src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
                        title: "City Lights",
                        description: "Night view of a bustling city."
                    }
                ].map((img, idx) => (
                    <div className="image-card" key={idx}>
                        <img src={img.src} alt={img.title} className="image-card-img" />
                        <div className="image-card-content">
                            <h3 className="image-card-title">{img.title}</h3>
                            <p className="image-card-desc">{img.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyPicturesPage;