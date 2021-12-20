const express= require('express');



const app = express();
const port = 8080;
app.set('views', './views');
app.set('view engine', 'pug');



//Servidor Express
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))

app.get('/hello', (req, res)=>{
    res.render('Hello.pug', { mensaje: 'Usando PUG JS en express'})
})


