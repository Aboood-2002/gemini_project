import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets.js'
import { ChatContext } from '../../Context/ChatContext.jsx';
import { UserData } from "../../Context/UserContext.jsx";
const SideBar = () => {

    const [extanded, setextanded] = useState(false);
    const { logoutHandler } = UserData();

    const { newChat,deleteChat,chats,setSelected} = useContext(ChatContext);


    const deleteChatHandler = (id) => {
      if (confirm("are you sure you want to delete this chat")) {
        deleteChat(id);
      }
    };
  
    const clickEvent = (id) => {
      setSelected(id);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setextanded(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={newChat} className="new_chat">
                    <img src={assets.plus_icon} alt="" />
                    {extanded ? <p>New Chat</p> : null}
                </div>
                {extanded ?
                    <div className="recent">
                    <p className='title'>Recent</p>
                    {chats && chats.length > 0 ? (
                        chats.map((e) => (
                        <div
                            key={e._id}
                            className="renet_entry"
                            onClick={() => clickEvent(e._id)}
                        >
                            <img src={assets.message_icon} alt="" />
                            <p>{e.latestMessage.slice(0, 18)}...</p>
                            <img src={assets.delete_icon} alt="" onClick={() => deleteChatHandler(e._id)}  />
                        </div>
                        ))
                    ) : (
                        <p>No chats yet</p>
                    )}
                    
                    </div>
                    : null
                }

            </div>
            <div className="bottom">
                <div className="bottom_item renet_entry">
                    <img src={assets.question_icon} alt="" />
                    {extanded ? <p>Help</p> : null}
                </div>
                <div className="bottom_item renet_entry">
                    <img src={assets.history_icon} alt="" />
                    {extanded ? <p>Activity</p> : null}

                </div>
                <div className="bottom_item renet_entry">
                    <img src={assets.setting_icon} alt="" />
                    {extanded ? <p>Settings</p> : null}

                </div>
                <div className="bottom_item renet_entry" onClick={logoutHandler} >
                    <img src={assets.logout_icon} alt="" />
                    {extanded ? <p>LogOut</p> : null}

                </div>

            </div>
        </div>
    )
}

export default SideBar









/*
{chats.map((index) => {
    return (
        <div key={index._id} onClick={() => loadPrompt(index._id)} className="renet_entry">
            <img src={assets.message_icon} alt="" />
            <p>{index.slice(0, 18)}...</p>
        </div>
    )
})}
*/