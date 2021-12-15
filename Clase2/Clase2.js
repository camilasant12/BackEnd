const fs = require('fs');


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

async function getById(id){
    try {
        const contenido = await fs.promises.readFile('./producto.json', 'utf-8' );
        let buscArr = JSON.parse(contenido);
        let enconId = buscArr.find(producto => producto.id === id); 
        console.log(enconId);
    } 
    catch (err) {
        console.log('ERROR GET BY ID' + err);
    }
}

async function getAll(){
    try {
        const contenido = await fs.promises.readFile('./producto.json', 'utf-8' );
        
        console.log(contenido);
    } 
    catch (err) {
        console.log('ERROR GET ALL');
    }

}

async function deleteById(id){
    try {
        const contenido = await fs.promises.readFile(url, 'utf-8' );  
        let buscArr = JSON.parse(contenido);
        let elimArr = buscArr.filter(producto => producto.id != id); 
        try{
            await fs.promises.writeFile(url, JSON.stringify(elimArr))
            console.log("ELIMINADO");
        }
        catch{
            console.log('ERROR DELETE BY ID');
        }
        
    } 
    catch (err) {
        console.log('ERROR DELETE BY ID');
    }
}

async function deleteAll(){
    try {
        let arrNuevo = [];
        await fs.promises.writeFile(url, JSON.stringify(arrNuevo))
        console.log('ELIMINADOS LOS PRODUCTOS');
    } 
    catch (err) {
        console.log('ERROR DELETE ALL');
    }
}


const c  = new Contenedor('Helado', 8000);
const c1 = new Contenedor('Helado2', 8000);

save(c);
save(c1);
//getById(1);
//getAll();
//deleteById(2);
//deleteAll();