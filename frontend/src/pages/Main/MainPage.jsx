import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addChannels, upsertChannel,removeChannel } from "../../slices/channelsSlice";
import { selectors as selectorsChannels, addChannel } from "../../slices/channelsSlice";
import { selectors as selectorsMessages, addMessages } from "../../slices/messagesSlice";
import Navigation from "../../componenets/Navigation/Navigator";
import Channels from '../../componenets/Channels/Channels';
import MessagesCard from "../../componenets/MessagesCard/MessagesCard";
import store from "../../slices/store";
import { selectToken, selectUsername } from '../../slices/autxSlice';
import { setUsersData } from "../../slices/autxSlice";
import routes from "../../routes";
import socket from "../../socket";

function MainPage() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [activeChannel, setActiveChannel] = useState("1");
    const [isHost, setIsHost] = useState(false)
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        if (!userId) {
            navigator('/login');
        } else {
            const { token } = userId;
            axios.get(routes.channels.allChannels(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                dispatch(addChannels(response.data));
            });

            axios.get(routes.messages.allMessages(), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                dispatch(addMessages(response.data));
            });
        }

    }, [])
    const addChannelFormSocket = (payload) => {
        const { id } = payload
        dispatch(addChannel(payload))
        if (isHost) {
            setActiveChannel(id)
            setIsHost(false)
        }
    }

    useEffect(() => {
        socket.on('newChannel', addChannelFormSocket);
        return () => socket.off('newChannel', addChannelFormSocket)
    })


    const renameChannelFromSocket = (payload) => {
        const { id } = payload;
        dispatch(upsertChannel(payload))
        if (isHost) {
            setActiveChannel(id)
            setIsHost(false)
        }
    }

    useEffect(() => {
        socket.on('renameChannel', renameChannelFromSocket);
        return () => socket.off('renameChannel', renameChannelFromSocket)
    })

    const removeChannelFromStore = (payload) => {
        const { id } = payload;
        dispatch(removeChannel(id));
      
        if (activeChannel === id) {
            setActiveChannel('1')
        }
    }

    useEffect(() => {
        socket.on('removeChannel', removeChannelFromStore)
        return () => socket.off('removeChannel', removeChannelFromStore)
    })

    useEffect(() => {
        const username = selectUsername(store.getState());
        const token = selectToken(store.getState());
        const userId = JSON.parse(localStorage.getItem('userId'))
        if (userId && token === null && username === null) {
            dispatch(setUsersData(userId))
        }
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('userId')
        navigator('/login');
    }


    const channels = useSelector(selectorsChannels.selectAll)


    return (
        <div className="d-flex flex-column vh-100">
            <Navigation>
                <button type="button" className="btn btn-primary mx-3" onClick={handleLogOut} >Выйти</button>
            </Navigation>
            <div className="container flex-grow-1  my-4 rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <Channels
                        channels={channels}
                        activeChannel={activeChannel}
                        setActiveChannel={setActiveChannel}
                        setIsHost={setIsHost}
                    />
                    <MessagesCard activeChannel={activeChannel} />

                </div>
            </div>
        </div>)
}

export default MainPage