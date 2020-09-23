import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import "../css/ranking.css"

const Ranking = () => {
    const {loggedUser} = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/user')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])

    const getClass = (index) => {
        let rowClass = ""

        switch (index + 1) {
            case 1:
                rowClass = "first"
                break;
            case 2:
                rowClass = "second"
                break;
            case 3:
                rowClass = "third"
                break;
            default:
        }

        return rowClass
    }

    const scrollTableToTop = () => {
        document.querySelector('.table-body').scrollTop = 0
    }

    const scrollTableToUser = () => {
        document.querySelector('.current-user-row').scrollIntoView()
    }

    return(
        <div className="ranking-container">
            <div className="table-container">

                <div className="table-head">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos.</th>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="table-body">
                    <table>
                        <tbody>
                            {
                                users.map((user, index) => {
                                    return(
                                        <tr key={index} className={`${user._id === loggedUser._id ? "current-user-row " : ""}${getClass(index)}`}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.zombiegame.bestScore}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="scroll-buttons-container">
                    <svg className="scroll-to-user scroll-button" onClick={scrollTableToUser} viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25"/>
                        <path d="M13 29L25 17L37 29" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className="scroll-to-top scroll-button" onClick={scrollTableToTop} viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25"/>
                        <path d="M13 29L25 17L37 29" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>


            </div>
        </div>
    )
}

export default Ranking