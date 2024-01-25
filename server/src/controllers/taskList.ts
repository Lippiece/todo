import type { Handler } from "express"
import HttpStatusCodes from "src/constants/HttpStatusCodes"

const notImplemented: Handler = (_req, res) => {
  res.sendStatus(HttpStatusCodes.NOT_IMPLEMENTED)
}

export const taskListGetAll: Handler = notImplemented
export const taskListGet: Handler = notImplemented
export const taskListAdd: Handler = notImplemented
export const taskListUpdate: Handler = notImplemented
export const taskListDelete: Handler = notImplemented
