const express= require('express');
const multer = require('multer');
const port = 8080;

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage})


app.post('/uploadfile', upload.single('MyFile'), (req, res, next)=>{
    const file = req.file
    if(!file){
        const error = new Error('suba archivo');
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

const  server = app.listen(port, () =>{
    console.log(`Servidor HTTP escuchando en el puerto:${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor:${error}`))
