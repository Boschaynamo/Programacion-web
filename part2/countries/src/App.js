import { useState, useEffect } from 'react'
import axios from 'axios'

import ShowCountry from './Components/ShowCountry'
import ShowCountries from './Components/ShowCountries'

const Filter = ({ text, filterInputValue, onChange }) => <div>{text} <input value={filterInputValue} onChange={onChange} /></div>

function App() {

  //definiciones useState
  const [countriesFilterInput, setCountriesFilterInput] = useState('')
  const [countries, setCountries] = useState([])

  //handlers
  const handleFilterInputChange = (event) => {
    setCountriesFilterInput(event.target.value)
  }

  //obtener datos de la api
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        //  console.log(response.data)
      })
  },
    [])

  // guardo los paises filtrados antes del return
  
    const filteredCountries = countries
    .filter(country =>
      country.name.common.toLowerCase().includes(countriesFilterInput.toLowerCase())
    )


  return (
    <div>
      <Filter text='Find countries' filterInputValue={countriesFilterInput} onChange={handleFilterInputChange} />
      {/*<FilterResult countriesData={countries} countriesFilterInput={countriesFilterInput} />*/}
      {filteredCountries.length===1 ? 
        <ShowCountry country={filteredCountries[0]}/> 
        : filteredCountries.length>10 ? 
          <div>Too many countries to show, be more specific</div> 
          : <ShowCountries countries={filteredCountries} buttonOnClick={(x) => setCountriesFilterInput(x)} />}
    </div>
  );
}

export default App;
