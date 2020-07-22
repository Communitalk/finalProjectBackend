const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = process.env.SECRET;

const cors = require('cors');

const UsersModel = require('./models/UsersModel');

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                UsersModel.findOne({ _id: jwtPayload.id })
                .then(
                    (document) => {
                        return done(null, document);
                    }
                )
                .catch(
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
};

const GroupsRoute = require('./routes/GroupsRoute.js');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');
const EventsRoute = require('./routes/EventsRoute.js');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

passportJwt(passport);

const dbURL = process.env.DB_URL;

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser' : true,
        'useUnifiedTopology': true
    }
).then(
    ()=>{
        console.log('You are connected MongoDB');
    }
).catch(
    (e)=>{
        console.log('catch', e);
    }
);

server.use(
    '/groups',
    passport.authenticate('jwt', {session:false}), 
    GroupsRoute
);

server.use(
    '/feeds',
    passport.authenticate('jwt', {session:false}), // Use passport-jwt to authenticate
    FeedsRoutes
);

server.use(
    '/users',
    UsersRoutes
);

server.use(
    '/events',
    EventsRoute
);

server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to Communitalk/h1>" +
        "<a href=about>About </br> </a>" +
        "<a href=contacts>Contacts </br> </a>" +
        "<a href=products>Products </br> </a>" +
        "<a href=*>Location </br> </a>"
        );
    }
);

server.get(
    '/about',
    (req, res) => {
        res.send("<h1>About us!</h1>");
    }
);

server.get(
    '/Contactus',
    (req, res) => {
        res.send("<h1>Contact us!</h1>" +
        "<a href='/'>home</a>"
        );
    }
);

server.get(
    '/groups',
    (req, res) => {
        res.send("<h1>Find your community</h1>"+
        "<a href='/'>home</a>"
        );
    }
);

  
 server.get(
    '*',
    (req, res) => {
        res.send("<h1>404 Page not found</h1>");
    }
);

// Connect to port (range 3000 - 9999)
// http://127.0.0.1:8080 (aka http://localhost:8080)
server.listen( 
    8080, ()=>{
        console.log('You are connected');
}
);