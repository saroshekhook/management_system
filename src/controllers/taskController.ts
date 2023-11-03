import { Request, Response } from "express";
import Task, { TASK_Status } from "../models/Task";
import { Op } from "sequelize";

// Retrieves all tasks from the database
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    req.query.index;
    const tasks = await Task.findAll({
      where: {
        status: {
          [Op.or]: [
            TASK_Status.done,
            TASK_Status.inprogress,
            TASK_Status.pending,
            TASK_Status.testing,
          ],
        },
      },
    });
    res.status(200).json(tasks || []);
  } catch (error) {
    console.error("Error in getAllTasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Creates a new tast in the database
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({
      description: req.body.description,
    });
    res.status(200).json(task.toJSON());
  } catch (error) {
    console.error("Error in createTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Updates an existing task in the database
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!task)
      return res.status(200).json({ description: "id not found try again" });

    task.description = req.body.description;
    await task.save();
    return res
      .status(200)
      .json({ description: "description has been changed" });
  } catch (error) {
    console.error("Error in updateTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Deletes a task from the database
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskDeleted = await Task.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!taskDeleted)
      return res.status(200).json({ description: "id not found try again" });

    await taskDeleted?.destroy();
    return res.status(200).json({ description: "deleted" });
  } catch (error) {
    console.error("Error in deleteTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
