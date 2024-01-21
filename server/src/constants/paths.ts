const paths = {
  Base: "/api",

  health: {
    Base: "/health",
  },

  task: {
    add: "/:id/add",
    Base: "/task",
    delete: "/:id/delete",
    get: "/:id/",
    update: "/:id/update",
  },

  taskList: {
    add: "/:id/add",
    Base: "/taskList",
    delete: "/:id/delete",
    get: "/:id/",
    update: "/:id/update",
  },
}

export default paths
