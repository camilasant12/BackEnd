const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {db} =  require('./mariaDB.js');
const knex = require('knex')(db);

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
        (async () =>{
            try{
              console.log("Datos Insertados");
              await knex('producto').insert(messages)

            }
            catch(err){
                console.log(err)
            }
            finally{
                knex.destroy();
            }
        })()
        messages.push(data); // agregar mensajes a array 
        io.sockets.emit('messages', messages); //emitir a todos los clientes
    });   
    socket.on('new-message2', function(data2) {
        (async () =>{
            try{
              console.log("Datos Insertados");
              await knex('mensaje').insert(messages2)

            }
            catch(err){
                console.log(err)
            }
            finally{
                knex.destroy();
            }
        })()
        messages2.push(data2); // agregar mensajes a array 
        io.sockets.emit('messages2', messages2); //emitir a todos los clientes
    });    
     
});


const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

