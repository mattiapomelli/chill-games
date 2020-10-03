import React, {useContext, useEffect} from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useLocation } from "react-router-dom"
import "../css/navbar.css"


const Navbar = (props) => {
	let location = useLocation()
	const {isAuthenticated, loggedUser} = useContext(AuthContext)
	
	useEffect(() => {
		let menu = document.getElementById("menu")
        let nav = document.getElementById("nav")
		let exit = document.getElementById("exit")
		let menuLinks = document.getElementsByClassName("menu-link")

        menu.addEventListener('click', function(e) {
            nav.classList.toggle('hide-mobile')
            e.preventDefault()
        })

        exit.addEventListener('click', function(e) {
            nav.classList.add('hide-mobile')
            e.preventDefault()
		})

		for (let item of menuLinks) {
			item.addEventListener('click', function(event) {

				nav.classList.add('hide-mobile')
			})
		}
		

	}, [])

	useEffect(() => {	//set navbar active link and keep on page refresh
		let oldActiveLink = document.querySelector(".active-link")
		if(oldActiveLink) 
			oldActiveLink.classList.remove("active-link")

		let newActiveLink = document.querySelector('header a[href="' + location.pathname + '"]')
		if(newActiveLink)
			newActiveLink.classList.add("active-link")

	}, [location.pathname])

    return (
        <div>
			<div className="header-container">

				<Link to="/" className="logo"><img src="/images/logo.svg" className="hide-desktop" alt="logo"/></Link>
				<span className="material-icons hide-desktop" id="menu">menu</span>

				<header className="show-desktop hide-mobile" id="nav">

					<Link className={`menu-item menu-link`} to="/ranking">
						<span className="material-icons">emoji_events</span>RANKING
					</Link> 

					<Link className="menu-item menu-link" to="/">
						<span className="material-icons">videogame_asset</span>PLAY
					</Link>

					{
						isAuthenticated?
					
					<Link className="user-info menu-link" to={`/user/${loggedUser._id}`}>
						<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile"/>
						<span className="user-name">{loggedUser.username}</span>
					</Link>
					:
					<div className="navbar-right">
						<div className="user-info guest">
							<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile"/>
							<span className="user-name">Guest</span>
						</div>
						<Link className="navbar-login-btn" to="/login">Login</Link>
					</div>
					}

					

					<span className="material-icons hide-desktop exit-icon" id="exit">close</span>
				</header>			
			</div>
        </div>
    )
}

export default Navbar