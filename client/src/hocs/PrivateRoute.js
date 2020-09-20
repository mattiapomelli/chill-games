import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({component : Component, ...rest})=>{   //pull out component and roles from props and store all the other properties in rest
    const { isAuthenticated, isGuest } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated && !isGuest)
                return <Redirect to={{ pathname: '/login', 
                                       state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute