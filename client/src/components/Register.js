import React, { useContext, useState } from "react"
import axios from "axios"
import { GameContext } from "../context/GameContext"

const Register = () => {
    const [username, setUsername] = useState('')
    const {finalScore} = useContext(GameContext)

    const registerUser = (e) => {
        e.preventDefault()
        axios.post('/user/register', {
            username,
            bestScore: finalScore
        }).then(() => {
            setUsername('')
        }).catch(err => {
            console.log(err)
        })
    }

    const onChange = (e) => {
        setUsername(e.target.value)
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <input placeholder="Username" value={username} onChange={onChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register