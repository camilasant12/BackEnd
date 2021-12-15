const express= require('express');
const fs = require('fs');

const app = express();
const port = 8080;

//Clase Contenedor
let productoArr = [];
let id = 0;
let contador = 0;
const url ='./producto.json';


class Contenedor {
    constructor(title, price){
        this.title = title
        this.price = price
    }
    
}
function crearId(){
    contador = contador +1;
    id = contador;
    return id;

}
async function save(producto){
    
    try{
        crearId();
        productoArr.push({producto:producto, id:id});
        console.log(productoArr);
        await fs.promises.writeFile(url, JSON.stringify(productoArr))
        console.log('EXITOSO');
    }
    catch(err){
        console.log('ERROR SAVE');
    }
    
}


//Servidor Express
const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))

app.get('/productos', (req, res)=>{
    const contenido =  fs.readFileSync(url, 'utf-8' );
    res.send({mensaje: contenido})
})

app.get('/productoRandom', (req, res)=>{
    const contenido =  fs.readFileSync(url, 'utf-8' );
    let buscArr = JSON.parse(contenido);
    let enconId = buscArr.find(producto => producto.id === 2); 
    res.send({mensaje: enconId})
})

const c  = new Contenedor('Helado', 8000);
const c1 = new Contenedor('Helado2', 8000);
const c2 = new Contenedor('Helado3', 8000);

save(c);
save(c1);
save(c2);