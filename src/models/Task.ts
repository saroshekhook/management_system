import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
import User from "./User";

export enum TASK_Status {
  done = "done",
  inprogress = "inprogress",
  pending = "pending",
  testing = "testing",
}

type TaskAttributes = {
  id?: number;
  description?: string;
  status?: TASK_Status;
  userId?: number;
};

type TaskAttributesCreation = Optional<TaskAttributes, "id">;

class Task extends Model<TaskAttributes, TaskAttributesCreation> {
  declare id: number;
  declare description: string;
  declare status: TASK_Status;
  declare userId?: number;
}

Task.init(
  {
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
        TASK_Status.inprogress,
        TASK_Status.done,
        TASK_Status.pending,
        TASK_Status.testing
      ),
      allowNull: false,
      defaultValue: TASK_Status.pending,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    modelName: "Task",
    tableName: "Task",
  }
);

export default Task;
