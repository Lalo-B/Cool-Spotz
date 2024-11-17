'use strict';
const { Spot } = require('../models');
const { faker } = require('@faker-js/faker');
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}

const createRandomSpot = () => {
  return {
    ownerId: faker.number.int({min: 1, max: 3}),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
    name: faker.lorem.words({min:1,max:4}),
    description: faker.lorem.lines({min:2, max:3}),
    price: faker.commerce.price({min: 40, max: 500,dec: 0, symbol: '$'}),
    averageRating: 4.0
  }
};
let seedArr = [];
//we can make as much data as we want with this
// we need to change the seed data! @Lalo-B woah thats cool
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    for (let i = 0; i <= 11; i++) {
      const spot = createRandomSpot();
      seedArr.push(spot);
    };
    await Spot.bulkCreate([...seedArr],options, { validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options,null,{});
  }
};
