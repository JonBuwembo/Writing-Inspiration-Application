import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function NoteListItem({ note, isActive }) {

    const navigate = useNavigate();
    const {projectName} = useParams();

     const hardcodedHashTags = [
        {tag: "#section"}, 
        {tag: "#orphannotes"},
        {tag: "#plot-threads"},
        {tag: "#characters"},
    ]

    const sectionCategory = note.hashTags?.find(tag =>tag.tag.startsWith( //all hardcodes sections
        hardcodedHashTags.map(hardcodedTag => hardcodedTag.tag)
    ));

    return (

    <div 
      onClick={() => navigate(`/project/${projectName}/${sectionCategory || 'unsorted'}/note/${note.id}`)}
    >
      <span className="note-title">
        {note.title || 'Untitled Note'}
      </span>
      
    </div>

    );
}

export default NoteListItem;