import { QueryInterface, QueryTypes } from 'sequelize';

interface ProductData {
  title: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  original_price: number;
  thumbnail_img: string;
  overall_rating: number;
  details: string;
  seller: number;
  created_at: Date;
  updated_at: Date;
}

interface User {
  id: number;
}

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    // First, get the user IDs to use as sellers
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE role = "dealer"',
      {
        type: QueryTypes.SELECT,
        raw: true,
        plain: false
      }
    ) as User[];

    console.log('Fetched dealer users:', users);

    if (!users || users.length === 0) {
      console.log('No dealer users found. Skipping product seeding.');
      return;
    }

    console.log('Number of dealer users found:', users.length);

    const seller1Id = users[0]?.id;
    const seller2Id = users.length > 1 ? users[1]?.id : users[0]?.id;

    if (!seller1Id || !seller2Id) {
      console.log('Invalid seller IDs. Skipping product seeding.');
      return;
    }

    const products: ProductData[] = [
      {
        title: 'Smartphone X Pro',
        slug: 'smartphone-x-pro',
        description: 'Latest smartphone with advanced camera system and powerful processor.',
        price: 89900,
        discount: 5000,
        quantity: 100,
        original_price: 94900,
        thumbnail_img: '/images/products/smartphone-x-pro.jpg',
        overall_rating: 4.7,
        details: JSON.stringify({
          color: 'Midnight Black',
          memory: '128GB',
          processor: 'Octa-core',
          camera: '48MP + 12MP + 8MP',
          battery: '4500mAh'
        }),
        seller: seller1Id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Wireless Earbuds Pro',
        slug: 'wireless-earbuds-pro',
        description: 'Premium wireless earbuds with noise cancellation and crystal clear sound.',
        price: 12900,
        discount: 2000,
        quantity: 200,
        original_price: 14900,
        thumbnail_img: '/images/products/wireless-earbuds.jpg',
        overall_rating: 4.5,
        details: JSON.stringify({
          color: 'White',
          battery: '24 hours with case',
          connection: 'Bluetooth 5.2',
          noise_cancellation: 'Active',
          water_resistance: 'IPX4'
        }),
        seller: seller1Id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Ultra HD Smart TV 55"',
        slug: 'ultra-hd-smart-tv-55',
        description: 'Crystal clear 4K Ultra HD Smart TV with built-in streaming apps and voice control.',
        price: 59900,
        discount: 10000,
        quantity: 50,
        original_price: 69900,
        thumbnail_img: '/images/products/smart-tv-55.jpg',
        overall_rating: 4.8,
        details: JSON.stringify({
          size: '55 inches',
          resolution: '4K Ultra HD',
          refresh_rate: '120Hz',
          smart_features: 'Voice control, streaming apps',
          connectivity: 'Wi-Fi, Bluetooth, HDMI x3, USB x2'
        }),
        seller: seller2Id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Laptop Pro 15',
        slug: 'laptop-pro-15',
        description: 'Powerful laptop for professionals with high-performance CPU and graphics.',
        price: 119900,
        discount: 15000,
        quantity: 75,
        original_price: 134900,
        thumbnail_img: '/images/products/laptop-pro-15.jpg',
        overall_rating: 4.6,
        details: JSON.stringify({
          processor: 'Intel Core i7',
          memory: '16GB RAM',
          storage: '512GB SSD',
          display: '15.6" 4K OLED',
          graphics: 'NVIDIA RTX 3060'
        }),
        seller: seller2Id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Smart Watch Series 5',
        slug: 'smart-watch-series-5',
        description: 'Feature-packed smartwatch with health monitoring and workout tracking.',
        price: 29900,
        discount: 4000,
        quantity: 150,
        original_price: 33900,
        thumbnail_img: '/images/products/smart-watch-5.jpg',
        overall_rating: 4.4,
        details: JSON.stringify({
          display: '1.4" AMOLED',
          battery: 'Up to 7 days',
          water_resistance: '5ATM',
          sensors: 'Heart rate, SpO2, GPS',
          compatibility: 'Android & iOS'
        }),
        seller: seller1Id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    console.log('Generated products:', products.length);
    await queryInterface.bulkInsert('products', products);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('products', {}, {});
  }
}; 