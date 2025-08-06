import React, { useState, useEffect} from 'react';
import ProjectTextArea from './ProjectTextArea';
import { useRef } from 'react';
import { useOutletContext, useParams} from 'react-router-dom';

const NoteEditor = () => {

  const { noteId } = useParams();
  const { notes, testProp, onChange, onAddHashTag, isSectionNote } = useOutletContext();
   
  
  console.log("NoteEditor passed:",  { notes, testProp, onChange, onAddHashTag });
  
  const theNote = notes.find(note => note.id === noteId);
    // useEffect(() => {
    //   console.log("NoteEditor props updated:", { note, onSave, isSectionNote, onChange, onAddHashTag, saveStatus });
    // }, [note, onSave, isSectionNote, onChange, onAddHashTag, saveStatus]);

  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");
    // const [hashTags, setHashTags] = useState([]);
    // const [saveStatus, setSaveStatus] = useState('saved');
  const prevNoteId = useRef(null);
  // useEffect(() => {
  //   const matches = textBody.match(/#\w+/g) || [];
  //   setHashTags([...new Set(matches)].map(tag => ({ tag })));
  // }, [textBody]);

  //print out the contents of the props in console
  

  
  // whenever 'note' changes from ArchivePage, update local state.
  useEffect(() => {
    if (!theNote) {
      setTextTitle("");
      setTextBody("");
      prevNoteId.current = null;
      return;
    }

    if (theNote.id !== prevNoteId.current) {
      prevNoteId.current = theNote.id;
      setTextTitle(theNote.title || "");
      setTextBody(theNote.content || "");
    } 
  }, [theNote, noteId]);


  const handleTextBodyChange = (htmlText) => {

    setTextBody(htmlText);

 
    if (onChange) {
      onChange({ content: htmlText, id: noteId }); // Send the updated content to the parent component
    }
   
    // Detect and send hashtags to parent
    if (onAddHashTag) {
        const hashtags = htmlText.match(/#\w+/g) || [];
        hashtags.forEach(tag => onAddHashTag(tag));
    }

  };

  const handleTitleChange = (newTitle) => {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newTitle;
    const newTitleText = tempDiv.textContent || tempDiv.innerText || "";

    setTextTitle(newTitleText);
    if(onChange) {
      onChange({ title: newTitle, id: noteId});  // Send to parent
    }
  };

  // // Auto-save functionality
  // useEffect(() => {
  //       const timer = setTimeout(() => {
  //           if (onSave) onSave(textTitle, textBody);
  //       }, 2000);

  //       return () => clearTimeout(timer);
  // }, [textTitle, textBody]);
 
  return (
    <ProjectTextArea
        title={textTitle}
        note={theNote}
        body={textBody}
        setTextTitle={setTextTitle}
        setTextBody={setTextBody}
        onTitleChange={handleTitleChange}
        onTextBodyChange={handleTextBodyChange}
        onAddHashTag={onAddHashTag}
        isSectionNote={isSectionNote}
      />

    
  )
}


export default NoteEditor;