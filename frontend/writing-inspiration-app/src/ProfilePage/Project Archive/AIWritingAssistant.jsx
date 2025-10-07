
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './AI.css'


const AIWritingAssistant = ({ note, testProp, onChange, onAddHashTag, isSectionNote }) => {  

    const [message, setMessage] = React.useState("");

    const suggestions = [
        "What is the best way to start a story?",
        "Can you provide feedback on a specific character description of mine?",
        "This is a fiction piece. How can I improve my writing style?",
        "What is the best way to develop a plot?",
    ];

    const handleSend = () => {
        if(message.trim()) {
            sendMessageToAI(message);
            setMessage("");
        }
    }
    const sendMessageToAI = async (userMessage) => {
        console.log("Sending message to AI:", userMessage);
    }

    return (
        <div className='wrapper-ai-writing-assistant'>
            <div className="icon-header">
               <FontAwesomeIcon icon={faPaperPlane} />
            </div>

          <h2 className="text-header">Welcome to your AI Writing Assistant</h2>
          <p className="text-body">Here you can interact with the AI to help you with your writing. Ask questions and get suggestions!</p>

          <div className='chat-container'>
            <div className="chat-input-wrapper"> 
                <textarea
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How should I improve my storyline so far..."
                />
                <button className="send-btn" onClick={handleSend}>
                   <FontAwesomeIcon icon={faPaperPlane} size={18} />
                </button>
            </div>

            <div className="suggestions">
                {suggestions.map((a_suggestion, index) => (
                <button key={index} className="suggestion-btn">
                    {a_suggestion}
                </button>
                ))}
            </div>

          </div>
        </div>
    );
}

export default AIWritingAssistant;