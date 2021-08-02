const form = document.querySelector('form')
const input = document.querySelector('input')
const output = document.getElementById('myForecast')

const callback = 

form.onsubmit = async e => {
    e.preventDefault()

    output.innerHTML = 'Loading...'

    try {
        let location = input.value
        
        //Obfuscated apiKey
        var _0xd826=["\x70\x6B\x2E\x65\x79\x4A\x31\x49\x6A\x6F\x69\x59\x6E\x4A\x68\x62\x58\x6F\x77\x63\x69\x49\x73\x49\x6D\x45\x69\x4F\x69\x4A\x6A\x61\x7A\x68\x68\x4D\x47\x6B\x30\x64\x7A\x45\x77\x59\x6E\x56\x72\x4D\x32\x68\x77\x61\x32\x68\x74\x4F\x58\x46\x68\x4D\x44\x52\x73\x49\x6E\x30\x2E\x6F\x5A\x68\x38\x36\x6C\x57\x49\x55\x47\x6D\x7A\x49\x63\x37\x6E\x4A\x39\x48\x39\x46\x67"]
        const apiKey=_0xd826[Math.floor(Math.random())]

        //Get latitude & longitude of searched location
        const urlLL = 
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=1&access_token=${apiKey}`    
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