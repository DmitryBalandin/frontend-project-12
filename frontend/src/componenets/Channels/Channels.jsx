import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import { selectors as selectorsChannels } from '../../slices/channelsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import svgCross from '../../assets/cross.svg'
import { openModal } from '../../slices/modalSlice'
import Modal from '../Modals/Modal'


const Channels = ({ channels, setActiveChannel, activeChannel }) => {
  const { t } = useTranslation()

  const handleClick = (id) => {
    setActiveChannel(id)
  }

  const dispatch = useDispatch()
  const handleChannel = (data) => {
    const { type, id } = data
    dispatch(openModal({
      type,
      data: {
        id
      }
    }))
  }


  return (

    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-around mb-2 ps-4 pe-2 p-4">
        <b className="text-muted">{t('phrase.channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => handleChannel({ type: 'add' })}>
          <div className="visually-hidden">
            +
          </div>
          <img src={svgCross} alt="add Channel" />
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => {
          if (!removable) {
            return (

              <li key={id} className="nav-item w-100">
                <button
                  name={name}
                  type="button"
                  onClick={() => handleClick(id)}
                  className={`w-100 rounded-0 text-start btn${activeChannel === id ? ' btn-secondary' : ''}`}
                >
                  <span className="me-1">#</span>
                  {name}
                </button>
              </li>

            )
          }
          return (

            <li key={id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className=" w-100">
                <Button onClick={() => handleClick(id)} className={`w-100 rounded-0 text-start text-black border-0 text-truncate${activeChannel === id ? ' btn-secondary text-white' : ' bg-light '}`}>
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle className={`border-0 ${activeChannel === id ? ' bg-secondary text-white' : ' bg-light text-black'}`} split id="dropdown-split-basic">
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'remove', id })}>{t('buttonActionName.remove')}</Dropdown.Item>
                  <Dropdown.Item as={Button} onClick={() => handleChannel({ type: 'rename', id })}>{t('buttonActionName.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

          )
        })}
      </ul>
      <Modal />
    </div>
  )
}

export default Channels
