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
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'))
        console.log(userId)
        if (!userId) {
            navigator('/login');
        } else {
            const { token } = userId;
            axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                dispatch(addChannels(response.data));
            });
        }

    }, [])

    const channels = useSelector(selectors.selectAll)
    // const channelSS = [
    //     { id: '1', name: 'general', removable: false },
    //     { id: '2', name: 'random', removable: false }
    // ]



    return (
        <div className="d-flex flex-column vh-100">
            <Navigation>
                <button type="button" className="btn btn-primary mx-3">Выйти</button>
            </Navigation>
            <div className="container flex-grow-1  my-4 rounded shadow">
                <div className="row h-100 bg-white flex-md-row">
                    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                            addChannels
                        </div>
                        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                            {channels.map(({ id, name, removable }) => {
                                return (<li key={id} className="nav-item w-100">
                                    <button  type="button" className="w-100 rounded-0 text-start btn">
                                        <span className="me-1">#</span>
                                        {name}
                                    </button>
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="col p-0 h-100">
                        sdasd
                    </div>
                </div>
            </div>
            {/* <button type="button" onClick={() => { console.log(channelSS) }} className="btn btn-primary">channels</button> */}
        </div>)
}

export default MainPage