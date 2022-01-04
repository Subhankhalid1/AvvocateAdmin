import React, { useContext } from 'react';
import Srearch from './Srearch';
import Recipient from './Recipient';
import "./Left.css";
import { GlobalContext } from "../../context";

const Left = () => {
    const { auth } = useContext(GlobalContext);
    return (
        <div id="left-all" className="bg-white" style={{ height: "100vh" }}>
            <div style={{ height: "10%" }} id="header-left" className="d-flex justify-content-between align-items-center p-2">
                <div className="rad rounded-circle d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px", objectFit: "cover" }}>
                    <img className="rounded-circle" style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://www.whatsappimages.in/wp-content/uploads/2021/02/Group-Admin-Profile-Images-photo-hd.gif" alt="ProfilePic" />
                </div>
                <span style={{ fontWeight: 'bold', textTransform: 'capitalize', margin:'auto' }}>ADMIN
                {/* {`${auth?.user?.name}${" "}${auth?.user?.surname}`} */}
                </span>
                <div className="d-flex justify-content-around align-items-center w-50">
                    <i className="fa fa-lg fa-circle-o-notch" aria-hidden="true" title="Status"></i>
                    <i className="fa fa-lg fa-address-card" aria-hidden="true" title="New Chat"></i>
                    <i className="fa fa-lg fa-ellipsis-v" aria-hidden="true" color="darkGray"></i>
                </div>
            </div>
            <div style={{ height: "10%" }}>
                <Srearch />
            </div>
            <div id="recip-container" style={{ height: "80%" }}>
                <Recipient />
            </div>
        </div>
    )
}



export default Left;