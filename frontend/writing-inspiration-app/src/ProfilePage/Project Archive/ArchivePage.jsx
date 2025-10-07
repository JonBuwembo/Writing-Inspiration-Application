import React, {useState, useEffect, useContext, useCallback} from 'react';
import { Outlet } from 'react-router-dom';
import './archive.css';
import {useNavigate, useParams} from 'react-router-dom';
import SidebarProject from './SidebarProject.jsx'; // Import the sidebar component for the archive page
import ProjectContentProjection from './ProjectContentProjection.jsx';
import './maincontent.css';
import ProjectTextArea from './Archive Content Projection/NoteEditor/ProjectTextArea.jsx';
import NoteEditor from './Archive Content Projection/NoteEditor/NoteEditor.jsx';
//import {userContext} from '../Auth/UserContext';

//--------------------------------------------------------------------
// PURPOSE: Page of a project that the user is going to work in.
//--------------------------------------------------------------------



// This page will be used to fetch the project data from the server or local storage to display specific information about the project.
// console.log("ArchivePage is using NoteEditor component:", NoteEditor);
 
function ArchivePage() {


   const {projectID, noteId} = useParams(); //paramater in the URL
   const [sidebarWidth, setSidebarWidth] = useState(350);
   const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);
   const [notes, setNotes] = useState([]);
   const [currentNote, setCurrentNote] = useState(null);
   const [saveStatus, setSaveStatus] = useState('saved');
  
   // Testing function
   const resetNotes = () => {
    localStorage.removeItem('projectNotes');
    console.log('Project notes reset!');
   };
   
   const createBlankNote = (section = 'unsorted') => ({
    id: `note-${Date.now()}`,
    title: '',
    content: '',
    section,
    themes: [],
    hashTags: [],
    lastEdited: new Date().toISOString()
  })

  
 

  // useEffect(() => {
  //   // Test: Add three notes and check if they were added
  //   const testNotes = [
  //     createBlankNote('test1'),
  //     createBlankNote('test2'),
  //     createBlankNote('test3')
  //   ];
  //   setNotes(testNotes);

  //   // Test if notes were added
  //   if (testNotes.length === 3) {
  //     console.log('Test Passed: 3 notes added:', testNotes);
  //   } else {
  //     console.error('Test Failed: Notes not added correctly');
  //   }
  // }, []);

  // console.log("ArchivePage is using NoteEditor:", NoteEditor);
  // TODO: change for authentication, (currently not yet user specific)
  const storageKey = 'projectNotes';
  const navigate = useNavigate();

  // default hashtag words that must match with the users hashtags to be sorted in the sidebar.
  // these are the only sections that can have multiple notes.
   const hardcodedHashTags = [
    {tag: "#section"}, 
    {tag: "#orphannotes"},
    {tag: "#plotthreads"},
    {tag: "#characters"},
  ]

  // Get user-specific notes key
  // const getUserNotesKey = () => {
  //   return currentUser ? `projectNotes_${currentUser.id}` : 'projectNotes_anonymous';
  // };

  // Check if there are any existing notes in localStorage
  const [isLoading, setIsLoading] = useState(true);

  // Consolidated loading effect
  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem(storageKey)) || {};
        const projectNotes = storedNotes[projectID] || [];
        setNotes(projectNotes);

        let noteToSet;
        if (noteId) {
          noteToSet = projectNotes.find(n => n.id === noteId);

        } else if (projectNotes.length > 0) {
          noteToSet = [...projectNotes].sort((a, b) => 
            new Date(b.lastEdited) - new Date(a.lastEdited))[0];

        } else {
          noteToSet = createBlankNote();
          setNotes([noteToSet]); // Ensure at least one note exists
          const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
          storedData[projectID] = [noteToSet];
          localStorage.setItem(storageKey, JSON.stringify(storedData));
        }


        const currentPath = window.location.pathname;
        const isSpecialPath = [
          "ai-writing-assistant",
          "overview",
          "credits"
        ].some(special => currentPath.includes(special));

        if (!isSpecialPath) {
          // set current note here to avoid being overwritten
          console.log('Setting currentNote:', noteToSet);
          setCurrentNote(noteToSet);

          if (!currentPath.includes(`/note/`)) {
            const path = `/project/${projectID}/note/${noteToSet.id}`;
            console.log("Navigating to new note:", path);
            navigate(path);
          }
        } else {
          console.log('Special path detected, not setting currentNote or navigating.', currentPath);
        }
        
        // const path = `/project/${projectID}/note/${noteToSet.id}`;
        // console.log("Navigating to new note:", path);
        // if (window.location.pathname !== path) {
        //   navigate(path);
        // }
        setIsLoading(false);
        
      } catch (error) {
        console.error('Failed to load notes:', error);
        setCurrentNote(createBlankNote());
        setIsLoading(false);
      }
    };

   loadNotes();
  }, [projectID, noteId, navigate]);


  const addNewNote = () => {
    // create a new blank note by default 
    const newNote = createBlankNote();
    const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};

    // update current note state
    // This will update the current note to the new note created.
    setCurrentNote(newNote);
    // setSaveStatus('unsaved');

    
    storedData[projectID] = [newNote, ...(storedData[projectID] || [])]; // Add new note to existing notes
    localStorage.setItem(storageKey, JSON.stringify(storedData));
    setNotes(prevNotes => [...prevNotes, newNote]);
    console.log("I've added a new note 'AddNewNote()' ran.");

    // Navigate to the new note's URL

  

    // 4. Navigate to new note
    const encodedProjectID = encodeURIComponent(projectID);
    //const encodedSection = encodeURIComponent(newNote.section);
    const encodedNoteId = encodeURIComponent(newNote.id);

    const path = `/project/${encodedProjectID}/note/${encodedNoteId}`;

    // Navigate to the newly created note's URL
    navigate(path);

  }
  


  //Autosaving feature.
  useEffect(()=>{
    if (saveStatus !== 'unsaved' || !currentNote) return;

    // if in a saving state, automatically save content after 2 seconds of no typing.
    const timer = setTimeout(()=>{
      handleNoteSave();
    }, 2000);

    return () => clearTimeout(timer);
  },[currentNote, saveStatus]);


  const handleNoteSave = () => {
    // WHEN AUTHENTICATION IMPLEMENTED:
    // const userNotesKey = getUserNotesKey();

    // Early exit if there's no note to save.
    if(!currentNote) return;

    // set saving state
    setSaveStatus('saving');

    try {

      // Load all existing data (notes) using the storage key.
      // The storage key for now isn't user specific. 
      // Fall back to {} if no data found.
      const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
      // Remove old version of the note if it exists.
      const updatedNotes = notes.filter(n => n.id !== currentNote.id);
      
      // update project data: Spread operator ... creates new array, and adds the updated note to it.
      // maintains referential integrity.
      storedData[projectID] = [...updatedNotes, currentNote];
      // store this updated data back to local storage so it can persist. Stringifies entire data structure.
      localStorage.setItem(storageKey, JSON.stringify(storedData));

      // update the local state.
      setNotes(storedData[projectID]);
      // update status to now saved.
      setSaveStatus('saved');
      
      // Update URL with current section.
      // Checks if url already reflects current section. 
      // only navigates if section changes.
      if (!window.location.pathname.includes(`/${currentNote.section}/`)) {
        navigate(`/project/${projectID}/note/${currentNote.id}`);
      }

    } catch (error) {

      // in case saving failed.
      console.error('save failed.');
      console.error('To look at the mess for this error:', error);
      setSaveStatus('error');
    }

  };


  const handleNoteChange = useCallback((updates) => {
    setCurrentNote(prevNote => {
      const updatedNote = {
        ...prevNote,
        ...updates,
        lastEdited: new Date().toISOString(),
      };
    
      setNotes(prevNotes => {
        // Update the note in the notes array
          const updatedNotes = prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          );

          const storedData = JSON.parse(localStorage.getItem(storageKey)) || {};
          storedData[projectID] = updatedNotes;
          localStorage.setItem(storageKey, JSON.stringify(storedData));
          
          return updatedNotes;
        }
      );

      return updatedNote;
    });

    setSaveStatus('unsaved');
  },[]);

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);

    const storedData = JSON.parse(localStorage.getItem('projectNotes')) || {};
    
    storedData[projectID] = updatedNotes; // update with a new set of notes with one less.
    localStorage.setItem('projectNotes', JSON.stringify(storedData));
    setNotes(updatedNotes);

    if (currentNote?.id === id) {
      if (updatedNotes.length > 0) {
          navigate(`/project/${projectID}/note/${updatedNotes[0].id}`);
      } else {
          setCurrentNote(createBlankNote());
          setSaveStatus('unsaved');
      }
    }  
  };

  // Function to handle checking hash tag input validity
  const isValidHashTag = (hashTagWord) => {
    // check if the hashtag starts with a '#' and has at least 2 characters
    if (hashTagWord.startsWith('#') && hashTagWord.length > 1){
      return true;
    } else {
      return false;
    }
  }

  const sortHashTags = (userHashTagList, currentSection) => {
    if (!userHashTagList?.length) return { hashTags: [], section: currentSection, themes: [] }; // Exit immediately if no hashtags.

    // Find the first hardcoded tag match (case-insensitive)
    const matchedHardCodedTag = userHashTagList.find(tagObj => {
      const tag = tagObj.tag.toLowerCase();
      return hardcodedHashTags.some(hardcodedTag => 
        hardcodedTag.tag.toLowerCase() === tag
      );
    });

    // Get unmatched tags (optional: only if needed for themes)
    const unmatchedTags = matchedHardCodedTag 
      ? userHashTagList.filter(tagObj => 
          !hardcodedHashTags.some(hardcodedTag => 
            hardcodedTag.tag.toLowerCase() === tagObj.tag.toLowerCase()
          )
        )
      : userHashTagList; // All tags are unmatched if no hardcoded match

    // Update state ONCE

    if (userHashTagList.length > 0) {
      return {
        hashTags: userHashTagList, // Preserve original list (or sort if needed)
        section: matchedHardCodedTag ? matchedHardCodedTag.tag.replace('#', '') : "unsorted", // Keep existing section if no match
        themes: unmatchedTags.map(tagObj => tagObj.tag.replace('#', '')), // Store all unmatched tags as themes
      };
    } else {
      return {
        hashTags: [],
        section: currentSection || 'unsorted',
        themes: [],
      };
    }
   
  };


  const handleAddingHashTag = (hashTagWord) => {

    const trimmedHashTag = hashTagWord.trim();
    // normalize hashtag into a string
    const normalizedHashTag = trimmedHashTag.toLowerCase();
    // overview, summary, and timeline are single files that can't have notes added to them.
    const unAddableSections = ['#overview', '#summary', '#timeline'];
  
    // if not a valid hashtag, return early
    if (!isValidHashTag(trimmedHashTag)) return;

    
    // Add to the list of hashtags in that note.
    setCurrentNote(prevNote => {
      if (!prevNote) return prevNote;

      // check if the tag already exists, skip over it.
      if (
       prevNote.hashTags.some(tagObj => {
        const tagValue = typeof tagObj === "string" ? tagObj : tagObj.tag;
        return tagValue.toLowerCase() === normalizedHashTag;
      }) || 
       unAddableSections.includes(normalizedHashTag)
      ) {
        return prevNote;
      }

      // If it doesn't exist, add it to the list of hashtags.
      const updatedHashTags = [...prevNote.hashTags, { tag: normalizedHashTag }];
      const sorted = sortHashTags(updatedHashTags, prevNote.section);

      const updatedNote = {
        ...prevNote, 
        hashTags: sorted.hashTags,
        section: sorted.section, // Update section if it was changed
        themes: sorted.themes,
        lastEdited: new Date().toISOString() // Update last edited time
      };

      //keep notes in sync.   
      setNotes((prevNotes) =>
        prevNotes.map(anote => (anote.id === updatedNote.id ? updatedNote : anote))
      );

      return updatedNote;
    });
  };

  

  //TESTING PURPOSES
  console.log('Current note:', currentNote);
  //console.log('section being passed: ', currentNote.section);

  
  const testProp = "I was passed into Note Editor!!!!!";
  

  return (

    <div className="archive-container">

       {/* 
         Objective: have Maincontent adjust as sidebar grows.  
         We lift the sidebarWidth adjustment variable up to the parent component that interfaces the main content 
         and the sidebar component.
         Then we pass sidebarWidth and its changing-state-var as a prop into both components for manipulation.
         The main content has its width adjusted according to how the user adjusts the sidebar.
      */}

       <SidebarProject
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
       
        onDeleteNote={handleDeleteNote}
        currentNoteId={currentNote?.id}
        hardcodedHashTags={hardcodedHashTags}
        onAddHashTag={handleAddingHashTag}
        addNewNote={addNewNote}
        resetNotes={resetNotes}
        notes={notes}
      />

      {console.log('CurrentNote before its being passed: ', currentNote)}

      <div className="archive-content-projection-container" style={{ 
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.2s ease-out'
      }}>
          <Outlet context={{
            notes: notes,
            testProp: 'I was passed into NoteEditor!!!!!',
            onChange: handleNoteChange,
            onAddHashTag: handleAddingHashTag,
            isSectionNote: currentNote ? currentNote.section.toLowerCase() !== 'unsorted' : false
          }} />
      </div>
    </div>
    );
}


export default ArchivePage;