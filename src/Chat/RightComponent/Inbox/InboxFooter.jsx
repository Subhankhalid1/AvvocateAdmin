import axios from "axios";
import React, { useState, useContext, useEffect } from 'react';
import io from "socket.io-client";
import { GlobalContext } from "../../../context";

const InboxFooter = ({ activeChatUser }) => {
    let socket;
    let ENDPOINT = "http://localhost:5000/";

    const [text, setText] = useState("");
    const { auth, chat, setChat, allMessages, setAllMessages } = useContext(GlobalContext);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join", auth?.user?._id);

        socket.on('message', msg => {
            let newArray = chat;
            newArray.push(msg);
            setChat(newArray);
            setAllMessages([...allMessages, msg]);
            var objDiv = document.getElementById("chatBG");
            objDiv.scrollTop = objDiv.scrollHeight;
        });
    }, [])

    const sendMessage = async ({ keyCode }) => {
        if (keyCode === 13) {
            socket = io(ENDPOINT);
            setText("");
            let msgData = { sender: auth?.user?._id, receiver: activeChatUser && activeChatUser._id,
                 message: text };
            socket.emit('adminMessage', msgData);
        }
        var objDiv = document.getElementById("chatBG");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    return (
        <section className="d-flex" style={{ height: "100%", backgroundColor: '#f0f0f0' }}>

            <div className="d-flex justify-content-center align-items-center" style={{ width: "100px", flexGrow: "7" }}>
                <input value={text} id="input" onKeyDown={(e) => sendMessage(e)} onChange={(e) => {
                    setText(e.target.value);
                }} type="text" className="form-control rounded p-2" placeholder="Type a message" />
            </div>

        </section>
    )
}

export default InboxFooter;