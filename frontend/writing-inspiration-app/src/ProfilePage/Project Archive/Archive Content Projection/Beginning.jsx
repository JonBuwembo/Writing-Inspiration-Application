import React from "react";
import "../archive.css";
import { useNavigate, useParams } from "react-router-dom";   
//import {useAuth} from "../context/AuthContext"; // will ONLY work after i create an auth context.
import { useEffect } from "react"; // Import useEffect to handle side effects
import { useState } from "react"; // Import useState to manage state

const Beginning = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters
  //const { currentUser } = useAuth(); // Not yet using --> meant to get current user.
  const navigate = useNavigate();

  // State to hold chapters
  // hold chapters to localStorag on component mount
  const [chapters, setChapters] = React.useState(() => {
    const saved = localStorage.getItem(`project_${projectID}_chapters`);
    return saved ? JSON.parse(saved) : [{ 
      id: crypto.randomUUID(), 
      name: "FIRST UN-NAMED CHAPTER" 
    }]; 
  });

  // save chapters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`project_${projectID}_chapters`, JSON.stringify(chapters));
  }, [chapters, projectID]);
  
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
    setChapters([...chapters, { 
      id: crypto.randomUUID(), 
      name: newChapterName.trim() 
    }]); // Add a new chapter with an empty name

  };

  // Change a chapter name by right clicking chapter name.
  const changeChapterName = (chapter, newName) => {
    if (newName.trim() === "") return; // Prevent setting empty chapter names
    
    const trimmedName = newName.trim();
    if (chapters.some((ch) => 
            ch.id !== chapter.id &&
            ch.name.trim().toLowerCase() === trimmedName.toLowerCase())) {
        alert("Chapter name already exists. Please choose a different name.");
        return; // Prevent changing to a duplicate chapter name
    }

    
    // const updatedChapters = [...chapters];
    // updatedChapters[index].name = newName;
    // setChapters(updatedChapters);

    // update the chapter with its new chapter name if the ids match or else don't.
    setChapters(chapters.map(c =>
      c.id ===chapter.id ? { ...c, name: trimmedName } : c
    ));
  };

  // remove chapter by right clicking it and its removed.
  const removeChapter = (chapterId) => {

    if (chapters.length <= 1) {
        alert("No chapters to remove.");
        return; // Prevent removing if there are no chapters
    }

    setChapters(chapters.filter(c => c.id !== chapterId));

  }




  // right click for renaming and deleting chapters
  // ON-CONTEXT-MENU is the event handler that listens to a right-click event. 

  const handleRightClick = (e, chapter) => {
    e.preventDefault();

    const action = prompt(`Right-click menu:\n1. Rename\n2. Delete\n\nType "1" or "2"`);

    if (action === "1"){
        const newName = prompt("Enter new chapter name: ");
        if (newName) {
            changeChapterName(chapter, newName);
        }
    }

    if (action === "2") {
        const confirmDeletion = window.confirm("Do you want to delete this chapter?");
        if (confirmDeletion) {
            removeChapter(chapter.id);
        }
    }
  }

  // const renderHrefLink = (index, chapterName) => (
  //   <a href={`/chapter/${index}`}> {chapterName} </a>
  // );

  // const createRouteLink = (index, chapterName) => (
  //   <Link to={`/chapter/${index}`}> {chapterName} </Link>
  // )


  const handleLeftClick = (chapterId, projectID) => {
    // go to link of the chapter.
    // TODO: implement useAuth for a particular log in.

    // Temporarily using placeholder until auth is implemented
   // const userId = currentUser?.id || "userID";
    navigate(`/projectarchive/${projectID}/beginning/chapters/${chapterId}`);
  }



//   const addChapter = (name) => {
//     if (name.trim() === "") return; // Prevent adding empty chapters
//     setChapters([...chapters, { name }]);
//     setName(""); // Clear the input field after adding
//   }

  return (
    <div className="beginning-container">
      <h2>Beginning of Project {projectID}</h2>
      <p className= "explanation-text">
        This section contains the beginning of the story for Project {projectID}.
        Here you can add details about the initial setup, characters, and setting.

        This page will also display the chapters that you can manually add/remove 
        within for the beginning portion of your story.

        To rename or remove chapters, simply right click. 
      </p>


      <button className="add-button" onClick={addChapter}>Add Chapter</button>

      <div className="chapter-list">

        {chapters.map((chapter) => (
            // onContextMenu listens for right-clicking event.
            // it gets triggeed when the user right clicks on this div element on the webpage.
            <div 
              key={chapter.id} 
              className="chapter-item" 
              onClick={() => handleLeftClick(chapter.id, projectID)} 
              onContextMenu={(e) => handleRightClick(e, chapter)}> 
                <h3>{chapter.name}</h3>
            </div>
        ))}

      </div>
    </div>
  );
}

export default Beginning;
// This component will render the content for the beginning section of the project archive based on the project ID from the URL parameters.