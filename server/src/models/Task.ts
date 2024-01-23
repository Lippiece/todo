import { Schema, model } from "mongoose"

export interface TaskDocument {
  _id: string
  created_at: Date
  description: string
  name: string
  status: string
  updated_at: Date
  url: string
}

const TaskSchema = new Schema<TaskDocument>({
  created_at: { required: true, type: Date },
  description: { required: true, type: String },
  name: { required: true, type: String },
  status: { required: true, type: String },
  updated_at: { required: true, type: Date },
})

TaskSchema.virtual("url").get(function (): string {
  return `/task/${this._id}`
})

const Task = model<TaskDocument>("Task", TaskSchema)

export default Task
