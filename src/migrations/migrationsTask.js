const { TASK_Status } = require("../models/Task");

const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable("Task", {
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
        TASK_Status.inprogress,
        TASK_Status.done,
        TASK_Status.pending,
        TASK_Status.testing
      ),
      allowNull: false,
      defaultValue: TASK_Status.pending,
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
  await queryInterface.dropTable("Task");
};

module.exports = { up, down };
