import faker from 'faker'
faker.locale = 'es'

function generarMensajes(){
    return{
        id: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.mersenne.rand(20,60),
        alias: faker.name.prefix(),
        avatar: faker.image.avatar(),
    }
}
export {generarMensajes}