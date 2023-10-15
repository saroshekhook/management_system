// src/controllers/databaseController.ts
import { Request, Response } from "express";
import TODO, { TODO_Status } from "../models/Todo";
import { Op } from "sequelize";
import { log } from "console";
// import * as databaseService from '../services/todoServices';

export const getAllTodos = async (req: Request, res: Response) => {
  req.query.index;
  // Retrieve a list of tables
  const todos = await TODO.findAll({
    where: {
      status: { [Op.or]: [TODO_Status.done, TODO_Status.inprogress] },
    },
  });

  res.status(200).json(todos || []);
};

export const createTodo = async (req: Request, res: Response) => {
  log(req.body);
  const todo = await TODO.create({
    description: req.body.description || "Saro is testing the description",
    status: TODO_Status.inprogress,
  });
  res.status(200).json(todo.toJSON());
};

export const updateTodo = async (req: Request, res: Response) => {
  const todo = await TODO.findOne({
    where: { id: Number(req.params.id) },
  });
  if (!todo)
    return res.status(200).json({ description: "id not found try again" });

  todo.description = "changing the desc";
  await todo.save();
  return res.status(200).json({ description: "description has been changed" });
};

export const deleteTodo = async (req: Request, res: Response) => {
  // Delete a table
  const todoDeleted = await TODO.findOne({
    where: { id: Number(req.params.id) },
  });
  if (!todoDeleted)
    return res.status(200).json({ description: "id not found try again" });

  await todoDeleted?.destroy();
  return res.status(200).json({ description: "deleted" });
};
