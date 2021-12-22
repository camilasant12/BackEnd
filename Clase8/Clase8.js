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
const productoFinal =[];
let id = 0;
let contador = 0;
//Función ID
function crearId(){
    contador = contador +1;
    id = contador;
    return id;

}
//listar todo
routerProducto.get('/listar', (req, res)=>{
    res.json(productos)
})
//listar por ID
routerProducto.get('/listar/:id', (req, res)=>{
    let arrFind = productos.filter(producto => producto.id == req.params.id);
    if (arrFind.length != 0){
        res.json(arrFind);
    }
    else{
        //Mensaje no encontrado
        arrFind.push({error:'Producto no encontrado'});
        res.json(arrFind)
    }
})
//Grabar y devolver producto + id
routerProducto.post('/grabar', (req, res)=>{
    crearId();
    productos.push({producto:req.body, id:id})
    res.json({producto:req.body, id:id});
})

//Delete
routerProducto.delete('/delete/:id', (req, res)=>{
    let arrFind = productos.filter(producto => producto.id != req.params.id);
    if (arrFind.length != 0){
        res.json(arrFind);
    }
    else{
        //Mensaje no encontrado
        arrFind.push({error:'Producto no encontrado'});
        res.json(arrFind)
    }
})

//Actualizar 
routerProducto.put('/actualizar/:id', (req, res)=>{
    let arrFind = productos.filter(producto => producto.id == req.params.id);
    if (arrFind.length != 0){
        res.json(arrFind);
    }
    else{
        //Mensaje no encontrado
        arrFind.push({error:'Producto no encontrado'});
        res.json(arrFind)
    }
})


//app.use('/api', routerProducto)
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))
