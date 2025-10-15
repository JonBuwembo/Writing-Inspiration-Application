
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faComments, faRobot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import OpenAI from "openai";
import './AI.css'

import axios from 'axios';


const AIWritingAssistant = ({ note, testProp, onChange, onAddHashTag, isSectionNote }) => {  

    const [messages, setMessages] = React.useState("");
   

    const suggestions = [
        "What is the best way to start a story?",
        "Can you provide feedback on a specific character description of mine?",
        "This is a fiction piece. How can I improve my writing style?",
        "What is the best way to develop a plot?",
    ];

    const handleSend = () => {
        if(messages.trim()) {
            sendMessageToAI(messages);
            setMessages("");
        }
    }

    const sendMessageToAI = async (userInput) => {
        if (userInput.trim()) {
            const newMessage = [...messages, { user: true, text: userInput }];
            setMessages(newMessage);

            try {
            const response = await axios.post('http://localhost:5000/api/gpt', { messages: userInput });
            const botReply = response.data.reply;
            setMessages([...newMessage, { user: false, text: botReply }]);
            } catch (error) {
            setMessages([...newMessage, { user: false, text: 'Sorry, something went wrong.' }]);
            }

            setMessages('');
        }
    }

    return (
        <div className='wrapper-ai-writing-assistant'>
            <div className="icon-header">
               <FontAwesomeIcon icon={faRobot} />
            </div>

          <h2 className="text-header">Welcome to your AI Writing Assistant</h2>
          <p className="text-body-ai">Here you can interact with the AI to help you with your writing. Ask questions and get suggestions!</p>

          <div className='chat-container'>
            <div className="chat-input-wrapper"> 
                <textarea
                    className="chat-input"
                    value={messages}
                    onChange={(e) => {
                        setMessages(e.target.value);
                        e.target.style.height = 'auto'; 
                        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                    }}
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