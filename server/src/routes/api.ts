import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import paths from "@src/constants/paths"
import {
  taskAdd,
  taskDelete,
  taskGet,
  taskGetAll,
  taskListAdd,
  taskListDelete,
  taskListGet,
  taskListGetAll,
  taskListUpdate,
  taskUpdate,
} from "@src/controllers/task"
import { Router } from "express"
import jetPaths from "jet-paths"

// **** Variables **** //

const router = Router()

router.get("/", (_req, res) => {
  res.redirect(jetPaths(paths).Base)
})

router.get(jetPaths(paths).Base, (_req, res) => {
  res.redirect(jetPaths(paths).health.Base)
})

router.get(jetPaths(paths).health.Base, (_req, res) => {
  res.sendStatus(HttpStatusCodes.OK)
})

// **** Routes **** //

router.get(jetPaths(paths).task.Base, taskGetAll)
router.get(jetPaths(paths).task.get, taskGet)
router.post(jetPaths(paths).task.add, taskAdd)
router.put(jetPaths(paths).task.update, taskUpdate)
router.delete(jetPaths(paths).task.delete, taskDelete)

router.get(jetPaths(paths).taskList.Base, taskListGetAll)
router.get(jetPaths(paths).taskList.get, taskListGet)
router.post(jetPaths(paths).taskList.add, taskListAdd)
router.put(jetPaths(paths).taskList.update, taskListUpdate)
router.delete(jetPaths(paths).taskList.delete, taskListDelete)

export default router
