var dbLite = require('knex')({ 
    client: 'sqlite3',
    connection: {filename: ' ./DB/mydb.sqlite '},
    useNullAsDefault: true
  })
  
  module.exports ={
    dbLite
  }