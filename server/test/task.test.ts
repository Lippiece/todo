import "../src/pre-start"

import assert from "node:assert"
import { afterEach, beforeEach, describe, it } from "node:test"

import routes from "@src/constants/paths"
import Task from "@src/models/Task"
import app from "@src/server"
import mongoose from "mongoose"
import request from "supertest"

describe("tasks", () => {
  const tasks = [
    new Task({
      created_at: new Date(),
      description: "Description 1",
      name: "Task 1",
      status: "todo",
      updated_at: new Date(),
    }),

    new Task({
      created_at: new Date(),
      description: "Description 2",
      name: "Task 2",
      status: "todo",
      updated_at: new Date(),
    }),
  ]

  afterEach(async () => {
    await mongoose.connection.dropCollection("tasks")
  })

  beforeEach(async () => {
    await mongoose.connection.dropCollection("tasks")
    await Promise.all(tasks.map(async task => await task.save()))
  })

  it("should return all tasks", async () => {
    const response = await request(app).get(routes.tasks.Base)
    const { body } = response

    assert.equal(response.status, 200, "Response status should be 200")
    assert.equal(
      body.length,
      tasks.length,
      `There should be${tasks.length} tasks`,
    )
  })
})
