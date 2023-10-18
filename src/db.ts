import { Sequelize } from "sequelize";
import development from "./config/database";

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(development.development);
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
