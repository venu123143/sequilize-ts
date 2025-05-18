const path = require('path');

const configration = {
    'config': path.resolve('dist/config', 'config.js'),
    'models-path': path.resolve('dist', 'models'),
    'seeders-path': path.resolve('dist/database', 'seeders'),
    'migrations-path': path.resolve('dist/database', 'migrations')
};



console.log('config', configration.config);
console.log('models-path', configration['models-path']);
console.log('seeders-path', configration['seeders-path']);
console.log('migrations-path', configration['migrations-path']);

module.exports = configration;