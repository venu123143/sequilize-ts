import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

interface DeviceData {
  name: string;
  type: string;
  auth_token: string;
  browser: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: number;
}

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Get the user IDs first using a direct query
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users',
      {
        type: QueryTypes.SELECT,
        raw: true,
        plain: false
      }
    ) as User[];
    
    console.log('Fetched users:', users);
    
    if (!users || users.length === 0) {
      console.log('No users found. Skipping device seeding.');
      return;
    }

    console.log('Number of users found:', users.length);

    // Create devices for each user
    const devices: DeviceData[] = [];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
    const deviceTypes = ['desktop', 'mobile', 'tablet'];
    
    for (const user of users) {
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
    }

    console.log('Generated devices:', devices.length);
    await queryInterface.bulkInsert('devices', devices);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('devices', {}, {});
  }
}; 