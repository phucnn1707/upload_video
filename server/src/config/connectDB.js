const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: process.env.QUERY_LOG === 'true',
  dialectOptions: {
    charset: 'utf8mb4',
  },
});

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('MySQL connected');
      return;
    } catch (error) {
      console.error(`Unable to connect to the MySQL database. Retries left: ${retries - 1}`, error.message);
      retries -= 1;
      if (retries === 0) {
        console.error('Exhausted all retries. MySQL connection failed.');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

module.exports = { sequelize, connectDB };
