import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
import * as bcrypt from "bcrypt";

export enum USER_Type {
  admin = "admin",
  head = "head",
  developer = "developer",
}

type UserAttributes = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  type?: USER_Type;
};

type UserAttributesCreation = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserAttributesCreation> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare type: USER_Type;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        USER_Type.admin,
        USER_Type.head,
        USER_Type.developer
      ),
      defaultValue: USER_Type.developer,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "User",
    hooks: {
      async beforeCreate(user: User) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
      async beforeUpdate(user: User) {
        if (user.changed("password")) {
          try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
          } catch (error) {
            console.error("Error hashing password", error);
          }
        }
      },
    },
  }
);

export default User;
