const PORT = 3001
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
  const date= new Date()
  const peopleCount = Object.keys(persons).length
  response.send(`<div>Phonebook has info for ${peopleCount}</div> ${date}`)
})

app.listen(PORT)