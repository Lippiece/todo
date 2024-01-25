import type { Handler, NextFunction, Request, Response } from "express"
import { body, validationResult } from "express-validator"
import HttpStatusCodes from "src/constants/HttpStatusCodes"
import Task from "src/models/Task"

export const taskGetAll: Handler = async (_req, res) => {
  const tasks = await Task.find({}).exec()

  res.json(tasks)
}
export const taskGet: Handler = async (req, res) => {
  const id   = req.url.split("/").pop()
  const task = await Task.findById(id).exec()

  res.json(task)
}
export const taskAdd = [
  body("name").trim().escape().isLength({ min: 1 }),
  body("description").trim().escape().isLength({ min: 1 }),
  body("status").isIn(["todo", "doing", "done"]),

  async (req: Request, res: Response) => {
    const task = new Task({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    })

    await task.save()
    res.status(HttpStatusCodes.CREATED).json({ url: task.url })
  },
]
export const taskUpdate = [
  body("name").trim().escape().isLength({ min: 1 }),
  body("description").trim().escape().isLength({ min: 1 }),
  body("status").isIn(["todo", "doing", "done"]),

  async (req: Request, res: Response, next: NextFunction) => {
    const vaidation = validationResult(req)

    if (!vaidation.isEmpty()) {
      next(vaidation.array())
    }

    const id   = req.url.split("/").at(-2)
    const task = await Task.findById(id).exec()

    if (!task) {
      res.sendStatus(HttpStatusCodes.NOT_FOUND)

      return
    }

    Object.entries(req.body).map(([key, value]: [string, any]) => {
      if (key in task) {
        // @ts-expect-error
        task[key] = value
      }
    })
    task.updated_at = new Date()
    await task.save()

    res.json(task)
  },
]
export const taskDelete: Handler = async (req, res) => {
  const url  = req.url.split("/")
  const id   = url.at(-2)
  const task = await Task.findById(id).exec()

  if (!task) {
    res.sendStatus(HttpStatusCodes.NOT_FOUND)

    return
  }

  await task.deleteOne().exec()

  const tasks = await Task.find({})

  res.json(tasks)
}

export const tasksDeleteAll: Handler = async (_req, res) => {
  await Task.deleteMany({})

  res.sendStatus(HttpStatusCodes.NO_CONTENT)
}
