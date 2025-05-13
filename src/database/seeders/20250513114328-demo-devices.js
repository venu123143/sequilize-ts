'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the user IDs first
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (users.length === 0) {
      console.log('No users found. Skipping device seeding.');
      return;
    }

    // Create devices for each user
    const devices = [];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
    const deviceTypes = ['desktop', 'mobile', 'tablet'];
    
    users.forEach(user => {
      // Generate 1-3 devices per user
      const numDevices = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numDevices; i++) {
        const browserIndex = Math.floor(Math.random() * browsers.length);
        const typeIndex = Math.floor(Math.random() * deviceTypes.length);
        
        devices.push({
          name: `${user.id}-${deviceTypes[typeIndex]}-${i + 1}`,
          type: deviceTypes[typeIndex],
          auth_token: Buffer.from(`${user.id}-token-${Date.now()}-${i}`).toString('base64'),
          browser: browsers[browserIndex],
          user_id: user.id,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('devices', devices);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('devices', null, {});
  }
};