import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { addChannels, upsertChannel, removeChannel } from '../../slices/channelsSlice'
import { selectors as selectorsChannels, addChannel } from '../../slices/channelsSlice'
import { addMessages } from '../../slices/messagesSlice'
import Navigation from '../../componenets/Navigation/Navigator'
import Channels from '../../componenets/Channels/Channels'
import MessagesCard from '../../componenets/MessagesCard/MessagesCard'
import store from '../../slices/store'
import { selectToken, selectUsername } from '../../slices/autxSlice'
import { setUsersData,setTimeZona } from '../../slices/autxSlice'
import routes from '../../routes'
import socket from '../../socket'
import { useTranslation } from 'react-i18next'
import { selectErrorNetworks, setErrorNetwork, clearErrorNetwork } from '../../slices/errorsNetworkSlice'
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

function MainPage() {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [activeChannel, setActiveChannel] = useState('1')
  const [isHost, setIsHost] = useState(false)
  const { error } = selectErrorNetworks(store.getState())
  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    if (error) {
      toast.error(t(error), {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }, [error])

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    dispatch(clearErrorNetwork())
    if (!userId) {
      navigator('/login')
    }
    else {
      const { token } = userId
      try {
        axios.get(routes.channels.allChannels(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          dispatch(addChannels(response.data))
        })

        axios.get(routes.messages.allMessages(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          dispatch(addMessages(response.data))
        })
      }
      catch (e) {
        if (e.code === 'ERR_NETWORK') {
          dispatch(setErrorNetwork({ error: 'errors.network' }))
        }
        else (dispatch(setErrorNetwork({ error: 'errors.unknow' })))
        const { error } = selectErrorNetworks(store.getState())
        toast.error(error, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    }
  }, [])

  const setPhraseToast = (phrase) => {
    return (
      toast.success(phrase, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    )
  }

  const addChannelFormSocket = (payload) => {
    const { id } = payload
    dispatch(addChannel(payload))
    if (isHost) {
      setActiveChannel(id)
      setIsHost(false)
      setPhraseToast(t('phrase.addChannel'))
    }
  }

  useEffect(() => {
    socket.on('newChannel', addChannelFormSocket)
    return () => socket.off('newChannel', addChannelFormSocket)
  })

  const renameChannelFromSocket = (payload) => {
    const { id } = payload
    dispatch(upsertChannel(payload))
    if (isHost) {
      setActiveChannel(id)
      setIsHost(false)
      setPhraseToast(t('phrase.renameChannel'))
    }
  }

  useEffect(() => {
    socket.on('renameChannel', renameChannelFromSocket)
    return () => socket.off('renameChannel', renameChannelFromSocket)
  })

  const removeChannelFromStore = (payload) => {
    const { id } = payload
    dispatch(removeChannel(id))

    if (activeChannel === id) {
      setActiveChannel('1')
    }
    setIsHost(false)
    setPhraseToast(t('phrase.removeChannel'))
  }

  useEffect(() => {
    socket.on('removeChannel', removeChannelFromStore)
    return () => socket.off('removeChannel', removeChannelFromStore)
  })

  useEffect(() => {
    const username = selectUsername(store.getState())
    const token = selectToken(store.getState())
    const userId = JSON.parse(localStorage.getItem('userId'))
    const timeZona = dayjs.tz.guess()
    console.log(timeZona)
    dispatch(setTimeZona(timeZona))
    console.log(userId)
    if (userId && token === null && username === null) {
      dispatch(setUsersData(userId))
    }
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem('userId')
    navigator('/login')
  }

  const channels = useSelector(selectorsChannels.selectAll)

  return (
    <div className="d-flex flex-column vh-100">
      <Navigation>
        <button type="button" className="btn btn-primary mx-3" onClick={handleLogOut}>{t('phrase.logOut')}</button>
      </Navigation>
      <div className="container flex-grow-1  my-4 rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels
            channels={channels}
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
            setIsHost={setIsHost}
          />
          <MessagesCard activeChannel={activeChannel} />

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default MainPage
