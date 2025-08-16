import { useState } from 'react'
import crossInSquare from '../../assets/cross-in-square-svgrepo-com.svg'
import AddChanelModal from '../Modals/AddChanelModal'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import RenameModal from '../Modals/RenameModal';
import RemoveModal from '../Modals/RemoveModal';


const Channels = ({ channels, setActiveChannel, activeChannel }) => {
    const [showModal, setShowModal] = useState(true)
    const [dateModal, setDateModal] = useState({ type: null, id: null })
    const handleClick = (id) => {
        setActiveChannel(id)
    }
    const handleChannel = (action) => {
        setShowModal(true);
        setDateModal(action);
    }

    const renderModal = (show, { type = null, id = null }) => {
        switch (type) {
            case 'add':
                return <AddChanelModal
                    show={show}
                    setShow={setShowModal}
                    setActiveChannel={setActiveChannel} />
            case 'rename':
                return <RenameModal
                    show={show}
                    setShow={setShowModal}
                    setActiveChannel={setActiveChannel}
                    indexChannel={id} />
            case 'remove':{
                return <RemoveModal
                show={show}
                setShow={setShowModal}
                setActiveChannel={setActiveChannel}
                indexModal={id}
                activeChannel={activeChannel} 
                />
            }       
            default:
                return
        }
    }
    return (

        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-around mb-2 ps-4 pe-2 p-4">
                <b className='text-muted'>Channels</b>
                <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => handleChannel({ type: 'add' })}>
                    <img src={crossInSquare} width="23" height="23" className="bg-secondary" alt="add channels" />
                </button>
            </div>
            <ul id='channels-box' className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(({ id, name, removable }) => {
                    if (!removable) {
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
                    }
                    return (<li key={id} className="nav-item w-100">
                        <Dropdown as={ButtonGroup} className=' w-100'>
                            <Button onClick={() => handleClick(id)} className={`w-100 rounded-0 text-start text-black border-0 text-truncate${activeChannel === id ? ' btn-secondary text-white' : ' bg-light '}`}>
                                <span className="me-1">#</span>
                                {name}
                            </Button>
                            <Dropdown.Toggle className={`border-0 ${activeChannel === id ? ' bg-secondary text-white' : ' bg-light text-black'}`} split id="dropdown-split-basic" />
                            <Dropdown.Menu >
                                <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'remove', id })}>Удалить</Dropdown.Item>
                                <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'rename', id })}>Переименовать</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </li>)
                })}
            </ul>
            {renderModal(showModal, dateModal)}
        </div>
    )
}

export default Channels