import { Options } from "sequelize";

export type configType = {
  username: Options["username"];
  password: Options["password"];
  database: Options["database"];
  host: Options["host"];
  port: Options["port"];
  dialect: Options["dialect"];
};

export type envTypes = "development" | "production" | "test";
