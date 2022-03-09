import ContenedorMemoriaMensaje from '../contenedores/ContenedorMemoriaMensaje.js'
import {generarMensajes} from '../utils/generadorMensajes.js'

class ApiMensajesMock extends ContenedorMemoriaMensaje{
    constructor(){super()}
    mensajes(cant =5){
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoMensaje = generarMensajes()
            const guardado = this.guardar(nuevoMensaje)
            nuevos.push(guardado)
            
        }
        return nuevos
    }
}

export default ApiMensajesMock