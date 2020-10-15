# review

## setup

1. To install dependencies: `npm install`
2. Create a .env file in your root directory and add these configs:
    `NODE_ENV=development`
    `PORT=3000`
    `DB_USERNAME=<username>`
    `DB_PASSWORD=<password>`
3. To setup the database: `npm run seed`
4. To start the server: `npm start`

## API
 - GET /api/reviews/products/:productId
    - Returns selected product's reviews
 - POST /api/reviews/products/:productId
    - Creates a new object
 - PUT /api/reviews/update/:productId/:userName
    - Updates a target based on productId and userName
 - DELETE
    - Deletes a target based on the productsId and the userName