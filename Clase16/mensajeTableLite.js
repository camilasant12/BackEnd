const {dbLite} = require('./mariaDBLite.js');
const knex = require('knex')(dbLite);


knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('username')
    table.string('texto')
})
.then(()=> console.log('tabla creada'))
.catch((err)=>{
    console.log(err);
    throw err
})
.finally(()=>{
    knex.destroy();
})