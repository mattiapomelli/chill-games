import React, {useState, useEffect} from "react"
import axios from "axios"

const Profile = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("/user/" + props.match.params.id)
        .then(res => {
            setUser(res.data)
        }).catch(err => console.log(err))
    }, [props.match.params.id]) //so when we go from an user profile to another user's profile since props change the component re-fetches data and re-mounts

    return (
        <div>
            <h1>{user.username}</h1>
        </div>
    )
}

export default Profile