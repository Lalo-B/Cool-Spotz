'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
};

const { Booking } = require('../models');
const { faker } = require('@faker-js/faker');

const bookingArr = [
  {
    spotId: 15,
    userId: 1,
    startDate: new Date('2024-6-24'),
    endDate: new Date('2024-7-1')
  },
  {
    spotId: 11,
    userId: 2,
    startDate: new Date('2024-6-24'),
    endDate: new Date('2024-7-1')
  },
  {
    spotId: 5,
    userId: 3,
    startDate: new Date('2024-6-24'),
    endDate: new Date('2024-7-1')
  },
];
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [...bookingArr], {});
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, null, {});

  }
};
