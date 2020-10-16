const faker = require( 'faker' );
const database = require( './index.js' );
const Review = require( './Review.js' );
const fs = require( 'fs' );
const path = require( 'path' );
const os = require( 'os' );
const filename = path.join( __dirname, 'seedable.csv' );

const output = [];

const generateScore = () => Math.ceil( Math.random() * 5 );

const generateReviewScores = () => {
  const subset = [ 'ease', 'value', 'quality', 'appearance', 'works' ];
  const subsetScores = {
    ease: generateScore(),
    value: generateScore(),
    quality: generateScore(),
    appearance: generateScore(),
    works: generateScore(),
  };

  if (Math.random() <= 0.75) {
    const index = Math.ceil(Math.random() * subset.length);
    const subsetName = subset[index];
    subsetScores[subsetName] = 0;
  }
  return subsetScores;
};

const generateSeedReviewData = () => {
  const data = [];
  for (let i = 0; i < 10000; i += 1) {
    // randomly generate between 15 and 25 reviews per product
    const numberOfReviews = Math.floor(Math.random() * 10) + 15;

    for (let j = 0; j < numberOfReviews; j += 1) {
      let review = faker.lorem.paragraph();
      if (review.length > 255) {
        review = review.slice(0, 255);
      }
      const subsetScores = generateReviewScores();
      const params = {
        product_id: i + 1,
        user: faker.internet.userName(),
        score: generateScore(),
        title: faker.lorem.words(),
        body: review,
        recommend: Math.random() >= 0.5,
        date: faker.date.past(),
        response_id: j === 0 ? i : null,
        ease: subsetScores.ease,
        value: subsetScores.value,
        quality: subsetScores.quality,
        appearance: subsetScores.appearance,
        works: subsetScores.works,
      };
      data.push(params);
    }
  }
  return data;
};
for ( let n = 0; n < 1; n++ ) {
  let randomDat = generateSeedReviewData()
  randomDat.forEach( ( obj , index ) => {
    if ( index === 1 ) {
      console.log( obj );

      for ( let prop in obj ) {
        console.log( obj[prop] );
      }
    }

  })

}
