import React, {useRef, useEffect, useState} from "react";
import './ProjectSections.css';

const ProjectTextArea = ({ isSectionNote, onTitleChange, onTextBodyChange }) => {

    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    //dummy testing
    //window.getSelection() API to check if text is selected.
    //getRangeAt(0).getBoundingClientRect() to position the toolbar menu near the text
    const [toolbar, setToolbar] = useState({ visible: false, x: 0, y: 0});

    const handleSelection = () => {
        // To detect selected text.
        const selection = window.getSelection();

        // if not text is selected, toolbox shouldnt show.
        if(!selection || selection.isCollapsed) {
            setToolbar(null);
        }

        if (selection && !selection.isCollapsed) {

            // range -> area of document user has selected
            const range = selection.getRangeAt(0);
            // tells you where an element appears on the screen as well as its size relative to the viewport.
            const location = range.getBoundingClientRect();

            setToolbar({
                visible: true,
                x: location.left + window.scrollX,
                y: location.top + window.scrollY - 40,
            });
        } else {
            setToolbar({ visible: false, x: 0, y: 0 })
        }
    };

    // For stopping unwanted formatting pasted into editor
    const handlePaste = (event) => {

        //stops browser's default paste behavior.
        event.preventDefault();
        //Ensures you only insert raw text.
        const pastedText = event.clipboardData.getData("text/plain");
        //Depracated: works across most browsers.
        document.execCommand("insertText", false, pastedText);
    }

    const setParagraphSpacing = () => {
        const editor = document.getElementById('editor');
        editor.classList.add('custom-paragraph-spacing')
    }

    // for creating bullet points by adding a space:
    const handleKeyDown = (e) => {
        if (e.key === " ") {
            const selection = window.getSelection();
            if (!selection?.rangeCount) return;

            const range = selection.getRangeAt(0);
            const container = range.startContainer;

            // Only process text nodes
            if (container.nodeType !== Node.TEXT_NODE) return;

            const nodeText = container.textContent;
            const offset = range.startOffset;

            // Get text from line start to cursor
            const textBeforeCursor = nodeText.slice(0, offset);
            
            // Check if line starts with * followed by whitespace
            if (/^\*\s$/.test(textBeforeCursor)) {
                e.preventDefault();
                
                // Modern alternative to execCommand
                const listItem = document.createElement('li');
                listItem.textContent = ''; // Empty content
                
                const list = document.createElement('ul');
                list.appendChild(listItem);
                
                // Delete the * and space
                range.setStart(container, offset - 2);
                range.deleteContents();
                
                // Insert the list
                range.insertNode(list);
                
                // Move cursor inside the new list item
                const newRange = document.createRange();
                newRange.setStart(listItem, 0);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        }
    };

    //only visible when we clearly double click or select a range of text.
    const applyFormat = (command) => {
        document.execCommand(command);
        setToolbar({...toolbar, visible: false })
    }

    // Event listeners for tracking when the mouse is held up after being held down for selection.
    useEffect(() =>{
        const editor = bodyRef.current;

        if (editor) {
            editor.addEventListener("mouseup", handleSelection); // specific for mouses.
            editor.addEventListener("keyup", handleSelection); //specific for keyboard and pad.
        }

        return () => {
            editor.removeEventListener("mouseup", handleSelection); // to clean event listener
            editor.removeEventListener("keyup", handleSelection); // to clearn event listener.
        };
    }, []);

    // Set initial content once
    useEffect(() => {
        if (titleRef.current && !titleRef.current.textContent.trim()) {
            titleRef.current.innerHTML = "";
        }
        if (bodyRef.current && !bodyRef.current.textContent.trim()) {
            bodyRef.current.innerHTML = "";
        } 
    }, []);

    //innerHTML -> Helps return formatted rich text, such as returning text as bold or italic.
    const handleTitleInput = () => {
        const content = titleRef.current.innerHTML;
        // if there is no title.
        if (!titleRef.current.textContent.trim()) {
            // HTML string read from inner HTML is empty.
            titleRef.current.innerHTML = "";
        } 
        // WHEN TITLE changes: content passed up to the parent class where "content" -> handleTextBodyChange(content) which updates current title through useState obj.
        if (onTitleChange) onTitleChange(content);
    };

    // 
    const handleTextBodyInput = () => {
        const content = bodyRef.current.innerHTML;
        if (!bodyRef.current.textContent.trim()) {
            bodyRef.current.innerHTML = "";
        }
        // WHEN TEXT body changes: content (state of text) is lifted up to parent component (just like onTitleChange above.)
        if (onTextBodyChange) onTextBodyChange(content);
    };

    const replaceFontTags = () => {
        // find all tags that have the size attribute in the current document.
        // querySelectAll: grabs multiple elements like an array.
        const fonts = document.querySelectorAll("font[size]");

        // loops through each font tag
        // ForEach: Cleaner than for loop since we only visit each item

        fonts.forEach(font => {
            // creates a new span element. createELement builds new HTML nodes dynamically.
            const span = document.createElement("span");
            // for adding classes like 'font-size-3', depending on size set.
            span.className = `font-size-${font.getAttribute("size")}`;
            // keeps content inside: (bold, italic, etc...). it also copies inner tags like <b> for bold and <i> for italic.
            span.innerHTML = font.innerHTML;
            // old font tag replaced with new span element. cleaner than removing/inserting.
            font.replaceWith(span);
        })
    }


    return (
        <div>
            <div className="project-text-box"> 
                <div 
                    ref={titleRef}
                    className="title-text-area"
                    contentEditable // not an editable part of react so we have to treat all input functions manually.
                    suppressContentEditableWarning
                    onPaste={handlePaste}
                    onInput={handleTitleInput}
                    data-placeholder="+ Start Typing your Title..."
                />
                

                <div 
                    ref={bodyRef}
                    className="text-body"
                    onDoubleClick={handleSelection}
                    onKeyDown={handleKeyDown}
                    contentEditable
                    suppressContentEditableWarning
                    onPaste={handlePaste}
                    onInput={handleTextBodyInput}

                    data-placeholder={ 

                        isSectionNote ?
                        "📝 Start writing this section..." :
                        "✨ Quick Capture\nJot down raw ideas, snippets, or brainstorms here.\nPress `#` to organize or drag to a section later."
                        
                    }
                 />
            </div>

            {toolbar.visible && (

                // We use exec command API to get certain elements in the toolbar.
                <div
                    className="toolbar"
                    style={{ top: `${toolbar.y}px`, left: `${toolbar.x}px` }}
                >
                    <button onClick={() => applyFormat("bold")}><b>B</b></button>
                    <button onClick={() => applyFormat("italic")}><i>I</i></button>
                    <button
                        onClick={() => {
                        const url = prompt("Enter link URL:");
                        if (url) document.execCommand("createLink", false, url);
                        setToolbar({ ...toolbar, visible: false });
                        }}
                    >
                         🔗 {/* Symbol for hyperlink on toolbar */}
                    </button>
                    <button onClick={() => document.execCommand("insertUnorderedList")}>
                        • Bullet List {/* Symbol for bullet list on toolbar */}
                    </button>
                    <select
                        onChange={(e) => {
                            document.execCommand("fontSize", false, e.target.value);
                            setToolbar({...toolbar, visible: false});

                            replaceFontTags();
                        }}
                        defaultValue=""


                    >
                        {/* options of font sizes */}
                        <option value="" disabled>Font Size</option>
                        <option value="1">Very Small</option>
                        <option value="2">Small</option>
                        <option value="3">Normal</option>
                        <option value="4">Large</option>
                        <option value="5">Very Large</option>
                        <option value="6">Huge</option>
                        <option value="7">Very Huge</option>
                        <option value="8">Max</option>

                    </select>

                    <button onClick={setParagraphSpacing}>
                        
                    </button>


                </div>
            )}
        </div>
        
    );
   
};

export default ProjectTextArea;