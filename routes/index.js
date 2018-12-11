const authRoutes = require('./auth');
const carRoutes = require('./car');

module.exports = carRoutes.concat(authRoutes);