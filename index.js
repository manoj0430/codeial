const express = require('express');
const cookieParser=require('cookie-parser');
const app= express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


const session=require('express-session');
const passport=require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-stratergy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());

//using static files
app.use(express.static('./assets'));
//  make uploads path available to browser

app.use('/uploads', express.static(__dirname + '/uploads'));
//Using Layouts
app.use(expressLayouts);

//extract style and scripts from subsrcipts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect mongo-db setup ok')
    }
    )
}));
//we need to tell app to use passport

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash)


//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);

})