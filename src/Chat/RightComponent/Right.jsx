import React, { useContext } from 'react';
import Default from './Default/Default';
import Inbox from './Inbox/InboxHeader';
import { GlobalContext } from "../../context";

const Right = () => {
    const { chat, activeChatUser, auth } = useContext(GlobalContext);
    return (
        <div style={{ height: "100vh", backgroundColor: "white" }}>
            {activeChatUser ? <Inbox auth={auth} chat={chat} activeChatUser={activeChatUser} /> : <Default />}
        </div>
    )
}

export default Right;