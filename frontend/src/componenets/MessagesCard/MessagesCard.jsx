import arrowLeft from '../../assets/right_arrow_icon_238558.svg';
import { selectors as selectorsChannels } from '../../slices/channelsSlice';
import { selectors as selectorsMessages } from '../../slices/messagesSlice';
import { useSelector } from 'react-redux';
const MessagesCard = ({ activeChannel }) => {

    const channelSelected = useSelector(state => selectorsChannels.selectById(state, activeChannel));
    const messages = useSelector(state => selectorsMessages.selectAll(state))
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('addMessages')
        console.log(messages.filter(({ channelId }) => channelId === activeChannel));
    }

    return (
        <div className="col p-0 h-100 flex-column d-flex">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b className='display-6'>{`# ${channelSelected.name}`}</b>
                </p>
                <span className="text-muted">
                    {messages
                    .filter(({ channelId }) => channelId === activeChannel)
                    .length
                    } message</span>
            </div>
            <div className="chat-messages overflow-auto px-5 ">

                {messages
                    .filter(({ channelId }) => channelId === activeChannel)
                    .map(({ body, username, id }) => {
                        return (
                            <div className="text-break mb-2" key={id}>
                                <b>{username}</b>
                                : {body}
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-auto px-5 py-3">
                <form noValidate className="py-1 border rounded-2">
                    <div className="input-group has-validation">
                        <input type="body"
                            aria-label="Новое сообщение"
                            placeholder="Введите сообщение..."
                            className="border-0 p-0 ps-2 form-control"
                        />
                        <button type="submit" onClick={handleSubmit} className="btn btn-group-vertical" >
                            <img src={arrowLeft} className="img-fluid" alt="arrow send" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default MessagesCard