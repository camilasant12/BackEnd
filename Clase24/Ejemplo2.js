const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
/*-------------------------------------------------------*/
/*              PERSISTENCIA POR FILE STORE              */
/*-------------------------------------------------------*/
const MongoStore = require('connect-mongo')

const app = express()
app.use(cookieParser())
app.use(session({
    /*------------------------------------------------------------*/
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/sesiones'}),
    /*------------------------------------------------------------*/
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}))
