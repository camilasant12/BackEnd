const {db} = require('./mariaDB.js');
const knex = require('knex')(db);


knex.schema.createTable('producto', table => {
    table.increments('id')
    table.string('name')
    table.integer('price')
})
.then(()=> console.log('tabla creada'))
.catch((err)=>{
    console.log(err);
    throw err
})
.finally(()=>{
    knex.destroy();
})