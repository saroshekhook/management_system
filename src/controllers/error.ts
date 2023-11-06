import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";

export class MyError extends Error {
  private _statusCode: number = 404;
  private _data: any | undefined;
  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this._statusCode = statusCode;
    this._data = data;
  }

  public get statusCode() {
    return this._statusCode;
  }

  public get data() {
    return this._data;
  }

  public set statusCode(statusCode: number) {
    this._statusCode = statusCode;
  }
}

export const errorThrower = function (
  errMessage: string,
  statusCode: number,
  data?: any
) {
  throw new MyError(errMessage, statusCode, data);
  //   throw error;
};

export const errorCatcher = function (next: NextFunction, err: MyError) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

export const errorValidation = function (req: Request) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errorThrower("Validation Failed", 422, errors.mapped());
  }
};
