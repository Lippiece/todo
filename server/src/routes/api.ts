import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import routes from "@src/constants/paths"
import {
  taskAdd,
  taskDelete,
  taskGet,
  taskGetAll,
  taskUpdate,
  tasksDeleteAll,
} from "@src/controllers/task"
import {
  taskListAdd,
  taskListDelete,
  taskListGet,
  taskListGetAll,
  taskListUpdate,
} from "@src/controllers/taskList"
import { Router } from "express"

const router = Router()

// **** Routes **** //

// Root
router.get("/", (_req, res) => {
  res.redirect(routes.health)
})

router.get(routes.health, (_req, res) => {
  res.sendStatus(HttpStatusCodes.OK)
})

// Tasks
router.get(routes.tasks.Base, taskGetAll)
router.delete(routes.tasks.deleteAll, tasksDeleteAll)
console.log(routes.tasks.deleteAll)
router.get(routes.task.get, taskGet)
router.post(routes.task.add, taskAdd)
router.put(routes.task.update, taskUpdate)
router.delete(routes.task.delete, taskDelete)

// Task Lists
router.get(routes.taskLists.Base, taskListGetAll)
router.get(routes.taskList.get, taskListGet)
router.post(routes.taskList.add, taskListAdd)
router.put(routes.taskList.update, taskListUpdate)
router.delete(routes.taskList.delete, taskListDelete)

export default router
