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
    - Creates a new object based on keys provided
    - product_id: req.body.product_id, // INT
    - user: req.body.user, // STRING
    - score: req.body.score, // INT
    - title: req.body.title, // STRING
    - body: req.body.body, // STRING
    - recommend: true, // BOOL
    - date: '10/15/2020',
    - response_id: req.body.response_id, // INT
    - ease: req.body.ease, // INT
    - value: req.body.value, // INT
    - quality: req.body.quality, // INT
    - appearance: req.body.appearance, // INT
    - works: req.body.works, // INT
 - PUT /api/reviews/update/:productId/:userName
    - Updates a target based on productId and userName
 - DELETE
    - Deletes a target based on the productsId and the userName