import { Model, model, Schema } from "mongoose"

export interface TaskDocument {
  _id: string
  created_at: string
  description: string
  name: string
  status: string
  updated_at: string
}

export interface TaskVirtuals {
  url: string
}

type TaskModel = Model<TaskDocument, Readonly<{}>, TaskVirtuals>

const TaskSchema = new Schema<TaskDocument, TaskModel, TaskVirtuals>(
  {
    _id: { required: true, type: String },
    created_at: { required: true, type: String },
    description: { required: true, type: String },
    name: { required: true, type: String },
    status: { required: true, type: String },
    updated_at: { required: true, type: String },
  },
  {
    virtuals: {
      url: {
        get() {
          return `/task/${this._id}`
        },
      },
    },
  },
)

const Task = model<TaskDocument>("Task", TaskSchema)

export default Task
