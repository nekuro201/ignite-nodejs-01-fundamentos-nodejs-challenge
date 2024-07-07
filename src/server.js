import http from 'node:http'
import { json } from './middlewares/json.js'

const tasks = []

const server = http.createServer(async(req, res) => {

  const { method, url } = req

  await json(req, res)

  if(method === 'GET' && url === '/tasks') {
    return res
      .end(JSON.stringify(tasks))
  }

  if(method === 'POST' && url === '/tasks') {
    const { title, description } = req.body

    const newTask = {
      id: '2',
      title: title,
      description: description,
      completed_at: null,
      create_at: new Date(),
      updated_at: new Date(),
    }

    tasks.push(newTask)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end('route not founded!')
})

server.listen(3333)