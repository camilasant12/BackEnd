const express = require('express')
const app = express()
/*const session = require('express-session')
const cookieParser = require('cookie-parser')*/
const server = require('http').Server(app)
const io = require('socket.io')(server)


let messages = [
];

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    console.log(messages)
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-message', function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
    });      
});


/*-------------------------------------------------------*/
/*               PERSISTENCIA POR MONGODB                */
/*-------------------------------------------------------*/
/*const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
/*-------------------------------------------------------*/


/*app.use(cookieParser())
app.use(
    session({
        /*------------------------------------------------------------*/
        /*            PERSISTENCIA POR REDIS DATABASE            */
        /*------------------------------------------------------------*/
        /*store: MongoStore.create({
            mongoUrl: 'mongodb://camilasant12:usWsCU5PnFVO5Zrm@cluster0.ecu9y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            mongoOptions: advancedOptions
        }),
        /*------------------------------------------------------------*/
        /*secret: 'shhhhhhhhhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        //cookie: {
           // maxAge: 40000
        //} 
    })
)
*/
app.use(express.static('public'));


const PORT =8080;

const srv = app.listen(PORT, () => { 
    console.log(`Servidor Http con Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))
