import React from 'react';
import Left from './LeftComponent/Left';
import Right from './RightComponent/Right';
import AppHeader from '../components/AppHeader'
const Chat = () => {
    return <React.Fragment>
        <AppHeader/>
        <div>
            <div className="d-flex justify-content-between">
                <div className="flex-grow-1" style={{ width: "10%" }}>
                    <Left />
                </div>
                <div className="w-50 flex-grow-1">
                    <Right />
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Chat;