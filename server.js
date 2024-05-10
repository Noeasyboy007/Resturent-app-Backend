require("dotenv").config();

const express = require('express');

const bodyParser = require('body-parser')

const app = express();

const db = require('./db');

const MenuItem = require('./models/menu')

const personRouter = require('./routes/personRoutes')

const menuRoutes = require('./routes/menuRoutes')

const passport = require('./auth')



app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Middleware Function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}]`)
    next(); //Move on the nxt Phase
}

app.use(logRequest);

app.use(passport.initialize());

//Local Auth Middleware..........
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
    res.send('Welcome to  our Hotel')
})

app.use('/person', localAuthMiddleware, personRouter);

app.use('/menu', menuRoutes);



app.listen(PORT, () => { console.log(`server started at PORT: ${PORT}`) });