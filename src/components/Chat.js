import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';

import "./Chat.css";
import db from '../containers/firebase';
import { useStateValue } from '../containers/StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const { roomId } = useParams("");

    const [{ user }, dispatch] = useStateValue();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));
            db
                .collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(shot => (
                    setMessages(shot.docs.map(doc => doc.data()))
                ));
        }


        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);



    const sendMessage = event => {
        event.preventDefault();

        db
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        console.log();

        setInput("");
    };

    return (
        <div className="chat">
            {/* Chat Header */}
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {" "}
                        {
                            ` at ${new Date(messages[messages.length - 1]?.timestamp?.toDate()).getHours()}:${new Date(messages[messages.length - 1]?.timestamp?.toDate()).getMinutes()}`
                        }
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timeStamp">
                            {`${new Date(message.timestamp?.toDate()).getHours()}:${new Date(message.timestamp?.toDate()).getMinutes()}`}
                        </span>
                    </p>
                ))}
            </div>

            {/* Chat Footer */}
            <div className="chat__footer">
                <InsertEmoticonIcon />

                <form>
                    <input value={input} onChange={(event) => setInput(event.target.value)} type="text" placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}><SendIcon /></button>

                </form>

                <MicIcon />
                {/* <SendIcon /> */}

            </div>
        </div>
    )
}

export default Chat
