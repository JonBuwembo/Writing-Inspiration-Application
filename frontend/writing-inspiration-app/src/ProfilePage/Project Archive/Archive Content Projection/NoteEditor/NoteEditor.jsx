import React, { useState, useEffect } from 'react';
import ProjectTextArea from './ProjectTextArea';
import SidebarProject from '../../SidebarProject';

const NoteEditor = ({onSave, isSectionNote, handleAddingHashTag}) => {
    const [textTitle, setTextTitle] = useState("");
    const [textBody, setTextBody] = useState("");
    const [hashTags, setHashTags] = useState([]);
    const [saveStatus, setSaveStatus] = useState('saved');

  useEffect(() => {
    const matches = textBody.match(/#\w+/g) || [];
    setHashTags([...new Set(matches)].map(tag => ({ tag })));
  }, [textBody]);

  const handleTextBodyChange = (htmlText) => {
    // Extract/detect hashtags from the text
    const hashtags = htmlText.match(/#\w+/g) || [];

    hashtags.forEach(tag => {
      handleAddingHashTag(tag);
    });

    setTextBody(htmlText);
    setSaveStatus('unsaved');
  };

  const handleTitleChange = (newTitle) => {
    setTextTitle(newTitle);
    setSaveStatus('unsaved');
  };

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'unsaved') {
        setSaveStatus('saving');
        onSave(textTitle, textBody);
        setSaveStatus('saved');
      }
    }, 2000); // Save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [textTitle, textBody, saveStatus, onSave]);

  return (
    <ProjectTextArea
        title={textTitle}
        textBody={textBody}
        onTitleChange={handleTitleChange}
        onTextBodyChange={handleTextBodyChange}
        isSectionNote={isSectionNote}
      />

    
  )
}


export default NoteEditor;