require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  host:     process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect:  process.env.DB_DIALECT || 'mariadb',
  port: process.env.DB_PORT,
  dialectOptions: {
    collate: 'utf8mb4_general_ci',
  },
  storage: './__tests__/database.sqlite',
  operatorsAliases: true,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};