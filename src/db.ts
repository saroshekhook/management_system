// src/db.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connection has been established successfully.");
    return res;
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  })
  .then(() => {
    return sequelize.sync();
  })
  .then(() => {
    console.log("tables are in sync with ORM");
  })
  .catch((error) => {
    console.error("error in sync", error);
  });

export default sequelize;
