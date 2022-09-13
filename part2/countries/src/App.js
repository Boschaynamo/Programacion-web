import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({text, filterInputValue, onChange}) =>{
  return(
    <div>{text} <input value={filterInputValue} onChange={onChange}  /></div>
  )
}

const FilterResult = ({countriesData ,countriesFilterInput }) =>{
  return(
    countriesData.map((country)=>{
      if(country.name.common.toLowerCase().includes(countriesFilterInput.toLowerCase()))
        return (<div key={country.name.common}>{country.name.common}</div>)
      })
    
  
    
    
  
  /*
  console.log(countriesResult)
  if(countriesResult>10)
    return <div>Too many results, be more specific</div>
  
  if(countriesResult<=10)
    return( countriesResult )*/
  )
}

function App() {

  const [countriesFilterInput,setCountriesFilterInput] = useState('')
  //const [countriesResult,setCountriesResult] = useState([])
  
  const handleFilterInputChange = (event) =>{
    setCountriesFilterInput(event.target.value)
  }

  const [countries,setCountries] = useState([])
  useEffect( () =>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setCountries(response.data)
     //   console.log(response.data[0].name)
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
