const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'test',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.QUERY_LOG === 'true',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
};

module.exports = { sequelize, connectDB };
