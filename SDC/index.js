require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const Review = require('./Review.js');
const pool = require( './pgsql.js' );
// const { Pool } = require( 'pg' );
// const cass = require( './cassie.js' );
// const Sequelize = require('sequelize');

/******************* */
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'testdb2020',
//   password: 'postgres',
//   port: 5432,
// })
// console.log(pool.password)
// pool.connect()
// .catch( ( err ) => {
//   console.log( err )
// } )
/******************** */

dotenv.config();
// const sequelize = new Sequelize('user_reviews', `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, { dialect: 'mysql', dialectOptions: { multipleStatements: true } });

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
app.use('/products', express.static(path.join(__dirname, 'client', 'dist')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/products/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.get('/api/testing/test', ( req, res ) => {
  pool.getUsers( req, res );
});

/*http://localhost:3000/api/reviews/products/:productId*/
/*SEND WITH...........*/
app.get('/api/reviews/products/:productId', ( req, res ) => {
   pool.getUsers( req, res, req.params.productId );
})

// app.get('/api/reviews/products/all',
//   ( req, res ) => se)

app.post('/api/reviews/products/:productId',
  ( req, res ) => {
    let insertable = {
      product_id: req.body.product_id, // INT
      user: req.body.user, // STRING
      score: req.body.score, // INT
      title: req.body.title, // STRING
      body: req.body.body, // STRING
      recommend: true, // BOOL
      date: '10/15/2020',
      response_id: req.body.response_id, // INT
      ease: req.body.ease, // INT
      value: req.body.value, // INT
      quality: req.body.quality, // INT
      appearance: req.body.appearance, // INT
      works: req.body.works, // INT
    }
    Review.create( insertable )
    .then( res.send('okay'))
    .catch( ( error ) => {
      console.log( error );
      res.send(' error ')
    } )})

app.put('/api/reviews/update/:productId/:userName', // updates by changing review to a different product based on user and product target { type: Sequelize.QueryTypes.UPDATE}
  ( req, res ) => sequelize.query( `UPDATE reviews SET product_id = ${ req.param( 'productId' ) } WHERE user = '${ req.param( 'userName' ) }'` )
  .then( res.send( 'okay' ) )
  .catch( ( error ) => res.send( `There was an error changing ${ req.param( 'userName' ) } review to ${ req.param( 'productId' ) } product`)));

app.delete('/api/reviews/delete/:productId/:userName',
  ( req, res ) => sequelize.query( `DELETE FROM reviews WHERE product_id = '${ req.param( 'productId' ) }' AND user = '${ req.param( 'userName' ) }'`)
  .then( res.send( 'deleted' ))
  .catch( ( error ) => console.log( `There was an error: ${ error } deleting ${ req.param( 'userName' ) } review from ${ req.param( 'productId' ) } product` )));


app.listen(port, () => { console.log(`listening on port ${port}`); });

module.exports.server = app;
