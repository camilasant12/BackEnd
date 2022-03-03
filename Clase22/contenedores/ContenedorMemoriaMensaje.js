class ContenedorMemoriaMensaje {

    constructor() {
        this.elementosM = []
    }

    listar(id) {
        const elem = this.elementosM.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`Error al listar: elemento no encontrado`)
        } else {
            return elem
        }
    }

    listarAll() {
        return [ ...this.elementosM ]
    }

    guardar(newElem) {
        this.elementosM.push(newElem)
        return newElem
    }

    actualizar(elem) {
        elem.id = Number(elem.id)
        const index = this.elementosM.findIndex(p => p.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.elementosM[ index ] = elem
            return elem
        }
    }

    borrar(id) {
        const index = this.elementosM.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: elemento no encontrado`)
        } else {
            return this.elementosM.splice(index, 1)
        }
    }

    borrarAll() {
        this.elementosM = []
    }
}

export default ContenedorMemoriaMensaje