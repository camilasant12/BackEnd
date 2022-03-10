const express = require ('express')
const cookieParser = require('cookie-parser')

const app = express()
//app.use(cookieParser())
app.use(cookieParser('montoto'))
app.use(express.json())
//app.use(cookieParser(['my-secret', 'another-secret']))
app.post('/cookies', (req,res)=>{
    const{nombre, valor, tiempo} = req.body
    console.log(nombre, valor, tiempo)
    if(!nombre || !valor){
        return res.json({error:'falta nombre o valor'})
    }
    if(tiempo){
        res.cookie(nombre, valor,{signed:true, maxAge:1000*parseInt(tiempo)})
    }else{
        res.cookie(nombre, valor, {signed:true})
    }
    res.json({process:'ok'})
})

app.get('/cookies', (req, res)=>{
    res.json({notSigned:req.cookies, signed:req.signedCookies})
})

app.delete('/cookies/:nombre', (req, res)=>{
    const {nombre} = req.params
    if(!req.cookies[nombre] && !req.signedCookies[nombre]){
        res.json({error:'nombre de cookie invalido'})
    }else{
        res.clearCookie(nombre)
        res.json({process:'ok'})
    }
})

const PORT =8080;

const srv = app.listen(PORT, () => { 
    console.log(`Servidor Http con Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

