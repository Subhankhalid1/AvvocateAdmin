import React from 'react';
import "./Left.css";

const Srearch = () => {
    return (
        <div id="search-left" className="p-2 d-flex justify-content-center align-items-center">
            <input id="input" type="text" className="form-control rounded p-2" placeholder="Search or start new chat" />
        </div>
    )
}

export default Srearch;
