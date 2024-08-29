'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
};

const seedArr = [];
const seedFunct = () => {
  for(let i = 0; i <= 11; i++){
    seedArr.push({
      reviewId: (i+1),
      url: "https://media.istockphoto.com/id/1293762741/photo/modern-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iZ561ZIXOtPYGSzqlKUnLrliorreOYVz1pzu8WJmrnc="
    });
  };
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    seedFunct();
    await queryInterface.bulkInsert(options, [...seedArr], { validate: true });
  },
  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
     await queryInterface.bulkDelete(options, null, {});

  }
};
