import React, { useEffect, useRef } from "react"
import "../css/message.css"

const Message = ({message}) => {
    const popupRef = useRef()

    useEffect(() => {

        if(message.msgBody){
            if(message.msgError)
                popupRef.current.classList.add('error')
            else 
                popupRef.current.classList.remove('error')

            popupRef.current.classList.add('opened')
            var timeout = setTimeout(() => {
                    popupRef.current.classList.remove('opened')
            }, 2000)
        }

        return () => {              //so if the user leaves the page before timeout ends it won't throw an error for updating something that is unmounted
            clearTimeout(timeout)
        }
    }, [message])

    return (
        <div className="message-popup" ref={popupRef}> 
            {message.msgBody}
        </div>
    )
}

export default Message