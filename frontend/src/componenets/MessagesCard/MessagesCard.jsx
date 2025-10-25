import arrowLeft from '../../assets/right_arrow_icon_238558.svg'
import { selectors as selectorsChannels } from '../../slices/channelsSlice'
import { selectors as selectorsMessages, addMessage } from '../../slices/messagesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUsername } from '../../slices/autxSlice'
import store from '../../slices/store'
import { useEffect, useState } from 'react'
import socket from '../../socket'
import axios from 'axios'
import routes from '../../routes'
import { useTranslation } from 'react-i18next'
import LeoProfanity from 'leo-profanity'
import dayjs from 'dayjs'


const MessagesCard = ({ activeChannel }) => {
  const [valueMessage, setValueMessage] = useState('')
  useEffect(() => {
    LeoProfanity.loadDictionary('ru')
  }, [])



  const channelSelected = useSelector(state => selectorsChannels.selectById(state, activeChannel))
  const { t } = useTranslation()

  const messages = useSelector(state => selectorsMessages.selectAll(state))
  const dispatch = useDispatch()
  const username = selectUsername(store.getState())
  const printMessage = (payload) => {
    dispatch(addMessage(payload))
  }
  useEffect(() => {
    socket.on('newMessage', printMessage)
    return () => socket.off('newMessage', printMessage)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (valueMessage.length === 0) return
    
    const timeNow = dayjs()

    const bodyMessage = {
      date: timeNow,
      valueMessage
    }
    const token = selectToken(store.getState())
    const newMessage = { body: bodyMessage, channelId: activeChannel, username }
    axios.post(routes.messages.allMessages(), newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((e) => {
      console.log(e)
    })
    setValueMessage('')
  }

  const amountMessage = messages
    .filter(({ channelId }) => channelId === activeChannel)
    .length

  const messagePhrase = (amountMessage) => {
    if (amountMessage === 1 || amountMessage % 10 === 1) {
      return t('phrase.message')
    }
    if (amountMessage > 20 && (amountMessage % 10 === 2 || amountMessage % 10 === 3 || amountMessage % 10 === 4)) {
      return t('phrase.messagia')
    }
    if (amountMessage > 1 && amountMessage < 5) {
      return t('phrase.messagia')
    }
    return t('phrase.messages')
  }

  return (
    <div className="col p-0 h-100 flex-column d-flex">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b className="display-6">{`# ${channelSelected?.name}`}</b>
        </p>
        <span className="text-muted">
          {`${amountMessage} ${messagePhrase(amountMessage)}`}
        </span>
      </div>
      <div className="chat-messages overflow-auto px-5 ">

        {messages
          .filter(({ channelId }) => channelId === activeChannel)
          .map(({ body, username, id }) => {
            const correctedTime = dayjs(body.date).format('HH:mm');
            return (
              <div className="flex-grow-1  mb-2" key={id}>
                <div className="bg-light rounded p-3">
                  <b>{username}</b>
                  :&nbsp;
                  {LeoProfanity.clean(body.valueMessage)}
                  <div className="message-time text-end small mt-1">{correctedTime}</div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="mt-auto px-5 py-3">
        <form noValidate className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              type="body"
              aria-label="Новое сообщение"
              placeholder={t('phrase.inputMessage')}
              className="border-0 p-0 ps-2 form-control"
              value={valueMessage}
              onChange={e => setValueMessage(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit} className="btn btn-group-vertical">
              <img src={arrowLeft} className="img-fluid" alt="arrow send" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessagesCard
