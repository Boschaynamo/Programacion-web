import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas'
    },
    {
      name: 'Ada Lovelace'
    }

  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }
    let isWritten = false

    isWritten = persons.filter((person) => {
      return newName===person.name
    })
    if (isWritten == false) {
      setPersons(persons.concat(nameObject))
      setNewName('')
    } else {
      alert(`${newName} has already been added!`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App
