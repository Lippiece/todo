/* eslint-disable jest/require-hook */
import "../src/pre-start"

import assert from "node:assert"

import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import routes from "@src/constants/paths"
import Task, { type TaskDocument } from "@src/models/Task"
import app from "@src/server"
import mongoose from "mongoose"
import request from "supertest"

const getNewTaskData = (number: number) => ({
  created_at: new Date(),
  description: `Description ${number}`,
  name: `Task ${number}`,
  status: "todo",
  updated_at: new Date(),
})
const getNewTask = (
  number: number,
): mongoose.Document<unknown, Readonly<{}>, TaskDocument> &
  Required<{ _id: string }> &
  TaskDocument => new Task(getNewTaskData(number))
const tasks = [1, 2, 3].map(getNewTask)

describe("task controllers", async () => {
  beforeAll(async () => {
    await mongoose.connection.dropCollection("tasks")
    await Promise.all(tasks.map(async task => await task.save()))
  })

  afterAll(async () => {
    await mongoose.connection.dropCollection("tasks")
  })

  describe("tasks", () => {
    it("should return all tasks", async () => {
      const response = await request(app).get(routes.tasks.Base)
      const { body } = response

      assert.equal(response.status, 200, "Response status should be 200")
      assert.equal(
        body.length,
        tasks.length,
        `There should be ${tasks.length} tasks`,
      )
    })
  })

  describe("task", () => {
    it("task GET should return a task", async () => {
      const url = `${routes.task.Base}/${tasks[0]!.id}`
      const response = await request(app).get(url)
      const body: TaskDocument = response.body

      assert.equal(
        response.status,
        HttpStatusCodes.OK,
        `Response body (${body}) status should be 200`,
      )
      assert.equal(body._id, tasks[0]!.id, `Body (${body}) Task id should be 1`)
    }, 1000)

    it("task POST should create a task, accepting data", async () => {
      const url = routes.task.add
      const newTaskData = getNewTaskData(4)
      const response = await request(app).post(url).send(newTaskData)
      const { body } = response
      const newTasks = await Task.find({})

      expect(response.status).toBe(HttpStatusCodes.CREATED)
      expect(newTasks.length).toBe(tasks.length + 1)
      expect(body.url).toMatch(/\/task\/[\da-f]+/v)
    }, 1000)

    it("task DELETE should delete a task", async () => {
      const url = `${routes.task.Base}/${tasks[0]!.id}/delete`
      const response = await request(app).delete(url)
      const newTasks: TaskDocument[] = response.body

      expect(response.status).toBe(HttpStatusCodes.OK)
      expect(newTasks.length).toBe(tasks.length)
    }, 1000)

    it("task PUT should update a task", async () => {
      const fetchedTasks = await Task.find({})

      const url = `${routes.task.Base}/${fetchedTasks[0]!.id}/update`
      const newTaskData = getNewTaskData(4)
      const response = await request(app).put(url).send(newTaskData)
      const body: TaskDocument = response.body

      expect(body.name).toBe(newTaskData.name)
    }, 1000)

    it("task PUT should validate data", async () => {
      const fetchedTasks = await Task.find({})

      const url = `${routes.task.Base}/${fetchedTasks[0]!.id}/update`
      const data = getNewTaskData(4)

      data.name = "<script>alert(1)</script>"
      data.description = "<script>alert(1)</script>"

      let response = await request(app).put(url).send(data)

      const { body } = response

      expect(body.name).toBe("&lt;script&gt;alert(1)&lt;&#x2F;script&gt;")
      expect(body.description).toBe(
        "&lt;script&gt;alert(1)&lt;&#x2F;script&gt;",
      )

      data.status = "<script>alert(1)</script>"
      response = await request(app).put(url).send(data)

      expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST)
    })
  })
})
