const { USER_Type } = require("../models/User");

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("User", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.DataTypes.ENUM(
        USER_Type.admin,
        USER_Type.head,
        USER_Type.developer
      ),
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: new Date(),
    },
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable("User");
};

module.exports = { up, down };
