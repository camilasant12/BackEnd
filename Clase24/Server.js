const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const cookieParser = require('cookie-parser')

let messages = [
];

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-message', function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
    });    
});

/*-------------------------------------------------------*/
/*               PERSISTENCIA POR MONGODB                */
/*-------------------------------------------------------*/
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
/*-------------------------------------------------------*/
app.use(cookieParser())
app.use(
    session({
        /*------------------------------------------------------------*/
        /*            PERSISTENCIA POR REDIS DATABASE            */
        /*------------------------------------------------------------*/
        store: MongoStore.create({
            mongoUrl: 'mongodb://camilasant12:usWsCU5PnFVO5Zrm@cluster0.ecu9y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            mongoOptions: advancedOptions
        }),
        /*------------------------------------------------------------*/
        secret: 'shhhhhhhhhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        //cookie: {
           // maxAge: 40000
        //} 
    })
)
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