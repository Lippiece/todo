import jetPaths from "jet-paths"

const paths = {
  Base: "/api",

  health: "/health",

  task: {
    add: "/add",
    Base: "/task",
    delete: "/:id/delete",
    get: "/:id",
    update: "/:id/update",
  },

  taskList: {
    add: "/:id/add",
    Base: "/taskList",
    delete: "/:id/delete",
    get: "/:id/",
    update: "/:id/update",
  },

  taskLists: {
    Base: "/taskLists",
  },

  tasks: {
    Base: "/tasks",
    deleteAll: "/deleteAll",
  },
}

const routes = jetPaths(paths)

export default routes
