// importing packages module to server 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy; // strategies of login : email , FB , jwt,,,,,
const ExtractJwt = require('passport-jwt').ExtractJwt; // extrcat jwt startegy specifically 
const secret = 'Kjj40n2jkjdm5M'; // coming from the users route to be able to read the toekn contents 


// importing routes
const GroupCreationRoute = require('./routes/GroupCreationRoute.js');
//const FeedsRoute = require('./routes/FeedsRoute.js');
//const UsersRoute = require('./routes/UsersRoute.js');
//const EmailsRoute = require('./routes/EmailsRoute.js');
//const UsersModel = require('./models/UsersModel.js'); // to find the user in the DB 
const e = require('express');

// function to pass to express to make sure the use is authenticated 

//Options for passport
const passportJwtOptins = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : secret

};
// reads the content of the json token 
const passportJwt = (passport) =>{
    passport.use(
        new JwtStrategy(
            passportJwtOptins, 
            (jwtPayLoad, done)=>{
                // extarct and find the user by their ID ( contained in jwt)
                UsersModel.findOne({_id:jwtPayLoad.id})
                .then(
                    (document)=>{
                        return done(null, document);
                    }
                ).catch(
                    (err)=>{
                        return done(null,null); 
                    }
                )
            }
        )
    )
};

//execute the express function - creating server object
const server = express();
// configure express to use the body-parser
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
//
server.use(cors());
// configure express to use passport 
server.use(passport.initialize());
passportJwt(passport); // invoking the function - using the package name : passport




const dBURL = 'mongodb+srv://admin01:db12345@cluster0-pdgtp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dBURL, {
    'useNewUrlParser' : true,
    'useUnifiedTopology' : true
}
).then(
    ()=> {
        console.log("You are connected to the MongoDB!");
    } 
).catch(
    (e)=> {
        console.log('catch', e);
    } 
);
// using the routes 
server.use(
    '/groups', 
    // to make the route private - can't be accessed unliss logged in 
    //passport.authenticate('jwt', {session:false}),
    GroupCreationRoute
);
/*server.use(
    '/feeds', 
    // to make the route private - can't be accessed unliss logged in (have a token) 
    passport.authenticate('jwt', {session:false}),
    FeedsRoute
);
server.use(
    '/users', 
    UsersRoute
);
server.use(
    '/emails', 
    EmailsRoute
); */ 
//creating route for landing page
server.get(
'/', 
(req, res) => {
res.send("<h1>Welcome to the website.<h1>" +
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
    res.send("<h1>About Us<h1>"); 
    } 
    );

server.get(
'/contacts', 
(req, res) => {
res.send("<h1>Please contact this email for more details <h1>" + "<a href=email@hotmail.com>email@hotmail.com</a>"); 
} 
);

server.get(
    '/groups', 
    (req, res) => {
    res.send("<h1>Mobile Phones </br> TVs </br> Tablets </br> Computers<h1>"); 
    } 
    );

server.get(
        '*', 
        (req, res) => {
        res.send("<h1>Error 404. Page Not Found!<h1>"); 
        } 
    );


// assign a port (range 3000 - 9000) to the server
// http://localhost:8080 - 127.0.0.1 
server.listen(8080, ()=> {
    console.log("You are connected to the server!");
} ); 
