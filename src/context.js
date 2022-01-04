import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const context = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [chat, setChat] = useState([]);
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allMessages, setAllMessages] = useState([]);

    return (
        <GlobalContext.Provider
            value=
            {{
                auth, setAuth, chat, setChat, allMessages, setAllMessages,
                activeChatUser, setActiveChatUser, loading, setLoading
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default context;