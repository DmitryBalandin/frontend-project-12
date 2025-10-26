import { selectModalState } from "../../slices/modalSlice"
import { useSelector } from "react-redux"
import RemoveModal from "./RemoveModal"
import RenameModal from "./RenameModal"
import AddChanelModal from "./AddChanelModal"
import { selectors as selectorsChannels } from '../../slices/channelsSlice'

const modalsList = [
    {
        name: 'add',
        component: AddChanelModal
    },
    {
        name: 'rename',
        component: RenameModal
    },
    {
        name: 'remove',
        component: RemoveModal
    }
]


const Modal = () => {

    const modals = useSelector(state => selectModalState(state))
    const { types, data } = modals;
    const currentList = modalsList.filter(el => modals.types.includes(el.name));
    return (<>
        {
            currentList.map((el, i) => {
                const Component = el.component;
                console.log(el,modals.data[el.name])
                return (<Component
                    data={modals.data[el.name]}
                    key={i}
                />)
            })
        }
    </>)

}

export default Modal;