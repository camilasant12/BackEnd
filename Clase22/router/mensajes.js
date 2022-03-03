import { Router } from "express";
import ApiMensajesMock from '../api/mensajes.js'

const apiMensajes = new ApiMensajesMock();
const routerM = Router();

routerM.post('/mensajes', async(req, res, next)=>{
    try {
        res.json(await apiMensajes.mensajes(req.query.cant))
    } catch (error) {
        next(error)
    }
})

routerM.get('/', async(req, res, next)=>{
    try {
        res.json(await apiMensajes.listarAll())
    } catch (error) {
        next(error)
    }
})

routerM.get('/:id', async(req, res, next)=>{
    try {
        res.json(await apiMensajes.listar(req.params.id))
    } catch (error) {
        next(error)
    }
})

routerM.post('/', async(req, res, next)=>{
    try {
        res.json(await apiMensajes.guardar(req.body))
    } catch (error) {
        next(error)
    }
})

routerM.put('/:id', async(req, res, next)=>{
    try {
        res.json(await apiMensajes.actualizar({...req.body, id: req.params.id}))
    } catch (error) {
        next(error)
    }
})

routerM.use((err, req, res, netx)=>{
    const erroresNoEncontrado =[
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al eliminar: elemento no encontrado',
    ]
    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    }else{
        res.status(500)
    }
    res.json({message:err.message})
})

export default routerM