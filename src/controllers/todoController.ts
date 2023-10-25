import { Request, Response } from "express";
import TODO, { TODO_Status } from "../models/Todo";
import { Op } from "sequelize";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    req.query.index;
    const todos = await TODO.findAll({
      where: {
        status: { [Op.or]: [TODO_Status.done, TODO_Status.inprogress] },
      },
    });
    res.status(200).json(todos || []);
  } catch (error) {
    console.error("Error in getAllTodos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TODO.create({
      description: req.body.description,
      status: TODO_Status.inprogress,
    });
    res.status(200).json(todo.toJSON());
  } catch (error) {
    console.error("Error in createTodo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo = await TODO.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!todo)
      return res.status(200).json({ description: "id not found try again" });

    todo.description = req.body.description;
    await todo.save();
    return res
      .status(200)
      .json({ description: "description has been changed" });
  } catch (error) {
    console.error("Error in updateTodo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoDeleted = await TODO.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!todoDeleted)
      return res.status(200).json({ description: "id not found try again" });

    await todoDeleted?.destroy();
    return res.status(200).json({ description: "deleted" });
  } catch (error) {
    console.error("Error in deleteTodo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
