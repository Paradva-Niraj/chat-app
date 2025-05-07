import { useState, useEffect, useRef } from 'react';
import '../Style/Input.css';
import socket from '../socket';

function Input({ selectFrd }) {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const chatBoxRef = useRef();
    console.log(selectFrd);
    

    function parseJwt(token) {
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error parsing JWT:", e);
            return null;
        }
    }

    const token = localStorage.getItem("token");
    const user = parseJwt(token);

    // Register user with socket
    useEffect(() => {
        if (user && user.id) {
            // console.log("Registering user with socket:", user.id);
            socket.emit("register", user.id);
        }
    }, [user]);

    // Listen for private messages
    useEffect(() => {
        console.log("Setting up private message listener");
        socket.on('private_message', (data) => {
            console.log('Received private message:', data);
            setChat(prev => [...prev, data]);
        });
        
        return () => {
            console.log("Cleaning up private message listener");
            socket.off("private_message");
        };
    }, []);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);

    const sendMsg = () => {
        try {
            // console.log("Send message called. Selected friend:", selectFrd);

            if (!selectFrd || !selectFrd._id) {
                console.warn("No friend selected or missing _id property");
                return;
            }

            if (message.trim().length === 0) {
                console.warn("Empty message");
                return;
            }

            // console.log(`Sending message from ${user?.id} to ${selectFrd._id}: ${message}`);
            
            const msgData = {
                from: user.id,
                to: selectFrd._id,
                text: message
            };
            
            socket.emit('private_message', msgData);
            console.log("Message emitted:", msgData);
            
            setChat(prev => [...prev, msgData]);
            setMessage('');
        }
        catch (err) {
            console.error("Error sending message:", err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMsg();
        }
    };

    return (
        <div className="sidepannel">
            <div className="chats" ref={chatBoxRef}>
                {selectFrd && 
                    <div className='chatName'>
                        {selectFrd.name || selectFrd.phone}
                    </div>
                }
                <div className='chat'>
                    {/* <div className='chats'> */}
                    {chat
                        .filter(msg => 
                            (msg.from === selectFrd?._id && msg.to === user?.id) || 
                            (msg.to === selectFrd?._id && msg.from === user?.id)
                        )
                        .map((msg, i) => (
                            <div key={i} className={msg.from === user?.id ? "send-message message" : "recive-message message"}>
                                {msg.text}
                            </div>
                        ))}
                        {/* </div> */}
                </div>
            </div>
            <div className="input-box">
                <input 
                    type="text" 
                    name="Message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    className="input" 
                    placeholder='Message' 
                    disabled={!selectFrd}
                />
                <button 
                    className="send" 
                    onClick={sendMsg}
                    disabled={!selectFrd || message.trim().length === 0}
                >
                    <img src="send-light.png" className="send-image" alt="Send" />
                </button>
            </div>
        </div>
    );
}

export default Input;