const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize('user_reviews', `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, { dialect: 'mysql', dialectOptions: { multipleStatements: true } });

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
app.use('/products', express.static(path.join(__dirname, 'client', 'dist')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/products/*', (req, res) => { res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); });

app.get('/api/reviews/products/:productId',
  (req, res) => sequelize.query(`SELECT * FROM reviews WHERE product_id = ${req.param('productId')} ORDER BY date DESC`, { type: Sequelize.QueryTypes.SELECT })
    .then((result) => res.send(result))
    .catch((error) => res.send(error)));

app.post('/api/reviews/products/:productId',
  ( req, res ) => sequelize.query()
  .catch( ( error ) => { console.log( 'There was an error, contact support' ) } ))

app.put('/api/reviews/update/:productId/:userName', // updates by changing review to a different product based on user and product target
  ( req, res ) => sequelize.query( `UPDATE reviews SET product_id = ${ req.param( 'productId' ) } WHERE user = '${ req.param( 'userName' ) }'`)
  .then( res.send( 'okay' ) )
  .catch( ( error ) => res.send( `There was an error changing ${ req.param( 'userName' ) } review to ${ req.param( 'productId' ) } product`)));

app.delete('/api/reviews/delete/:productId/:userName',
  ( req, res ) => sequelize.query( `DELETE FROM reviews WHERE product_id = '${ req.param( 'productId' ) }' AND user = '${ req.param( 'userName' ) }'`)
  .then( res.send( 'deleted' ))
  .catch( ( error ) => console.log( `There was an error: ${ error } deleting ${ req.param( 'userName' ) } review from ${ req.param( 'productId' ) } product` )));


app.listen(port, () => { console.log(`listening on port ${port}`); });

module.exports.server = app;
