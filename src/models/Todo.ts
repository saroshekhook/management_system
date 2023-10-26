import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

export enum TODO_Status {
  done = "done",
  inprogress = "inprogress",
  deleted = "deleted",
}

type TodoAttributes = {
  id: number;
  description: string;
  status: TODO_Status;
};

type TodoAttributesCreation = Optional<TodoAttributes, "id">;

class TODO extends Model<TodoAttributes, TodoAttributesCreation> {
  declare id: number;
  declare description: string;
  declare status: TODO_Status;
}

TODO.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // Model attributes are defined here
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
  },
  {
    timestamps: true,
    sequelize,
    tableName: "Todo",
  }
);

export default TODO;
