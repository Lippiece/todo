import axios from "axios"
import { useEffect, useState } from "react"

interface Task {
  _id: string
  name: string
  status: string
  description: string
  created_at: Date
  updated_at: Date
}

const getTasks = async (setTasks: (tasks: Task[]) => void) => {
  try {
    const { data: tasks } = await axios.get("/api/tasks")

    tasks.length > 0 && setTasks(tasks)
  } catch (error) {
    console.error(error)
  }
}

const addTask = async (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  try {
    const response = await axios.post("/api/task/add", {
      name: "Task",
      status: "todo",
      description: "Description",
    })
    const { data: newTask } = await axios.get(
      `http://localhost:3001/api${response.data.url}`,
    )

    setTasks([...tasks, newTask])
  } catch (error) {
    console.error(error)
  }
}

const deleteTask = async (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  _id: string,
) => {
  try {
    await axios.delete(`/api/task/${_id}/delete`)
    setTasks(tasks.filter(task => task._id !== _id))
  } catch (error) {
    console.error(error)
  }
}

const deleteAll = async (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  try {
    tasks.length > 0 && (await axios.delete("/api/tasks/deleteAll"))
    setTasks([])
  } catch (error) {
    console.error(error)
  }
}

const editTask = {
  status: async (
    task: Task,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
  ) => {
    try {
      const newStatus = task.status === "todo" ? "doing" : "todo"
      await axios.put(`/api/task/${task._id}/update`, {
        ...task,
        status: newStatus,
      })

      const newTasks = tasks.map(task_ => {
        if (task_._id === task._id) {
          return { ...task_, status: newStatus }
        }
        return task_
      })

      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  },
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    getTasks(setTasks)
  }, [])

  const TaskComponent = ({ task }: { task: Task }) => {
    return (
      <li
        key={task._id}
        className={
          task.status === "todo"
            ? "flex flex-row hover:bg-gray-600 rounded p-2"
            : "flex flex-row hover:bg-gray-600 rounded p-2 opacity-50"
        }
      >
        <input
          type="checkbox"
          checked={task.status !== "todo"}
          onChange={() => editTask.status(task, tasks, setTasks)}
          className="mr-2"
        />
        <p>{task.name}</p>
        <button
          type="button"
          className="ml-2 text-red-200 hover:text-red-600"
          onClick={() => deleteTask(tasks, setTasks, task._id)}
        >
          <span>
            <svg
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Delete</title>
              <path
                fill="currentColor"
                d="M14.885 17.5v-1h3v1zm0-8v-1h6v1zm0 4v-1h5v1zM4.115 8h-1V7h3.731v-.885h2.539V7h3.73v1h-1v8.385q0 .69-.462 1.152Q11.19 18 10.5 18H5.73q-.69 0-1.152-.462t-.463-1.153zm1 0v8.385q0 .23.193.423Q5.5 17 5.73 17h4.77q.23 0 .423-.192q.192-.193.192-.423V8zm0 0v9z"
              />
            </svg>
          </span>
        </button>
      </li>
    )
  }

  return (
    <div className="container px-4 mx-auto">
      <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
        Tasks
        {tasks.length > 0 && (
          <button
            className="text-red-200 hover:text-red-600"
            type="button"
            onClick={() => deleteAll(tasks, setTasks)}
          >
            <svg
              name="delete all"
              width="1rem"
              height="1rem"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Delete all</title>
              <path
                fill="currentColor"
                d="M17.728 11.456L14.592 8.32l3.2-3.2l-1.536-1.536l-3.2 3.2L9.92 3.648L8.384 5.12l3.2 3.2l-3.264 3.264l1.536 1.536l3.264-3.264l3.136 3.136zM0 17.92V0h20.48v17.92zm19.2-6.4h-.448l-1.28-1.28H19.2V6.4h-1.792l1.28-1.28h.512V1.28H1.28v3.84h6.208l1.28 1.28H1.28v3.84h7.424l-1.28 1.28H1.28v3.84H19.2z"
              />
            </svg>
          </button>
        )}
      </h1>

      <ul className="mt-4 space-y-2">
        {tasks
          .filter(t => t.status === "todo")
          .concat(tasks.filter(t => t.status !== "todo"))
          .map(task => (
            <TaskComponent task={task} key={task._id} />
          ))}
      </ul>

      <button
        type="button"
        className="mt-4 text-blue-400 hover:text-blue-600 focus:text-blue-300rounded flex flex-row items-center p-1 outline-none"
        onClick={() => addTask(tasks, setTasks)}
      >
        <svg
          width="2rem"
          height="2rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Add task</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h4m0 0h4m-4 0v4m0-4V8m-8 8.8V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C5.52 4 6.08 4 7.2 4h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a2.001 2.001 0 0 1-.874.874c-.428.218-.986.218-2.104.218H7.197c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8"
          />
        </svg>
        Add one
      </button>
    </div>
  )
}

export default App
