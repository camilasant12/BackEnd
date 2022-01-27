const {db} =  require('./mariaDB.js');
const knex = require('knex')(db);



knex.from('producto').select("*")
.then((rows) => {
    for (row of rows){
        console.log(`${row['id']} ${row['name']} ${row['price']}`);
    }
})
.catch((err)=>{
    console.log(err);
    throw err
})
.finally(()=>{
    knex.destroy();
})