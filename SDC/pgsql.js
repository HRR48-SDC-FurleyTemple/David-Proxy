const { Pool } = require( 'pg' );
const dotenv = require('dotenv').config({path: '../.env'});


// let connectionString = 'postgres://SDCman:SDCpass@localhost:5432/testdb2020';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb2020',
  password: 'postgres',
  port: 5432,
})

pool.connect()
  .then( result => { console.log('connected to pool')})
  .catch( ( err ) => {
    console.log( err )
  } );
/*************** NOTE TO DEVELOPER************/
// connection and models should be seppearated
/*************** NOTE TO DEVELOPER************/
const getUsers = ( req, res, id ) => {
  let now = Date.now();
  pool.query( `SELECT * FROM fake_reviews WHERE product_id = ${id}`,
    ( err, response ) => {
      if ( err ) {
        console.log( err )
      } else {
        console.log( ( Date.now() - now ) + 'ms' )
        res.send( response )
      }
  })
}


  // pool.connect()
  //   .then ( pool.query('SELECT * FROM fake_reviews WHERE product_id = 1',
  //   (err, res) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(res)
  //     }}))
  //   .catch( ( err ) => {
  //     console.log( err );
  //   })




module.exports ={
  getUsers
}