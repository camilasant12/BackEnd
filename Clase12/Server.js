const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

let messages = [
];

let messages2 = [
];

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); // emitir todos los mensajes a un cliente nuevo 
    socket.emit('messages2', messages2); // emitir todos los mensajes a un cliente nuevo 

    socket.on('new-message', function(data) {
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
    });   
    socket.on('new-message2', function(data2) {
        messages2.push(data2); // agregar mensajes a array 
        io.sockets.emit('messages2', messages2); //emitir a todos los clientes
    });    
     
});


const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

