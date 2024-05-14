'use strict';
const { Spot } = require('../models');
const { faker } = require('@faker-js/faker');
let options = {};
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
    description: faker.lorem.lines({min:2, max:4}),
    price: faker.commerce.price({min: 40, max: 2500,dec: 0, symbol: '$'})
  }
};
let seedArr = [];
//we can make as much data as we want with this
const factory=()=>{
  for(let i = 0; i <= 19; i++){
    let spot = createRandomSpot();
    seedArr.push(spot);
  };
};
factory();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([...seedArr], { validate: true});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, {
      name: seedArr.map(spot=>spot.name)
    }, {});
  }
};
