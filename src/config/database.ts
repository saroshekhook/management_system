import { Dialect } from "sequelize";

interface DatabaseConfigAttributes {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

const development: DatabaseConfigAttributes = {
  username: "root",
  password: "admin",
  database: "db",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
};

export default { development };
