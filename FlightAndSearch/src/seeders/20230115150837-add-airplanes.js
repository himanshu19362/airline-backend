'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Airplanes' , [
      {
        modelNumber : 'Wright Flyer' , 
        capacity : 250 , 
        createdAt : new Date() ,
        updatedAt : new Date()
      } , 
      {
        modelNumber : 'Supermarine Spitfire' , 
        capacity : 280 , 
        createdAt : new Date() ,
        updatedAt : new Date()
      } , 
      {
        modelNumber : 'Boeing 787' , 
        capacity : 200 , 
        createdAt : new Date() ,
        updatedAt : new Date()
      } , 
      {
        modelNumber : 'Lockheed SR-71 Blackbird' , 
        capacity : 180 , 
        createdAt : new Date() ,
        updatedAt : new Date()
      } , 
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
