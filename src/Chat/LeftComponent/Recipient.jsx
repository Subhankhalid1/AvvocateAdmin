import React, { useEffect, useState, useContext } from 'react';
import "./Left.css";
import { GlobalContext } from "../../context";
import axios from 'axios';
import moment from 'moment';

const Recipient = () => {
    const [users, setUsers] = useState([]);
    const { auth, setChat, setActiveChatUser, setLoading, allMessages, setAllMessages } = useContext(GlobalContext);
     let url="https://avvocateheroku.herokuapp.com/"
    //let url="http://localhost:5000/"
  //  let url='https://www.myavvocatoappadmin.com/'
    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = () => {
        fetch(`https://www.myavvocatoappadmin.com/api/getUsers`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    setUsers(data);
                }
            })
    }

    const startChat = async (item) => {
        setActiveChatUser(item);
        // setLoading(true);
        // let getMessages = { userId: item?._id }
        // const { data } = await axios.post("http://localhost:5000/api/messages", getMessages);
        // if (data) {
        //     setLoading(false);
        //     setChat(data);
        // }
    }

    useEffect(() => {
        getAllMessages();
    }, [])

    const getAllMessages = async () => {
        const _messages = await axios.get(`${url}api/messages/all`);
        if (_messages) {
            setAllMessages(_messages.data);
        }
    }

    const getRecentMessage = (user) => {
        let _Recent = allMessages && allMessages?.filter(item => {
            if (item.sender === user._id || item.receiver === user._id) {
                return item;
            }
        });
        if (_Recent[_Recent.length - 1] !== undefined) {
            let _date = moment(_Recent[_Recent.length - 1]?.createdAt).startOf('hour').fromNow();
            let obj = {
                message: _Recent[_Recent.length - 1]?.message,
                date:_date
            };
            return obj;
        }
    }

    return (
        <div>
            {
                users && users.map((item, index) => {
                    if (item._id !== auth?.user?._id) {
                        return <div onClick={(e) => startChat(item)} key={index} id="friendDiv" className="d-flex justify-content-between align-items-center p-2">
                            <div className="rad rounded-circle d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px", objectFit: "cover" }}>
                                <img className="rounded-circle" style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://thumbs.dreamstime.com/b/worker-man-flat-icon-banker-blue-icons-trendy-style-account-manager-gradient-design-designed-web-app-eps-142383568.jpg" alt="ProfilePic" />
                            </div>
                            <div className="d-flex flex-column">
                                <h6>{item.name.length > 15 ? item?.name?.substring(0, 14) + "..." : item.name}</h6>
                                <span>{getRecentMessage(item)?.message}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                {getRecentMessage(item)?.date}
                            </div>
                        </div>
                    }
                })
            }
        </div>
    )
}


export default Recipient;