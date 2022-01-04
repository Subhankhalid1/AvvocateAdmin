import React from 'react';
import "./chat.css";
import InboxFooter from "./InboxFooter";
import InboxMainChat from './InboxMainChat';

const InboxHeader = ({ activeChatUser, chat, auth }) => {
    return <React.Fragment>
        <div style={{ height: "10%", backgroundColor: "#ebebeb", borderBottom: "1px solid #ebebeb" }} className="d-flex p-4">
            <div className="flex-grow-1 d-flex align-items-center">
                <div className="rad rounded-circle d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px", objectFit: "cover" }}>
                    <img className="rounded-circle" style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://thumbs.dreamstime.com/b/worker-man-flat-icon-banker-blue-icons-trendy-style-account-manager-gradient-design-designed-web-app-eps-142383568.jpg" alt="ProfilePic" />
                </div>
                <div style={{ paddingLeft: "2rem" }}>
                    <h6>{activeChatUser && activeChatUser?.name}</h6>
                    {/* <span>Online</span> */}
                </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center flex-row-reverse">
                <div style={{ paddingRight: "2rem" }}>
                    <i className="fa fa-lg fa-ellipsis-v" aria-hidden="true"></i>
                </div>
                <div style={{ paddingRight: "2rem" }}>
                    <i className="fa fa-lg fa-search" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div id="chatBG" className="p-1" style={{ height: "80%" }}>
            <InboxMainChat chat={chat} auth={auth} />
        </div>
        <div style={{ height: "10%" }}>
            <InboxFooter activeChatUser={activeChatUser} />
        </div>
    </React.Fragment>
}

export default InboxHeader;