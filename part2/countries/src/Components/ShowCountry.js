import React from 'react'

const ShowCountry = ({ country }) => {
    return (
        <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>Capital:{country.capital}</p>
            <p>Area:{country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((Language) => {
                    return (<li key={Language}>  {Language}</li>)
                })}
            </ul>
            <h2>Flag</h2>
            <img src={country.flags.svg} alt='No hay bandera' />
        </div>
    )
}

export default ShowCountry