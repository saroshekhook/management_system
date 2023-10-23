import { Sequelize } from "sequelize";
import * as config from "./config/config";
import { configType } from "./config/types";
import { getEnv } from "./util/getEnv";

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(config[getEnv()] as configType);
    this.authenticate();
  }

  private async authenticate(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

const database = new Database();

export default database.sequelize;
