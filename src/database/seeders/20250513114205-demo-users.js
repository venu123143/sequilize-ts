'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: '$2a$12$YCMu4I7vP7QYQTzYpvIwhuNtKcpOVLk3z7Dpbb9Jo.oZ1CWFs0/3C', // password: admin123
        status: 'active',
        gender: 'male',
        role: 'admin',
        name: 'System Administrator',
        phone: '1234567890',
        address_line_one: '123 Admin Street',
        city: 'Tech City',
        state: 'Silicon State',
        zip: '12345',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'dealer1@example.com',
        password: '$2a$12$f9qwdYN4Hg5UqfmQA0d6x.9wVuzPGnpIyppeVYjnPuDtnWlxjuA3q', // password: dealer123
        status: 'active',
        gender: 'female',
        role: 'dealer',
        name: 'Jane Dealer',
        phone: '2345678901',
        address_line_one: '456 Shop Avenue',
        city: 'Market City',
        state: 'Commerce State',
        zip: '23456',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'dealer2@example.com',
        password: '$2a$12$f9qwdYN4Hg5UqfmQA0d6x.9wVuzPGnpIyppeVYjnPuDtnWlxjuA3q', // password: dealer123
        status: 'active',
        gender: 'male',
        role: 'dealer',
        name: 'John Trader',
        phone: '3456789012',
        address_line_one: '789 Market Blvd',
        city: 'Retail City',
        state: 'Sales State',
        zip: '34567',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'custom@example.com',
        password: '$2a$12$ZpshBZV/eLHXBR8Y9YcCRuOBuMONU2q8ZGwbPad0Cl0ywKmvQl.Ma', // password: custom123
        status: 'active',
        gender: 'others',
        role: 'custom',
        name: 'Alex Custom',
        phone: '4567890123',
        address_line_one: '101 User Road',
        city: 'Consumer City',
        state: 'Buyer State',
        zip: '45678',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'suspended@example.com',
        password: '$2a$12$ZpshBZV/eLHXBR8Y9YcCRuOBuMONU2q8ZGwbPad0Cl0ywKmvQl.Ma', // password: custom123
        status: 'suspended',
        gender: 'male',
        role: 'dealer',
        name: 'Sam Suspended',
        phone: '5678901234',
        address_line_one: '202 Blocked Lane',
        city: 'Restricted City',
        state: 'Limited State',
        zip: '56789',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};