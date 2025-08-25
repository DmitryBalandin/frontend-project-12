import { useState } from 'react'
import AddChanelModal from '../Modals/AddChanelModal'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import RenameModal from '../Modals/RenameModal'
import RemoveModal from '../Modals/RemoveModal'
import { selectors as selectorsChannels } from '../../slices/channelsSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Channels = ({ channels, setActiveChannel, activeChannel, setIsHost }) => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(true)
  const [dateModal, setDateModal] = useState({ type: null, id: null })

  const listNamesChannels = useSelector(state => selectorsChannels.selectAll(state))
    .map(({ name }) => name)

  const handleClick = (id) => {
    setActiveChannel(id)
  }
  const handleChannel = (action) => {
    setShowModal(true)
    setDateModal(action)
  }

  const renderModal = (show, { type = null, id = null }) => {
    switch (type) {
      case 'add':
        return (
          <AddChanelModal
            show={show}
            setShow={setShowModal}
            listNamesChannels={listNamesChannels}
            setIsHost={setIsHost} />
        )
      case 'rename':
        return (
          <RenameModal
            show={show}
            setShow={setShowModal}
            indexChannel={id}
            listNamesChannels={listNamesChannels}
            setIsHost={setIsHost} />
        )
      case 'remove': {
        return (
          <RemoveModal
            show={show}
            setShow={setShowModal}
            setActiveChannel={setActiveChannel}
            indexModal={id}
            activeChannel={activeChannel}
            setIsHost={setIsHost}
          />
        )
      }
      default:
        return
    }
  }
  return (

    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-around mb-2 ps-4 pe-2 p-4">
        <b className="text-muted">{t('phrase.channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => handleChannel({ type: 'add' })}>
          <div className="visually-hidden">
            +
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" class="bi bi-plus-square"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path></svg>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => {
          if (!removable) {
            return (<li key={id} className="nav-item w-100">
              <button
                name={name}
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
            <Dropdown as={ButtonGroup} className=" w-100">
              <Button onClick={() => handleClick(id)} className={`w-100 rounded-0 text-start text-black border-0 text-truncate${activeChannel === id ? ' btn-secondary text-white' : ' bg-light '}`}>
                <span className="me-1">#</span>
                {name}
              </Button>
              <Dropdown.Toggle className={`border-0 ${activeChannel === id ? ' bg-secondary text-white' : ' bg-light text-black'}`} split id="dropdown-split-basic" >
                <span className="visually-hidden">Управление каналом</span>
              </Dropdown.Toggle >
              <Dropdown.Menu >
                <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'remove', id })}>{t('buttonActionName.remove')}</Dropdown.Item>
                <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'rename', id })}>{t('buttonActionName.rename')}</Dropdown.Item>
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
