var dbLite = require('knex')({ 
    client: 'sqlite3',
    connection: {filename: './DB/ecomerce.sqlite'},
    useNullAsDefault: true
  })
  
  module.exports ={
    dbLite
  }