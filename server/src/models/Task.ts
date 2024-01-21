import { model,Schema } from "mongoose"

interface ITask {
  _id: string
  created_at: string
  description: string
  name: string
  status: string
  updated_at: string
}

const TaskSchema = new Schema<ITask>(
  {
    created_at: { required: true, type: String },
    description: { required: true, type: String },
    name: { required: true, type: String },
    status: { required: true, type: String },
    updated_at: { required: true, type: String },
  },
  {
    virtuals: {
      url: {
        get(): string {
          return `/task/${this._id}`
        },
      },
    },
  },
)

const Task = model<ITask>("Task", TaskSchema)

export default Task
