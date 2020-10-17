const { Client } = require( 'pg' );
const express = require( 'express' );
const dotenv = require('dotenv').config({path: '../.env'});

let app = express();

let connectionString = 'postgres://postgres:postgres@localhost:5432/testdb2020';

const client = new Client({
  connectionString: connectionString
})

client.connect();

app.set( 'port', process.env.PORT || 4000 );

app.get( '/', ( req, res, next ) => {
  client.query('SELECT * FROM Employee WHERE id = $1', [1], ( err, result ) => {
    if ( err ) {
      console.log( err );
      res.status( 400 ).send( err );
    }
    res.status( 200 ).send( result.rows );
  });
});

app.listen( 4000, ( err, success ) => {
  if ( err ) {
    console.log( `There was an error::: ${ err }`)
  } else {
    console.log( `Server is running.. on Port ${process.env.PORT}` );
  }
});


// const Sequelize = require('sequelize');
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config();

// const connection = mysql.createConnection({
//   user: `${process.env.DB_USERNAME}`,
//   password: `${process.env.DB_PASSWORD}`,
// }).then((db) => {
//   db.query('CREATE DATABASE IF NOT EXISTS user_reviews').then(() => {
//     db.end();
//   });
// });

// module.exports = connection;
