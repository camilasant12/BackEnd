const express= require('express');
const { Router } =  express;
const port = 8080;

const app = express();
const routerCarrito = Router();

routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//array producto
const carrito =[];
let id = 0;
let contador = 0;
let time =0;
let admin = false;
//Funcion valida Admin
function valAdmin(){
    admin = true;
}
//Función ID
function crearId(){
    contador = contador +1;
    id = contador;
    return id;

}
//Funcion Obtener TimeStamp
function timeS(){
    time = new Date().toISOString();
    console.log(time);
    return time;
}
//listar todo
routerCarrito.get('/carrito', (req, res)=>{
    res.json(carrito)
})
//listar por ID
routerCarrito.get('/carrito/:id', (req, res)=>{
    let arrFind = carrito.filter(producto => producto.id == req.params.id);
    if (arrFind.length != 0){
        res.json(arrFind);
    }
    else{
        //Mensaje no encontrado
        arrFind.push({error:'Producto no encontrado'});
        res.json(arrFind)
    }
})
//Grabar y devolver carrito + id
routerCarrito.post('/carrito', (req, res)=>{
    if (admin == true) {
        crearId();
        timeS();
        carrito.push({carrito:req.body, id:id, time:time})
        res.json({carrito:req.body, id:id, time:time});        
    }
    
})

//Delete
routerCarrito.delete('/carrito/:id', (req, res)=>{
    if (admin == true) {
        let arrFind = carrito.filter(carrito => carrito.id != req.params.id);
        if (arrFind.length != 0){
            res.json(arrFind);
        }
        else{
            //Mensaje no encontrado
            arrFind.push({error:'Producto no encontrado'});
            res.json(arrFind)
        }
    }
})

//Actualizar 
routerCarrito.put('/carrito/:id', (req, res)=>{
    if (admin == true) {
        let arrFind = carrito.filter(carrito => carrito.id == req.params.id);
        if (arrFind.length != 0){
            res.json(arrFind);
        }
        else{
            //Mensaje no encontrado
            arrFind.push({error:'Id de pedido no encontrado'});
            res.json(arrFind)
        }
    }
})


//app.use('/api', routerCarrito)

app.use('/carrito', routerCarrito)
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))
