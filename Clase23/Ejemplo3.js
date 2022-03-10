const express = require ('express')
const session = require('express-session')

const app = express()
//app.use(cookieParser())
app.use(session({
    secret: 'shh',
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res)=>{
    res.send('Servidor Express OK')
})
let contador = 0
app.get('/sin-session', (req,res)=>{
    res.json({contador:++contador})
})

app.get('/con-session', (req,res)=>{
    showSession(req)
    if(!req.session.contador){
        req.session.contador = 1
        req.session.username = req.query.nombre
        res.send('Bienvenido')
    }else{
        req.session.contador++
        res.send(`Hola ${req.session.username} Ud ha visitado el sitio ${req.session.contador} veces.`)
    }
})

app.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err){
            res.json({status: 'LOG OUT ERROR', body:err})
        }else{
            res.send('Log out OK')
        }
    })
})

app.get('/info', (req,res)=>{
    showSession(req)
    res.send('Send info OK')
})


  
const PORT =8080;

const srv = app.listen(PORT, () => { 
    console.log(`Servidor Http con Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

function showSession(req){
    console.log('---------------req.session---------------')
    console.log(req.session)

    console.log('---------------req.sessionID---------------')
    console.log(req.sessionID)

    console.log('---------------req.cookies---------------')
    console.log(req.cookies)

    console.log('---------------req.sessionStore---------------')
    console.log(req.sessionStore)
}