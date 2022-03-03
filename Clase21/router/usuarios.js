import { Router } from "express";
import ApiUsuariosMock from '../api/usuarios.js'

const apiUsuarios = new ApiUsuariosMock();
const router = Router();

router.post('/popular', async(req, res, next)=>{
    try {
        res.json(await apiUsuarios.popular(req.query.cant))
    } catch (error) {
        next(error)
    }
})

router.get('/', async(req, res, next)=>{
    try {
        res.json(await apiUsuarios.listarAll())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req, res, next)=>{
    try {
        res.json(await apiUsuarios.listar(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req, res, next)=>{
    try {
        res.json(await apiUsuarios.guardar(req.body))
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async(req, res, next)=>{
    try {
        res.json(await apiUsuarios.actualizar({...req.body, id: req.params.id}))
    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, netx)=>{
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

export default router