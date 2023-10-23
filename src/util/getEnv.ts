import { envTypes } from "../config/types";

export function getEnv(): envTypes {
  return (process.env.NODE_ENV as envTypes) || "development";
}
