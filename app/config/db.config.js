module.exports = {
  HOST:process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT || 3306),
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME
};
