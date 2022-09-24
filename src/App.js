import React, {useState} from 'react'
import Key from './components/Key'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const api = {
  url: Key.BASE_URL,
  key: Key.API_KEY
}

const App = () => {

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})
  
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then(results => {
          setQuery("")
          setWeather(results)
          console.log(results)
        })
    }
  }

  const dataBuild = (d) => {
    let date = String(new window.Date())
    date = date.slice(3, 15)
    return date
  }

  let weather_data = " "
  if (typeof weather.main !== "undefined"){
    weather_data = (
      <div>
        <p className="card-text location">
          {weather.name}, {weather.sys.country}
        </p>
        <p className="card-text date">
          {dataBuild(new Date())}
        </p>
        <p className="card-text temperature border border-3 w-50 mx-auto my-5">
          {Math.round(weather.main.temp)}°C
         </p>
        <p className="card-text weather">
          {weather.weather[0].main}
        </p>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="container mt-5 px-0">
        <div className={
          typeof weather.main !== "undefined"
          ? weather.weather[0].main !== "Clear" 
            ? weather.weather[0].main !== "Clouds"
              ? "card rain"
              : "card clouds"
            : "card clear"
          : "card"
        }>
          <div className="card-body text-center">

            <div className="container mt-3">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder='Search' 
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyPress={search}
                />
              </div>
              
              {weather_data}
            </div>

          </div>
        
        </div>
        

      </div>
    </div>
    );
}

export default App;
