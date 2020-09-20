const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')

const cookieExtractor = req => {
    let token = null
    if(req && req.cookies){ //if the request is there and is not empty
        token = req.cookies["access_token"] // check if a jwt token is there and extracts it
    }
    return token
}

// authorization (when we want to protect a resource: personal page, admin page)
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,                    // function we provide to extract th JWT token from the request
    secretOrKey: "RandomCoder"                          // used to verify that the token is legitimate
}, (payload, done) => {                                 // payload: data that we set within the jwt token
    User.findById({_id: payload.sub}, (err, user) => {  // payload.sub: subject whom the token refers to
        if(err)
            return done(err, false)
        if(user)
            return done(null, user)
        else
            return done(null, false)
    })      
}))
