import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Ranking = () => {
    const {loggedUser} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/user')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <ul>
            {
                users.map((user, index) => {
                    return(
                        <li className={user._id === loggedUser._id ? "current-user-item": ""} key={index}>
                            {index + 1} - {user.username}: {user.bestScore}                     
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default Ranking