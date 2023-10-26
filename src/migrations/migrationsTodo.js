const { TODO_Status } = require("../models/Todo");

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("Todo", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.ENUM(
        TODO_Status.deleted,
        TODO_Status.inprogress,
        TODO_Status.done
      ),
      allowNull: false,
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
  await queryInterface.dropTable("Todo");
};

module.exports = { up, down };
