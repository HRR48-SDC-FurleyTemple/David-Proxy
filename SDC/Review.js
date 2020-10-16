const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// dotenv.config();
const sequelize = new Sequelize('user_reviews', `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, { dialect: 'mysql', dialectOptions: { multipleStatements: true } });
// I might have to change the initiation, however this is how the data should be shaped

const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  product_id: { type: Sequelize.INTEGER, allowNull: false },
  user: { type: Sequelize.STRING, allowNull: false },
  score: { type: Sequelize.INTEGER, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  body: { type: Sequelize.STRING, allowNull: false },
  recommend: { type: Sequelize.BOOLEAN, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false },
  response_id: { type: Sequelize.INTEGER },
  ease: { type: Sequelize.INTEGER },
  value: { type: Sequelize.INTEGER },
  quality: { type: Sequelize.INTEGER },
  appearance: { type: Sequelize.INTEGER },
  works: { type: Sequelize.INTEGER },
});

module.exports = Review;
