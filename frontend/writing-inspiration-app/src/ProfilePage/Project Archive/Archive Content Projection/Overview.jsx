import React, { useEffect, useState } from "react";
import "./ProjectSections.css";
import { useParams } from "react-router-dom";   
import ProjectTextArea from "./ProjectTextArea";

const Overview = () => {
  const { projectID } = useParams(); // Get the project ID from the URL parameters

  const [textTitle, setTextTitle] = useState("");
  const [textBody, setTextBody] = useState("");

  const [hashTags, setHashTags] = useState([
    { tag: "#resolution"},
    { tag: "#plot" }
  ]);


  const handleTextBodyChange = (htmlText) => {
    setTextBody(htmlText);

    const matches = text.match(/#\w+/g) || []; // Extract all #words
    setHashTags([...new Set(matches)].map(tag => ({ tag }))); // Deduplicate
  };

  const handleAddingHashTag = (hashTagWord) => {
      // Add to a list of hashtags
      setHashTags(prev =>
        prev.some(tagObj => tagObj.tag === hashTagWord)
          ? prev
          : [...prev, { tag: hashTagWord }]
      );
      // only add if there is no other hashtag word the same as this one in the list.
  }

  function handleTitleChange(textTitle) {
    setTextTitle(textTitle);
  }

  return (
    <div>
      <ProjectTextArea
      title={textTitle}
      textBody={textBody}
      onTitleChange={handleTitleChange}
      onTextBodyChange={handleTextBodyChange}
      
      />  
    </div>
  );
}

export default Overview;