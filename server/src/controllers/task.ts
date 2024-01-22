import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import Task from "@src/models/Task"
import type { Handler } from "express"
import asyncHandler from "express-async-handler"

const notImplemented: Handler = (_req, res) => {
  res.sendStatus(HttpStatusCodes.NOT_IMPLEMENTED)
}

export const taskGetAll: Handler = asyncHandler(async (_req, res) => {
  const tasks = await Task.find({}).exec()

  res.json(tasks)
})
export const taskGet: Handler = notImplemented
export const taskAdd: Handler = notImplemented
export const taskUpdate: Handler = notImplemented
export const taskDelete: Handler = notImplemented
