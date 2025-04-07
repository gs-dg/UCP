import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Chatbot = () => {
    const { darkMode, setIsBotOpen } = useContext(ThemeContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const chatDiv = document.getElementById("chat-container");
        if (chatDiv) {
            chatDiv.scrollTop = chatDiv.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'Me', text: input }];
        setMessages(newMessages);
        setInput("");
        try {
            const response = await axios.post(`http://127.0.0.1:5000/chat`, { message: input });

            if (response.data.error) {
                setMessages([...newMessages, { sender: 'AI', text: `Error: ${response.data.error}` }]);
            } else {
                setMessages([...newMessages, { sender: 'AI', text: response.data.response }]);
            }
        } catch (error) {
            setMessages([...newMessages, { sender: 'AI', text: "Error connecting to server!" }]);
        }
    };


    return (
        <div className={`fixed right-0 top-14 h-[calc(100vh-3rem)] w-64 shadow-lg overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col justify-between pb-2 rounded-lg border-2 ${darkMode ? 'border-gray-400' : 'border-gray-300'}`}>
            {/* Header Section */}
            <div className='flex justify-between items-center bg-blue-600 p-2 rounded-t-lg'>
                <h1 className='text-lg font-semibold text-white'>VeriAssist</h1>
                <CloseIcon
                    style={{ color: '#F56565' }}
                    className='cursor-pointer'
                    onClick={() => setIsBotOpen(false)}
                />
            </div>

            {/* Chat Section */}
            <div id="chat-container" className="flex-1 overflow-y-auto p-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
                    >
                        <div
                            className={`max-w-[85%] p-2 my-1 text-sm shadow-md ${msg.sender === 'AI' ? 'bg-gray-200 text-black rounded-t-lg rounded-br-lg' : 'bg-blue-500 text-white rounded-t-lg rounded-bl-lg '}`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Input and Send Button */}
            <div className='w-full flex justify-between items-center gap-2 p-1'>
                <input
                    type='text'
                    placeholder='Type here..'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className={`py-2 pl-3 pr-3 border rounded-md w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button onClick={sendMessage} className='p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors'>
                    <SendIcon style={{ color: 'white' }} />
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
