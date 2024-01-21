import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import type { Handler } from "express"

const notImplemented: Handler = (_req, res) => {
  res.sendStatus(HttpStatusCodes.NOT_IMPLEMENTED)
}

export const taskGetAll: Handler = notImplemented
export const taskGet: Handler = notImplemented
export const taskAdd: Handler = notImplemented
export const taskUpdate: Handler = notImplemented
export const taskDelete: Handler = notImplemented

export const taskListGetAll: Handler = notImplemented
export const taskListGet: Handler = notImplemented
export const taskListAdd: Handler = notImplemented
export const taskListUpdate: Handler = notImplemented
export const taskListDelete: Handler = notImplemented
