const {db} =  require('./mariaDB.js');
const knex = require('knex')(db);


const producto = [
    {name: 'pastel',  price:1200},
    {name: 'pastel2', price:1200},
    {name: 'pastel3', price:1200},
    {name: 'pastel4', price:1200},
    {name: 'pastel5', price:1200}
]

knex('producto').insert(producto)
.then(()=> console.log('datos insertados'))
.catch((err)=>{
    console.log(err);
    throw err
})
.finally(()=>{
    knex.destroy();
})