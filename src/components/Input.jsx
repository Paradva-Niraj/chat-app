import { useState, useEffect } from 'react';
import '../Style/Input.css';
import socket from '../socket'



function Input() {

    const [message, setMessage] = useState('');
    const [msgList, setMsgList] = useState([]);

    // useEffect(() => {
    //     console.log("connecting");
    //     socket.connect();
    //     const onConnect = () => {
    //         console.log("connected");
    //         console.log("Connected to server with ID:", socket.id);
    //     };

    //     const onChatMessage = (data) => {
    //         setMsgList((prev) => [...prev, data]);
    //     };

    //     socket.on("connect", onConnect);
    //     socket.on("chat_message", onChatMessage);

    //     return () => {
    //         socket.off("connect", onConnect);
    //         socket.off("chat_message", onChatMessage);
    //     };
    // }, []);

    // const sendMsg = () => {
    //     if (message.trim() === '') return;
    //     socket.emit("chat_message", { text: message });
    //     setMessage('');
    // }


    

    // return (
    //     <div className="sidepannel">
    //         <div className="chats">
    //             {
    //                 msgList.map((msg,i)=>(
    //                     <div key={i} className={msg.from===socket.id ?  "send-message message" : "recive-message message"}>
    //                         {msg.text}
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //         <div className="input-box">
    //             <input type="text" name="Messmage" value={message} onChange={(e) => { setMessage(e.target.value) }} className="input" id="" placeholder='Message' />
    //             <button className="send" onClick={sendMsg}>
    //                 <img src="send-light.png" className="send-image" alt="" />
    //             </button>
    //         </div>
    //     </div>
    // );


    const sendMsg = () => {
        
    }

        return (
        <div className="sidepannel">
            <div className="chats">
               
            </div>
            <div className="input-box">
                <input type="text" name="Messmage" value={message} onChange={(e) => { setMessage(e.target.value) }} className="input" id="" placeholder='Message' />
                <button className="send">
                    <img src="send-light.png" className="send-image" alt="" />
                </button>
            </div>
        </div>
    );
}
export default Input;