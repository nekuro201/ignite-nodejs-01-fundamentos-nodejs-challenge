import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks/:search'),
    handle: (req, res) => {

      const { search } = req.params
      const tasks = database.find('tasks', search)

      return res
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handle: (req, res) => {
      const tasks = database.select('tasks')
      return res
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handle: (req, res) => {
      const { title, description } = req.body

      const newTask = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        create_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', newTask)

      return res.writeHead(201).end()
    }
  }
]