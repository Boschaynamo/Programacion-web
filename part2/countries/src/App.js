import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ text, filterInputValue, onChange }) => {
  return (
    <div>{text} <input value={filterInputValue} onChange={onChange} /></div>
  )
}

const FilterResult = ({ countriesData, countriesFilterInput }) => {
  const filteredCountries = countriesData
    .filter(country =>
      country.name.common.toLowerCase().includes(countriesFilterInput.toLowerCase())
    )

  //console.log(filteredCountries)

  if (filteredCountries.length > 10)
    return <div>Too many results, be more specific</div>
  if (filteredCountries.length <= 10 & filteredCountries.length !== 1)
    return (filteredCountries.map((country) => <div key={country.name.common}>{country.name.common}</div>))

  //console.log(filteredCountries)
  return (
    <div key={filteredCountries[0].name.common}>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>Capital:{filteredCountries[0].capital}</p>
      <p>Area:{filteredCountries[0].area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.values(filteredCountries[0].languages).map((Language) => {
          return (<li key={Language}>  {Language}</li>)
        })}
      </ul>
      <h2>Flag</h2> 
      <img src={filteredCountries[0].flags.svg} alt='No hay bandera'/>
    </div>
  )


}

function App() {

  const [countriesFilterInput, setCountriesFilterInput] = useState('')
  //const [countriesResult,setCountriesResult] = useState([])

  const handleFilterInputChange = (event) => {
    setCountriesFilterInput(event.target.value)
  }

  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        //  console.log(response.data)
      })
  },
    [])





  return (
    <div>
      <Filter text='Find countries' filterInputValue={countriesFilterInput} onChange={handleFilterInputChange} />
      <FilterResult countriesData={countries} countriesFilterInput={countriesFilterInput} />
    </div>

  );
}

export default App;
