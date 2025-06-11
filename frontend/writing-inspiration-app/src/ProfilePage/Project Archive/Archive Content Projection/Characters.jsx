import React from "react";
import "../archive.css";
import { useParams } from "react-router-dom";   

const Characters = () => {

    const {ProjectID} = useParams(); // Get the project ID from the URL parameters

      // State to hold characters
      const [characters, setCharacters] = React.useState([{ name: "FIRST UN-NAMED CHARACTER" }]);
      
      const addCharacter = () => {
        
        const newCharacterName = prompt("Enter the name of the chapter: ");
    
        // if the chapter can't be trimmed it must be an empty string.
        if (!newCharacterName.trim()) {
            alert("Chapter name cannot be empty.");
            return; // Prevent adding empty chapter names
        }
    
        if (characters.some(character => character.name.trim().toLocaleLowerCase() === newCharacterName.trim().toLowerCase())) {
            alert("Chapter name already exists. Please choose a different name.");
            return; // Prevent adding duplicate chapter names
        }
    
        // if all edge cases pass: name the chapter.
        setCharacters([...characters, { name: newCharacterName }]); // Add a new chapter with an empty name
    
      };
    
      // Change a character name by right clicking chapter name.
      const changeCharacterName = (index, newName) => {
        if (newName.trim() === "") return; // Prevent setting empty chapter names
    
        if (index < 0 || index >= characters.length) return; // Ensure index is valid
        
        if (characters.some((chapter) => character.name.trim().toLowerCase() === newName.trim().toLowerCase())) {
            alert("Chapter name already exists. Please choose a different name.");
            return; // Prevent changing to a duplicate chapter name
        }
    
        const updatedCharacters = [...characters];
        updatedCharacters[index].name = newName;
        setCharacters(updatedCharacters);
      };
    
      // remove chapter by right clicking it and its removed.
      const removeCharacter = (index) => {
    
        if (characters.length < 1) {
            alert("No characters to remove.");
            return; // Prevent removing if there are no chapters
        }
    
        const updatedCharacters = [...characters]; //updated state variable
        updatedCharacters.splice(index, 1); // Remove the chapter at the specified index (only one item removed)
        setCharacters(updatedCharacters); // Update the state with the new characters array
    
      }
    
    
    
    
      // right click for renaming and deleting chapters
      // ON-CONTEXT-MENU is the event handler that listens to a right-click event. 
    
      const handleRightClick = (e, index) => {
        e.preventDefault();
    
        const action = prompt(`Right-click menu:\n1. Rename\n2. Delete\n\nType "1" or "2"`);
    
        if (action === "1"){
            const newName = prompt("Enter new chapter name: ");
            if (newName) {
                changeCharacterName(index, newName);
            }
        }
    
        if (action === "2") {
            const confirmDeletion = window.confirm("Do you want to delete this chapter?");
            if (confirmDeletion) {
                removeCharacter(index);
            }
        }
      }
    
      const handleLeftClick = () => {
        // go to link of the chapter.
      }
    
    
    
    return (
        <div className="climax-container">
            <h2> Climax! </h2>
            <p className="explanation-text">This section will contain information about the characters in your project.</p>


            <button className="add-button" onClick={addCharacter}>Add Character</button>

            <div className="chapter-list">

                {characters.map((character, index) => (
                    // onContextMenu listens for right-clicking event.
                    // it gets triggeed when the user right clicks on this div element on the webpage.
                    <div key={index} className="chapter-item" onClick={() => handleLeftClick(index)} onContextMenu={(e) => handleRightClick(e, index)}> 
                        <h3>{character.name}</h3>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Characters;
// This component will render the content for the climax section of the project archive based on the project ID from the URL parameters.
// You can add more details about the climax of the story, such as key events, character actions, and plot twists.