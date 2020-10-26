require('../newrelic');
const express = require( 'express' );
const axios = require( 'axios' );

const app = express();
const port = process.env.PROXY_PORT || 4001;

app.use(express.json());
app.use(express.urlencoded());

app.get( '/api/reviews/products/:productId',
  ( req, res ) => {
    axios.get( `http://localhost:3000/api/reviews/products/${req.params.productId}` )
      .then( ( response ) => {
        res.send( response.data )
      })
      .catch( ( err ) => {
        console.log( err );
        res.send( 'there was an error' );
      })
  });

app.listen( port, () => { console.log( `listening on port ${port}` ); });
