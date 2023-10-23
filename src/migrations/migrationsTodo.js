const { DataTypes } = require("sequelize");
const { TODO_Status } = require("../dist/models/Todo.js");

const up = async (queryInterface) => {
  await queryInterface.createTable("Todo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        TODO_Status.deleted,
        TODO_Status.inprogress,
        TODO_Status.done
      ),
      allowNull: false,
    },
  });
};

const down = async (queryInterface) => {
  await queryInterface.dropTable("Todo");
};

module.exports = { up, down };
