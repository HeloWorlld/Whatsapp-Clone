import React, { useEffect, useState } from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from '@material-ui/icons';

import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import db from '../containers/firebase';
import { useStateValue } from '../containers/StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db
            .collection('rooms')
            .onSnapshot(snapshot => (
                setRooms(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            ))

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar">
            {/* Sidebar Header */}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Search Box */}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            {/* Chats */}
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
