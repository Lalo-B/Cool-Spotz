'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
};

const { Review } = require('../models');
const { faker } = require('@faker-js/faker');

const createRandomReview = (spotId) => {
  return {
    spotId: spotId,
    userId: faker.number.int({min:1,max:3}),
    review: faker.lorem.lines({min:1,max:3}),
    stars: faker.number.float({min:1,max:5,multipleOf:0.5})
  }
};
let seedArr = [];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    for(let i = 0; i <= 19; i++){
      seedArr.push(createRandomReview(i+1));
      seedArr.push(createRandomReview(i+1));
    };
    await Review.bulkInsert('Reviews',[...seedArr],options, { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, null, {});
  }
};
