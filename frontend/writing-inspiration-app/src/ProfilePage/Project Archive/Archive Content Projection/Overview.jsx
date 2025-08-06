import React, { useEffect, useState } from "react";
import "./NoteEditor/ProjectSections.css";
import { useParams } from "react-router-dom";   
import ProjectTextArea from "./NoteEditor/ProjectTextArea";
import NoteEditor from "./NoteEditor/NoteEditor";
const Overview = (note, testProp, onChange, onAddHashTag) => {
  // const { projectID } = useParams(); // Get the project ID from the URL parameters

  return (
    <div>
      {/* <ProjectTextArea
      title={textTitle}
      textBody={textBody}
      onTitleChange={handleTitleChange}
      onTextBodyChange={handleTextBodyChange}
      
      />   */}

      <NoteEditor
                         note={note}
                         testProp={testProp}
                         onChange={onChange}
                         onAddHashTag={onAddHashTag}/>
    </div>
  );
}

export default Overview;