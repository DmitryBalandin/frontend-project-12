

const Channels = ({channels, setActiveChannel,activeChannel}) => {
     const handleClick = (id) => {
        setActiveChannel(id)
    }
    return (

        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                addChannels
            </div>
            <ul id='channels-box' className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ id, name, removable }) => {
                    return (<li key={id} className="nav-item w-100">
                        <button
                            type="button"
                            onClick={() => handleClick(id)}
                            className={`w-100 rounded-0 text-start btn${activeChannel === id ? ' btn-secondary' : ''}`}
                        >
                            <span className="me-1">#</span>
                            {name}
                        </button>
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Channels