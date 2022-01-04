import { CSpinner } from '@coreui/react';
import moment from "moment";
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from "../../../context";

const InboxMainChat = ({ chat, auth }) => {
    const { loading, allMessages, activeChatUser } = useContext(GlobalContext);

    useEffect(() => {
        var objDiv = document.getElementById("chatBG");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [])

    let _filterMessages = allMessages && allMessages?.filter(item => {
        if (item.sender === activeChatUser?._id || item.receiver === activeChatUser?._id) {
            return item;
        }
    });

    const messageFocus = (id) => {
        console.log(id);
    }

    return <React.Fragment>
        {loading ? <div style={{ textAlign: 'center' }}><CSpinner /></div>
            :
            _filterMessages && _filterMessages.map((item, index) => {

                if (item.sender !== auth?.user?._id) {
                    return <div onFocusCapture={(e) => messageFocus(item._id)} key={index} className="mx-auto mt-2" style={{ width: "92%" }}>
                        <div className="p-2 rounded" style={{ backgroundColor: "white", width: "fit-content", minWidth: "10rem", maxWidth: "25rem", overflowWrap: "break-word" }}>
                            <p>{item.message}</p>
                            <div className="d-flex flex-row-reverse text-danger">
                                {moment(item.createdAt).calendar()}
                            </div>
                        </div>
                    </div>
                }
                else if (item.sender === auth?.user?._id) {
                    return <div key={index} className="mx-auto mt-2 d-flex flex-row-reverse" style={{ width: "92%" }}>
                        <div className="p-2 rounded" style={{ backgroundColor: "#dcf8c6", width: "fit-content", minWidth: "10rem", maxWidth: "25rem", overflowWrap: "break-word" }}>
                            <p>{item?.message}</p>
                            <div className="d-flex flex-row-reverse text-danger">
                                {/* {moment(item.createdAt).calendar()} */}
                            </div>
                        </div>
                    </div>
                }
            })
        }
    </React.Fragment >
}

export default InboxMainChat;