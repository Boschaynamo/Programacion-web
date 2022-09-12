import { useState } from 'react'

const Filter = ({inputValue, onChangeValue, text}) => <div>{text} <input value={inputValue} onChange={onChangeValue} /></div>

const PersonForm = ({onFormSubmit, onNameChange, nameInputValue, onNumberChange, numberInputValue, buttonText}) =>{
  return(
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

const RenderPersons = ({persons,stringFilter})=>{
  return(
    persons.map((person) => {
      if(person.name.toLowerCase().startsWith(stringFilter.toLowerCase()))
        return(<RenderPerson key={person.name} name={person.name} number={person.number}/>)
    }
    )
  )
}

const RenderPerson = ({name, number}) => <div> {name} {number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '11-5123-8456'
    },
    {
      name: 'Ada Lovelace',
      number: '11-4133-8894'
    },
    {
      name: 'Nicolas Buszczak',
      number: '11-5124-8956'
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


  const addDataToList = (event) => {
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
      <Filter inputValue={newNameFilter} onChangeValue={handleNameFilterChange} text={"Filter shown with:"} />
      <h2>Add a new person</h2>
      <PersonForm 
        onFormSubmit={addDataToList}
        onNameChange={handleNameChange}
        nameInputValue={newName}
        onNumberChange={handleNumberChange}
        numberInputValue={newNumber}
        buttonText='Add'/>  
      <h2>Numbers</h2>
      <RenderPersons persons={persons} stringFilter={newNameFilter} />
    </div>
  )
}

export default App
