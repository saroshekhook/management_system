import { QueryInterface, DataTypes } from "sequelize";
import { TODO_Status } from "../models/Todo";

export const up = async (queryInterface: QueryInterface) => {
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

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable("Todo");
};
