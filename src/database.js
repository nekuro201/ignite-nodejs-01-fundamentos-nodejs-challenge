import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data;
  }

  find(table, value) {
    const data = this.#database[table] ?? []

    const results = []

    data.map((row) => {
      const pathRegex = new RegExp(value, 'i')

      if(row.title.match(pathRegex) || row.description.match(pathRegex)) {
        results.push(row)
      }
    })

    return results;
  }
}

function contains(values, search) {

  const results = []

  values.map((value) => {

    const pathRegex = new RegExp(search, 'i')
    const result = value.match(pathRegex)

    result && results.push(result)
  })

  console.log(results) 
}
