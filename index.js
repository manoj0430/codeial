const express = require('express');
const app= express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser=require('cookie-parser');

app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());
//using static files

app.use(express.static('./assets'));

//Using Layouts
app.use(expressLayouts);

//extract style and scripts from subsrcipts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express router

app.use('/', require('./routes'));

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);

})