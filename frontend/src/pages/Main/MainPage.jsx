import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addChannels } from "../../slices/channelsSlice";
import { selectors } from "../../slices/channelsSlice";
import Navigation from "../../componenets/Navigation/Navigator";
function MainPage() {
    const navigator = useNavigate();
    const dispatch = useDispatch();
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

    const channels = useSelector(selectors.selectAll)
    const channelSS = [
        { id: '1', name: 'general', removable: false },
        { id: '2', name: 'random', removable: false }
    ]



    return (
        <div className="h-100">
            <Navigation>
                <button type="button" className="btn btn-primary mx-3">Выйти</button>
            </Navigation>
            <div className="container bg-secondary  vw-100 h-100">
                sdfds
            </div>
            <button type="button" onClick={() => { console.log(channelSS) }} className="btn btn-primary">channels</button>
        </div>)
}

export default MainPage