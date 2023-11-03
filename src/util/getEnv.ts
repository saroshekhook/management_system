import { envTypes } from "../config/types";

// Retrieves environment variable values
export function getEnv(): envTypes {
  return (process.env.NODE_ENV as envTypes) || "development";
}
