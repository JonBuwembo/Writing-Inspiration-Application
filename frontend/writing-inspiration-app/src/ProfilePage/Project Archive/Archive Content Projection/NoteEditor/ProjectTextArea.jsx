import React, {useRef, useEffect, useState} from "react";
import './ProjectSections.css';

const ProjectTextArea = ({note, title, body, setTextTitle, setTextBody, isSectionNote, onAddHashTag, onTitleChange, onTextBodyChange}) => {

    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const prevTitleRef = useRef("");
    const prevBodyRef = useRef("");

    const prevNoteIdRef = useRef("");
    const [lastSyncedTitle, setLastSyncedTitle] = useState("");
    const [lastSyncedTextBody, setLastSyncedTextBody] = useState("");

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
        // if (e.key === " ") {
        //     const selection = window.getSelection();
        //     if (!selection?.rangeCount) return;

        //     const range = selection.getRangeAt(0);
        //     const container = range.startContainer;

        //     // Only process text nodes
        //     if (container.nodeType !== Node.TEXT_NODE) return;

        //     const nodeText = container.textContent;
        //     const offset = range.startOffset;

        //     // Get text from line start to cursor
        //     const textBeforeCursor = nodeText.slice(0, offset);
            
        //     // Check if line starts with * followed by whitespace
        //     if (/^\*\s$/.test(textBeforeCursor)) {
        //         e.preventDefault();
                
        //         // Modern alternative to execCommand
        //         const listItem = document.createElement('li');
        //         listItem.textContent = ''; // Empty content
                
        //         const list = document.createElement('ul');
        //         list.appendChild(listItem);
                
        //         // Delete the * and space
        //         range.setStart(container, offset - 2);
        //         range.deleteContents();
                
        //         // Insert the list
        //         range.insertNode(list);
                
        //         // Move cursor inside the new list item
        //         const newRange = document.createRange();
        //         newRange.setStart(listItem, 0);
        //         selection.removeAllRanges();
        //         selection.addRange(newRange);
        //     }
        // }

        // 1. Handle Enter key for new paragraphs
        if (e.key === 'Enter') {
            // Prevent default to avoid double newlines in some browsers
            e.preventDefault();
            document.createTextNode(e.key === ' ' ? ' ' : '\n');
            // Modern alternative to execCommand
            document.execCommand('insertParagraph', false);
            
            // If you want bullet points on Enter:
            if (e.shiftKey) {
            document.execCommand('insertUnorderedList', false);
            }
        }

        // 2. Handle Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('indent');
        }

        // 3. Handle Shift+Tab for outdenting
        if (e.key === ('Tab' && e.shiftKey)) {
            e.preventDefault();
            document.execCommand('outdent');
        }

        // if there is a hashtag, bold the text and color it blue.
        if (e.key === '#') {
            e.preventDefault();
            
            const selection = window.getSelection();
            
            // Check if there's a valid selection
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                
                // Create styled hashtag element
                const hashtagSpan = document.createElement('span');
                hashtagSpan.style.color = '#1da1f2';
                hashtagSpan.style.fontWeight = 'bold';
                hashtagSpan.className = 'hashtag-symbol';
                hashtagSpan.textContent = '#';
                
                try {
                    // Delete any existing selection first
                    if (!selection.isCollapsed) {
                        range.deleteContents();
                    }
                    
                    // Insert the styled hashtag
                    range.insertNode(hashtagSpan);
                    
                    // Move cursor after the hashtag
                    const newRange = document.createRange();
                    newRange.setStartAfter(hashtagSpan);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);

                    // Set up space/enter listener AFTER insertion is complete
                    const handleSpaceOrEnter = (e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            // Remove this listener
                            document.removeEventListener('keydown', handleSpaceOrEnter);
                            
                            // Create new text node with default styling
                            const textNode = document.createTextNode(e.key === ' ' ? ' ' : '\n');
                            
                            // Insert after the hashtag span
                            if (hashtagSpan.parentNode) {
                                hashtagSpan.parentNode.insertBefore(textNode, hashtagSpan.nextSibling);
                                
                                // Move cursor after the space/newline
                                const newRange = document.createRange();
                                newRange.setStartAfter(textNode);
                                newRange.collapse(true);
                                selection.removeAllRanges();
                                selection.addRange(newRange);
                            }
                            
                            e.preventDefault();
                        }
                    };
                    
                    // Add listener with proper placement (outside the try block)
                    document.addEventListener('keydown', handleSpaceOrEnter, { once: true });
                    
                } catch (error) {
                    console.error('Error inserting hashtag:', error);
                }
            }
        }


        // 3. Basic rich text shortcuts (Cmd/Ctrl+B for bold, etc)
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
            case 'b':
                e.preventDefault();
                document.execCommand('bold');
                break;
            case 'i':
                e.preventDefault();
                document.execCommand('italic');
                break;
            case 'u':
                e.preventDefault();
                document.execCommand('underline');
                break;
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

    // useEffect: Set innerHTML content once when the note updates. Cursor won't be wiped out.
    // Only updates innerHTML data when the note changes.
    // Uses note id to track the change.
    

    useEffect(() => {
        const isNewNote = note?.id !== prevNoteIdRef.current;

        if (isNewNote) {
            const currentTitle = titleRef.current?.innerHTML || "";
            const currentBody = bodyRef.current?.innerHTML || "";

            if (currentTitle !== (note?.title || "")) {
                titleRef.current.innerHTML = note?.title || "";
                setTextTitle(note?.title);
            }

            if (currentBody !== (note?.content || "")) {
                bodyRef.current.innerHTML = note?.content || "";
                setTextBody(note?.body);
            }

            prevNoteIdRef.current = note?.id;
        }
    }, [note]);

    //innerHTML -> Helps return formatted rich text, such as returning text as bold or italic.
    const handleTitleInput = (e) => {
        
        // replace any HTML tags that may show in the editor when typing
        let content = titleRef.current.innerHTML.replace(/<[^>]*>/g, ' ');
        // replace any HTML entities that may show in the editor.
        content = content.replace(/&[^;\s]+;/g,'')
        // if there is no title.
        if (!titleRef.current.textContent.trim()) {
            // HTML string read from inner HTML is empty.
            titleRef.current.innerHTML = "";
        } 
        
        // WHEN TITLE changes: content passed up to the parent class where "content" -> handleTextBodyChange(content) which updates current title through useState obj.
        if (onTitleChange) onTitleChange(content);

        if (!content.trim()){
            titleRef.current.innerHTML = "";
            titleRef.current.setAttribute('data-placeholder', '+ Start Typing your Title ...')
        }
    };

    // 
    const handleTextBodyInput = (e) => {
        const content = bodyRef.current.innerHTML;
        if (!bodyRef.current.textContent.trim()) {
            bodyRef.current.innerHTML = "";
        }
        //setTextBody(content);
        // WHEN TEXT body changes: content (state of text) is lifted up to parent component (just like onTitleChange above.)
        if (onTextBodyChange) onTextBodyChange(content);

        if (e.inputType === 'insertText' && (e.data === " " || e.data === null)) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;

            const range = selection.getRangeAt(0);
            const node = range.startContainer;
            const cursorPosition = range.startOffset;

            const textBeforeCursor = node.textContent?.substring(0, cursorPosition) || "";


            const wordsBeforeSpaceOrEnter = textBeforeCursor.split(/\s+/);
            const lastWord = words[wordsBeforeSpaceOrEnter.length - 1]; // Get the last word before the space or enter key

            if (lastWord.startsWith('#') && lastWord.length > 1) {
                if (onAddHashTag) {
                    onAddHashTag(lastWord); // Pass the hashtag
                }
            }

        } else if (e.inputType === 'insertFromPaste' || e.inputType === 'insertReplacementText') {
            const hashtagRegex = /(?:^|\s)(#\w+)(?=\s|$)/g; //this regex can detect hashtags anywhere in text.
            const detectedHashtags = [];
            let match;

            while ((match = hashtagRegex.exec(content)) !== null) {
                //detect hashtag after spacing or enter key
                // match will already contain  the hashtag with a leading space to consider spacing.
                detectedHashtags.push(match[1]);
            }

            // Process detected hashtags
            detectedHashtags.forEach(hashtag => {
                if (onAddHashTag) {
                    onAddHashTag(hashtag);
                }
            });
        }
        
        if (!content.trim()) {
            bodyRef.current.innerHTML = "";
            bodyRef.current.setAttribute(
                'data-placeholder', 
                isSectionNote 
                    ? '📝 Start writing this section...' 
                    : '✨ Quick Capture\nJot down raw ideas, snippets, or brainstorms here.\nPress `#` to organize or drag to a section later.'
            );
        }       
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