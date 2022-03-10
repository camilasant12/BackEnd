const express = require ('express')
const cookieParser = require('cookie-parser')

const app = express()
//app.use(cookieParser())
app.use(cookieParser('my-secret'))
//app.use(cookieParser(['my-secret', 'another-secret']))
app.use((req, res, next)=>{
    console.dir(req.cookies)
    console.dir(req.signedCookies)
    next()
})
app.get('/', (req, res)=>{
    res.send('Servidor Express OK')
})

app.get('/set', (req, res)=>{
    res.cookie('regular', 'cookie')
    res.send('Cookie Set')
})

app.get('/setJSON', (req, res)=>{
    res.cookie('json',{tipo:'Cookie', nombre:'cuqui'})
    res.send('Cookie Set JSON')
})

app.get('/setEx', (req, res)=>{
    res.cookie('server2', 'express2', {maxAge:30000})
    res.send('Cookie SetEX')
})

app.get('/setSigned', (req, res)=>{
    res.cookie('signed', 'cookie', {signed:true})
    res.send('Cookie SetSigned')
})

app.get('/get/:nombre', (req, res)=>{
    const cookieName = req.params.nombre
    const jsonCookie = req.cookies[cookieName]
    res.json(jsonCookie)
})

app.get('/get', (req, res)=>{
    res.json({notSigned:req.cookies, signed:req.signedCookies})
})

app.get('/clr', (req, res)=>{
    for (const cookieName of Object.keys(req.cookies)) {
        res.clearCookie(cookieName)
    }
    for (const signedCookieName of Object.keys(req.signedCookies)) {
        res.clearCookie(signedCookieName)
    }
    res.send('Clear Cookies')
})

const PORT =8080;

const srv = app.listen(PORT, () => { 
    console.log(`Servidor Http con Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))

