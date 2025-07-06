import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

import { useEffect } from "react"; // Import useEffect to handle side effects
import { useState } from "react"; // Import useState to manage state

const Climax = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters

  // State to hold chapters
  const [chapters, setChapters] = React.useState([{ name: "FIRST UN-NAMED CHAPTER" }]);
  
  const addChapter = () => {
    
    const newChapterName = prompt("Enter the name of the chapter: ");

    // if the chapter can't be trimmed it must be an empty string.
    if (!newChapterName.trim()) {
        alert("Chapter name cannot be empty.");
        return; // Prevent adding empty chapter names
    }

    if (chapters.some(chapter => chapter.name.trim().toLocaleLowerCase() === newChapterName.trim().toLowerCase())) {
        alert("Chapter name already exists. Please choose a different name.");
        return; // Prevent adding duplicate chapter names
    }

    // if all edge cases pass: name the chapter.
    setChapters([...chapters, { name: newChapterName }]); // Add a new chapter with an empty name

  };

  // Change a chapter name by right clicking chapter name.
  const changeChapterName = (index, newName) => {
    if (newName.trim() === "") return; // Prevent setting empty chapter names

    if (index < 0 || index >= chapters.length) return; // Ensure index is valid
    
    if (chapters.some((chapter) => chapter.name.trim().toLowerCase() === newName.trim().toLowerCase())) {
        alert("Chapter name already exists. Please choose a different name.");
        return; // Prevent changing to a duplicate chapter name
    }

    const updatedChapters = [...chapters];
    updatedChapters[index].name = newName;
    setChapters(updatedChapters);
  };

  // remove chapter by right clicking it and its removed.
  const removeChapter = (index) => {

    if (chapters.length < 1) {
        alert("No chapters to remove.");
        return; // Prevent removing if there are no chapters
    }

    const updatedChapters = [...chapters]; //updated state variable
    updatedChapters.splice(index, 1); // Remove the chapter at the specified index (only one item removed)
    setChapters(updatedChapters); // Update the state with the new chapters array

  }




  // right click for renaming and deleting chapters
  // ON-CONTEXT-MENU is the event handler that listens to a right-click event. 

  const handleRightClick = (e, index) => {
    e.preventDefault();

    const action = prompt(`Right-click menu:\n1. Rename\n2. Delete\n\nType "1" or "2"`);

    if (action === "1"){
        const newName = prompt("Enter new chapter name: ");
        if (newName) {
            changeChapterName(index, newName);
        }
    }

    if (action === "2") {
        const confirmDeletion = window.confirm("Do you want to delete this chapter?");
        if (confirmDeletion) {
            removeChapter(index);
        }
    }
  }

  const handleLeftClick = () => {
    // go to link of the chapter.
  }



//   const addChapter = (name) => {
//     if (name.trim() === "") return; // Prevent adding empty chapters
//     setChapters([...chapters, { name }]);
//     setName(""); // Clear the input field after adding
//   }

  return (
    <div className="beginning-container">
      <h2>Climax of Project {projectID}</h2>
      <p className= "explanation-text">
        This section contains the climax of the story for Project {projectID}.
        Here you can add details about the initial setup, characters, and setting.

        This page will also display the chapters that you can manually add/remove 
        within for the beginning portion of your story.

        To rename or remove chapters, simply right click. 
      </p>


      <button className="add-button" onClick={addChapter}>Add Chapter</button>

      <div className="chapter-list">

        {chapters.map((chapter, index) => (
            // onContextMenu listens for right-clicking event.
            // it gets triggeed when the user right clicks on this div element on the webpage.
            <div key={index} className="chapter-item" onClick={() => handleLeftClick(index)} onContextMenu={(e) => handleRightClick(e, index)}> 
                <h3>{chapter.name}</h3>
            </div>
        ))}

      </div>
      
     
    </div>
  );
}

export default Climax;
// This component will render the content for the beginning section of the project archive based on the project ID from the URL parameters.