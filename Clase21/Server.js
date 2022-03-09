import express, {json} from 'express'
import usuariosRouter from './router/usuarios.js'

const app = express()
app.use(json())

app.use('/api/usuario', usuariosRouter)

const PORT =8080;

const srv = app.listen(PORT, () => { 
    console.log(`Servidor Http con Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

