import axios from 'axios'
import { useEffect,useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setweather] = useState()
  const [temp,setTemp]= useState()

  const succes = pos =>{
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  }
 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)
  }, [])

  useEffect(()=>{
    if(coords){
      const apiKEY='ea86739e1fe0538c93d38dd2911d0a99'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKEY}`
      axios.get(URL)
      .then(res => {
        setweather(res.data)
        console.log(res.data)
        const celsius= (res.data.main.temp - 273.15).toFixed(1);
        const farenheit= (celsius * (9/5) + 32).toFixed(1);
        setTemp({
          celsius,farenheit
        })
      })
      .catch(err => console.log(err))
    }
  },[coords])


  console.log(coords)
  console.log(weather)
  return (
    <div className="App">
      {weather?
      <WeatherCard 
        weather={weather}
        temp={temp}
      />:
      <Loading/>
      }
    </div>
  )
}

export default App
