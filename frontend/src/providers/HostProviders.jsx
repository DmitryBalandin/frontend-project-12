import { HostContext } from "../context"
import { useState,useMemo } from "react"

function HostProvider({ children }) {
    const [isHost, setIsHost] = useState(false)
    const memeoizedValue = useMemo(() => ({
        setHostInTrue: () => {
            setIsHost(true)
        },
        setHostInFalse: () => {
            setIsHost(false)
        },
        isHost,
    }), [isHost]) 
    return (
        <HostContext.Provider value={memeoizedValue}>
            {children}
        </HostContext.Provider>
    )
}

export default HostProvider