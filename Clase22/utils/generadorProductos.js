import faker from 'faker'
faker.locale = 'es'

function generarProductos(id){
    return{
        id, 
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        image: faker.image.imageUrl(),
    }
}
export {generarProductos}