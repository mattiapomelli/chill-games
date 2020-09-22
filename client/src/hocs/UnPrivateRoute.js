import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UnPrivateRoute = ({component : Component, ...rest})=>{   //pull out component and roles from props and store all the other properties in rest
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated)
                return <Redirect to={{ pathname: '/', 
                                       state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default UnPrivateRoute