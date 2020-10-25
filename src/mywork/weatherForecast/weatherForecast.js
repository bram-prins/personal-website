const form = document.querySelector('form')
const input = document.querySelector('input')
const output = document.getElementById('myForecast')

const callback = 

form.onsubmit = async e => {
    e.preventDefault()

    output.innerHTML = 'Loading...'

    try {
        let location = input.value

        //Get latitude & longitude of searched location
        const urlLL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
            encodeURIComponent(location) +
            '.json?limit=1&access_token=pk.eyJ1IjoiYnJhbXowciIsImEiOiJjazhhMGk0dzEwYnVrM2hwa2htOXFhMDRsIn0.oZh86lWIUGmzIc7nJ9H9Fg'    
        const rawDataLL = await fetch(urlLL)
        const dataLL = await rawDataLL.json()
        if (dataLL.error) throw new Error(dataLL.error)
        if (!dataLL.features.length) throw new Error('This location could not be found')

        location = dataLL.features[0].place_name
        const latitude = dataLL.features[0].center[1]
        const longitude = dataLL.features[0].center[0]

        //Get weather data
        const urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +
        '&lon=' + longitude + '&exclude=minutely&units=metric&appid=b3dea472b6d81995fe8de3f3fee19893'
        const rawDataWeather = await fetch(urlWeather)
        const dataWeather = await rawDataWeather.json()
        if (dataWeather.error) throw new Error(dataWeather.error)

        const currentWeather = dataWeather.current.weather[0].main
        const currentTemp = dataWeather.current.temp
        const currentFeelTemp = dataWeather.current.feels_like
        const rainChance = Math.round(Number(dataWeather.hourly[0].pop) * 100)

        const tomorrowWeather = dataWeather.daily[0].weather[0].main
        const tomorrowMin = dataWeather.daily[0].temp.min
        const tomorrowMax = dataWeather.daily[0].temp.max
        const tomorrowRainChance = Math.round(Number(dataWeather.daily[0].pop) * 100)
        
        //Output it into the window
        output.innerHTML = 
            location + '<br><br>' +
            'Current weather: &nbsp;' + currentWeather + '<br>' +
            'Current temperature: &nbsp;' + currentTemp + ' °C &nbsp;(Feels like: ' + currentFeelTemp + ' °C)<br>' +
            'Chance of precipitation: &nbsp;' + rainChance + '%<br><br>Tomorrow:<ul>' +
            '<li>Weather: &nbsp;' + tomorrowWeather + '</li>' +
            '<li>Min. temperature: &nbsp;' + tomorrowMin + ' °C</li>' +
            '<li>Max. temperature: &nbsp;' + tomorrowMax + ' °C</li>' +
            '<li>Chance of precipitation: &nbsp;' + tomorrowRainChance + '%</li></ul>'
    } catch(err) {
        output.innerHTML = 'Error: ' + err.message
    }
}