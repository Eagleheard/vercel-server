import Sequelize from 'sequelize';
import config from 'dotenv/config';

export let database;

if (process.env.NODE_ENV === "production") {
  database = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres',
    define: {
      underscored: true,
      timestamps: false,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)
} else {
database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
      underscored: true,
      timestamps: false,
    },
  },
);
}
