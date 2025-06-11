import React, {useEffect, useState, useRef} from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   
import ReactQuill from "react-quill"; // Imported ReactQuill for text editing
import 'react-quill/dist/quill.snow.css'; // Importing the Quill CSS for styling

const Summary = () => {
    const { projectID } = useParams(); // Get the project ID from the URL parameters
    const [text, setText] = React.useState(localStorage.getItem("summaryText") || ""); // Initialize the text state with local storage or an empty string
    const [textBoxHeight, setTextBoxHeight] = useState("auto");
    const [textpadding, setTextPadding] = useState("0px"); // Padding for the text box
    const quillRef = useRef(null); // Create a ref for the ReactQuill component



    // Initialize the text state to an empty string or load from local storage if needed

    const handleChange = (information) => {
        setText(information);
        localStorage.setItem("summaryText", information); // Saving the text to local storage whenever it changes
    }

    /*
        ReactQuill Toolbar uses modules property to customize how toolbar buttons appear.
        You activate it by passing your custom coded toolbar (below) into
        the modules property as a prop (shown further below).

        modules={modules} where "modules" is our function.
    */
    const modules = {
        toolbar: [
        [{ 'font': ['Roboto', 'Courier New', 'Arial', 'Times New Roman'] }],  // Added custom fonts
        [{ 'size': ['small', 'medium', 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         ['image'],
        ],
    };

    const adjustQuillHeight = () => {
        if (quillRef.current) {
            const quillEditor = quillRef.current.getEditor();
            if(quillEditor && quillEditor.container) {
                const quillContainer = quillEditor.container; //Quill editor's built in container.

                // DOM has trouble reading the container's height when editors is first rendered so comment out style section.
                // textBoxContainer.style.height = 'auto'; // height reset to auto to recalculate
                // quillContainer.style.height = 'auto'; 

                const newHeight = quillContainer.scrollHeight; // Set height to scrollHeight
                setTextBoxHeight(`${newHeight + 64}px`); // Set the height of the textbox container to match the Quill editor
                setTextPadding("10px"); // Set padding for the text box
            }
        }
    };

    useEffect(() => {
        adjustQuillHeight(); // Adjust the height when the text changes
    }, [text]);


    useEffect(()=>{
        const timer = setTimeout(() => {
            adjustQuillHeight(); // Adjust the height after a short delay to ensure the editor is rendered
        }, 0);
        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [text]);
    
    
    return (
        <div className="summary-container">
            <h2 className="title-projection-text">Summary for Project {projectID}</h2>
            <p className="explanation-text">This section will contain information about the summary of your story line.</p>

            <div className="text-box" style={{ height: textBoxHeight, paddingBottom: textpadding }}>
                <ReactQuill ref={quillRef} modules={modules} value={text} onChange={handleChange} placeholder="Start typing your summary here ..."/>
            </div>
        </div>
    );
}

export default Summary;
// This component will render the content for the summary section of the project archive based on the project ID from the URL parameters.