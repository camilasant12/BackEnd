import ContenedorMemoria from '../contenedores/ContenedorMemoria.js'
import {generarProductos} from '../utils/generadorProductos.js'
import {generarId} from '../utils/generadorId.js'


class ApiProductosMock extends ContenedorMemoria{
    constructor(){super()}
    productos(cant =5){
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoUsuario = generarProductos(generarId())
            const guardado = this.guardar(nuevoMensaje)
            nuevos.push(guardado)
             
        }
        return nuevos
    }
}

export default ApiProductosMock