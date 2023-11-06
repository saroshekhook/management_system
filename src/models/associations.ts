import User from "./User";
import Task from "./Task";

Task.belongsTo(User, { foreignKey: "userId", as: "users" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
