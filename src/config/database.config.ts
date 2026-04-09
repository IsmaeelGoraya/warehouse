import { Sequelize } from "sequelize";
import pg from "pg";

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;


const sequelize = new Sequelize({
  dialect: "postgres",
  dialectModule: pg,
  host: DB_HOST || "localhost",
  port: DB_PORT ? parseInt(DB_PORT) : 5432,
  username: DB_USERNAME || "ismaeelshujaat",
  password: DB_PASSWORD || "",
  database: DB_NAME || "warehouse",
  logging: false,
});

export default sequelize;