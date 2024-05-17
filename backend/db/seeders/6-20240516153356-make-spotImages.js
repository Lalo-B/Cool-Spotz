'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
};

const { SpotImage } = require('../models');
const { faker } = require('@faker-js/faker');

const seedArr = [];
const seedFunct = () => {
  for(let i = 0; i <= 19; i++){
    seedArr.push({
      spotId: (i+1),
      url: 'https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=1024x1024&w=is&k=20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=',
      preview:false
    });
  };
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    seedFunct();
    await queryInterface.bulkInsert(options, [...seedArr], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
