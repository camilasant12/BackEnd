const express= require('express');

let productos = [];


const app = express();
const port = 8080;
app.use(express.urlencoded({extended: true}))
app.set('views', './Views');
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('form', {productos});
});

app.post('/productos', (req, res)=>{
    productos.push(req.body)
    console.log(req.body)
    res.redirect('/')
});




//Servidor Express
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))

app.get('/hello', (req, res)=>{
    res.render('Hello.pug', { mensaje: 'Usando PUG JS en express'})
})
 


