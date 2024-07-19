'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
};

const { SpotImage } = require('../models');
const { faker } = require('@faker-js/faker');

const seedArr = [];
const seedFunct = () => {
  for(let i = 0; i <= 11; i++){
    seedArr.push({
      spotId: (i+1),
      url: 'https://media.istockphoto.com/id/1272163106/photo/large-house-with-steep-roof-and-side-entry-three-car-garage.jpg?s=1024x1024&w=is&k=20&c=WEwH-MlAqCy2kSbnaWf1ZQLHhQJHUT3avWrSacFo3Ls=',
      preview:false
    });
    seedArr.push({
      spotId: (i+1),
      url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg',
      preview:false
    });
    seedArr.push({
      spotId: (i+1),
      url: 'https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_1280.jpg',
      preview:false
    });
    seedArr.push({
      spotId: (i+1),
      url: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg',
      preview:false
    });
    seedArr.push({
      spotId: (i+1),
      url: 'https://cdn.pixabay.com/photo/2021/12/18/06/01/bathroom-6878007_1280.jpg',
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
