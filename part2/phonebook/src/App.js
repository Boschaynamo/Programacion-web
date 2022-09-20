import { useState, useEffect } from 'react'
import phonebookService from './services/persons'


const Filter = ({ inputValue, onChangeValue, text }) => <div>{text} <input value={inputValue} onChange={onChangeValue} /></div>

const PersonForm = ({ onFormSubmit, onNameChange, nameInputValue, onNumberChange, numberInputValue, buttonText }) => {
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div> Name <input value={nameInputValue} onChange={onNameChange} /></div>

        <div> Number <input value={numberInputValue} onChange={onNumberChange} /></div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>

      </form>
    </div>
  )
}

const RenderPersons = ({ persons, stringFilter, buttonOnClick }) => {
  return (
    persons.map((person) =>
      person.name.toLowerCase().startsWith(stringFilter.toLowerCase()) ?
        <RenderPerson key={person.name} person={person} buttonOnClick={buttonOnClick} />
        : null
    )
  )
}

const RenderPerson = ({ person, buttonOnClick }) =>
  <div> {person.name} {person.number} <button onClick={() => buttonOnClick(person.id, person.name)}>Delete</button> </div>



const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response =>
        setPersons(response.data))
  },
    [])

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

  const handleDeleteClick = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .deletear(id)
        .then(response => console.log(response))

      setPersons(persons.filter((person) => person.id !== id))
    }

  }

  const addDataToList = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    let isWritten = false

    isWritten = persons.find((person) => newName === person.name)
    if (isWritten === false) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')

      phonebookService
        .create(nameObject)
        .then(response => console.log(response))

    } else {
      if (window.confirm(`${newName} is already added to phonebook, do you want to replace the old number with the new one?!`)) {

        phonebookService
          .update(isWritten.id, nameObject)
          .then(response => setPersons(persons.map(p => p.id !== isWritten.id ? p : response.data)))

        //setPersons(changedperson)
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter inputValue={newNameFilter} onChangeValue={handleNameFilterChange} text={"Filter shown with:"} />
      <h2>Add a new person</h2>
      <PersonForm
        onFormSubmit={addDataToList}
        onNameChange={handleNameChange}
        nameInputValue={newName}
        onNumberChange={handleNumberChange}
        numberInputValue={newNumber}
        buttonText='Add' />
      <h2>Numbers</h2>
      <RenderPersons persons={persons} stringFilter={newNameFilter} buttonOnClick={handleDeleteClick} />
    </div>
  )
}

export default App
