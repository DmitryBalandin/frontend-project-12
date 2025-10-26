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
        {types.map((type, index) => {
            const { id } = data[type];
            switch (type) {
                case 'add':
                    return (
                        <AddChanelModal
                            key={index}
                            listNamesChannels={listNamesChannels}
                        />
                    )
                case 'rename':
                    return (
                        <RenameModal
                            key={index}
                            indexChannel={id}
                            listNamesChannels={listNamesChannels}
                        />
                    )
                case 'remove': {
                    return (
                        <RemoveModal
                            key={index}
                            indexModal={id}
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