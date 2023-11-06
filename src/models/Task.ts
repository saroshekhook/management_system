import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

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
};

type TaskAttributesCreation = Optional<TaskAttributes, "id">;

class Task extends Model<TaskAttributes, TaskAttributesCreation> {
  declare id: number;
  declare description: string;
  declare status: TASK_Status;
}

Task.init(
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
        TASK_Status.inprogress,
        TASK_Status.done,
        TASK_Status.pending,
        TASK_Status.testing
      ),
      allowNull: false,
      defaultValue: TASK_Status.pending,
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
