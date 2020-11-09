# review
A backend postgres derived system designed to supply a point of sale ecommerce site with a steady connection for large volumes of requests.

## setup

1. To install dependencies: `npm install`
2. Create a .env file in your root directory and add these configs:
    - `NODE_ENV=development`
    - `PORT=3000`
    - `DB_USERNAME=<username>`
    - `DB_PASSWORD=<password>`
3. To seed the database:
   - log into postgres with postgress
   - create database 'testdb2020' WITH USER poastgres
   - coppy paste the following into your postgres CLI
      CREATE TABLE fake_reviews (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      username VARCHAR(100),
      score INTEGER NOT NULL,
      title VARCHAR(100) NOT NULL,
      body VARCHAR (100) NOT NULL,
      recommend BOOLEAN NOT NULL,
      date VARCHAR (100) NOT NULL,
      response_id INTEGER,
      ease INTEGER,
      value INTEGER,
      quality INTEGER,
      appearance INTEGER,
      works INTEGER);

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