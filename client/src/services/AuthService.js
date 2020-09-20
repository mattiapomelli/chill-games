import axios from 'axios'

export default {
    login: user => {
        return fetch('/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 401)  //if we use passport middleware, passport sends status of 401 if we are not authenticated
                return res.json().then(data => data)
            else
                return {isAuthenticated: false, loggedUser: {username: "", _id: ""}}
        })
    },
    register: user => {
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            if(res.status !== 401)  //if we use passport middleware, passport sends status of 401 if we are not authenticated
                return res.json().then(data => data)
            else
                return {isAuthenticated: false, loggedUser: {username: "", _id: ""}}
        })
    },
    logout: () => {
        return axios.get('/user/logout')
                .then(res => res.data)
    },
    isAuthenticated: () => {    // we need this to sync components state about authentication with the backend
        return axios.get('/user/authenticated')
            .then(res=> res.data)
            .catch(err => {return {isAuthenticated: false, loggedUser: {username: "", _id:""}}})
    }
}