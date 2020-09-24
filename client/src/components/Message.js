import React, { useEffect, useRef } from "react"
import "../css/message.css"

const Message = ({message}) => {
    const popupRef = useRef()

    useEffect(() => {
        if(message !== ""){
            popupRef.current.classList.add('opened')
            window.setTimeout(() => {
                popupRef.current.classList.remove('opened')
            }, 2000)
        }
    }, [message])

    return (
        <div className="message-popup" ref={popupRef}> 
            {message}
        </div>
    )
}

export default Message