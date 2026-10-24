const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL ligado.');
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas.');
  } catch (err) {
    console.error('Erro ao ligar ao PostgreSQL:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
