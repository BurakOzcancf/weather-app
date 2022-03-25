import React from 'react'
import axios from 'axios'  

const Weather = () => {

    const [city, setCity] = React.useState("")
    const [value, setValue] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [weather, setWeather] = React.useState("")
    const [lat, setLat] = React.useState("")
    const [lon, setLon] = React.useState("")
    function getCurrentCoords() {
        function success(position) {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        }
        navigator.geolocation.getCurrentPosition(success)    
    }
    getCurrentCoords()
    
    React.useEffect(() => {
        if (lat && lon) {
            setLoading(true)
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=bfe8822c7b4e4ea63ea1348642874f7f`)
                .then(res => {
                    setWeather(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [lon, lat])
    
    function handleSubmit(e) {
        e.preventDefault()
        setValue(city)
        setCity("")
    }
    React.useEffect(() => {
        if (value) {
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=bfe8822c7b4e4ea63ea1348642874f7f`)
            .then(res => {
                setWeather(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
        
    }, [value])

    function background() {
        if (weather) {
            console.log(weather.weather[0].main)
            if (weather.weather[0].main=== "Snow" ) {
                return "snow"
            }
            if (weather.weather[0].main=== "Clouds") {
                return "cloud"
            } 
            if (weather.weather[0].main=== "Rain") {
                return "rain"
            } 
            if (weather.weather[0].main=== "Clear" ) {
                return "clear"
            } 
             
        }
    
    }
    
    
    return (
        <main className={background()} >
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city} 
                    placeholder="Search by city name..."
                    className='weather__input'
                /> 
                <button className='weather__btn'>Go</button>
            </form> 
            <br /> 
            {
                weather &&
                <div className='weather__container'>
                        <div className='weather__city'>{weather.name} {weather.sys.country}</div>
                        <div className='weather__temp'>
                            <p>Temp:</p>
                            <span>{Math.round(weather.main.temp)} &#8451;</span>
                        </div>
                        <div className='weather__maxtemp'>
                            <p>Max temp:</p>
                            <span>{Math.ceil(weather.main.temp_max)} &#8451;</span>
                        </div>
                        <div className='weather__mintemp'>
                            <p>Min temp:</p>
                            <span>{Math.floor(weather.main.temp_min)} &#8451;</span>
                        </div>
                        <div className='weather__sit'> {weather.weather.map(item => item.description)} </div>
                        {/* <div className='weather__mainsit'> {weather.weather.map(item => item.main)} </div> */}

                        
                </div>
            } 
            {!loading && <div className='weather__loading'>Loading..</div>}
      </main>
  )
}

export default Weather