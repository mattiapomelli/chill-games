import React, {createContext, useState, useEffect} from 'react'
import AuthService from '../services/AuthService'

export const AuthContext = createContext()  

export const AuthProvider = ({ children }) => {     
    const [loggedUser, setLoggedUser] = useState(null)                          //user that is logged in
    const [isAuthenticated, setIsAuthenticated] = useState(false)           //if the user is authenticated
    const [isLoaded, setIsLoaded] = useState(false)                         //if the app is loaded
    const [isGuest, setIsGuest] = useState(false)

    useEffect(()=>{                
        AuthService.isAuthenticated().then(data =>{
            setLoggedUser(data.loggedUser);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);

    return (   
        <div>
            {!isLoaded ? <h1 className="loading">Loading...</h1> :
            <AuthContext.Provider value={{loggedUser, setLoggedUser, isAuthenticated, setIsAuthenticated, isGuest, setIsGuest}}>
                { children } 
            </AuthContext.Provider>}
        </div>
    )
}