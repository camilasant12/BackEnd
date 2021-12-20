const express= require('express');
const { Router } =  express;
const multer = require('multer');
const port = 8080;

const app = express();
const routerProducto = Router();
app.use('/productos', routerProducto)
routerProducto.use(express.json())
routerProducto.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//array producto
const productos =[];


routerProducto.get('/listar', (req, res)=>{
    res.json(productos)
})

routerProducto.get('/listar/:id', (req, res)=>{
    res.json(productos.find(producto => producto.id == req.params.id))   
})



routerProducto.post('/grabar', (req, res)=>{
    console.log(req.body)
    productos.push(req.body)
    res.json(req.body);
})


routerProducto.put('/grabar', (req, res)=>{
    console.log(req.body)
    productos.push(req.body)
    res.json(req.body);
})


//app.use('/api', routerProducto)
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))
