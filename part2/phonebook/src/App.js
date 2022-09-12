import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '11-5123-8456'
    },
    {
      name: 'Ada Lovelace',
      number: '11-4133-8894'
    }

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }


  const addData = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    let isWritten = false

    isWritten = persons.filter((person) => {
      return newName === person.name
    })
    if (isWritten == false) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')

    } else {
      alert(`${newName} has already been added!`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addData}>
        <div>
          filter shown with: <input value={newNameFilter} onChange={handleNameFilterChange} />
        </div>
        <h2>Add a new person</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        if(person.name.toLowerCase().startsWith(newNameFilter.toLowerCase()))
          return(<div key={person.name}> {person.name} {person.number}</div>)
      }
      )}
    </div>
  )
}

export default App
