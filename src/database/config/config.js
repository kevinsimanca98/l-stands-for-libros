require('dotenv').config()

module.exports = {
  "development": {
    "username": "root",
    "password": "1234",
    "database": "l_stands_for_libros",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  },
  "test": {
    "username": "root",
    "password": "1234",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}