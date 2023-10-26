import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

export enum TASK_Status {
  done = "done",
  inprogress = "inprogress",
  deleted = "deleted",
}

type TaskAttributes = {
  id: number;
  description: string;
  status: TASK_Status;
};

type TaskAttributesCreation = Optional<TaskAttributes, "id">;

class TASK extends Model<TaskAttributes, TaskAttributesCreation> {
  declare id: number;
  declare description: string;
  declare status: TASK_Status;
}

TASK.init(
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
        TASK_Status.deleted,
        TASK_Status.inprogress,
        TASK_Status.done
      ),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "Task",
  }
);

export default TASK;
