import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addChannels } from "../../slices/channelsSlice";
import { selectors } from "../../slices/channelsSlice";
import Navigation from "../../componenets/Navigation/Navigator";
import Channels from '../../componenets/Channels/Channels'
function MainPage() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [activeChannel, setActiveChannel] = useState('1');
    // useEffect(() => {
    //     const userId = JSON.parse(localStorage.getItem('userId'))
    //     console.log(userId)
    //     if (!userId) {
    //         navigator('/login');
    //     } else {
    //         const { token } = userId;
    //         axios.get('/api/v1/channels', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }).then((response) => {
    //             dispatch(addChannels(response.data));
    //         });
    //     }

    // }, [])

    // const channels = useSelector(selectors.selectAll)
    const channelSS = [
        { id: '1', name: 'general', removable: false },
        { id: '2', name: 'random', removable: false }
    ]

    return (
        <div className="d-flex flex-column vh-100">
            <Navigation>
                <button type="button" className="btn btn-primary mx-3">Выйти</button>
            </Navigation>
            <div className="container flex-grow-1  my-4 rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <Channels
                        channels={channelSS}
                        activeChannel={activeChannel}
                        setActiveChannel={setActiveChannel}
                    />
                    <div className="col p-0 h-100">
                        sdasd
                    </div>
                </div>
            </div>
        </div>)
}

export default MainPage