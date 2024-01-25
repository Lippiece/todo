import { model, type ObjectId, Schema, Types } from "mongoose"

export interface ITaskList {
  _id: string
  createdAt: Date
  description: string
  name: string
  tasks: ObjectId[]
  updatedAt: Date
}

const taskListSchema = new Schema<ITaskList>({
  _id: { required: true, type: String },
  createdAt: { required: true, type: Date },
  description: { required: true, type: String },
  name: { required: true, type: String },
  tasks: { ref: "Task", required: true, type: [Types.ObjectId] },
  updatedAt: { required: true, type: Date },
})

taskListSchema.virtual("url").get(function () {
  return `/taskList/${this._id}`
})

const TaskList = model<ITaskList>("TaskList", taskListSchema)

export default TaskList
