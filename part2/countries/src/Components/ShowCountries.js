import React from 'react'

const ShowCountries = ({countries, buttonOnClick}) => countries.map((country) => {
return(
<div key={country.name.common}> 
    {country.name.common} <button onClick={()=>buttonOnClick(country.name.common)}> Show </button>
</div>
)
})



export default ShowCountries