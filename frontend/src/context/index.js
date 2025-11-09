import { createContext } from 'react'

export const HostContext = createContext({
  setHostInTrue: () => null,
  setHostInFalse: () => null,
  isHost: false,
})
