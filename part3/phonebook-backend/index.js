const PORT = process.env.PORT || 3001
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
app.use(express.static('build'))


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

/*app.get('/', (request, response) => {
  response.send('Hello World!')
})*/

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/info', (request, response) => {
  const date = new Date()
  const peopleCount = Object.keys(persons).length
  response.send(`<div>Phonebook has info for ${peopleCount}</div> ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 1000)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Missing name'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'Missing number'
    })
  }
  if(persons.find(person => person.name ===body.name)){
    return response.status(400).json({
      error: 'Name already exists in the phonebook'
    })
  }
  const id = generateId()
  const newPerson = {
    id: id,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})