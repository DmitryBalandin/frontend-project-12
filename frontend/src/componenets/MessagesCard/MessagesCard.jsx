import arrowLeft from '../../assets/right_arrow_icon_238558.svg';


const MessagesCard = ({ activeChannel }) => {
    console.log(activeChannel)
    return (
        <div className="col p-0 h-100 flex-column d-flex">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b>{activeChannel}</b>
                </p>
                <span className="text-muted">1 message</span>
            </div>
            <div className="chat-messages overflow-auto px-5 ">
                <div className="text-break mb-2">
                    <b>user</b>
                    ": " "Message"
                </div>
            </div>
            <div className="mt-auto px-5 py-3">
                <form noValidate className="py-1 border rounded-2">
                    <div className="input-group has-validation">
                        <input type="body" 
                            aria-label="Новое сообщение"
                            placeholder="Введите сообщение..."
                            className="border-0 p-0 ps-2 form-control"
                        />
                        <button type="submit" className="btn btn-group-vertical" disabled>
                            <img src={arrowLeft} className="img-fluid" alt="arrow send" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default MessagesCard