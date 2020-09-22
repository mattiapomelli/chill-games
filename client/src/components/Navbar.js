import React, {useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import "../css/navbar.css"


const Navbar = () => {
    const {isAuthenticated, loggedUser} = useContext(AuthContext)

    return (
        <div>
			<div className="header-container">
				<header>
					{/* <span>Your record is: {loggedUser.bestScore}</span> */}

					<Link className="menu-item" to="/ranking">Ranking</Link>

					<Link className="menu-item" to="/">Play</Link>

					{
						isAuthenticated?

					<div className="user-info">
						<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile"/>
						<Link className="user-name" to={`/user/${loggedUser._id}`}>{loggedUser.username}</Link>
					</div>
					:
					<div className="navbar-right">
						<div className="user-info">
							<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile"/>
							<span className="user-name">Guest</span>
						</div>
						<Link className="navbar-login-btn" to="/login">Login</Link>
					</div>
					}
				</header>			
			</div>
        </div>
    )
}

export default Navbar