const weatherform = document.querySelector('.weatherform');
const cityinput = document.querySelector('.city');
const card = document.querySelector('.card');
const apikey = "8df236007fa2871606ad1d753e01b2ca";

weatherform.addEventListener("submit", async event =>{

    event.preventDefault();
    const city = cityinput.value; 

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            getWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city name");
    }

})

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error("City not found");
    }

    return await response.json();
}

function getWeatherInfo(data){
    const {name: city, main: {temp, humidity}, weather: [{id, description}]} = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityElement = document.createElement('h1');
    const tempElement = document.createElement('p');
    const humidityElement = document.createElement('p');
    const descElement = document.createElement('p');
    const weatherEmojiElement = document.createElement('p');

    cityElement.textContent = city;
    tempElement.textContent = `${(((temp -  273.15) *(9/5)+32)).toFixed(1)}°F`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    descElement.textContent = description;
    weatherEmojiElement.textContent = getWeatherEmoji(id);

    cityElement.classList.add('citydisplay');
    tempElement.classList.add('tempdisplay');
    humidityElement.classList.add('humidityDisplay');
    descElement.classList.add('descDisplay');
    weatherEmojiElement.classList.add('weatherEmoji');
    
    card.appendChild(cityElement);
    card.appendChild(tempElement);
    card.appendChild(humidityElement);
    card.appendChild(descElement);
    card.appendChild(weatherEmojiElement);
}

function getWeatherEmoji(id){
    switch(true){
        case(id >= 200 && id < 300):
            return "⛈️";
        case(id >= 300 && id < 400):
            return "🌦️";
        case(id >= 500 && id < 600):
            return "🌧️";
        case(id >= 600 && id < 700):
            return "❄️";
        case(id >= 700 && id < 800):
            return "🌫️";
        case(id === 800):
            return "☀️"; 
        case(id > 800 && id < 900):
            return "☁️";
        default:
            return "🌈";       
    }
}

function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}