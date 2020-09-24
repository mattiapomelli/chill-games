import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import "../css/ranking.css"

const Ranking = () => {
    const {loggedUser, isAuthenticated} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [currentGame, setCurrentGame] = useState('zombiegame')

    useEffect(() => {
        axios.get(`/user/rank/${currentGame}`)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [currentGame])

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

    const styleActiveTab = (event) => {
        scrollTableToTop()
        event.target.classList.add('active')
        let tabs = document.getElementsByClassName('rank-tab')
        for (let tab of tabs) {
            tab !== event.target && tab.classList.remove('active')
        }
    }

    return(
        <div className="page-container">
            <div className="ranking-buttons">
                <button className="rank-tab tab active" onClick={(event) => {setCurrentGame('zombiegame'); styleActiveTab(event)}}>Zombie Game</button>
                <button className="rank-tab tab" onClick={(event) => {setCurrentGame('cargame'); styleActiveTab(event)}}>Car Game</button>
            </div>
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
                                            <td><Link to={{pathname: `/user/${user._id}`, state: { fromRanking: true}}}>{user.username}</Link></td>
                                            <td>{user.score}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="scroll-buttons-container">
                    { isAuthenticated && 
                    <svg className="scroll-to-user scroll-button" onClick={scrollTableToUser} viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="25"/>
                        <path d="M25 26.4333C20.3333 26.4333 11 29 11 33.6667V36H39V33.6667C39 29 29.6667 26.4333 25 26.4333Z" fill="white"/>
                        <circle cx="25" cy="17" r="7" fill="white"/>
                    </svg> }
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