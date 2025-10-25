import { selectModalState } from "../../slices/modalSlice"
import { useSelector } from "react-redux"
import RemoveModal from "./RemoveModal"
import RenameModal from "./RenameModal"
import AddChanelModal from "./AddChanelModal"
import { selectors as selectorsChannels } from '../../slices/channelsSlice'
const Modal = () => {
    const modalsState = useSelector(state => selectModalState(state))
    const { types, data } = modalsState;
    const listNamesChannels = useSelector(state => selectorsChannels.selectAll(state))
        .map(({ name }) => name)

    return (<>
        {types.map((type) => {
            switch (type) {
                case 'add':
                    return (
                        <AddChanelModal
                            listNamesChannels={listNamesChannels}
                        />
                    )
                case 'rename':
                    return (
                        <RenameModal
                            show={show}
                            setShow={setShowModal}
                            indexChannel={id}
                            listNamesChannels={listNamesChannels}
                            setIsHost={setIsHost}
                        />
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
        })
        }
    </>)


}

export default Modal;