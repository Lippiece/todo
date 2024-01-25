import axios from "axios"
import { useEffect, useState } from "react"

interface Task {
  _id: string
  name: string
  status: string
  description: string
  created_at: string
  updated_at: string
}

const getTasks = async (setTasks: (tasks: Task[]) => void) => {
  try {
    const { data: tasks } = await axios.get("https://todo-app-yrhz.onrender.com/api/tasks")

    tasks.length > 0 && setTasks(tasks)
  } catch (error) {
    console.error(error)
  }
}

const addTask = async (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  try {
    const response = await axios.post("https://todo-api.lippiece.ydns.eu/api/task/add", {
      name: "Task",
      status: "todo",
      description: "Description",
    })
    const { data: newTask } = await axios.get(
      `https://todo-api.lippiece.ydns.eu/api${response.data.url}`,
    )

    setTasks([newTask, ...tasks])
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
    setTasks(tasks.filter(task => task._id !== _id))
    await axios.delete(`https://todo-api.lippiece.ydns.eu/api/task/${_id}/delete`)
  } catch (error) {
    console.error(error)
  }
}

const deleteAll = async (tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  try {
    tasks.length > 0 && (await axios.delete("https://todo-api.lippiece.ydns.eu/api/tasks/deleteAll"))
    setTasks([])
  } catch (error) {
    console.error(error)
  }
}

const editTask = {
  name: async (
    name: string,
    task: Task,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
  ) => {
    try {
      if (!name || name === task.name) return
      if (!name) name = task.name
      await axios.put(`https://todo-api.lippiece.ydns.eu/api/task/${task._id}/update`, {
        ...task,
        name,
      })

      const newTasks = tasks.map(task_ => {
        if (task_._id === task._id) {
          return { ...task_, name }
        }
        return task_
      })

      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  },
  description: async (
    description: string,
    task: Task,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
  ) => {
    try {
      if (description === task.description) return
      await axios.put(`https://todo-api.lippiece.ydns.eu/api/task/${task._id}/update`, {
        ...task,
        description,
      })

      const newTasks = tasks.map(task_ => {
        if (task_._id === task._id) {
          return { ...task_, description }
        }
        return task_
      })

      setTasks(newTasks)
    } catch (error) {
      console.error(error)
    }
  },
  status: async (
    task: Task,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void,
  ) => {
    try {
      const newStatus = task.status === "todo" ? "doing" : "todo"
      await axios.put(`https://todo-api.lippiece.ydns.eu/api/task/${task._id}/update`, {
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

const addIcon = (
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
)
const deleteAllIcon = (
  <svg
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Remove all</title>
    <path
      fill="currentColor"
      d="m10 12.6l.7.7l1.6-1.6l1.6 1.6l.8-.7L13 11l1.7-1.6l-.8-.8l-1.6 1.7l-1.6-1.7l-.7.8l1.6 1.6zM1 4h14V3H1zm0 3h14V6H1zm8 2.5V9H1v1h8zM9 13v-1H1v1z"
    />
  </svg>
)
const deleteIcon = (
  <svg
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Remove</title>
    <path
      fill="currentColor"
      d="M14.885 17.5v-1h3v1zm0-8v-1h6v1zm0 4v-1h5v1zM4.115 8h-1V7h3.731v-.885h2.539V7h3.73v1h-1v8.385q0 .69-.462 1.152Q11.19 18 10.5 18H5.73q-.69 0-1.152-.462t-.463-1.153zm1 0v8.385q0 .23.193.423Q5.5 17 5.73 17h4.77q.23 0 .423-.192q.192-.193.192-.423V8zm0 0v9z"
    />
  </svg>
)

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
            ? "flex flex-row gap-4 hover:bg-gray-600 rounded p-2 hover:divide-x-2 hover:divide-blue-400"
            : "flex flex-row gap-4 hover:bg-gray-600 rounded p-2 opacity-50 hover:divide-x-2 hover:divide-blue-400"
        }
      >
        <button
          type="button"
          className="text-red-200 hover:text-red-600"
          onClick={() => deleteTask(tasks, setTasks, task._id)}
        >
          {deleteIcon}
        </button>
        <input
          type="checkbox"
          checked={task.status !== "todo"}
          onChange={() => editTask.status(task, tasks, setTasks)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600 my-auto hover:opacity-70"
        />
        <div className="flex flex-col  px-4 gap-2">
          <p
            className="font-sans font-bold focus:outline-none focus:underline focus:underline-offset-4"
            contentEditable
            onBlur={event => {
              window.getSelection()?.removeAllRanges()
              editTask.name(event.target.textContent!, task, tasks, setTasks)
            }}
            onFocus={event =>
              window.getSelection()?.selectAllChildren(event.target)
            }
          >
            {task.name}
          </p>
          <p
            className="text-sm focus:outline-none focus:underline focus:underline-offset-4"
            contentEditable
            onBlur={event => {
              window.getSelection()?.removeAllRanges()
              editTask.description(
                event.target.textContent!,
                task,
                tasks,
                setTasks,
              )
            }}
            onFocus={event =>
              window.getSelection()?.selectAllChildren(event.target)
            }
          >
            {task.description}
          </p>
        </div>
      </li>
    )
  }

  return (
    <div className="container px-4 mx-auto">
      <header className="flex flex-row gap-4">
        <img src="/todo/favicon.svg" alt="Task list logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
          Tasks
        </h1>
        <button
          type="button"
          className="text-blue-200 hover:text-blue-600 focus:text-blue-300 rounded flex flex-row items-center p-1 outline-none justify-center"
          onClick={() => addTask(tasks, setTasks)}
        >
          {addIcon}
          Add task
        </button>
        {tasks.length > 0 && (
          <button
            className="p-1 text-red-200 hover:text-red-600 focus:text-red-300 rounded flex flex-row items-center p-1 outline-none justify-center"
            type="button"
            onClick={() => deleteAll(tasks, setTasks)}
          >
            {deleteAllIcon}
            Remove all
          </button>
        )}
      </header>

      <ul className="mt-4 space-y-2">
        {tasks
          .filter(t => t.status === "todo")
          .concat(tasks.filter(t => t.status !== "todo"))
          .map(task => (
            <TaskComponent task={task} key={task._id} />
          ))}
      </ul>
    </div>
  )
}

export default App
